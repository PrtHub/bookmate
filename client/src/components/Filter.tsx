import { useState } from "react";
import Select from "react-select";
import { customStyles } from "../lib/constants";

const genreOptions = [
  { value: "Fiction", label: "Fiction" },
  { value: "Non-fiction", label: "Non-fiction" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Biography", label: "Biography" },
  { value: "History", label: "History" },
];

interface GenreOption {
  value: string;
  label: string;
}

const Filter = ({ onSelectGenre }: { onSelectGenre: (genre: string | null) => void }) => {
  const [selectedOption, setSelectedOption] = useState<GenreOption | null>(null);

  const handleChange = (option: GenreOption | null) => {
    setSelectedOption(option);
    onSelectGenre(option ? option.value : null);
  };

  return (
    <Select
      options={genreOptions}
      value={selectedOption}
      onChange={handleChange}
      styles={customStyles} // Apply your custom styles if needed
      placeholder="Select Genre"
      isClearable
      className="w-44 sm:w-56 text-sm sm:text-lg font-semibold"
    />
  );
};

export default Filter;
