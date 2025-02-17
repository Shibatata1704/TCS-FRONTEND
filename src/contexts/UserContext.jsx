import React, { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_ROUTES } from "../apiRoutes";
import { jwtDecode } from "jwt-decode";


export const UserContext = createContext({});

UserContextProvider.propTypes = {
  children: PropTypes.node,
};

export function UserContextProvider({ children }) {
  const ip = localStorage.getItem("ip") 
  const porta = localStorage.getItem("porta")
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

   // Verifique se o token está lá
 
  // Busca um único usuário pelo email
  const getUserByEmail = useCallback(async (email) => {
    const token = sessionStorage.getItem('token')
    // Verifique se o token está lá

 // Incluímos o 'email' como parâmetro
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        alert('Você não está autenticado!');
        return;
      }
      const response = await axios.get(`http://${ip}:${porta}/usuarios/${email}`, {
        headers: {
          Authorization: `Bearer ${token}` // Envia o token no header
        }
      });
      setUser(response.data); // Acesse os dados da resposta com 'response.data'
      return response.data; // Retorne os dados do usuário
    } catch (err) {
      setError(err.message || "Erro ao buscar usuário.");
      return null; // Retorne null em caso de erro
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (!email) return; // If email is not present in sessionStorage, do nothing

    const fetchUser = async () => {
      const fetchedUser = await getUserByEmail(email);
      if (fetchedUser) {
        setUser(fetchedUser); // Set the user only if it was successfully fetched
      }
    };

    fetchUser();
  }, [getUserByEmail]);
  // Atualiza o usuário



  const updateUser = async (user) => {
    try {
      const token = sessionStorage.getItem('token')
      if (!token) {
        alert('Você não está autenticado!');
        return;
      }
      const email = user.email; // Email é usado para identificar o usuário a ser atualizado
      const response = await axios.put(`http://${ip}:${porta}/usuarios/${email}`, user, {
        headers: {
          Authorization: `Bearer ${token}` // Envia o token no header
        }
      });
      console.log("Resposta da atualização:", response.data);  // Verifique o que vem de resposta
      return response.data;  // Retorna os dados do usuário atualizado
    } catch (err) {
      console.error("Erro ao atualizar o usuário:", err.message);
      throw err;  // Lança o erro para ser tratado no componente
    }
  };

  // Remove o usuário
  const deleteUser = async (email) => {
    const token = sessionStorage.getItem('token')
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://${ip}:${porta}/usuarios/${email}`, {
        headers: {
          Authorization: `Bearer ${token}` // Envia o token no header
        }
      });
      setUser(null); // Remove o usuário do estado
    } catch (err) {
      setError(err.message || "Erro ao deletar usuário.");
    } finally {
      setLoading(false);
    }
  };

  const userContextValue = {
    user,
    loading,
    error,
    getUserByEmail,
    updateUser,
    deleteUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

