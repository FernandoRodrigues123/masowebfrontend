import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../requisicoes/FavoritosRequisicoes/listaDeLeadsInteressados/request";

function enviarRequest(id, token) {
    return request("/restrito/favoritos/" + id, token);
}

const ListaDeLeadsInteressados = () => {
    const isADM = localStorage.getItem('isADM');
    const token = localStorage.getItem('token');
    const { id } = useParams();

    const [leads, setLeads] = useState([]);

    useEffect(() => {
        if (!id) return;

        if (isADM === 'true' && token) {
            enviarRequest(id, token)
                .then(response => {
                    setLeads(response.data);
                })
                .catch(err => {
                    console.error("Erro ao carregar leads interessados:", err);
                });
        }
    }, [id, isADM, token]); // <-- evita loop infinito

    return (
        <div style={{ padding: "20px" }}>
            <h2>Leads Interessados</h2>

            {leads.length === 0 ? (
                <p>Nenhum lead demonstrou interesse neste produto.</p>
            ) : (
                leads.map((lead, index) => (
                    <div 
                        key={index}
                        style={{
                            background: "#fff",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                            boxShadow: "0px 2px 5px rgba(0,0,0,0.15)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px"
                        }}
                    >
                        <strong style={{ fontSize: "18px" }}>{lead.nome}</strong>
                        <span style={{ color: "#555" }}>{lead.email}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default ListaDeLeadsInteressados;
