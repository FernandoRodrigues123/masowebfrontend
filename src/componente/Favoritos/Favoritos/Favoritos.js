import { useEffect, useState } from "react";
import { request } from "../../../requisicoes/FavoritosRequisicoes/favoritos/request";

function enviarRequest(token) {
  const uri = "/favoritos";
  return request(uri, token);
}

const Favoritos = () => {
  const token = localStorage.getItem("token");
  const isADM = localStorage.getItem("isADM");

  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!token) {
      setMensagem("Você precisa fazer login para ver seus favoritos.");
      setLoading(false);
      return;
    }

    if (isADM === "true") {
      setMensagem("Administradores não possuem lista de favoritos.");
      setLoading(false);
      return;
    }

    enviarRequest(token)
      .then((response) => {
        setFavoritos(response.data);
        setMensagem("");
      })
      .catch((error) => {
        console.error("Erro ao carregar favoritos:", error);
        setMensagem("Erro ao carregar seus favoritos.");
      })
      .finally(() => setLoading(false));
  }, [token, isADM]);

  if (loading) return <p>Carregando favoritos...</p>;
  if (mensagem) return <p style={{ color: "red" }}>{mensagem}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Meus Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>Você ainda não favoritou nenhum produto.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "1rem",
          }}
        >
          {favoritos.map((produto) => (
            <div
              key={produto.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3>{produto.nome}</h3>
              <p>{produto.descricao}</p>

              {produto.urlsImagens?.length > 0 && (
                <img
                  src={produto.urlsImagens[0]}
                  alt={produto.nome}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
