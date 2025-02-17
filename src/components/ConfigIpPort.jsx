import React, { useState, useEffect } from 'react';
import { useIpPort } from '../contexts/IpPortContext';

const ConfigIpPort = () => {
  const { ip, porta, setIp, setPorta } = useIpPort();
  const [newIp, setNewIp] = useState(ip);
  const [newPorta, setNewPorta] = useState(porta);

  useEffect(() => {
    // Verifique se os valores estão no localStorage ao iniciar
    const storedIp = localStorage.getItem('ip');
    const storedPorta = localStorage.getItem('porta');

    if (storedIp) setIp(storedIp);
    if (storedPorta) setPorta(storedPorta);
  }, [setIp, setPorta]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIp(newIp);
    setPorta(newPorta);

    // Armazenando no localStorage
    localStorage.setItem('ip', newIp);
    localStorage.setItem('porta', newPorta);

    alert('Configurações de IP e Porta atualizadas!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ip">IP:</label>
        <input
          type="text"
          id="ip"
          value={newIp}
          onChange={(e) => setNewIp(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="porta">Porta:</label>
        <input
          type="text"
          id="porta"
          value={newPorta}
          onChange={(e) => setNewPorta(e.target.value)}
          required
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ConfigIpPort;
