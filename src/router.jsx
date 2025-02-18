import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/users/Auth/Login"
import Register from "./pages/users/Auth/Register"
import UserProfile from "./pages/users/User/UserProfile";
import Categorias from "./pages/categories/Categorias";
import ShowCategoria from "./pages/categories/ShowCategoria";
import CategoriasLayout from "./pages/categories/Layout";
import CreateCategoria from "./pages/categories/CreateCategoria";
import RootLayout from "./pages/RootLayout";
import Users from "./pages/users/User/Users";
import CreateAviso from "./pages/avisos/CreateAviso";
import Avisos from "./pages/avisos/Avisos";
import ShowAviso from "./pages/avisos/ShowAviso";
import IP from "./components/ConfigIpPort"

const router = createBrowserRouter([{
  path: "/",
  element: <RootLayout />,
  children: [
    { index: true, element: <Home /> },
    {
      path: "categorias",
      element: <CategoriasLayout />,
      children: [
        { index: true, element: <Categorias /> },
        { path: "new", element: <CreateCategoria /> },
        { path: ":id", element: <ShowCategoria /> },
      ]
    },
    {
      path: "usuarios/:email",
      element: <UserProfile />,
    },
    {
      path: "avisos",
      // element: <ShowAvisos/>,
      children: [
        { index: true, element: <Avisos /> },
        { path: "new", element: <CreateAviso /> },
        { path: ":id", element: <ShowAviso /> },
      ]
    },
  ]},
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/ip",
    element: <IP />,
  },
  // {
  //   path: "/usuarios/:email",
  //   element: <UserProfile />,
  // },
  // {
  //   path: "/",
  //   element: <Home />
  // },
  // {
  //   path: "/login",
  //   element: <Login />
  // },
  // {
  //   path: "/register",
  //   element: <Register />
  // },
  // {
  //   path: "/usuarios/:email",
  //   element: <UserProefile />,
  // },
  // {
  //   path: "categorias",
  //   element: <CategoriasLayout />,
  //   children: [
  //     { index: true, element: <Categorias/> },
  //     { path: "new", element: <CreateCategoria /> },
  //     { path: ":id", element: <ShowCategoria/> },
  //   ]
  // },
  // {
  //   path: "/categorias/:id", // Define diretamente a rota para /categorias/:id
  //   element: <ShowCategoria />, // Rendeiriza o componente ShowCategoria
  // },
]);



export default router;