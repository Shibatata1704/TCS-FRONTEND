import React, { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AvisoContext = createContext({});

AvisoContextProvider.propTypes = {
  children: PropTypes.node,
};

export function AvisoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avisos, setAvisos] = useState([]); // Corrigindo a inicialização
  const token = sessionStorage.getItem("token");

  // Função para buscar todas as avisos
  const getAvisos = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }
  
      const response = await axios.get("http://localhost:3000/avisos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvisos(response.data);
      return response.data; // Retorne os dados para serem usados fora
    } catch (err) {
      setError(err.message || "Erro ao buscar avisos.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);


  // Buscar avisos ao carregar o contexto
  // useEffect(() => {
  //   if (token) {
  //     getAvisos();
  //   }
  // }, [token, getAvisos]);


  const getAvisoByID = useCallback(async (id) => {
    setLoading(true);
    setError(null);
  
    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }
  
      const response = await axios.get(`http://localhost:3000/avisos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvisos(response.data); // Acesse os dados da resposta com 'response.data'
      return response.data; // Apenas retorna os dados sem chamar `setAvisos`
    } catch (err) {
      console.error("Erro ao buscar aviso:", err.message);
      setError(err.message || "Erro ao buscar aviso.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);



  // Adicionar uma nova aviso
  const addAviso = async (aviso) => {
    console.log(aviso)

    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }

      const response = await axios.post(
        "http://localhost:3000/avisos",
        aviso,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setAvisos((prev) => [...prev, response.data]); // Adiciona ao estado
      }
    } catch (err) {
      console.error("Erro ao adicionar aviso:", err.message);
      setError(err.message || "Erro ao adicionar aviso.");
    } finally {
      setLoading(false);
    }
  };

  const updateAviso = async (aviso) => {
    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }
      const id = aviso.id
      const response = await axios.put(
        `http://localhost:3000/avisos/${id}`,
        aviso,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // setAvisos((prev) =>
      //   prev.map((aviso) =>
      //     aviso.id === id ? response.data : aviso
      //   )
      // );
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.error("Erro ao editar aviso:", err.message);
      setError(err.message || "Erro ao editar aviso.");
    } finally {
      setLoading(false);
    }
  };

  // Deletar uma aviso por ID
  const deleteAviso = async (id) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }

      await axios.delete(`http://localhost:3000/avisos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAvisos((prev) => prev.filter((aviso) => aviso.id !== id));
    } catch (err) {
      console.error("Erro ao deletar aviso:", err.message);
      setError(err.message || "Erro ao deletar aviso.");
    } finally {
      setLoading(false);
    }
  };

  const avisoContextValue = {
    avisos,
    loading,
    error,
    getAvisos,
    getAvisoByID, 
    addAviso,
    updateAviso,
    deleteAviso,
  };

  return (
    <AvisoContext.Provider value={avisoContextValue}>
      {children}
    </AvisoContext.Provider>
  );
}
