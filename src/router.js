import { createBrowserRouter } from "react-router-dom";
import Collection from "./routes/Collection";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Item from "./routes/Item";
import Login from "./routes/Login";
import Register from "./routes/Register";
import UserAccount from "./routes/UserAccount";
import AdminPanel from "./routes/AdminPanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-panel",
    element: <AdminPanel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:username",
    element: <UserAccount />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections/:collectionId",
    element: <Collection />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/items/:itemId",
    element: <Item />,
    errorElement: <ErrorPage />,
  },
]);

//"http://localhost:4000"

export default router;
