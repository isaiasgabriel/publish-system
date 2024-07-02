const Article = require("../models/article");

const deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  const currentUser = req.user;

  try {
    const article = await Article.findById(articleId).exec();

    if (!article) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    if (
      currentUser.role === "administrador" ||
      currentUser.id === article.author.toString()
    ) {
      await Article.deleteOne({ _id: articleId }).exec();

      return res.status(200).json({ message: "Artigo excluído com sucesso" });
    } else {
      return res
        .status(403)
        .json({ error: "Não autorizado a excluir este artigo" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Falha ao excluir o artigo" });
  }
};

module.exports = { deleteArticle };
