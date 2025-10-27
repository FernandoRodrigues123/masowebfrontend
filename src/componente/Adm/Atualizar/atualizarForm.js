import { useState } from "react";
import { request } from "../../../requisicoes/AdmRequisicoes/Atualizar/request";
import Perfil from "../../Perfil/perfil"

const AtualizarAdmForm = () => {
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [loginNovo, setLoginNovo] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const login = localStorage.getItem("login");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensagem("");

        try {
            const dados = {
                nome: nome,
                cpf: cpf,
                usuario: {
                    login: loginNovo,
                    senha: senha
                }
            };
            const response = await enviarRequest(login, dados, token)
            
            if (response.status === 200) {
                setMensagem("Administrador atualizado com sucesso!");
                return (<Perfil/>)
            } else {
                setMensagem("Erro ao atualizar administrador.");
            }
        } catch (error) {
            setMensagem("Falha na requisição: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Atualizar Administrador</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}

                    />
                </div>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}

                    />
                </div>

                <div>
                    <label>login novo:</label>
                    <input
                        type="text"
                        value={loginNovo}
                        onChange={(e) => setLoginNovo(e.target.value)}

                    />
                </div>
                <div>
                    <label>senha:</label>
                    <input
                        type="text"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}

                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Atualizar"}
                </button>
            </form>
                
        </div>
    );
};
function enviarRequest(login, dados, token) {
  console.log("dados enviados:", dados);
  return request("/restrito/" + login, dados, token);
}
export default AtualizarAdmForm;
