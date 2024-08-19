import { Link } from "react-router-dom";

interface BookProps {
  _id: string;
  picture: string;
  title: string;
  author: string;
}

const BookCard = ({ book }: { book: BookProps }) => {
  return (
    <Link to={`/book/${book._id}`} className=" rounded-lg">
      <img
        src={book.picture}
        alt={book.title}
        loading="lazy"
        className="w-full h-72 object-cover rounded-lg mb-4"
      />
      <h2 className="text-white-1 font-semibold text-base sm:text-lg">{book.title}</h2>
      <p className="text-white-2 text-sm">{book.author}</p>
    </Link>
  );
};

export default BookCard;
