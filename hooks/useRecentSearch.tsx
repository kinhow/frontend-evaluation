import { useCallback, useEffect, useState } from "react";
import { UserData } from "types/user";

interface useRecentSearchProps {
  maxLength?: number;
  key?: string;
}

const useRecentSearch = ({ maxLength = 5, key = "RECENT_SEARCH" }: useRecentSearchProps = {}): [
  UserData[],
  (option: UserData) => void,
  (index: number) => void
] => {
  const [recentSearchData, setRecentSearchData] = useState<UserData[]>([]);

  const storeRecentSearch = (option: UserData) => {
    if (!option) return;

    const newList = [
      option,
      ...recentSearchData?.filter((item) => item.name !== option.name),
    ].slice(0, maxLength);

    setRecentSearchData(newList);
    localStorage?.setItem(key, JSON.stringify(newList));
  };

  const removeRecentSearch = (index: number) => {
    const newList = [...recentSearchData];
    newList.splice(index, 1);
    setRecentSearchData(newList);
    localStorage?.setItem(key, JSON.stringify(newList));
  };

  const loadRecentSearch = useCallback(() => {
    const newData = localStorage?.getItem(key) as string;

    try {
      setRecentSearchData((JSON.parse(newData) || []).slice(0, maxLength));
    } catch (error) {
      setRecentSearchData([]);
    }
  }, [key, maxLength]);

  useEffect(() => {
    loadRecentSearch();
  }, [loadRecentSearch]);

  return [recentSearchData, storeRecentSearch, removeRecentSearch];
};

export default useRecentSearch;
