import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useDebounce from "../hooks/useDebounce"; 

interface SearchbarProps {
  onSearch: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className={`w-full flex min-h-[56px] items-center gap-4 rounded-[10px] px-4 ${
        isFocused
          ? "border border-orange-1 ring-1 ring-orange-1"
          : "border-none"
      } bg-black-1`}
    >
      <Search className="cursor-pointer text-light-500" />
      <input
        type="text"
        value={query}
        placeholder="Search for books"
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent border-none shadow-none outline-none"
      />
    </div>
  );
};

export default Searchbar;
