import React, { useState } from "react";

function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Constitution Basics Quiz", questions: 10, level: "Easy" },
    { id: 2, title: "Fundamental Rights Quiz", questions: 12, level: "Medium" },
    { id: 3, title: "Fundamental Duties Scenario Quiz", questions: 8, level: "Hard" },
  ]);

  const [form, setForm] = useState({
    id: null,
    title: "",
    questions: 5,
    level: "Easy",
  });
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setForm({ id: null, title: "", questions: 5, level: "Easy" });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const qCount = Number(form.questions) || 0;

    if (isEditing) {
      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === form.id
            ? { ...q, title: form.title, questions: qCount, level: form.level }
            : q
        )
      );
    } else {
      const nextId = quizzes.length ? Math.max(...quizzes.map((q) => q.id)) + 1 : 1;
      setQuizzes((prev) => [
        ...prev,
        { id: nextId, title: form.title, questions: qCount, level: form.level },
      ]);
    }
    resetForm();
  };

  const handleEdit = (quiz) => {
    setForm(quiz);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this quiz? (demo only)")) return;
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    if (isEditing && form.id === id) resetForm();
  };

  return (
    <main className="page">
      <h1 className="hero-title">Admin – Manage Quizzes</h1>
      <p className="hero-text">
        Configure quizzes and assessments available to students. (Demo view)
      </p>

      <section className="grid-sections">
        <div className="card">
          <h2 className="card-title">Existing Quizzes</h2>
          <ul className="admin-article-list">
            {quizzes.map((quiz) => (
              <li key={quiz.id} className="admin-article-item">
                <div>
                  <div className="admin-article-title">{quiz.title}</div>
                  <div className="admin-article-meta">
                    {quiz.questions} questions • {quiz.level}
                  </div>
                </div>
                <div className="admin-article-actions">
                  <button
                    className="link-chip"
                    onClick={() => handleEdit(quiz)}
                  >
                    Edit
                  </button>
                  <button
                    className="link-chip link-chip--danger"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {quizzes.length === 0 && (
              <li className="admin-article-empty">
                No quizzes yet. Use the form to add one.
              </li>
            )}
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">
            {isEditing ? "Edit Quiz" : "Add New Quiz"}
          </h2>
          <form className="admin-article-form" onSubmit={handleSubmit}>
            <label className="form-label">
              Title
              <input
                type="text"
                className="form-input"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g., Rights & Duties Mixed Quiz"
                required
              />
            </label>

            <label className="form-label">
              Number of Questions
              <input
                type="number"
                min="1"
                className="form-input"
                value={form.questions}
                onChange={(e) =>
                  setForm((f) => ({ ...f, questions: e.target.value }))
                }
                required
              />
            </label>

            <label className="form-label">
              Difficulty Level
              <select
                className="form-input"
                value={form.level}
                onChange={(e) =>
                  setForm((f) => ({ ...f, level: e.target.value }))
                }
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>

            <div className="admin-article-form-actions">
              <button type="submit" className="btn-primary">
                {isEditing ? "Save Changes" : "Add Quiz"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="link-chip"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AdminQuizzes;
