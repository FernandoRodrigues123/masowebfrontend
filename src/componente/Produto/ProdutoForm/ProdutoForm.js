import { useState, useEffect } from "react";
import { request } from "../../../requisicoes/ProdutoRequisicoes/cadastro/request";

const ProdutoForm = ({ onClose }) => {

    const [isADM, setIsADM] = useState(null);
    const [token, setToken] = useState(null);
    const [nome, setNome] = useState("");
    const [desc, setDesc] = useState("");
    const [colecao, setColecao] = useState("");
    const [urlImagem, setUrlImagem] = useState("");
    const [urlsImagens, setUrlsImagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");




    useEffect(() => {
        const admFlag = localStorage.getItem("isADM");
        const tokenStorage = localStorage.getItem("token");
        console.log("isADM do localStorage:", admFlag);
        setIsADM(admFlag); // pode ser "true", "false" ou null
        setToken(tokenStorage);
        
    }, []);
    
    const handleAddImagem = (e) => {
        e.preventDefault();
        if (urlImagem.trim() !== "") {
            setUrlsImagens((prev) => [...prev, urlImagem.trim()]);
            setUrlImagem("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isADM !== "true" || !token) {
            setMensagem("Apenas administradores podem cadastrar produtos.");
            return;
        }

        const produto = {
            nome,
            descricao: desc,
            colecao,
            urlsImagens: urlsImagens, // envia a lista das URLs
        };

        try {
            setLoading(true);
            const response = await request("/restrito/produto", produto, token);

            if (response.status === 201 || response.status === 200) {
                setMensagem("Produto cadastrado com sucesso!");
                setNome("");
                setDesc("");
                setColecao("");
                setUrlsImagens([]);
            } else {
                setMensagem("Erro ao cadastrar produto.");
            }
        } catch (error) {
            console.error(error);
            setMensagem("Falha na requisição: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(isADM)
    if (isADM !== "true") return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <h2>Cadastrar Produto</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome do produto"
                        disabled={loading}
                    />

                    <input
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Descrição"
                        disabled={loading}
                    />

                    <input
                        type="text"
                        value={colecao}
                        onChange={(e) => setColecao(e.target.value)}
                        placeholder="Coleção"
                        disabled={loading}
                    />

                    <div style={{ marginTop: "1rem" }}>
                        <input
                            type="text"
                            value={urlImagem}
                            onChange={(e) => setUrlImagem(e.target.value)}
                            placeholder="URL da imagem"
                            disabled={loading}
                        />
                        <button onClick={handleAddImagem} disabled={loading}>
                            Adicionar imagem
                        </button>
                    </div>

                    {/* Preview das imagens */}
                    {urlsImagens.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                marginTop: "1rem",
                                gap: "10px",
                                justifyContent: "center",
                            }}
                        >
                            {urlsImagens.map((url, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={url}
                                        alt={`Imagem ${index}`}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setUrlsImagens(urlsImagens.filter((_, i) => i !== index))
                                        }
                                        style={{
                                            position: "absolute",
                                            top: "2px",
                                            right: "2px",
                                            background: "red",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            width: "18px",
                                            height: "18px",
                                            lineHeight: "16px",
                                            textAlign: "center",
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Cadastrar"}
                    </button>

                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
        </div>
    );
};

export default ProdutoForm;
