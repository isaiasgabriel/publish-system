const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Usuário já está disponível no req.user graças ao middleware
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Falha ao puxar dados do usuário" });
  }
};

module.exports = { getUserProfile };
