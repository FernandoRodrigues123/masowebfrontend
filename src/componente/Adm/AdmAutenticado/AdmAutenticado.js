import { useState, useEffect } from "react";
import { request } from "../../../requisicoes/AdmRequisicoes/BuscaAdm/request";

const AdmAutenticado = () => {
  const [adm, setAdm] = useState(null);
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  const isADM = localStorage.getItem('isADM');

  useEffect(() => {
    if (isADM === 'true' && login && token) {
      enviarRequest(login, token).then(response => {
        setAdm(response.data);
      }).catch(err => {
        console.error("Erro ao buscar ADM:", err);
      });
    }
  }, [isADM, login, token]);

  if (!adm) return <p>Carregando...</p>;

  return (
    <>
      <h1>ADM</h1>
      <pre>{JSON.stringify(adm, null, 2)}</pre>
    </>
  );
};

function enviarRequest(login, token) {
  console.log("enviando dados...");
  return request("/restrito",  login , token);
}

export default AdmAutenticado;
