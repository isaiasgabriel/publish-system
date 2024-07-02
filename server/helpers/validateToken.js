const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const validateToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Sem token, faça login" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    try {
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      req.user = user; // Adiciona o usuário à requisição
      next(); // Passa para o próximo middleware ou rota
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Falha ao buscar usuário" });
    }
  });
};

module.exports = validateToken;
