import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import useUser from "../hooks/useUser"; // Certifique-se de que esta função está implementada corretamente

UserForm.propTypes = {
  userToUpdate: PropTypes.object,
};

export default function UserForm({ userToUpdate }) {
  // Inicializa o estado com um objeto vazio caso userToUpdate seja undefined
  const [user, setUser] = useState(userToUpdate || { email: '', senha: '', nome: '' });
  const { updateUser } = useUser();
  const inputRef = useRef(null);

  // Atualiza o estado do usuário quando o prop userToUpdate mudar
  useEffect(() => {
    if (userToUpdate) {
      setUser(userToUpdate);
    }
  }, [userToUpdate]);

  const handleChange = (ev) => {
    setUser((current) => ({ ...current, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      console.log("Enviando dados para o backend:", user);  // Verifique os dados antes de enviar

      // Chama a função para atualizar o usuário no backend
      await updateUser(user);  
      
      alert("Usuário atualizado com sucesso!");
    } catch (err) {
      console.log("Erro ao atualizar o usuário:", err.message);
      alert("Ocorreu um erro.");
    } finally {
      inputRef.current.focus();  // Garante que o foco vá para o campo de email
    }
  };

  return (
    <>
      <h2>Perfil do {user.nome}</h2>
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            ref={inputRef}
            value={user.email || ''}  // Garante que não ocorra erro de undefined
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="text"
            name="senha"
            id="senha"
            required
            value={user.senha || ''}  // Garante que não ocorra erro de undefined
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            required
            value={user.nome || ''}  // Garante que não ocorra erro de undefined
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="button is-primary is-large">Editar</button>
    </form>
    </>
  );
}