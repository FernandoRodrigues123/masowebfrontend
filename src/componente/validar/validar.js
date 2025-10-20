import { useState } from "react";
import { request } from "../../requisicoes/LeadRequisicoes/Validar/request";
import { useSearchParams } from "react-router-dom";
import Forms from "../Forms/Forms";

const Validar = ({ onSubmit }) => {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);






  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);


    await onSubmit(
      enviarRequest(token)
        .then(response => {
          if (response.status === 200) {
            <Forms />
          }
        })
    );

  };





  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>validar seu email</h2>
        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

function enviarRequest(token) {
  return request("/lead/validarEmail", token);
}



export default Validar;