import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookById } from "../lib/actions/book.action";
import { Book, ExchangeRequest, ExchangeRequestData } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import toast from "react-hot-toast";
import {
  createExchangeRequest,
  getExchangeRequests,
} from "../lib/actions/exchange.action";
import BookSelectionModal from "../components/BookSelectionModal";
import ActionButtons from "../components/ActionButtons";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [exchangeRequest, setExchangeRequest] =
    useState<ExchangeRequest | null>(null);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id as string);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchExchangeRequest = async () => {
      if (!book || !currentUser) return;
      try {
        const exchangeRequests = await getExchangeRequests();
        const existingRequest = exchangeRequests.find(
          (request: ExchangeRequest) =>
            request.requestedBook._id === book._id &&
            request.requester._id === currentUser.user._id
        );
        setExchangeRequest(existingRequest);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExchangeRequest();
  }, [book, currentUser]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id as string);
      toast.success("Book deleted!");
      navigate("/my-books");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleSendExchangeRequest = async () => {
    if (selectedBook && book) {
      const exchangeRequestData: ExchangeRequestData = {
        offeredBookId: selectedBook._id,
        requestedBookId: book._id,
      };

      try {
        await createExchangeRequest(exchangeRequestData);
        toast.success("Exchange request sent!");
        setShowModal(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to send exchange request.");
      }
    }
  };

  return (
    <main className="w-full h-full max-w-[700px] mx-auto">
      <section className="w-full h-full flex flex-col items-start gap-10">
        <section className="w-full flex items-start gap-10 justify-between">
          <div className="flex flex-col sm:flex-row  items-start gap-10">
            <img
              src={book?.picture}
              alt={book?.title}
              className="h-64 object-contain"
            />
            <article className="flex flex-col gap-3 sm:gap-5">
              <h1 className="text-2xl md:text-3xl font-bold">{book?.title}</h1>
              <h2 className="text-lg sm:text-xl font-medium text-white-4">
                By {book?.author}
              </h2>
              <p className="text-base sm:text-lg font-medium text-white-2">
                Genre: <span className="text-orange-1"> {book?.genre}</span>
              </p>
              {currentUser?.user._id === book?.owner?._id ? (
                <p className="py-2 px-4 w-fit bg-white-1 text-orange-1 rounded-md font-semibold">
                  This is your own book.
                </p>
              ) : exchangeRequest ? (
                <span
                  className={`py-2 px-4 w-fit rounded-md font-semibold ${
                    exchangeRequest.status === "accepted"
                      ? "bg-green-100 text-green-600"
                      : exchangeRequest.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-orange-1"
                  }`}
                >
                  Request Status:{" "}
                  {exchangeRequest.status.charAt(0).toUpperCase() +
                    exchangeRequest.status.slice(1)}
                </span>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="w-fit px-6 py-2 bg-orange-1 text-white-1 rounded font-semibold"
                >
                  Send Exchange Request
                </button>
              )}
            </article>
          </div>
          {currentUser?.user._id === book?.owner?._id && (
            <ActionButtons
              bookId={book?._id as string}
              showActions={showActions}
              setShowActions={setShowActions}
              handleDeleteBook={handleDeleteBook}
            />
          )}
        </section>
        <p className="text-white-2">{book?.description}</p>
        {showModal && (
          <BookSelectionModal
            onClose={() => setShowModal(false)}
            onBookSelect={(book) => setSelectedBook(book)}
            onSubmit={handleSendExchangeRequest}
          />
        )}
      </section>
    </main>
  );
};

export default BookDetails;
