// -React-
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// -Pages-
import {
  Admin,
  Dashboard,
  Landing,
  Login,
  Profile,
  Register,
  Support,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/support",
    element: <Support />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
