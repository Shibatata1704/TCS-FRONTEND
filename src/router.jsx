import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/users/Auth/Login"
import Register from "./pages/users/Auth/Register"
import UserProfile from "./pages/users/User/UserProfile";
import Categorias from "./pages/categories/Categorias";
import ShowCategoria from "./pages/categories/ShowCategoria";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/usuarios/:email",
    element: <UserProfile />,
  },
  {
    path: "/categorias",
    element: <Categorias />,
  },
  {
    path: "/categorias/:id", // Define diretamente a rota para /categorias/:id
    element: <ShowCategoria />, // Rendeiriza o componente ShowCategoria
  },
]);

export default router;