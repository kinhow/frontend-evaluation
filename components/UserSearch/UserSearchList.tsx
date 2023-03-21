import Image from "next/image";
import { UserData } from "types/user";
import { UseAutocompleteRenderedOption } from "@mui/material/useAutocomplete";

interface UserSearchListProps {
  data?: UserData[];
  options: UserData[];
  hasRecentSearchData?: boolean;
  getOptionProps: (
    renderedOption: UseAutocompleteRenderedOption<UserData>
  ) => React.HTMLAttributes<HTMLLIElement>;
  removeRecentSearch?: (index: number) => void;
}

const UserSearchList = ({
  data,
  options,
  hasRecentSearchData = false,
  removeRecentSearch = () => {},
  getOptionProps,
}: UserSearchListProps) => {
  if (data?.length === 0) {
    return <div className="text-center py-4">No Results</div>;
  }

  return (
    <>
      {data?.map((option, index, arr) => {
        const originalIndex = options.findIndex((opt) => opt.name === option.name);

        return (
          <div
            key={index}
            className={`border-neutrals-100 cursor-pointer hover:bg-slate-100 ${
              arr.length - 1 !== index ? "border-b-2" : ""
            }`}
          >
            <ul className="p-4 flex items-center">
              <li
                className="flex flex-1 gap-3 items-center"
                {...getOptionProps({ option, index: originalIndex })}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg font-medium text-purple-200">
                  {option.name.charAt(0)}
                </div>
                <div>
                  <div className="text-md text-black">{option.name}</div>
                  <div className="text-sm text-neutrals-200">{option.email}</div>
                </div>
              </li>

              {hasRecentSearchData ? (
                <button onClick={() => removeRecentSearch(index)}>
                  <Image src="close.svg" alt="close icon" width={24} height={24} />
                </button>
              ) : null}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default UserSearchList;
