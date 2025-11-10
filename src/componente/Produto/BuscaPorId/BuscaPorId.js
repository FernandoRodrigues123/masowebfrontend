import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../requisicoes/ProdutoRequisicoes/buscaPorId/request";

// função delegada padrão
function enviarRequest(id) {
  const uri = `/produto/findBy?id=${id}`;
  return request(uri);
}

const BuscaPorId = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ hook correto pra navegação
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const isADM = localStorage.getItem("isADM"); // "true" ou "false"

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    enviarRequest(id)
      .then((response) => {
        setProduto(response.data);
        setMensagem("");
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
        setMensagem("Erro ao carregar produto.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando produto...</p>;
  if (mensagem) return <p style={{ color: "red" }}>{mensagem}</p>;
  if (!produto) return <p>Nenhum produto encontrado.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{produto.nome}</h2>
      <p>
        <strong>Descrição:</strong> {produto.descricao}
      </p>
      <p>
        <strong>Coleção:</strong> {produto.colecao}
      </p>

      {produto.urlsImagens?.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          {produto.urlsImagens.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Imagem ${index}`}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          ))}
        </div>
      )}

      {/* ✅ Botão visível apenas se for ADM */}
      {isADM === "true" && (
        <button
          style={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/produto/atualizar/${produto.id}`)}
        >
          Atualizar Produto
        </button>
        
      )}
      {isADM === "true" && (
        <button
          style={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/produto/deletar/${produto.id}`)}
        >
          Deletar Produto
        </button>
        
      )}
    </div>
  );
};

export default BuscaPorId;
