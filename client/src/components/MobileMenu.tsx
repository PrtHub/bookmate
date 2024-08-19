import { Link, useLocation } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { sidebarlinks } from "../lib/constants";
import { removeUser } from "../store/userSlice";
import toast from "react-hot-toast";

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
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
    <div className="fixed top-0 right-0 w-60 h-full bg-black-1 z-50 flex flex-col justify-between transition-transform transform duration-300 ease-in-out translate-x-0">
      <button onClick={onClose} className="text-white absolute right-4 top-4">
        <X size={24} />
      </button>

      <div className="w-full flex flex-col gap-6 mt-20">
        {sidebarlinks.map(({ label, route, icon: Icon }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              to={route}
              key={label}
              className={`flex gap-3 items-center py-4 px-4 justify-start
               ${isActive && "bg-nav-focus border-l-4 border-orange-1"}
              
            `}
            >
              <Icon width={24} height={24} className="opacity-75" />
              <p className="font-medium text-base opacity-75">{label}</p>
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
            <span className="font-medium text-base opacity-75">Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
