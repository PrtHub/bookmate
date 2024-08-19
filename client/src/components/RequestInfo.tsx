import { Link } from "react-router-dom";

interface RequestInfoProps {
  user1: string;
  user2: string;
  bookId1: string;
  bookId2: string;
  title1: string;
  title2: string;
}

const RequestInfo = ({
  bookId1,
  bookId2,
  title1,
  title2,
  user1,
  user2,
}: RequestInfoProps) => {
  return (
    <p className="text-secondary font-semibold text-white-2">
      <span className="capitalize text-white-1 font-bold">{user1}</span> offered{" "}
      <Link to={`/book/${bookId1}`} className="font-bold text-orange-1">
        "{title1}"
      </Link>{" "}
      for{" "}
      <Link to={`/book/${bookId2}`} className="font-bold text-orange-1">
        {" "}
        "{title2}"
      </Link>{" "}
      to <span className="capitalize text-white-1 font-bold">{user2}</span>
    </p>
  );
};

export default RequestInfo;
