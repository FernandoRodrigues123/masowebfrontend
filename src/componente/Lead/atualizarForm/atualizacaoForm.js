
import { useState } from 'react';
import { request } from '../../../requisicoes/LeadRequisicoes/Atualizar/request';
import { valida } from '../../../utils/validaTokenELogin.js'

function enviarRequest(login, dados, token) {

  request("/lead/" + login, dados, token);
}

const AtualizacaoForm = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valida(token, login)) {
      if (!email || !nome) {
        setError('necessario nome ou um email valido!');
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const dados = {
          nome: nome,
          email: email
        }
        await onSubmit(enviarRequest(login, dados, token));
        onClose();
      } catch (err) {
        setError(err.message || 'Ocorreu um erro ao enviar o cadastro de lead');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      handleSubmit(e);
    }
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Atualizar dados</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type='text'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="nome"
              disabled={isSubmitting}
            />
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



export default AtualizacaoForm;