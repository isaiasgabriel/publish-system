const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  pdfLink: { type: String, required: true },
  authors: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ["submitted", "in_review", "accepted", "rejected"],
    default: "submitted",
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  authorEmail: { type: String, required: true },
  evaluators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  scores: [
    {
      evaluator: { type: Schema.Types.ObjectId, ref: "User" },
      n1: { type: Number, required: true },
      n2: { type: Number, required: true },
      finalScore: { type: Number, required: true }, // N1 * N2
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
