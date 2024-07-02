import { useState } from "react";
import axios from "axios";
import "./CSS/CreateArticle.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [authors, setAuthors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorsArray = authors.split(",").map((author) => author.trim());

    const articleData = {
      title,
      abstract,
      pdfLink,
      authors: authorsArray,
    };

    try {
      const response = await axios.post("/create-article", articleData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.error) {
        toast.error(response.error);
      }

      toast.success("Artigo criado com sucesso");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao criar artigo:", error);
    }
  };

  return (
    <div className="create-article-container">
      <h1>Criar Artigo</h1>
      <form onSubmit={handleSubmit} className="create-article-form">
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Resumo:</label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Link do PDF:</label>
          <input
            type="url"
            value={pdfLink}
            onChange={(e) => setPdfLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Autores (separados por vírgula):</label>
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Criar Artigo
        </button>
      </form>
    </div>
  );
}
