import { useState } from "react";
import axios from "axios";

export function FavoritarButton({ idProduto }) {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const token = localStorage.getItem("token");
  const isADM = localStorage.getItem("isADM");

  const handleFavoritar = async () => {
    if (isADM === "true") {
      setMensagem("Apenas usuários comuns podem favoritar produtos.");
      return;
    }

    if (!token) {
      setMensagem("Faça login para favoritar produtos.");
      return;
    }

    setLoading(true);
    setMensagem("");

    try {
      const uri = `${process.env.REACT_APP_URL_API}/favoritos/favoritar?id=${idProduto}`;
      const response = await axios.put(
        uri,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMensagem("✅ Produto adicionado aos favoritos!");
      } else {
        setMensagem("Erro ao favoritar produto.");
      }
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      setMensagem("Erro na requisição.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {isADM !== "true" && (
        <button
          onClick={handleFavoritar}
          disabled={loading}
          style={{
            backgroundColor: "#ff4081",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Favoritando..." : "❤️ Favoritar"}
        </button>
      )}
      {mensagem && <p style={{ fontSize: "0.9rem" }}>{mensagem}</p>}
    </div>
  );
}
