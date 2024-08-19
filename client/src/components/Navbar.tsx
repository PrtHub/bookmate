import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <nav className="bg-black-1 h-20 w-full flex-1 flex justify-between items-center z-50 fixed top-0 px-5 sm:px-10">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Book<span className="text-orange-1">Mate</span>
      </h1>
      <div className="lg:hidden block">
        {currentUser ? (
          <section className="flex items-center gap-2">
            <div className="sm:size-10 size-9 rounded-full bg-orange-1 flex items-center justify-center">
              <span className="text-white-1 font-bold text-base sm:text-lg">
                {currentUser.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="capitalize font-semibold sm:block hidden">
              {currentUser.user.name}
            </span>
            <span
              className="sm:hidden block cursor-pointer"
              onClick={() => setIsMobileNavOpen(true)}
            >
              <Menu size={25} />
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

      <div
        className={`fixed inset-0 bg-black-1/50 z-40 transition-opacity duration-300 ${
          isMobileNavOpen ? "opacity-100" : "opacity-0"
        } ${isMobileNavOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={() => setIsMobileNavOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 w-60 h-full bg-black-1 z-50 flex flex-col justify-between transition-transform transform duration-300 ease-in-out ${
          isMobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isMobileNavOpen && (
          <MobileMenu onClose={() => setIsMobileNavOpen(false)} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
