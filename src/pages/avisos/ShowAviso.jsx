import { useParams, useLocation } from "react-router-dom";
import useAviso from "../../hooks/useAviso";
import { useEffect, useState } from "react";
import AvisoForm from "../../components/avisos/AvisoForm"

export default function ShowAviso() {
  const { id } = useParams();
  const { state } = useLocation();
  const idCategoria = state?.idCategoria;
  const { getAvisosByIDCategoria } = useAviso();
  const [aviso, setAviso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvisos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Faz a requisição para obter todos os avisos
        const todosAvisos = await getAvisosByIDCategoria(idCategoria);
        console.log("Todos os avisos:", todosAvisos); // Para depuração

        // Filtra o aviso específico pelo ID
        const avisoSelecionado = todosAvisos.find(
          aviso => aviso.id === parseInt(id)
        );

        setAviso(avisoSelecionado);
      } catch (err) {
        console.error("Erro ao buscar avisos:", err);
        setError("Erro ao carregar aviso.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvisos();
  }, [id, getAvisosByIDCategoria]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!aviso) {
    return <p>Aviso não encontrado.</p>;
  }

  return (
    <>
        <AvisoForm avisoToUpdate={aviso} />
    </>
    );
}