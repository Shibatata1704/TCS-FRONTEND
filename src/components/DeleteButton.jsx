import { useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"

import { useParams } from "react-router-dom"


export default function DeleteButton() {
  const { email } = useParams()
  const { deleteUser } = useUser()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')

  const handleDelete = () => {
    console.log("token", token);
    if (!token) return;
    if (confirm(`Tem certeza que deseja excluir ${email}?`)) {
      deleteUser(email)
      navigate("/register")
    }
  }

  return (
    <button
    className="button is-danger is-small"
    onClick={handleDelete}
  >
    Excluir
  </button>
  )
}