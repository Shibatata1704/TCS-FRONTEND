import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export default function RootLayout() {
  const email = sessionStorage.getItem('email')
  const token = sessionStorage.getItem('token')

  const handleLogout = async () => {
    try {
      console.log(token)
      // Envia o token para a API de logout
      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.post(
        "http://localhost:3000/logout", // Substitua pela sua URL de logout
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho Authorization
          },
        }
      );

      if (response.status === 200) {
        // Logout bem-sucedido, redireciona ou faz algo
        alert("Deslogado com sucesso");
        sessionStorage.removeItem("token"); // Remove o token do sessionStorage
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("admin");
        window.location.href = "/login"; // Ou redireciona para outra página
      }
    } catch (error) {
      console.error("Erro ao desconectar:", error);
      alert("Erro ao desconectar. Tente novamente.");
    }
  };

  return (
    <>
      <header>
        <Link to="/" className="logo">TCS</Link>
        <nav>
          <Link to="/">Início</Link>
          {email ? <Link to={`/usuarios/${email}`}>Perfil</Link> : <Link to="/login">Login</Link>}
          {<Link to="/categorias">Categorias</Link>}
        </nav>
        <button
          onClick={(handleLogout)}
          className="button is-primary is-large"
        >
          Deslogar
        </button>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  )
}