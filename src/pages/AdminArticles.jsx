import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", category: "" });
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // READ – load from API on mount
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setApiError("");
      try {
        const res = await fetch(`${API_BASE}/articles`);
        if (!res.ok) throw new Error("Failed to load articles from API");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const resetForm = () => {
    setForm({ id: null, title: "", category: "" });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim()) return;

    try {
      setApiError("");

      if (isEditing) {
        // UPDATE existing article via API
        const res = await fetch(`${API_BASE}/articles/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            category: form.category,
          }),
        });
        if (!res.ok) throw new Error("Failed to update article");
        const updated = await res.json();
        setArticles((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
      } else {
        // CREATE new article via API
        const res = await fetch(`${API_BASE}/articles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            category: form.category,
          }),
        });
        if (!res.ok) throw new Error("Failed to create article");
        const created = await res.json();
        setArticles((prev) => [...prev, created]);
      }

      resetForm();
    } catch (err) {
      setApiError(err.message);
    }
  };

  const handleEdit = (article) => {
    setForm(article);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    try {
      setApiError("");
      const res = await fetch(`${API_BASE}/articles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete article");
      setArticles((prev) => prev.filter((a) => a.id !== id));
      if (isEditing && form.id === id) resetForm();
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <main className="page">
      <h1 className="hero-title">Admin – Manage Articles</h1>
      <p className="hero-text">
        Add new articles, edit existing entries, or delete outdated content.
        Data is stored in a mock API (JSON Server) instead of only in memory.
      </p>

      {apiError && <div className="login-error">{apiError}</div>}
      {loading && <p className="login-subtitle">Loading articles...</p>}

      {/* List of articles */}
      <section className="grid-sections">
        <div className="card">
          <h2 className="card-title">Existing Articles</h2>
          <p className="card-text">
            Select an article to edit or delete. Use the form on the right to
            save your changes.
          </p>
          <ul className="admin-article-list">
            {articles.map((article) => (
              <li key={article.id} className="admin-article-item">
                <div>
                  <div className="admin-article-title">{article.title}</div>
                  <div className="admin-article-meta">{article.category}</div>
                </div>
                <div className="admin-article-actions">
                  <button
                    className="link-chip"
                    onClick={() => handleEdit(article)}
                  >
                    Edit
                  </button>
                  <button
                    className="link-chip link-chip--danger"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {!loading && articles.length === 0 && (
              <li className="admin-article-empty">
                No articles yet. Use the form to add one.
              </li>
            )}
          </ul>
        </div>

        {/* Add / edit form */}
        <div className="card">
          <h2 className="card-title">
            {isEditing ? "Edit Article" : "Add New Article"}
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
                placeholder="e.g., Fundamental Rights – Overview"
                required
              />
            </label>

            <label className="form-label">
              Category / Section
              <input
                type="text"
                className="form-input"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="e.g., Rights, Duties, Preamble"
                required
              />
            </label>

            <div className="admin-article-form-actions">
              <button type="submit" className="btn-primary">
                {isEditing ? "Save Changes" : "Add Article"}
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

export default AdminArticles;
