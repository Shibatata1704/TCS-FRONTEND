import { useParams } from "react-router-dom"
import useCategoria from "../../hooks/useCategoria"
import CategoriaForm from "../../components/categories/CategoriaForm"
import { useEffect, useState } from "react";

export default function ShowCategoria() {
  const { getCategoriaByID } = useCategoria()
  const { id } = useParams()
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  const token = sessionStorage.getItem('token')
  useEffect(() => {
      // Executa apenas quando o token e o email estão disponíveis
      if (!token) return; 
  
      const fetchCategoria = async () => {
        setLoading(true);
        setError(null);
        try {
          const categoria = await getCategoriaByID(id);
          console.log("Resposta da API:", categoria); // Depuração
          setCategoria(categoria); // Atualiza o estado com o usuário
        } catch (err) {
          setError("Erro ao carregar usuário.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategoria();
    }, [token, id, getCategoriaByID]);
  
    if (categoria) {
      console.log("DADOS DO USUARIO", categoria);  // Verifique se os dados de 'user' estão no formato correto
    }
  
    if (loading) {
      return <p>Carregando...</p>;
    }
    
    if (error) {
      return <p>{error}</p>;
    }
    
    if (!categoria) {
      return <p>Usuário não encontrado.</p>;
    }
    
  return (
    <>
      <CategoriaForm categoriaToUpdate={categoria} />
    </>
  )
}