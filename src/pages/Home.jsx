import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {

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
        <button
                onClick={(handleLogout)}
                className="button is-primary is-large"
            >
                Deslogar
            </button>
        <nav>
          <Link to="/">Início</Link>
          {email ? <Link to={`/usuarios/${email}`}>Perfil</Link> : <Link to="/login">Login</Link>}
          {<Link to="/categorias">Categorias</Link>}
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