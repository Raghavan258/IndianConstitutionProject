import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import queryRoutes from "./routes/queries.js";
import articleRoutes from "./routes/articles.js"; // <- add this

const app = express();
const PORT = 5000;

const MONGO_URI =
  "mongodb+srv://Raghavan:Raghavan%40258@cluster0.fctznwq.mongodb.net/constitution_portal?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/queries", queryRoutes);
app.use("/articles", articleRoutes); // <- add this

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
