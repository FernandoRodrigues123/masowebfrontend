import { useState, useEffect } from "react";
import { request } from "../../../requisicoes/LeadRequisicoes/Busca/request";

const LeadAutenticado = () => {
  const [lead, setLead] = useState(null);
  const token = localStorage.getItem('token');
  const isADM = localStorage.getItem('isADM');

  useEffect(() => {
    // roda só quando o componente montar
    if (isADM === 'false' && token) {
      enviarRequest(token).then(response => {
        setLead(response.data);
      }).catch(err => {
        console.error("Erro ao buscar lead:", err);
      });
    }
  }, [isADM, token]); // depende de isADM e token

  return (
    <>
      <h1>Lead</h1>
      <pre>{JSON.stringify(lead, null, 2)}</pre>
    </>
  );
};

function enviarRequest(token) {
  console.log("enviando dados...");
  return request("/lead", token);
}

export default LeadAutenticado;
