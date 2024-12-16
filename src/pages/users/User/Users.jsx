import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header>
        <Link to="/" className="logo">TCS</Link>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/usuarios/${email}">Perfil</Link>
        </nav>
      </header>
      <div>
        <h3>FUTUROS DADOS</h3>
      </div>
      <footer>
        Feito com React e React Router!
      </footer>
    </>
  )
}