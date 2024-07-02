const User = require("../models/user");
const { comparePassword } = require("../helpers/hashFunctions");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    if (!password) {
      return res.status(400).json({
        error: "Por favor, insira a senha",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: "Senha incorreta",
      });
    }

    jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
};

module.exports = { loginUser };
