import { TextInput } from "flowbite-react";
import { useRef, type FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineXMark } from "react-icons/hi2";

interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
  onSearch: (search: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ search, setSearch, onSearch }) => {
  const timeout = useRef<number | null>(null);

  return (
    <div className="relative">
      <TextInput
        type="text"
        placeholder="Search..."
        icon={AiOutlineSearch}
        onChange={(e) => {
          setSearch(e.target.value);
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }
          timeout.current = window.setTimeout(() => {
            onSearch(e.target.value);
          }, 300);
        }}
        className="search"
        value={search}
      />
      {search && (
        <HiOutlineXMark
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setSearch("");
            onSearch("");
          }}
        />
      )}
    </div>
  );
};
export default SearchInput;
