import { useEffect, useState } from "react";
import { getUserBooks } from "../lib/actions/book.action";
import { Book } from "../types";

interface BookSelectionModalProps {
  onClose: () => void;
  onBookSelect: (book: Book) => void;
  onSubmit: () => void;
}

const BookSelectionModal = ({
  onClose,
  onBookSelect,
  onSubmit,
}: BookSelectionModalProps) => {
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const books = await getUserBooks(); // Fetch the user's books
        setUserBooks(books);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserBooks();
  }, []);

  const handleBookSelection = (bookId: string) => {
    setSelectedBookId(bookId);
    const selectedBook = userBooks.find((book) => book._id === bookId);
    if (selectedBook) onBookSelect(selectedBook);
  };

  return (
    <div className="fixed inset-0 bg-black-3 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full bg-black-1">
        <h2 className="text-lg font-semibold mb-4">Select a Book to Offer</h2>
        <div className="flex flex-col gap-4">
          {userBooks.map((book) => (
            <div key={book._id} className="flex items-center">
              <input
                type="radio"
                id={`book-${book._id}`}
                name="selectedBook"
                value={book._id}
                onChange={() => handleBookSelection(book._id)}
              />
              <label htmlFor={`book-${book._id}`} className="ml-2">
                {book.title} by {book.author}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-1 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-orange-1 text-white px-4 py-2 rounded"
            disabled={!selectedBookId}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSelectionModal;
