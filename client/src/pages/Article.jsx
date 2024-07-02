import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./CSS/Article.css";
import { UserContext } from "../../context/userContext";

const Article = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evaluatorEmail, setEvaluatorEmail] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/article/${id}`);
        setArticle(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDeleteActivity = async () => {
    try {
      await axios.delete(`/article/${id}`);
      toast.success("Atividade excluída com sucesso");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao excluir atividade:", error);
    }
  };

  const handleAssignEvaluator = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/article/${id}/assign-evaluator`, {
        evaluatorEmail,
      });
      toast.success("Avaliador atribuído com sucesso");
      setEvaluatorEmail("");
    } catch (error) {
      console.error("Erro ao atribuir avaliador:", error);
      toast.error(error.response?.data?.error || "Erro ao atribuir avaliador");
    }
  };

  const handleScoreAssign = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/article/${id}/assign-scores`, {
        n1,
        n2,
      });
      toast.success("Notas atribuídas com sucesso");
      setN1("");
      setN2("");
    } catch (error) {
      console.error("Erro ao atribuir notas:", error);
      toast.error(error.response?.data?.error || "Erro ao atribuir notas");
    }
  };

  const handlePublishArticle = async () => {
    try {
      await axios.put(`/article/${id}/publish`);
      toast.success("Artigo publicado com sucesso");
    } catch (error) {
      console.error("Erro ao publicar artigo:", error);
      toast.error(error.response?.data?.error || "Erro ao publicar artigo");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Nenhum artigo encontrado</p>;

  const isAuthorized =
    user?.role === "administrador" || user?.email === article.authorEmail;
  const isAdmin = user?.role === "administrador";
  const isAvaliador = user?.role === "avaliador";
  const canPublish =
    isAdmin && article.scores.length >= 2 && article.status === "in_review";

  return (
    <div className="article">
      <div className="article-container">
        <h2>{article.title}</h2>
        <p>Data de criação: {new Date(article.createdAt).toLocaleString()}</p>
        <p>Resumo: {article.abstract}</p>
        <p>Autor(es): {article.authors.join(", ")}</p>
        <p>Status: {article.status}</p>
        <p>Origem: {article.authorEmail}</p>
        <p>
          Link do PDF:{" "}
          <a href={article.pdfLink} target="_blank" rel="noopener noreferrer">
            {article.pdfLink}
          </a>
        </p>
        {isAuthorized && (
          <button
            className="delete-btn"
            type="submit"
            onClick={handleDeleteActivity}
          >
            Excluir atividade
          </button>
        )}
        {isAdmin && (
          <>
            <form onSubmit={handleAssignEvaluator} className="assign-form">
              <input
                type="email"
                placeholder="Email do avaliador"
                value={evaluatorEmail}
                onChange={(e) => setEvaluatorEmail(e.target.value)}
                required
              />
              <button className="assign-btn" type="submit">
                Atribuir Avaliador
              </button>
            </form>
          </>
        )}
        {isAvaliador && (
          <>
            <form onSubmit={handleScoreAssign} className="assign-form">
              <input
                type="number"
                placeholder="Nota 1"
                value={n1}
                onChange={(e) => setN1(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Nota 2"
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                required
              />
              <button className="assign-btn" type="submit">
                Atribuir Notas
              </button>
            </form>
          </>
        )}

        {article.scores.length > 0 ? (
          <div className="notes-container">
            <h3>Notas Atribuídas:</h3>
            {article.scores.map((score, index) => (
              <div key={index} className="evaluator-score">
                <p>
                  Média do avaliador {index + 1}: {score.finalScore}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma nota atribuída.</p>
        )}
        {canPublish && (
          <button className="publish-btn" onClick={handlePublishArticle}>
            Publicar
          </button>
        )}
      </div>
    </div>
  );
};

export default Article;
