import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../../requisicoes/ProdutoRequisicoes/busca/request";

function enviarRequest(page, token) {
  const uri = `/produto?page=${page}&size=10`;
  return request(uri, null, token);
}

const BuscaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    enviarRequest(paginaAtual)
      .then((response) => {
        const data = response.data;
        setProdutos(data.content);
        setTotalPaginas(data.totalPages);
        setMensagem("");
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setMensagem("Erro ao carregar produtos.");
      })
      .finally(() => setLoading(false));
  }, [paginaAtual]);

  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas - 1) setPaginaAtual(paginaAtual + 1);
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 0) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Lista de Produtos</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : mensagem ? (
        <p style={{ color: "red" }}>{mensagem}</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {produtos.map((produto) => (
              <li
                key={produto.id}
                style={{
                  marginBottom: "1.5rem",
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <h3>{produto.nome}</h3>
                <p>{produto.descricao}</p>
                <p>
                  <strong>Coleção:</strong> {produto.colecao}
                </p>

                {/* Exibir imagens corretamente */}
                {produto.urlsImagens?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      gap: "10px",
                      paddingBottom: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {produto.urlsImagens.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Imagem ${i}`}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                )}

                <button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/produto/${produto.id}`)}
                >
                  Visualizar
                </button>
              </li>
            ))}
          </ul>

          {/* Paginação */}
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button onClick={handlePaginaAnterior} disabled={paginaAtual === 0}>
              Anterior
            </button>
            <span>
              Página {paginaAtual + 1} de {totalPaginas}
            </span>
            <button
              onClick={handleProximaPagina}
              disabled={paginaAtual >= totalPaginas - 1}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BuscaProdutos;
