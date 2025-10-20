import { useContext, useState } from 'react';
import { request } from '../../../requisicoes/LeadRequisicoes/Login/request';
import {Context} from '../../../tokenServices/tokenLocalStorege'
import './style.css';

const LoginForm = ({ onClose, onSubmit }) => {



  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const ctx = useContext(Context);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, insira um email válido');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const dados = { email: email }
      await onSubmit(
        enviarRequest(dados)
          .then(response => {
            ctx.setisADM(false)
            ctx.setToken(response.data.tokenJWT);
            ctx.setLogin(dados.email)
            ctx.setAutenticado(true);
            ctx.setTempoDeCriacaoDoToken(new Date().getTime());
          })
      );
      onClose();
    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao enviar o email');
    } finally {
      setIsSubmitting(false);
    }
  };





  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Insira seu email</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
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
  return request("/lead/login", dados);
}

export default LoginForm;