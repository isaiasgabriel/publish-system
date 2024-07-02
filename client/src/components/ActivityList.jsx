import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CSS/ActivityList.css";

const ActivityList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Erro ao buscar artigos:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="activity-list">
      <h2>Lista de Artigos</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link to={`/article/${article._id}`}>
              <h3>{article.title}</h3>
              <p>{article.abstract}</p>
              <p>Autor(es): {article.authors.join(", ")}</p>
              <p>Status: {article.status}</p>
              <p>
                Data de criação: {new Date(article.createdAt).toLocaleString()}
              </p>
              <p>Origem: {article.authorEmail}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
