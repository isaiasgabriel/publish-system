const Article = require("../models/article");
const User = require("../models/user");

const assignEvaluator = async (req, res) => {
  try {
    const { id } = req.params;
    const { evaluatorEmail } = req.body;
    const user = req.user;

    if (!user || user.role !== "administrador") {
      return res.status(401).json({
        error: "Somente administradores podem atribuir avaliadores",
      });
    }

    const evaluator = await User.findOne({ email: evaluatorEmail });
    if (!evaluator || evaluator.role !== "avaliador") {
      return res
        .status(400)
        .json({ error: "Usuário não é um avaliador válido" });
    }

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    if (article.evaluators.includes(evaluator._id)) {
      return res
        .status(400)
        .json({ error: "Avaliador já atribuído ao artigo" });
    }

    article.evaluators.push(evaluator._id);
    article.status = "in_review";
    await article.save();

    res
      .status(200)
      .json({ message: "Avaliador atribuído com sucesso", article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atribuir avaliador" });
  }
};

const assignScores = async (req, res) => {
  try {
    const { id } = req.params;
    const { n1, n2 } = req.body;
    const evaluator = req.user;

    if (!evaluator || evaluator.role !== "avaliador") {
      return res.status(401).json({
        error: "Somente avaliadores podem atribuir notas",
      });
    }

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    if (!article.evaluators.includes(evaluator._id)) {
      return res.status(401).json({
        error: "Você não está autorizado a avaliar este artigo",
      });
    }

    const existingScore = article.scores.find(
      (score) => score.evaluator.toString() === evaluator._id.toString()
    );

    if (existingScore) {
      return res.status(400).json({
        error: "Este avaliador já atribuiu notas para este artigo",
      });
    }

    const finalScore = n1 * n2;

    article.scores.push({
      evaluator: evaluator._id,
      n1,
      n2,
      finalScore,
    });

    await article.save();

    res.status(200).json({
      message: "Notas atribuídas com sucesso",
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atribuir notas ao artigo" });
  }
};

module.exports = { assignScores };

module.exports = { assignEvaluator, assignScores };
