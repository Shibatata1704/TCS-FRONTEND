import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { API_ROUTES } from "../../../apiRoutes";
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const utf = 'http://localhost:3000';  // Or from an environment variable like process.env.REACT_APP_BASE_URL
    const loginUrl = `${utf}/login`;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        senha: ""
    });
    const inputRef = useRef(null);

    const handleChange = (ev) => {
        setUser(prevState => ({
            ...prevState,
            [ev.target.name]: ev.target.value
        }));
    };


    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log(user)
        try {

            const response = await axios.post('http://localhost:3000/login', user);

            // Sucesso: verificar a resposta da API
            if (response.status === 200) {
                const data = response.data;
                const token = data.token;

                 // Exemplo de armazenamento de token
                const decodedToken = jwtDecode(token);
                console.log("Dados do payload:", decodedToken);
                sessionStorage.setItem('token', token.trim());
                sessionStorage.setItem('email', decodedToken.email);
                sessionStorage.setItem('admin', decodedToken.admin);
                // Redirecionar o usuário para uma nova página
                navigate("/"); // Exemplo: página de painel ou home após login bem-sucedido

                alert("Login bem-sucedido!"); // Mensagem de sucesso
            } else {

                alert("Credenciais inválidas. Tente novamente.");
            }
        } catch (err) {
            console.error(err);
            // Exibir erro no caso de falha na requisição
            alert("Erro ao conectar com o servidor. Tente novamente.");
        } finally {
            // Focar no campo de email após a tentativa de login
            inputRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <header>
                    <h1>LOGIN DE USUARIO</h1>
                </header>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        ref={inputRef}
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
                Logar
            </button>
            <button
                onClick={() => navigate('/register')}
                className="button is-primary is-large"
            >
                Cadastrar-se
            </button>
        </form>
    );
}
