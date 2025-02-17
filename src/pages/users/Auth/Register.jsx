import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { API_ROUTES } from "../../../apiRoutes";

export default function Register() {
  const ip = localStorage.getItem("ip") 
  const porta = localStorage.getItem("porta")
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: ""
  });
  const inputRef = useRef(null);

  // Função para atualizar o estado do formulário com os valores dos campos
  const handleChange = (ev) => {
    setUser((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value // Corrigido o erro aqui: [ev.target.name] e não [ev.target.o]
    }));
  };

  // Função para enviar os dados do formulário para a API
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post(`http://${ip}:${porta}/usuarios`, {
        nome: user.nome,
        email: user.email,
        senha: user.senha
      });
  
      console.log(response); // Verifique a resposta da API no console
  
      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login"); // Redireciona para o login
      } else {
        alert("Erro no cadastro. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao enviar os dados:", err.response || err); // Exibe a resposta de erro
      alert("Erro ao conectar com o servidor. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <header>
          <h1>CADASTRO DE USUÁRIO</h1>
        </header>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            required
            ref={inputRef}
            value={user.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password" 
            name="senha"
            id="senha"
            required
            value={user.senha}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="button is-primary is-large">
        Cadastrar
      </button>
      <button
        onClick={() => navigate('/login')}
        className="button is-primary is-large"
      >
        Já tenho uma conta. Fazer Login
      </button>
    </form>
  );
}
