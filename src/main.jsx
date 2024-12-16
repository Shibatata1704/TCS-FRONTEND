import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from "./contexts/UserContext";
import { CategoriaContextProvider } from "./contexts/CategoriaContext";

createRoot(document.getElementById('root')).render(

    <UserContextProvider>
      <CategoriaContextProvider>
      <App />
      </CategoriaContextProvider>
    </UserContextProvider>
 
)
