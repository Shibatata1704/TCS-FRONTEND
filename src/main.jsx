import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserContextProvider } from './contexts/UserContext';
import { CategoriaContextProvider } from './contexts/CategoriaContext';
import { AvisoContextProvider } from './contexts/AvisoContext';
import { IpPortProvider } from './contexts/IpPortContext'; // Importando o IpPortProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IpPortProvider>  {/* Envolvendo a aplicação com o IpPortProvider */}
      <UserContextProvider>
        <CategoriaContextProvider>
          <AvisoContextProvider>
            <App />
          </AvisoContextProvider>
        </CategoriaContextProvider>
      </UserContextProvider>
    </IpPortProvider>
  </StrictMode>
);
