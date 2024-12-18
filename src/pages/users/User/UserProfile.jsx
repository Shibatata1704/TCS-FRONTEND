import User from "../../../components/User";
import { useParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import DeleteButton from "../../../components/DeleteButton";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function UserProfile() {
  const { getUserByEmail } = useUser();
  const { email } = useParams();
  const [user, setUser] = useState(null); // Estado local para armazenar o usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
 
  const token = sessionStorage.getItem('token')
  useEffect(() => {
    // Executa apenas quando o token e o email estão disponíveis
    if (!token || !email) return; 

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUserByEmail(email);
        console.log("Resposta da API:", response); // Depuração
        setUser(response); // Atualiza o estado com o usuário
      } catch (err) {
        setError("Erro ao carregar usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, email, getUserByEmail]);

  if (user) {
    console.log("DADOS DO USUARIO", user);  // Verifique se os dados de 'user' estão no formato correto
  }

  if (loading) {
    return <p>Carregando...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }
  
  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }
  
  return (
    <>
      <User userToUpdate={user} />
      {user && <DeleteButton userEmail={user.email}/>}
    </>
  );
};
// import User from "../../../components/User";
// import { useParams } from "react-router-dom";
// import useUser from "../../../hooks/useUser";
// import DeleteButton from "../../../components/DeleteButton";
// import { useEffect, useState } from "react";

// export default function UserProfile() {
//   const { getUserByEmail } = useUser();
//   const { email } = useParams();

//   const [user, setUser] = useState(null); // Estado local para armazenar o usuário
//   const [loading, setLoading] = useState(true); // Estado de carregamento
//   const [error, setError] = useState(null); // Estado de erro
//   const [token, setToken] = useState(() => sessionStorage.getItem("token")); // Estado para o token

//   useEffect(() => {
//     // Atualiza o token dinamicamente se mudar no sessionStorage
//     const handleStorageChange = () => {
//       setToken(sessionStorage.getItem("token"));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (!token || !email) return; 

//     const fetchUser = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getUserByEmail(email);
//         console.log("Resposta da API:", response); // Depuração
//         setUser(response); // Atualiza o estado com o usuário
//       } catch (err) {
//         console.error("Erro ao carregar usuário:", err);
//         setError("Erro ao carregar usuário.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [token, email, getUserByEmail]);

//   if (loading) {
//     return <p>Carregando...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!user) {
//     return <p>Usuário não encontrado.</p>;
//   }

//   return (
//     <>
//       <User userToUpdate={user} />
//       <DeleteButton userEmail={user.email} />
//     </>
//   );
// };