import {
  ArrowLeftRight,
  Book,
  BookPlus,
  Compass,
} from "lucide-react";
import { CSSObjectWithLabel } from "react-select";

export const sidebarlinks = [
  {
    label: "Explore",
    route: "/",
    icon: Compass,
  },
  {
    label: "My Books",
    route: "/my-books",
    icon: Book,
  },
  {
    label: "Add Book",
    route: "/add-book",
    icon: BookPlus,
  },
  {
    label: "Exchange Requests",
    route: "/exchange-requests",
    icon: ArrowLeftRight,
  },
];

export const genres = [
  "Fiction",
  "Non-fiction",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "History",
] as const;


export const customStyles = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#15171C",
    borderColor: "#15171C",
    color: "#FFFFFF",
    minHeight: "40px",
    boxShadow: "none",
    borderRadius: "0.375rem",
    padding: "0 0.5rem",
    "&:hover": {
      borderColor: "#F97535",
    },
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "#FFFFFF",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#15171C",
    borderRadius: "0.375rem",
    marginTop: "4px",
  }),
  option: (provided: CSSObjectWithLabel, state: {isSelected: boolean}) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#15171C" : "#15171C",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#222429",
    },
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "#FFFFFF",
  }),
  clearIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: 'block'
  }),
};