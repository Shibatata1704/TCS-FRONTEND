import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useCategoria from "../../hooks/useCategoria";

export default function CategoriasTable() {
  const { getCategorias, loading, error } = useCategoria();
  const [categorias, setCategorias] = useState([]); // Estado local para armazenar categorias
  
  // Chama getCategorias e salva o retorno em 'categorias'
  useEffect(() => {
    async function fetchCategorias() {
      const data = await getCategorias(); // Função assíncrona corretamente chamada dentro do useEffect
      if (data) {
        setCategorias(data); // Atualizando o estado depois da chamada
      }
    }
    
    // Chama fetchCategorias apenas quando o getCategorias muda
    fetchCategorias();
  }, [getCategorias]); 
  
  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  if (error) {
    return <p>Erro ao carregar categorias: {error}</p>;
  }

  if (!categorias || categorias.length === 0) {
    return <p>Nenhuma categoria encontrada.</p>;
  }
  console.log("Categorias recebidas:", categorias);
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <tr key={categoria.id}>
            <td>{categoria.id}</td>
            <td>{categoria.nome}</td>
            <td>
              <Link
                to={`/categorias/${categoria.id}`}
                className="button is-primary is-small"
              >
                Ver
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}