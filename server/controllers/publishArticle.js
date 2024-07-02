const Article = require("../models/article");

const publishArticle = async (req, res) => {
  const articleId = req.params.id;
  const { user } = req;

  try {
    if (user.role !== "administrador") {
      return res
        .status(403)
        .json({ error: "Apenas administradores podem publicar artigos." });
    }

    const article = await Article.findByIdAndUpdate(
      articleId,
      { status: "accepted" },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Falha ao publicar o artigo" });
  }
};

module.exports = {
  publishArticle,
};
