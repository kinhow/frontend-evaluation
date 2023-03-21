import { useState, useCallback } from "react";
import { UserData } from "types/user";
import { matchSorter } from "match-sorter";
import useFetchUser from "hooks/useFetchUser";
import TextField from "components/ui/TextField";
import useRecentSearch from "hooks/useRecentSearch";
import useAutoCompleteUserSearch from "hooks/useAutoCompleteUserSearch";
import UserSearchList from "./UserSearchList";
import UserSearchTitle from "./UserSearchTitle";

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { userData } = useFetchUser({ query: searchQuery });

  const [recentSearchData, storeRecentSearch, removeRecentSearch] = useRecentSearch();

  const handleChange = useCallback(
    (_event: React.SyntheticEvent<Element, Event>, value: UserData | null, reason: string) => {
      const newValue = value as unknown as UserData;
      storeRecentSearch(newValue);
    },
    [storeRecentSearch]
  );

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    getClearProps,
    popupOpen,
    groupedOptions,
  } = useAutoCompleteUserSearch({
    searchQuery,
    setSearchQuery,
    handleChange,
    data: userData as UserData[],
    recentSearchData,
  });

  const groupedData = groupedOptions as UserData[];
  const sortData = groupedData?.sort((a, b) => (a.name < b.name ? -1 : 1));
  const filteredData = searchQuery
    ? matchSorter(sortData, searchQuery, {
        keys: ["name"],
        threshold: matchSorter.rankings.CONTAINS,
        keepDiacritics: true,
      })
    : sortData;

  const hasRecentSearchData = recentSearchData?.length > 0;

  return (
    <div className="w-full" {...getRootProps()}>
      <TextField
        searchQuery={searchQuery}
        getInputProps={getInputProps}
        getClearProps={getClearProps}
      />

      {popupOpen ? (
        <ul
          className="bg-white mt-2 rounded-md border-2 border-neutrals-100 overflow-auto max-h-[300px]"
          {...getListboxProps()}
        >
          {!searchQuery && hasRecentSearchData ? (
            <>
              <UserSearchTitle title="Recent Search" />
              <UserSearchList
                options={sortData}
                data={recentSearchData}
                hasRecentSearchData={hasRecentSearchData}
                getOptionProps={getOptionProps}
                removeRecentSearch={removeRecentSearch}
              />
            </>
          ) : null}

          {searchQuery || filteredData?.length > 0 ? (
            <>
              <UserSearchTitle title={searchQuery ? "Search results" : "All following user"} />
              <UserSearchList
                options={sortData}
                data={filteredData}
                getOptionProps={getOptionProps}
              />
            </>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
};

export default UserSearch;
