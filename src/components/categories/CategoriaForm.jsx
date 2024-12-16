import PropTypes from "prop-types"
import { useRef, useState } from "react"
import useStock from "../../hooks/useCategoria"

CategoriaForm.propTypes = {
  CategoriaToUpdate: PropTypes.object
}

export default function CategoriaForm({ categoriaToUpdate }) {
  const defaultCategoria = {
    nome: "",
  }

  const [categoria, setCategoria] = useState(categoriaToUpdate ? categoriaToUpdate : defaultCategoria)
  const { addCategoria, updateCategoria } = useStock()
  const inputRef = useRef(null)

  const handleChange = (ev) => {
    setCategoria((current) => ({ ...current, [ev.target.name]: ev.target.value }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    try {
      if (categoriaToUpdate) {
        updateCategoria(categoriaToUpdate.id, categoria)
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
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            ref={inputRef}
            value={categoria.nome}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="button is-primary is-large">
        Salvar
      </button>
    </form>
  )
}