import React, { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const CategoriaContext = createContext({});

CategoriaContextProvider.propTypes = {
  children: PropTypes.node,
};

export function CategoriaContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]); // Corrigindo a inicialização
  const token = sessionStorage.getItem("token");

  // Função para buscar todas as categorias
  const getCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }
  
      const response = await axios.get("http://localhost:3000/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setCategorias(response.data);
      return response.data; // Retorne os dados para serem usados fora
    } catch (err) {
      setError(err.message || "Erro ao buscar categorias.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);


  // Buscar categorias ao carregar o contexto
  useEffect(() => {
    if (token) {
      getCategorias();
    }
  }, [token, getCategorias]);


  const getCategoriaByID = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }

      const response = await axios.get(`http://localhost:3000/categorias/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategorias(response.data);
      return response.data; // Retorne os dados para serem usados fora
    } catch (err) {
      setError(err.message || "Erro ao buscar categorias.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);



  // Adicionar uma nova categoria
  const addCategoria = async (nome) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }

      const response = await axios.post(
        "http://localhost:3000/categorias",
        { nome },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setCategorias((prev) => [...prev, response.data]); // Adiciona ao estado
      }
    } catch (err) {
      console.error("Erro ao adicionar categoria:", err.message);
      setError(err.message || "Erro ao adicionar categoria.");
    } finally {
      setLoading(false);
    }
  };

  // Deletar uma categoria por ID
  const deleteCategoria = async (id) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Você não está autenticado!");
      }

      await axios.delete(`http://localhost:3000/categorias/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategorias((prev) => prev.filter((categoria) => categoria.id !== id));
    } catch (err) {
      console.error("Erro ao deletar categoria:", err.message);
      setError(err.message || "Erro ao deletar categoria.");
    } finally {
      setLoading(false);
    }
  };

  const categoriaContextValue = {
    categorias,
    loading,
    error,
    getCategorias,
    getCategoriaByID, 
    addCategoria,
    deleteCategoria,
  };

  return (
    <CategoriaContext.Provider value={categoriaContextValue}>
      {children}
    </CategoriaContext.Provider>
  );
}
