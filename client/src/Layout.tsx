import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";

const Layout = () => {
  return (
    <main className="relative flex flex-1 flex-col text-white-1">
      <Navbar />
      <section className="relative flex">
        <Sidebar />
        <div className="w-full min-h-screen pl-5 sm:pl-32 lg:pl-72 pr-5 sm:pr-10 lg:pr-56 pt-36 pb-10">
          <Outlet />
        </div>
        <RightSidebar />
      </section>
    </main>
  );
};

export default Layout;
