const Article = require("../models/article"); // Importe o modelo de artigo do seu projeto

const getArticles = async (req, res) => {
  try {
    const user = req.user;

    let articles;
    if (user.role === "administrador") {
      articles = await Article.find();
    } else if (user.role === "autor") {
      articles = await Article.find({ author: user._id });
    } else if (user.role === "avaliador") {
      articles = await Article.find({ evaluators: user._id });
    } else {
      return res.status(401).json({ error: "Acesso não autorizado" });
    }

    if (articles.length === 0) {
      return res.status(404).json({ message: "Nenhum artigo encontrado" });
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar artigos" });
  }
};

const getArticleById = async (req, res) => {
  const articleId = req.params.id;

  try {
    const article = await Article.findById(articleId).exec();

    if (!article) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Falha ao buscar o artigo" });
  }
};

const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "accepted" });

    if (articles.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum artigo publicado encontrado" });
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar artigos publicados" });
  }
};

module.exports = { getArticles, getArticleById, getPublishedArticles };
