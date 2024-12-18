import PropTypes from "prop-types"
import { useRef, useState, useEffect } from "react"
import useCategoria from "../../hooks/useCategoria"
import { useParams } from "react-router-dom";


CategoriaForm.propTypes = {
  categoriaToUpdate: PropTypes.object
}

export default function CategoriaForm({ categoriaToUpdate }) {
  const defaultCategoria = {
    nome: "",
  }

  const { id } = useParams();
  const [categoria, setCategoria] = useState(categoriaToUpdate || defaultCategoria)
  const { addCategoria, updateCategoria, getCategoriaByID } = useCategoria()
  const inputRef = useRef(null)
  // useEffect(() => {
  //   const fetchCategoria = async () => {
  //     const data = await getCategoriaByID(id);
  //     setCategoria(data);
  //   };

  //   fetchCategoria();
  // }, [id, getCategoriaByID]);

  useEffect(() => {
    if (categoriaToUpdate) {
      setCategoria(categoriaToUpdate);
    }
  }, [categoriaToUpdate]);

  const handleChange = (ev) => {
    setCategoria((current) => ({ ...current, [ev.target.name]: ev.target.value }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    try {
      if (categoriaToUpdate) {
        updateCategoria(categoria)
        alert("Categoria atualizado com sucesso!")
      } else {
        addCategoria(categoria)
        setCategoria(defaultCategoria)
        alert("Categoria cadastrado com sucesso!")
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
      {categoriaToUpdate ? (
        <h2>Atualizar Item</h2>
      ) : (
        <h2>Cadastrar Item</h2>
      )}
    </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              required
              ref={inputRef}
              value={categoria.nome || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="button is-primary is-large">
          Salvar
        </button>
      </form>
    </>
  )
}