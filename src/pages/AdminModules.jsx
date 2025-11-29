import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:4000";

function AdminModules() {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", status: "Draft" });
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // READ – load modules from API
  useEffect(() => {
    const loadModules = async () => {
      setLoading(true);
      setApiError("");
      try {
        const res = await fetch(`${API_BASE}/modules`);
        if (!res.ok) throw new Error("Failed to load modules");
        const data = await res.json();
        setModules(data);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadModules();
  }, []);

  const resetForm = () => {
    setForm({ id: null, title: "", status: "Draft" });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      setApiError("");

      if (isEditing) {
        // UPDATE existing module
        const res = await fetch(`${API_BASE}/modules/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            status: form.status,
          }),
        });
        if (!res.ok) throw new Error("Failed to update module");
        const updated = await res.json();
        setModules((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
      } else {
        // CREATE new module
        const res = await fetch(`${API_BASE}/modules`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            status: form.status,
          }),
        });
        if (!res.ok) throw new Error("Failed to create module");
        const created = await res.json();
        setModules((prev) => [...prev, created]);
      }

      resetForm();
    } catch (err) {
      setApiError(err.message);
    }
  };

  const handleEdit = (mod) => {
    setForm(mod);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this module?")) return;
    try {
      setApiError("");
      const res = await fetch(`${API_BASE}/modules/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete module");
      setModules((prev) => prev.filter((m) => m.id !== id));
      if (isEditing && form.id === id) resetForm();
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <main className="page">
      <h1 className="hero-title">Admin – Manage Learning Modules</h1>
      <p className="hero-text">
        Add, update, or remove learning modules created by educators. Data is
        stored in the mock API.
      </p>

      {apiError && <div className="login-error">{apiError}</div>}
      {loading && <p className="login-subtitle">Loading modules...</p>}

      <section className="grid-sections">
        <div className="card">
          <h2 className="card-title">Existing Modules</h2>
          <ul className="admin-article-list">
            {modules.map((mod) => (
              <li key={mod.id} className="admin-article-item">
                <div>
                  <div className="admin-article-title">{mod.title}</div>
                  <div className="admin-article-meta">
                    Status: {mod.status}
                  </div>
                </div>
                <div className="admin-article-actions">
                  <button
                    className="link-chip"
                    onClick={() => handleEdit(mod)}
                  >
                    Edit
                  </button>
                  <button
                    className="link-chip link-chip--danger"
                    onClick={() => handleDelete(mod.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {!loading && modules.length === 0 && (
              <li className="admin-article-empty">
                No modules yet. Use the form to add one.
              </li>
            )}
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">
            {isEditing ? "Edit Module" : "Add New Module"}
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
                placeholder="e.g., Fundamental Rights – Part 2"
                required
              />
            </label>

            <label className="form-label">
              Status
              <select
                className="form-input"
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
              >
                <option value="Draft">Draft</option>
                <option value="In Review">In Review</option>
                <option value="Live">Live</option>
              </select>
            </label>

            <div className="admin-article-form-actions">
              <button type="submit" className="btn-primary">
                {isEditing ? "Save Changes" : "Add Module"}
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

export default AdminModules;
