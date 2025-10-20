import { useState } from "react";
import { request } from "../../../requisicoes/AdmRequisicoes/BuscaAdm/request";

const AdmAutenticado = () => {

    const [adm, setAdm] = useState('');

    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    const isADM = localStorage.getItem('isADM')
    if (isADM === 'true') {
        if (login != null && token != null) {
            enviarRequest(login, token).then(
                response => {
                    setAdm(response.data)
                }
            )
        }
    }
    return (
        <>
            ${adm}
        </>
    );
}

function enviarRequest(login, token) {
    console.log("enviando dados...")
    return request("/restrito", login, token);
}
export default AdmAutenticado;