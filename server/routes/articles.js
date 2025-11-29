import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// GET all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load articles" });
  }
});

// CREATE article
router.post("/", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create article" });
  }
});

// UPDATE article
router.put("/:id", async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update article" });
  }
});

// DELETE article
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete article" });
  }
});

export default router;
