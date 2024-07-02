const express = require("express");
const router = express.Router();
const cors = require("cors");
const validateToken = require("../helpers/validateToken");

//importação dos controllers:
const { loginUser } = require("../controllers/loginUser");
const { registerUser } = require("../controllers/registerUser");
const { getUserProfile } = require("../controllers/getUserProfile");
const { createArticle } = require("../controllers/createArticle");
const {
  getArticles,
  getArticleById,
  getPublishedArticles,
} = require("../controllers/getArticles");
const { deleteArticle } = require("../controllers/deleteArticle");
const { assignEvaluator } = require("../controllers/assignEvaluator");
const { assignScores } = require("../controllers/assignEvaluator");
const { publishArticle } = require("../controllers/publishArticle");

//middleware que se conecta ao front
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", //porta padrão do react
  })
);

//Rotas post
router.post("/login", loginUser);
router.post("/register", validateToken, registerUser);
router.post("/create-article", validateToken, createArticle);
router.post("/article/:id/assign-evaluator", validateToken, assignEvaluator);
router.post("/article/:id/assign-scores", validateToken, assignScores);

//Rotas put
router.put("/article/:id/publish", validateToken, publishArticle);

//Rotas get
router.get("/profile", validateToken, getUserProfile);
router.get("/articles", validateToken, getArticles);
router.get("/article/:id", getArticleById);
router.get("/articles/published", getPublishedArticles);

//Rotas delete
router.delete("/article/:id", validateToken, deleteArticle);

module.exports = router;
