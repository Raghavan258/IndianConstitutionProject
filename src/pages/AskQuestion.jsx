import React, { useState } from "react";

const API_BASE = "http://localhost:5000";

function AskQuestion({ userId }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("preamble");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, category, askedBy: userId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to submit query.");
        return;
      }
      setMessage(
        `Query submitted and assigned to ${data.assignedEducator.name}.`
      );
      setText("");
    } catch (err) {
      console.error(err);
      setMessage("Network error.");
    }
  };

  return (
    <div className="page">
      <h2>Ask a Question</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label className="form-label">
          Category
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="preamble">Preamble</option>
            <option value="rights">Fundamental Rights</option>
            <option value="duties">Fundamental Duties</option>
            <option value="federalism">Federalism</option>
          </select>
        </label>

        <label className="form-label">
          Question
          <textarea
            className="form-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn-primary">
          Submit Query
        </button>
      </form>
    </div>
  );
}

export default AskQuestion;
