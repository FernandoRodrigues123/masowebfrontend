import { useState } from "react";
import LoginAdmForm from "../Login/LoginAdmForm.js"
import { request } from "../../../requisicoes/AdmRequisicoes/Deletar/request";

const DeleteFormAdm = () => {

    const [mensagem, setMensagem] = useState('');
    const [confirmacao, setConfirmacao] = useState('');
    const token = localStorage.getItem("token");
    const login = localStorage.getItem("login");
    const mensagemConfirmacao = ""


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (confirmacao === mensagemConfirmacao) {
                const response = await enviarRequest(login , token)


                if (response.status === 200) {
                    <LoginAdmForm />
                } else {
                    setMensagem("Erro ao atualizar administrador.");
                }
            }
        } catch (error) {
            setMensagem("Falha na requisição: " + error.message);
        }
    };

    return (
        <div>
            <h2>deletar meu acesso</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Confirmação</label>
                    <input
                        type="text"
                        value={mensagem}
                        onChange={(e) => setConfirmacao(e.target.value)}
                    />
                </div>
                    <button type="submit" ></button>
                
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};
function enviarRequest(login, token) {
    return request("/restrito/" + login, token);
}
export default  DeleteFormAdm;
