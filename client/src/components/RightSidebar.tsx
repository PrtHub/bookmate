import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const genres = [
  "Fiction",
  "Non-fiction",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "History",
];

const RightSidebar = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <section className="lg:w-48 h-full bg-black-1 fixed top-0 right-0 pl-5 lg:pr-10 overflow-y-scroll custom-scrollbar hidden lg:flex flex-col items-start z-50">
      <div className="lg:block hidden pt-7">
        {currentUser ? (
          <section className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-1 flex items-center justify-center">
              <span className="text-white-1 font-bold text-lg">
                {currentUser.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="capitalize font-semibold">
              {currentUser.user.name}
            </span>
          </section>
        ) : (
          <Link
            to="/login"
            className="px-6 py-2 bg-orange-1 text-white-1 rounded font-semibold"
          >
            Log in
          </Link>
        )}
      </div>
      <section className="w-full flex flex-col gap-y-5 mt-[90px]">
        <h3 className="text-xl font-bold text-white">Top Genres</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="bg-black-2 text-white-1 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition"
            >
              {genre}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
