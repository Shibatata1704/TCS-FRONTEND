import PropTypes from "prop-types"
import { useRef, useState, useEffect } from "react"
import useAviso from "../../hooks/useAviso"
import { useParams } from "react-router-dom";
import useCategoria from "../../hooks/useCategoria";


AvisoForm.propTypes = {
    avisoToUpdate: PropTypes.object
}

export default function AvisoForm({ avisoToUpdate }) {
    const defaultAviso = {
        descricao: "",
        categoria: "",
    }

    const { id } = useParams();
    const [aviso, setAviso] = useState(avisoToUpdate || defaultAviso)
    const [categorias, setCategorias] = useState([]);
    const { addAviso, updateAviso, getAvisoByID } = useAviso()
    const { getCategorias } = useCategoria()
    const inputRef = useRef(null)
    // useEffect(() => {
    //   const fetchAviso = async () => {
    //     const data = await getAvisoByID(id);
    //     setAviso(data);
    //   };

    //   fetchAviso();
    // }, [id, getAvisoByID]);

    useEffect(() => {
        // Fetch categorias on mount
        const fetchCategorias = async () => {
            const data = await getCategorias();
            setCategorias(data || []); // Default to empty array if data is null
        };

        fetchCategorias();
    }, [getCategorias]);

    useEffect(() => {
        if (avisoToUpdate) {
            setAviso(avisoToUpdate);
        }
    }, [avisoToUpdate]);

    const handleChange = (ev) => {
        setAviso((current) => ({ ...current, [ev.target.name]: ev.target.value }))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        console.log(aviso)
        try {
            if (avisoToUpdate) {
                updateAviso(aviso)
                alert("Aviso atualizado com sucesso!")
            } else {
                addAviso(aviso)
                setAviso(defaultAviso)
                alert("Aviso cadastrado com sucesso!")
            }
        } catch (err) {
            console.log(err.message)
            alert("Ocorreu um erro.")
        } finally {
            inputRef.current.focus()
        }
    }

    return (
        <>
            <div>
                {avisoToUpdate ? (
                    <h2>Atualizar Item</h2>
                ) : (
                    <h2>Cadastrar Item</h2>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div>
                        <label htmlFor="descricao">Descricao:</label>
                        <input
                            id="descricao"
                            name="descricao"
                            type="text"
                            value={aviso.descricao || ''}
                            onChange={handleChange}
                            ref={inputRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoria:</label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={aviso.categoria || ''}
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

                </div>
                <button className="button is-primary is-large">
                    Salvar
                </button>
            </form >
        </>
    )
}