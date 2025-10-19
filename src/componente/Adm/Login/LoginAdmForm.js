import { useContext, useState } from 'react';
import { request } from '../../../requisicoes/AdmRequisicoes/Login/request';
import { Context } from '../../../tokenServices/tokenLocalStorege'
import './style.css';

const LoginAdmForm = ({ onClose, onSubmit }) => {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const ctx = useContext(Context);




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login && !senha) {
            setError('Por favor, insira um login e senha válido');
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            const dados =
            {
                login: login,
                senha: senha
            }

   
            await onSubmit(
                enviarRequest(dados)
                    .then(response => {
                        ctx.setToken(response.data.tokenJWT);
                        ctx.setLogin(dados.login);
                        ctx.setAutenticado(true);
                        ctx.setTempoDeCriacaoDoToken(new Date().getTime());
                    })
            );
            onClose();
        } catch (err) {
            setError(err.message || 'Ocorreu um erro ao enviar o login');
        } finally {
            setIsSubmitting(false);
        }
    };





    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Insira seu login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
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

function enviarRequest(dados) {
    return request("/adm/login", dados);
}

export default LoginAdmForm;