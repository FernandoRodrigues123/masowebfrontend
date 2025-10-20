import { useState } from "react";
import { request } from "../../../requisicoes/LeadRequisicoes/Busca/request";

const LeadAutenticado = () => {

    const [lead, setLead] = useState('');

    const token = localStorage.getItem('token');
    const isADM = localStorage.getItem('isADM')
    if (isADM === 'false') {
        enviarRequest(token).then(
            response => {
                setLead(response.data)
            }
        );
    }else{
     
    }
    return (
        <>${lead}</>
    );
};

function enviarRequest(token) {
    console.log("enviando dados...")
    return request("/lead", token);
}

export default LeadAutenticado;