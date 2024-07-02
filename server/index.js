const express = require("express");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/authRotes");
require("dotenv").config();

const app = express();

// conexão com o banco de dados
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log("Database not connected", err));

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
