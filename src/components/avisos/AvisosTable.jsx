import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAviso from "../../hooks/useAviso";
import useCategoria from "../../hooks/useCategoria";

export default function AvisosTable() {
    const { loading, error } = useAviso();
    const [avisos, setAvisos] = useState([]); // Armazena os avisos filtrados
    const [idCategoria, setIdCategoria] = useState(''); // Armazena o ID da categoria selecionada
    const [categorias, setCategorias] = useState([]); // Armazena as categorias para o select
    const { getCategorias } = useCategoria();
    const { getAvisosByIDCategoria, deleteAviso } = useAviso();
    const admin = sessionStorage.getItem("admin") === "1" || sessionStorage.getItem("admin") === true;
    const token = sessionStorage.getItem('token');

    // Fetch categorias on mount
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data || []); // Garante que categorias será sempre um array
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            }
        };
        fetchCategorias();
    }, [getCategorias]);

    // Atualiza o estado com o valor selecionado
    const handleChange = (ev) => {
        setIdCategoria(ev.target.value);
    };

    // Busca avisos ao enviar o formulário
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log(idCategoria)
        try {
            const data = await getAvisosByIDCategoria(idCategoria); // Usa o ID da categoria selecionada
            console.log(data)
            // Verifica o tipo de retorno e transforma em array se necessário
            if (data) {
                setAvisos(Array.isArray(data) ? data : [data]);
            } else {
                setAvisos([]); // Define como array vazio se não houver dados
            } // Garante que avisos será sempre um array
        } catch (err) {
            console.log(err.message);
            alert("Ocorreu um erro ao carregar os avisos.");
        }
    };

    // Exclui um aviso
    const handleDelete = async (id, nome) => {
        try {
            if (confirm(`Tem certeza que deseja excluir ${nome}?`)) {
                await deleteAviso(id);
                setAvisos((prevAvisos) =>
                    prevAvisos.filter((aviso) => aviso.id !== id)
                );
                alert("Aviso excluído com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao excluir o aviso:", error);
            alert("Erro ao excluir o aviso. Tente novamente.");
        }
    };

    // Verificações de loading e error
    if (loading) {
        return <p>Carregando Avisos...</p>;
    }

    if (error) {
        return <p>Erro ao carregar Avisos: {error}</p>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idCategoria">Categoria:</label>
                    <select
                        id="idCategoria"
                        name="idCategoria"
                        value={idCategoria} // Agora está usando o estado correto
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma categoria</option>
                        {Array.isArray(categorias) && categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="button is-primary is-large">Buscar</button>
                <Link
                    to={`/avisos/new`}
                    className="button is-primary is-small"
                >
                    Adicionar
                </Link>
            </form>



            <table>
                <thead>
                    <tr>
                        {admin && (
                            <>
                                <th>ID</th>
                            </>
                        )}
                        <th>Descrição</th>
                        {admin && (
                            <>
                                <th>Ações</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(avisos) && avisos.map((aviso) => (
                        <tr key={aviso.id}>
                            {admin && (
                                <>
                                    <td>{aviso.id}</td>
                                </>
                            )}
                            <td>{aviso.descricao}</td>
                            <td>
                                {admin && (
                                    <>
                                        <Link
                                            to={`/avisos/${aviso.id}`}
                                            state={{ idCategoria }}
                                            className="button is-primary is-small"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(aviso.id, aviso.descricao)}
                                            className="button is-danger is-small"
                                        >
                                            Excluir
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
