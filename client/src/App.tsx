import "./App.css";
import Layout from "./Layout";
import Explore from "./pages/Explore";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBooks from "./pages/MyBooks";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import ExchangeRequests from "./pages/ExchangeRequests";
import BookDetails from "./pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Explore />,
      },
      {
        path: "/my-books",
        element: <ProtectedRoute element={<MyBooks />} />,
      },
      {
        path: "/add-book",
        element: <ProtectedRoute element={<AddBook />} />,
      },
      {
        path: "/edit-book/:id",
        element: <ProtectedRoute element={<EditBook />} />,
      },
      {
        path: "/book/:id",
        element: <ProtectedRoute element={<BookDetails />} />,
      },
      {
        path: "/exchange-requests",
        element: <ProtectedRoute element={<ExchangeRequests />} />,
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
