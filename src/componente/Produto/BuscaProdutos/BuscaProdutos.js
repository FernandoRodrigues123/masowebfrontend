import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../../requisicoes/ProdutoRequisicoes/busca/request";
import { requestFv } from "../../../requisicoes/FavoritosRequisicoes/favoritos/request";

import { FavoritarButton } from "../../Favoritos/Favoritar/Favoritar";
import { DesfavoritarButton } from "../../Favoritos/Desfavoritar/Desfavoritar";

function enviarRequest(page, token) {
  const uri = `/produto?page=${page}&size=10`;
  return request(uri, null, token);
}

async function carregarFavoritosDoLead(token, setFavoritos) {
  try {
    const resp = await requestFv("/favoritos", token);

    // resp.data = lista de produtos favoritos
    const ids = resp.data.map(p => p.id);

    // transforma em objeto { idProduto: true }
    const favMap = {};
    ids.forEach(id => favMap[id] = true);

    setFavoritos(favMap);
  } catch (e) {
    console.error("Erro carregando favoritos:", e);
  }
}


const BuscaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const [favoritos, setFavoritos] = useState({}); // mapa de favoritos

  const isADM = localStorage.getItem("isADM");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    carregarFavoritosDoLead(token, setFavoritos);

    enviarRequest(paginaAtual, token)
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
  }, [paginaAtual,token]);


  function toggleFavorito(produtoId) {
    const isFav = favoritos[produtoId] === true;

    if (!token) {
      alert("Você precisa estar logado para favoritar!");
      return;
    }

    if (isFav) {
      // desfavoritar
      requestFv(`/favoritos/desfavoritar?id=${produtoId}`, token)
        .then(() => {
          setFavoritos(prev => {
            const novo = { ...prev };
            delete novo[produtoId];
            return novo;
          });
        })
        .catch(err => console.error("Erro ao desfavoritar:", err));
    } else {
      // favoritar
      requestFv(`/favoritos/favoritar?id=${produtoId}`, token)
        .then(() => {
          setFavoritos(prev => ({
            ...prev,
            [produtoId]: true
          }));
        })
        .catch(err => console.error("Erro ao favoritar:", err));
    }
  }

  const handlePaginaAnterior = () => {
    if (paginaAtual > 0) setPaginaAtual(paginaAtual - 1);
  };

  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas - 1) setPaginaAtual(paginaAtual + 1);
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
            {produtos.map((produto) => {
              const isFav = favoritos[produto.id] === true;

              return (
                <li key={produto.id}
                  style={{
                    marginBottom: "1.5rem",
                    border: "1px solid #ccc",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>

                  {produto.urlsImagens?.length > 0 && (
                    <div style={{
                      display: "flex",
                      overflowX: "auto",
                      gap: "10px",
                      paddingBottom: "0.5rem",
                      marginTop: "0.5rem",
                    }}>
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

                  {/* FAVORITAR / DESFAVORITAR */}
                  {isADM !== "true" && (
                    <div style={{ marginTop: "10px" }}>
                      {isFav ? (
                        <DesfavoritarButton
                          idProduto={produto.id}
                          onClick={() => toggleFavorito(produto.id)}
                        />
                      ) : (
                        <FavoritarButton
                          idProduto={produto.id}
                          onClick={() => toggleFavorito(produto.id)}
                        />
                      )}
                    </div>
                  )}

                </li>
              );
            })}
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
