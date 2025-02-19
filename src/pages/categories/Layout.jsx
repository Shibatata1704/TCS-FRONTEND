import { Link, Outlet, useLocation } from "react-router-dom";

export default function CategoriasLayout() {
  const { pathname } = useLocation()
  const admin = sessionStorage.getItem("admin") === "1" || JSON.parse(sessionStorage.getItem("admin") || "false");
  return (
    <main>
      <h1>Lista de Categorias</h1>
      <div className="tabs">
        <Link to="/categorias" className={`tab ${pathname === "/categorias" ? "active" : ""}`}>Todas as Categorias</Link>
        {admin && (
          <Link
            to="/categorias/new"
            className={`tab ${pathname === "/categorias/new" ? "active" : ""}`}
          >
            Nova Categoria
          </Link>
        )}
      </div>
      <Outlet />
    </main>
  )
}