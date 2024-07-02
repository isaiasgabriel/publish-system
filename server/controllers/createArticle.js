const Article = require("../models/article");

const createArticle = async (req, res) => {
  try {
    const { title, abstract, pdfLink, authors, status, evaluators, scores } =
      req.body;
    const user = req.user;

    if (!user || user.role !== "autor") {
      return res.status(401).json({
        error: "Somente autores podem publicar artigos",
      });
    }

    const newArticle = new Article({
      title,
      abstract,
      pdfLink,
      authors,
      status,
      author: user._id,
      authorEmail: user.email,
      evaluators,
      scores,
    });

    await newArticle.save();

    res.status(201).json({ article: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha ao criar artigo" });
  }
};

module.exports = { createArticle };
