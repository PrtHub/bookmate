import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { getBooks } from "../lib/actions/book.action";
import { Book } from "../types";
import BookCard from "../components/BookCard";
import Searchbar from "../components/Searchbar";

const Explore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        let filteredBooks = selectedGenre
          ? data.filter(
              (book: Book) =>
                book.genre.toLowerCase() === selectedGenre.toLowerCase()
            )
          : data;
        if (searchQuery) {
          filteredBooks = filteredBooks.filter((book: Book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [selectedGenre, searchQuery]);

  return (
    <section className="w-full h-full max-w-5xl mx-auto flex-1 flex flex-col gap-10">
      <div className="w-full">
        <Searchbar onSearch={(query) => setSearchQuery(query)} />
      </div>
      <div className="w-full flex items-center justify-between gap-10">
        <h1 className="text-white-1 font-bold text-2xl">Explore</h1>
        <Filter onSelectGenre={setSelectedGenre} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="text-white-2">No books available</p>
        )}
      </div>
    </section>
  );
};

export default Explore;
