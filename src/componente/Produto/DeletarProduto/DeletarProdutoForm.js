import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../../requisicoes/ProdutoRequisicoes/deletar/request";

const DeletarProdutoForm = ({ onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const token = localStorage.getItem("token");
  const isADM = localStorage.getItem("isADM");

  // 🔒 Bloqueia o acesso se não for ADM
  if (isADM !== "true") return null;

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const response = await request(`/restrito/produto/${id}`, token);
      console.log("🗑️ Response:", response);

      if (response.status === 200 || response.status === 204) {
        setMensagem("✅ Produto excluído com sucesso!");

        setTimeout(() => {
          if (onClose) onClose();
          navigate("/produto");
        }, 1200);
      } else {
        setMensagem("⚠️ Erro inesperado ao excluir o produto.");
      }
    } catch (error) {
      console.error("❌ Erro ao excluir produto:", error);
      const msg =
        error.response?.data ||
        `Falha na exclusão (${error.response?.status || "sem status"})`;
      setMensagem(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Excluir Produto</h2>
        <p>Tem certeza que deseja excluir este produto?</p>

        <form onSubmit={handleDelete}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {loading ? "Excluindo..." : "Confirmar exclusão"}
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        </form>

        {mensagem && (
          <p
            style={{
              marginTop: "15px",
              color: mensagem.startsWith("✅") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeletarProdutoForm;
