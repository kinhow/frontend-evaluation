import { useMemo } from "react";
import { UserData } from "types/user";
import useAutoComplete from "@mui/material/useAutocomplete";

interface useAutoCompleteUserSearchProps {
  searchQuery: string;
  data: UserData[];
  recentSearchData: UserData[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleChange?: (
    _event: React.SyntheticEvent<Element, Event>,
    value: UserData | null,
    reason: string
  ) => void;
}

const useAutoCompleteUserSearch = ({
  data,
  searchQuery,
  recentSearchData,
  setSearchQuery,
  handleChange,
}: useAutoCompleteUserSearchProps) => {
  const options = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return searchQuery ? [] : recentSearchData;
  }, [searchQuery, data, recentSearchData]) as UserData[];

  return useAutoComplete({
    id: "search-user-autocomplete",
    options,
    getOptionLabel: (option) => option?.name || searchQuery,
    filterOptions: (options, { inputValue }) =>
      options?.filter((option) => {
        const inputValueTrimmed = inputValue?.trim();
        const searchString = option?.name;
        return searchString.toLowerCase().includes(inputValueTrimmed.toLowerCase());
      }),
    onInputChange: (_event, value) => setSearchQuery(value),
    isOptionEqualToValue: (option, value) => option?.name === value?.name,
    onChange: handleChange,
    inputValue: searchQuery,
    autoHighlight: false,
    clearOnBlur: false,
    freeSolo: false,
    autoSelect: false,
    includeInputInList: true,
  });
};

export default useAutoCompleteUserSearch;
