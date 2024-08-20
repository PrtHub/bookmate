import { useEffect, useState } from "react";
import { getMatches } from "../lib/actions/book.action";
import { Link } from "react-router-dom";

interface Match {
  bookOwnedByOther: {
    _id: string;
    title: string;
    description: string;
    owner: {
      _id: string;
      name: string;
      email: string;
    };
  };
  bookOwnedByUser: {
    _id: string;
    title: string;
    description: string;
  };
}

const MatchMaking = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      }
    };

    fetchMatches();
  }, []);

  console.log(matches);

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-white-1">
        Potential Matches
      </h2>
      {matches.length === 0 ? (
        <p className="text-gray-500">No potential matches found.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={`${match.bookOwnedByUser._id}-${match.bookOwnedByOther._id}`}
              className="p-4 bg-black-1 shadow-md rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-y-5 md:gap-x-10"
            >
              <section className="mb-4 md:mb-0">
                <p className="text-secondary font-semibold text-white-2">
                  <span className="capitalize text-white-1 font-bold">You</span>{" "}
                  own{" "}
                  <Link
                    to={`/book/${match.bookOwnedByUser._id}`}
                    className="font-bold text-orange-1"
                  >
                    "{match.bookOwnedByUser.title}"
                  </Link>{" "}
                  which{" "}
                  <span className="capitalize text-white-1 font-bold">
                    {match.bookOwnedByOther.owner.name}
                  </span>{" "}
                  wants. In return,{" "}
                  <span className="capitalize text-white-1">
                    {match.bookOwnedByOther.owner.name}
                  </span>{" "}
                  own{" "}
                  <Link
                    to={`/book/${match.bookOwnedByOther._id}`}
                    className="font-bold text-orange-1"
                  >
                    "{match.bookOwnedByOther.title}"
                  </Link>
                  .
                </p>
              </section>
              <Link
                to={`/book/${match.bookOwnedByOther._id}`}
                className="bg-orange-1 px-4 py-2 rounded whitespace-nowrap font-semibold"
              >
                Send Request
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MatchMaking;
