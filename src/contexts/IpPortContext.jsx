import React, { createContext, useContext, useState } from 'react';

// Criação do Contexto
const IpPortContext = createContext();

// Hook customizado para consumir o contexto
export const useIpPort = () => useContext(IpPortContext);

// Componente Provedor do Contexto
export const IpPortProvider = ({ children }) => {
  const [ip, setIp] = useState('');  // Defina o valor inicial
  const [porta, setPorta] = useState('');  // Defina o valor inicial

  return (
    <IpPortContext.Provider value={{ ip, porta, setIp, setPorta }}>
      {children}
    </IpPortContext.Provider>
  );
};
