import express from "express";
import Query from "../models/Query.js";
import User from "../models/User.js";

const router = express.Router();

// POST /api/queries  -> create + assign
router.post("/", async (req, res) => {
  try {
    const { text, category, askedBy } = req.body;

    const educators = await User.find({
      role: "educator",
      expertise: category,
    }).sort({ createdAt: 1 });

    if (!educators.length) {
      return res
        .status(404)
        .json({ message: "No educator available for this category." });
    }

    const assigned =
      educators[Math.floor(Math.random() * educators.length)];

    const query = await Query.create({
      text,
      category,
      askedBy,
      assignedTo: assigned._id,
    });

    return res.status(201).json({
      message: "Query created and assigned.",
      query,
      assignedEducator: {
        id: assigned._id,
        name: assigned.name,
        email: assigned.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// GET /api/queries?assignedTo=<educatorId>&askedBy=<citizenId>&status=&category=
router.get("/", async (req, res) => {
  try {
    const { assignedTo, askedBy, status, category } = req.query;
    const filters = {};
    if (assignedTo) filters.assignedTo = assignedTo;
    if (askedBy) filters.askedBy = askedBy;
    if (status) filters.status = status;
    if (category) filters.category = category;

    const queries = await Query.find(filters)
      .sort({ createdAt: -1 })
      .populate("askedBy", "name email")
      .populate("assignedTo", "name email");

    return res.json(queries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/queries/:id/answer  -> educator submits answer
router.patch("/:id/answer", async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, educatorId } = req.body;

    if (!answer) {
      return res.status(400).json({ message: "Answer is required." });
    }

    const query = await Query.findByIdAndUpdate(
      id,
      {
        answer,
        answeredBy: educatorId,
        status: "answered",
      },
      { new: true }
    )
      .populate("askedBy", "name email")
      .populate("assignedTo", "name email");

    if (!query) {
      return res.status(404).json({ message: "Query not found." });
    }

    return res.json({
      message: "Answer saved.",
      query,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

export default router;
