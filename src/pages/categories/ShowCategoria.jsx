import { useParams } from "react-router-dom"
import useCategoria from "../../hooks/useCategoria"
import CategoriaForm from "../../components/categories/CategoriaForm"

export default function UpdateItem() {
  const { getCategoriaByID } = useCategoria()
  const { id } = useParams()

  const categoria = getCategoriaByID(id)

  return (
    <>
      <h2>Atualizar Item - {categoria.name}</h2>
      <CategoriaForm categoriaToUpdate={categoria} />
    </>
  )
}