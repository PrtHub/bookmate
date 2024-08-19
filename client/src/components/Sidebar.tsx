import { Link, useLocation } from "react-router-dom";
import { sidebarlinks } from "../lib/constants";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { removeUser } from "../store/userSlice";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleLogout = () => {
    try {
      dispatch(removeUser());
      localStorage.removeItem("swap_token");
      toast.success("Logged out!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="lg:w-64 w-fit h-full bg-black-1 fixed top-0 left-0 pt-36 pl-5 lg:pl-10 overflow-y-scroll hidden sm:flex flex-col justify-between items-start">
      <div className="w-full flex flex-col gap-6">
        {sidebarlinks.map(({ label, route, icon: Icon }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              to={route}
              key={label}
              className={`flex gap-3 items-center py-4 max-lg:px-4 justify-center md:justify-start
               ${isActive && "bg-nav-focus border-r-4 border-orange-1"}
              
            `}
            >
              <Icon width={24} height={24} className="opacity-75" />
              <p className="font-medium text-base opacity-75 max-lg:hidden">
                {label}
              </p>
            </Link>
          );
        })}
      </div>
      {currentUser && (
        <div className="w-full pr-5 pb-5 mt-16">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white-1 rounded font-semibold flex items-center gap-2"
          >
            <LogOut className="opacity-75" />{" "}
            <span className="font-medium text-base opacity-75 max-lg:hidden">
              Log out
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
