const User = require("../models/user");
const { hashPassword } = require("../helpers/hashFunctions");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userSession = req.user;

    if (userSession.role !== "administrador") {
      return res.status(401).json({
        message: "somente administradores podem criar novos usuários",
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "insira seu nome",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "insira uma senha com no mínimo 6 caracteres",
      });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        error: "email já cadastrado",
      });
    }

    if (
      !role ||
      (role !== "autor" && role !== "administrador" && role !== "avaliador")
    ) {
      return res.status(400).json({
        error: "Insira uma função válida: autor, administrador ou avaliador",
      });
    }

    const hashedPassowrd = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassowrd,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser };
