import { useEffect, useState } from "react";
import { Book } from "../types";
import { getUserBooks } from "../lib/actions/book.action";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

const MyBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getUserBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    
    fetchBooks();
  }, []);

  return (
    <section className="w-full h-full flex-1 flex flex-col gap-y-20">
      <div className="w-full flex items-center justify-between gap-10">
        <h1 className="text-white-1 font-bold text-2xl">My Books</h1>
        <Link to='/add-book'
          className="px-4 py-2 rounded bg-orange-1 text-white-1 font-semibold" 
        >
          Add Book
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book}/>
          ))
        ) : (
          <p className="text-white-2">No books available</p>
        )}
      </div>
     
    </section>
  );
};

export default MyBooks;
