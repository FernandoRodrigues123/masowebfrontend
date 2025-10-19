import { useState } from 'react';
import { request } from '../../../requisicoes/LeadRequisicoes/Deletar/request';
import { valida } from '../../../utils/validaTokenELogin.js'

function enviarRequest(token) {

    request("/lead", token);
}

const DeletarForm = ({ onClose, onSubmit }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
  e.preventDefault();

  const resposta = prompt("Deseja deletar registro? Digite exatamente: 'eu desejo deletar meu registro'");

  if (resposta !== "eu desejo deletar meu registro") {
    alert("Confirmação inválida. Ação cancelada.");
    return; 
  }

  if (!valida(token, "delete")) {
    alert("Token inválido ou não autorizado.");
    return;
  }

  setIsSubmitting(true);
  setError(null);

  try {
    await onSubmit(enviarRequest(token));
    onClose();
  } catch (err) {
    setError(err.message || "Erro ao tentar deletar seu registro.");
  } finally {
    setIsSubmitting(false);
  }
};

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Atualizar dados</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'deletar registro'}
                    </button>
                </form>
            </div>
        </div>
    );
};



export default DeletarForm;