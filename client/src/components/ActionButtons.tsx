import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionButtonsProps {
  bookId: string;
  showActions: boolean;
  setShowActions: (value: boolean) => void;
  handleDeleteBook: () => void;
}

const ActionButtons = ({
  bookId,
  handleDeleteBook,
  setShowActions,
  showActions,
}: ActionButtonsProps) => {
  return (
    <section className="relative">
      <EllipsisVertical
        onClick={() => setShowActions(!showActions)}
        className="text-white-2 cursor-pointer"
      />
      {showActions && (
        <div className="bg-black-1 text-white-2 flex flex-col items-start gap-4 p-5 rounded absolute top-6 right-2">
          <Link
            to={`/edit-book/${bookId}`}
            className="flex items-center gap-2 font-semibold text-sm"
          >
            <PencilLine className="size-4" />
            Edit
          </Link>
          <button
            onClick={handleDeleteBook}
            className="flex items-center gap-2 font-semibold text-sm"
          >
            <Trash2 className="size-4" />
            Delete
          </button>
        </div>
      )}
    </section>
  );
};

export default ActionButtons;
