import {  useState } from 'react';
import { request } from '../../../requisicoes/AdmRequisicoes/Cadastro/request';
import './style.css';

const CadastroAdmForm = ({ onClose, onSubmit }) => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [loginDeCadastro, setloginDeCadastro] = useState('');
    const [senha, setSenha] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);


    const token = localStorage.getItem('token');



    const handleSubmit = async (e) => {
        console.log("handleSubmit vendo token")
        console.log(token)
        e.preventDefault();
       if(token != null){
         if (!nome && !cpf && !loginDeCadastro && !senha) {
            setError('Por favor, insira um login e senha válido');
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            const dados = {
                nome: nome,
                cpf: cpf,
                usuario: {
                    login: loginDeCadastro,
                    senha: senha
                }
            }

            console.log("submit...")
            await onSubmit(
                enviarRequest(dados,token)
                    .then(response => {
                        console.log(response.data)
                    })
            );
            onClose();
        } catch (err) {
            setError(err.message || 'Ocorreu um erro ao enviar o login');
        } finally {
            setIsSubmitting(false);
        }
       }else{
            alert("é necessesario um administrador para cadastrar novo administrador")
       }
    };





    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Cadastrar nomo administrador</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="nome"
                            disabled={isSubmitting}
                        />
                        <input type="text" name="cpf"
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            title="Digite um CPF no formato: xxx.xxx.xxx-xx"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="cpf"
                            disabled={isSubmitting}
                        />



                        <div className='UsuarioForm'>
                            <input
                                type="text"
                                value={loginDeCadastro}
                                onChange={(e) => setloginDeCadastro(e.target.value)}
                                placeholder="login"
                                disabled={isSubmitting}
                            />
                            <input
                                type="text"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="senha"
                                disabled={isSubmitting}
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

function enviarRequest(dados, token) {
    console.log("enviando dados...")
    return request("/restrito/cadastro", dados, token);
}

export default CadastroAdmForm;