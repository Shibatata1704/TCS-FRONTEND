import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useCategoria from "../../hooks/useCategoria";

export default function CategoriasTable() {
  const { getCategorias, deleteCategoria, loading, error } = useCategoria();
  const [categorias, setCategorias] = useState([]); // Estado local para armazenar categorias
  const admin = sessionStorage.getItem("admin") === "1" || sessionStorage.getItem("admin") === true;
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

  const handleDelete = async (id, nome) => {
    try {
      if (confirm(`Tem certeza que deseja excluir ${nome}?`)) {
        await deleteCategoria(id); // Chama a função de exclusão
        setCategorias((prevCategorias) =>
          prevCategorias.filter((categoria) => categoria.id !== id) // Atualiza o estado local
        );
        alert("Categoria excluída com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao excluir a categoria:", error);
      alert("Erro ao excluir a categoria. Tente novamente.");
    }
  };

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
    <>
      <table>
        <thead>
          <tr>
            {admin && (
              <>
                <th>ID</th></>
            )}
            <th>Nome</th>
            {admin && (
              <>
                <th>Ações</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              {admin && (
                <>
                  <td>{categoria.id}</td>
                </>
              )}
              <td>{categoria.nome}</td>
              <td>
                {admin && (
                  <>
                    <Link
                      to={`/categorias/${categoria.id}`}
                      className="button is-primary is-small"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(categoria.id, categoria.nome)} // Passa o ID da categoria
                      className="button is-danger is-small"
                    >
                      Excluir
                    </button>
                  </>
                )}
              </td>
              {/* <td>
                <Link
                  to={`/categorias/${categoria.id}`}
                  className="button is-primary is-small"
                >
                  Editar
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(categoria.id, categoria.nome)} // Passa o ID da categoria
                  className="button is-danger is-small"
                >
                  Excluir
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}