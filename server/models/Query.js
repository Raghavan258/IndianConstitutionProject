import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    category: {
      type: String,
      enum: ["preamble", "rights", "duties", "federalism"],
      required: true,
    },
    askedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["open", "in_progress", "answered"],
      default: "open",
    },
    answer: { type: String, default: "" }, // NEW
    answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // NEW
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);
export default Query;
