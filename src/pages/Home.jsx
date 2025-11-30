import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";

/* ---------------- Admin Dashboard ---------------- */

function AdminDashboard() {
  const navigate = useNavigate();

  const [adminDuties, setAdminDuties] = useState([
    {
      id: 1,
      text: "Keep platform content accurate and updated.",
      done: false,
    },
    {
      id: 2,
      text: "Ensure smooth functioning and uptime of the platform.",
      done: false,
    },
    {
      id: 3,
      text: "Maintain security and protect user data privacy.",
      done: false,
    },
    {
      id: 4,
      text: "Resolve user complaints and technical issues quickly.",
      done: false,
    },
    {
      id: 5,
      text: "Moderate discussions and remove inappropriate content.",
      done: false,
    },
  ]);

  const toggleAdminDuty = (id) => {
    setAdminDuties((prev) =>
      prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d))
    );
  };

  const [usersByRole] = useState({
    student: [
      { id: 1, name: "Aarav", email: "aarav@example.com" },
      { id: 2, name: "Sara", email: "sara@example.com" },
    ],
    educator: [
      { id: 3, name: "Meera", email: "meera.educator@example.com" },
      { id: 4, name: "Ravi", email: "ravi.educator@example.com" },
    ],
    legal: [{ id: 5, name: "Adv. Kumar", email: "kumar.legal@example.com" }],
  });

  const [pendingLessons] = useState([
    {
      id: 101,
      title: "Preamble – Simple Explanation",
      author: "Meera",
      summary: "Short lesson explaining each word in the Preamble.",
    },
    {
      id: 102,
      title: "Fundamental Rights Case Studies",
      author: "Ravi",
      summary: "Real‑life examples of rights being upheld or violated.",
    },
  ]);

  const [violations] = useState([
    {
      id: 201,
      user: "Aarav",
      issue: "Posted off‑topic content in Rights forum",
      severity: "Minor",
    },
    {
      id: 202,
      user: "UnknownUser123",
      issue: "Used abusive language in Duties discussion",
      severity: "Major",
    },
  ]);

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "users" | "lessons" | "lessonDetail" | "violations"
  const [selectedRole, setSelectedRole] = useState("student");
  const [selectedLesson, setSelectedLesson] = useState(null);

  const openUsersModal = (roleKey) => {
    setSelectedRole(roleKey);
    setModalType("users");
    setAdminModalOpen(true);
  };

  const openLessonsModal = () => {
    setModalType("lessons");
    setSelectedLesson(null);
    setAdminModalOpen(true);
  };

  const openLessonDetail = (lesson) => {
    setSelectedLesson(lesson);
    setModalType("lessonDetail");
    setAdminModalOpen(true);
  };

  const openViolationsModal = () => {
    setModalType("violations");
    setAdminModalOpen(true);
  };

  const handleLessonDecision = (decision) => {
    alert(`Marked lesson as ${decision} (demo only).`);
    setAdminModalOpen(false);
    setSelectedLesson(null);
    setModalType(null);
  };

  const handleDisableUser = (userName) => {
    alert(`User "${userName}" would be disabled (demo only).`);
  };

  const closeAdminModal = () => {
    setAdminModalOpen(false);
    setModalType(null);
    setSelectedLesson(null);
  };

  const renderAdminModalContent = () => {
    if (!modalType) return null;

    if (modalType === "users") {
      const list =
        selectedRole === "student"
          ? usersByRole.student
          : selectedRole === "educator"
          ? usersByRole.educator
          : usersByRole.legal;

      const roleLabel =
        selectedRole === "student"
          ? "Students / Citizens"
          : selectedRole === "educator"
          ? "Educators"
          : "Legal Experts";

      return (
        <>
          <h2 className="modal-title">{roleLabel}</h2>
          <p className="modal-text">
            Demo list of registered {roleLabel.toLowerCase()} on the platform.
          </p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (modalType === "lessons") {
      return (
        <>
          <h2 className="modal-title">Pending Lessons / Legal Notes</h2>
          <p className="modal-text">
            Click a lesson to review details and approve or reject it.
          </p>
          <ul className="admin-article-list">
            {pendingLessons.map((l) => (
              <li
                key={l.id}
                className="admin-article-item"
                onClick={() => openLessonDetail(l)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <div className="admin-article-title">{l.title}</div>
                  <div className="admin-article-meta">Author: {l.author}</div>
                </div>
                <span className="admin-article-meta">Tap to review</span>
              </li>
            ))}
          </ul>
        </>
      );
    }

    if (modalType === "lessonDetail" && selectedLesson) {
      return (
        <>
          <h2 className="modal-title">{selectedLesson.title}</h2>
          <p className="modal-text">
            Author: {selectedLesson.author}
            <br />
            Summary: {selectedLesson.summary}
          </p>
          <div className="admin-article-form-actions">
            <button
              className="btn-primary"
              onClick={() => handleLessonDecision("Approved")}
            >
              Approve
            </button>
            <button
              type="button"
              className="link-chip link-chip--danger"
              onClick={() => handleLessonDecision("Rejected")}
            >
              Reject
            </button>
          </div>
        </>
      );
    }

    if (modalType === "violations") {
      return (
        <>
          <h2 className="modal-title">User Violations</h2>
          <p className="modal-text">
            Demo list of reported violations with an option to disable users.
          </p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Violation</th>
                <th>Severity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {violations.map((v) => (
                <tr key={v.id}>
                  <td>{v.user}</td>
                  <td>{v.issue}</td>
                  <td>{v.severity}</td>
                  <td>
                    <button
                      className="link-chip link-chip--danger"
                      onClick={() => handleDisableUser(v.user)}
                    >
                      Disable User (demo)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {adminModalOpen && (
        <div className="modal-backdrop" onClick={closeAdminModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {renderAdminModalContent()}
            <button className="btn-primary" onClick={closeAdminModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="card-title">Content Management</h2>
        <p className="card-text">
          Create, update, or remove learning content such as articles, modules,
          and quizzes.
        </p>
        <div className="card-actions">
          <button
            className="link-chip"
            onClick={() => navigate("/admin/articles")}
          >
            Manage Articles (demo)
          </button>
          <button
            className="link-chip"
            onClick={() => navigate("/admin/modules")}
          >
            Manage Modules (demo)
          </button>
          <button
            className="link-chip"
            onClick={() => navigate("/admin/quizzes")}
          >
            Manage Quizzes (demo)
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">User & Submission Control</h2>
        <p className="card-text">
          Oversee user accounts and approve or reject educator / expert
          submissions.
        </p>
        <div className="card-actions">
          <button
            className="link-chip"
            onClick={() => openUsersModal("student")}
          >
            View Students
          </button>
          <button
            className="link-chip"
            onClick={() => openUsersModal("educator")}
          >
            View Educators
          </button>
          <button
            className="link-chip"
            onClick={() => openUsersModal("legal")}
          >
            View Legal Experts
          </button>
          <button className="link-chip" onClick={openLessonsModal}>
            Review Lessons / Notes
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Monitoring & Reports</h2>
        <p className="card-text">
          Track platform activity and quickly respond to complaints or issues.
        </p>
        <ul className="article-list">
          <li>Monitor daily logins, active modules, and quiz attempts.</li>
          <li>Review reported posts or discussions that may need moderation.</li>
          <li>Download simple usage reports for review (demo placeholder).</li>
        </ul>
        <div className="card-actions" style={{ marginTop: 8 }}>
          <button
            className="link-chip link-chip--danger"
            onClick={openViolationsModal}
          >
            View User Violations
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Admin Duties Checklist</h2>
        <p className="card-text">
          Mark each duty as completed for this week once you have addressed it.
        </p>
        <ul className="duties-list">
          {adminDuties.map((duty) => (
            <li key={duty.id} className="duty-item">
              <label className="duty-label">
                <input
                  type="checkbox"
                  className="duty-checkbox"
                  checked={duty.done}
                  onChange={() => toggleAdminDuty(duty.id)}
                />
                <span
                  className={
                    "duty-text" + (duty.done ? " duty-text--done" : "")
                  }
                >
                  {duty.text}
                </span>
              </label>
              <span className="duty-status">
                {duty.done ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ---------------- Educator Dashboard ---------------- */

function EducatorDashboard({ userId }) {
  const [queries, setQueries] = useState([]);
  const [answerDrafts, setAnswerDrafts] = useState({});

  // Demo modules but now editable
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Preamble Basics",
      status: "Published",
      description: "Simple explanation of the Preamble with classroom examples.",
      videoUrl: "",
    },
    {
      id: 2,
      title: "Fundamental Rights – Part 1",
      status: "Draft",
      description: "First part of a module on equality and freedom rights.",
      videoUrl: "",
    },
    {
      id: 3,
      title: "Duties in Daily Life",
      status: "In Review",
      description: "Connecting Article 51A duties to students’ daily routines.",
      videoUrl: "",
    },
  ]);

  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [moduleForm, setModuleForm] = useState({
    title: "",
    description: "",
    status: "Draft",
    videoUrl: "",
  });

  const statusClass = (status) =>
    `educator-module-status educator-module-status--${status
      .toLowerCase()
      .replace(" ", "-")}`;

  useEffect(() => {
    const loadQueries = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/queries?assignedTo=${userId}`);
        const data = await res.json();
        setQueries(data);
      } catch (err) {
        console.error("Error loading educator queries:", err);
      }
    };

    if (userId) {
      loadQueries();
    }
  }, [userId]);

  const openModuleEditor = (m) => {
    setEditingModule(m);
    setModuleForm({
      title: m.title,
      description: m.description || "",
      status: m.status,
      videoUrl: m.videoUrl || "",
    });
    setModuleModalOpen(true);
  };

  const closeModuleEditor = () => {
    setModuleModalOpen(false);
    setEditingModule(null);
  };

  const handleModuleSave = (e) => {
    e.preventDefault();
    if (!editingModule) return;

    setModules((prev) =>
      prev.map((m) =>
        m.id === editingModule.id ? { ...m, ...moduleForm } : m
      )
    );
    closeModuleEditor();
  };

  return (
    <>
      {/* Teaching Toolkit – original card */}
      <div className="card">
        <h2 className="card-title">Teaching Toolkit</h2>
        <p className="card-text">
          Create and manage interactive lessons on rights, duties, and key
          Articles.
        </p>
        <ul className="article-list">
          <li>Build multimedia lessons with text, images, and quizzes.</li>
          <li>Re-use successful modules across different batches.</li>
          <li>Align each lesson with specific constitutional Articles.</li>
        </ul>
      </div>

      {/* Module Pipeline – editable with video URL */}
      <div className="card">
        <h2 className="card-title">Module Pipeline</h2>
        <p className="card-text">
          Track where your content is in the creation–review–publish cycle.
        </p>
        <ul className="educator-modules">
          {modules.map((m) => (
            <li
              key={m.id}
              className="educator-module-item"
              onClick={() =>
                m.status !== "Published" ? openModuleEditor(m) : null
              }
              style={m.status !== "Published" ? { cursor: "pointer" } : {}}
            >
              <span className="educator-module-name">{m.title}</span>
              <span className={statusClass(m.status)}>{m.status}</span>
            </li>
          ))}
        </ul>
        <p className="password-hint">
          Click a Draft or In Review module to edit text or attach a video
          lecture link.
        </p>
      </div>

      {/* Assigned Queries – with notification badge + chat-style view */}
      <div className="card">
        <h2 className="card-title">
          Assigned Queries
          {queries.length > 0 && (
            <span
              style={{
                marginLeft: "8px",
                fontSize: "0.8rem",
                background: "#dc2626",
                color: "#ffffff",
                borderRadius: "999px",
                padding: "2px 8px",
              }}
            >
              {queries.length} new
            </span>
          )}
        </h2>
        <p className="card-text">
          Questions from citizens routed to you based on your expertise.
        </p>
        {queries.length === 0 ? (
          <p className="card-text">No queries assigned yet.</p>
        ) : (
          <ul className="article-list">
            {queries.map((q) => (
              <li key={q._id} style={{ marginBottom: "1rem" }}>
                {/* Chat bubble for citizen question */}
                <div
                  style={{
                    padding: "8px 10px",
                    borderRadius: "12px",
                    background: "#eff6ff",
                    color: "#1e3a8a",
                    fontSize: "0.9rem",
                  }}
                >
                  <strong>Citizen:</strong> [{q.category}] {q.text}{" "}
                  {q.askedBy && `— ${q.askedBy.name}`}
                </div>

                {/* Educator answer bubble or reply form */}
                {q.answer ? (
                  <div
                    style={{
                      marginTop: "0.3rem",
                      padding: "8px 10px",
                      borderRadius: "12px",
                      background: "#dcfce7",
                      color: "#166534",
                      fontSize: "0.9rem",
                    }}
                  >
                    <strong>You:</strong> {q.answer}
                  </div>
                ) : (
                  <form
                    style={{ marginTop: "0.4rem" }}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const answer = (answerDrafts[q._id] || "").trim();
                      if (!answer) return;

                      try {
                        const res = await fetch(
                          `${API_BASE}/api/queries/${q._id}/answer`,
                          {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              answer,
                              educatorId: userId,
                            }),
                          }
                        );
                        const data = await res.json();
                        if (!res.ok) {
                          alert(data.message || "Failed to save answer.");
                          return;
                        }
                        setQueries((prev) =>
                          prev.map((item) =>
                            item._id === q._id ? data.query : item
                          )
                        );
                        setAnswerDrafts((prev) => ({
                          ...prev,
                          [q._id]: "",
                        }));
                      } catch (err) {
                        console.error(err);
                        alert("Network error while saving answer.");
                      }
                    }}
                  >
                    <textarea
                      className="form-textarea"
                      rows="2"
                      placeholder="Reply to this query..."
                      value={answerDrafts[q._id] || ""}
                      onChange={(e) =>
                        setAnswerDrafts((prev) => ({
                          ...prev,
                          [q._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ marginTop: "0.3rem" }}
                    >
                      Send Reply
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Module edit modal */}
      {moduleModalOpen && editingModule && (
        <div className="modal-backdrop" onClick={closeModuleEditor}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Edit Module</h2>
            <p className="modal-text">
              Update the title, description, status, or attach a video lecture
              URL.
            </p>
            <form onSubmit={handleModuleSave} className="student-query-form">
              <label className="form-label">
                Title
                <input
                  className="form-input"
                  value={moduleForm.title}
                  onChange={(e) =>
                    setModuleForm((f) => ({ ...f, title: e.target.value }))
                  }
                  required
                />
              </label>

              <label className="form-label">
                Description
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={moduleForm.description}
                  onChange={(e) =>
                    setModuleForm((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                />
              </label>

              <label className="form-label">
                Status
                <select
                  className="form-input"
                  value={moduleForm.status}
                  onChange={(e) =>
                    setModuleForm((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="In Review">In Review</option>
                  <option value="Published">Published</option>
                </select>
              </label>

              <label className="form-label">
                Video lecture URL
                <input
                  className="form-input"
                  value={moduleForm.videoUrl}
                  onChange={(e) =>
                    setModuleForm((f) => ({ ...f, videoUrl: e.target.value }))
                  }
                  placeholder="YouTube link or video file URL"
                />
              </label>

              <div className="admin-article-form-actions">
                <button type="submit" className="btn-primary">
                  Save Module
                </button>
                <button
                  type="button"
                  className="link-chip"
                  onClick={closeModuleEditor}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Citizen Dashboard ---------------- */

function CitizenDashboard({ userId }) {
  const navigate = useNavigate();
  const learningProgress = 55;
  const quizzesCompleted = 3;
  const badgesEarned = 2;

  const [duties, setDuties] = useState([
    {
      id: 1,
      text: "Actively engage in learning modules and complete them on time.",
      done: false,
    },
    {
      id: 2,
      text: "Attempt quizzes honestly without unfair means.",
      done: false,
    },
    {
      id: 3,
      text: "Maintain respectful and inclusive behaviour in forums.",
      done: false,
    },
    {
      id: 4,
      text: "Report any inappropriate content or misuse you notice.",
      done: false,
    },
  ]);

  const [queryMessage, setQueryMessage] = useState("");
  const [myQueries, setMyQueries] = useState([]);

  // Demo educator modules visible to citizens when Published
  const [educatorModules, setEducatorModules] = useState([]);

  const toggleDuty = (id) => {
    setDuties((prev) =>
      prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d))
    );
  };

  const loadMyQueries = async (uid, setFn) => {
    if (!uid) return;
    try {
      const res = await fetch(`${API_BASE}/api/queries?askedBy=${uid}`);
      const data = await res.json();
      setFn(data);
    } catch (err) {
      console.error("Error loading my queries:", err);
    }
  };

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    setQueryMessage("");
    const form = e.currentTarget;

    const data = new FormData(form);
    const topic = data.get("topic");
    const question = data.get("question");

    const category =
      topic === "rights"
        ? "rights"
        : topic === "duties"
        ? "duties"
        : topic === "preamble"
        ? "preamble"
        : "federalism";

    try {
      const res = await fetch(`${API_BASE}/api/queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: question,
          category,
          askedBy: userId,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setQueryMessage(json.message || "Failed to submit query.");
        return;
      }
      setQueryMessage(
        `Query submitted and assigned to ${json.assignedEducator.name}.`
      );
      if (form) {
        form.reset();
      }
      await loadMyQueries(userId, setMyQueries);
    } catch (err) {
      console.error(err);
      setQueryMessage("Network error. Please try again.");
    }
  };

  useEffect(() => {
    if (userId) {
      loadMyQueries(userId, setMyQueries);
    }

    // Demo educator modules; replace with API call later if needed
    setEducatorModules([
      {
        id: 1,
        title: "Preamble Basics",
        status: "Published",
        description:
          "Simple explanation of the Preamble with classroom examples.",
        videoUrl: "",
      },
      {
        id: 2,
        title: "Fundamental Rights – Part 1",
        status: "Draft",
        description: "",
        videoUrl: "",
      },
      {
        id: 3,
        title: "Duties in Daily Life",
        status: "In Review",
        description: "",
        videoUrl: "",
      },
    ]);
  }, [userId]);

  const publishedModules = educatorModules.filter(
    (m) =>
      (m.status === "Published" || m.status === "published") &&
      (m.description || m.videoUrl)
  );

  return (
    <>
      {/* Citizen image hero strip */}
      <div className="citizen-hero-strip">
        <button
          className="citizen-hero-card"
          onClick={() => navigate("/constitution-explore")}
        >
          <img
            src="/IndianConstitutionProject/parliament.jpg"
            alt="Indian Parliament building"
            className="citizen-hero-image"
          />
          <div className="citizen-hero-caption">Indian Constitution</div>
        </button>

        <button
          className="citizen-hero-card"
          onClick={() =>
            navigate("/constitution-explore?section=supremeCourt")
          }
        >
          <img
            src="/IndianConstitutionProject/supreme court.png"
            alt="Supreme Court of India"
            className="citizen-hero-image"
          />
          <div className="citizen-hero-caption">Judiciary in India</div>
        </button>

        <button
          className="citizen-hero-card"
          onClick={() => navigate("/constitution-explore?section=ambedkar")}
        >
          <img
            src="/IndianConstitutionProject/br ambedhkar.png"
            alt="Dr B. R. Ambedkar"
            className="citizen-hero-image"
          />
          <div className="citizen-hero-caption">
            Dr B. R. Ambedkar &amp; the Constitution
          </div>
        </button>
      </div>

      {/* My Learning Hub */}
      <div className="card">
        <h2 className="card-title">My Learning Hub</h2>
        <p className="card-text">
          View constitutional articles, learning videos, notes, and quizzes.
        </p>

        <div className="student-links">
          <button
            className="link-chip"
            onClick={() => navigate("/videos")}
          >
            Open Video Library
          </button>
          <button
            className="link-chip"
            onClick={() => navigate("/notes")}
          >
            Open Study Notes
          </button>
          <button
            className="link-chip"
            onClick={() => navigate("/quizzes")}
          >
            Attempt Quizzes
          </button>
          <button
            className="link-chip"
            onClick={() => navigate("/constitution-explore")}
          >
            Explore Constitution with Images
          </button>
        </div>

        <div className="student-progress">
          <div className="student-progress-row">
            <span>Overall progress</span>
            <span>{learningProgress}%</span>
          </div>
          <div className="student-progress-bar">
            <div
              className="student-progress-fill"
              style={{ width: `${learningProgress}%` }}
            />
          </div>
          <div className="student-progress-meta">
            <span>{quizzesCompleted} quizzes completed</span>
            <span>{badgesEarned} badges earned</span>
          </div>
        </div>
      </div>

      {/* Published educator modules for citizens */}
      {publishedModules.length > 0 && (
        <div className="card">
          <h2 className="card-title">Educator Modules for You</h2>
          <p className="card-text">
            Access modules that educators have published for citizen learning.
          </p>
          <ul className="article-list">
            {publishedModules.map((m) => (
              <li key={m.id} style={{ marginBottom: "0.5rem" }}>
                <div className="educator-module-name">{m.title}</div>
                {m.description && (
                  <div className="admin-article-meta">{m.description}</div>
                )}
                {m.videoUrl && (
                  <a
                    href={m.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-chip"
                    style={{ marginTop: "4px", display: "inline-block" }}
                  >
                    Open Video Lecture
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <h2 className="card-title">Community & Support</h2>
        <p className="card-text">
          Participate in topic-wise discussions and submit queries to educators
          or legal experts.
        </p>

        <div className="student-links">
          <button
            className="link-chip"
            onClick={() => navigate("/forums?topic=preamble")}
          >
            Preamble Forum
          </button>
          <button
            className="link-chip"
            onClick={() => navigate("/forums?topic=rights")}
          >
            Rights Forum
          </button>
          <button
            className="link-chip"
            onClick={() => navigate("/forums?topic=duties")}
          >
            Duties Forum
          </button>
        </div>

        {queryMessage && <p className="login-success">{queryMessage}</p>}

        <form className="student-query-form" onSubmit={handleSubmitQuery}>
          <label className="form-label">
            Topic
            <select name="topic" className="form-input">
              <option value="preamble">Preamble</option>
              <option value="rights">Fundamental Rights</option>
              <option value="duties">Fundamental Duties</option>
              <option value="federalism">Federalism / Other</option>
            </select>
          </label>
          <label className="form-label">
            Your question
            <textarea
              name="question"
              className="form-textarea"
              rows="3"
              placeholder="Type your doubt for the educator or legal expert..."
              required
            />
          </label>
          <button type="submit" className="btn-primary">
            Submit Query
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="card-title">My Duties as a Learner</h2>
        <p className="card-text">
          Tick each duty once you have followed it consistently.
        </p>
        <ul className="duties-list">
          {duties.map((duty) => (
            <li key={duty.id} className="duty-item">
              <label className="duty-label">
                <input
                  type="checkbox"
                  className="duty-checkbox"
                  checked={duty.done}
                  onChange={() => toggleDuty(duty.id)}
                />
                <span
                  className={
                    "duty-text" + (duty.done ? " duty-text--done" : "")
                  }
                >
                  {duty.text}
                </span>
              </label>
              <span className="duty-status">
                {duty.done ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">My Queries & Answers</h2>
        {myQueries.length === 0 ? (
          <p>You have not submitted any queries yet.</p>
        ) : (
          <ul className="article-list">
            {myQueries.map((q) => (
              <li key={q._id} style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    padding: "8px 10px",
                    borderRadius: "12px",
                    background: "#eff6ff",
                    color: "#1e3a8a",
                    fontSize: "0.9rem",
                  }}
                >
                  <strong>You:</strong> [{q.category}] {q.text}
                </div>
                {q.answer ? (
                  <div
                    style={{
                      marginTop: "0.3rem",
                      padding: "8px 10px",
                      borderRadius: "12px",
                      background: "#dcfce7",
                      color: "#166534",
                      fontSize: "0.9rem",
                    }}
                  >
                    <strong>Educator:</strong> {q.answer}
                  </div>
                ) : (
                  <div style={{ marginTop: "0.3rem", fontSize: "0.9rem" }}>
                    Awaiting answer…
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}


/* ---------------- Legal Expert Dashboard ---------------- */

function LegalExpertDashboard() {
  const updates = [
    {
      title: "Recent Amendment",
      hint: "Summarise impact on Fundamental Rights.",
    },
    {
      title: "Landmark Case",
      hint: "Add plain-language note for citizens.",
    },
    {
      title: "Content Review",
      hint: "Verify accuracy of new modules.",
    },
  ];

  return (
    <>
      <div className="card">
        <h2 className="card-title">Expert Commentary Panel</h2>
        <p className="card-text">
          Provide legal insights, clarify complex Articles, and suggest
          improvements.
        </p>
        <ul className="article-list">
          <li>Attach expert notes to Articles and important judgements.</li>
          <li>Flag misleading or outdated legal explanations.</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Today&apos;s Focus</h2>
        <p className="card-text">
          Quick tasks that help keep the platform up-to-date and accurate.
        </p>
        <ul className="legal-tasks">
          {updates.map((u) => (
            <li key={u.title} className="legal-task-item">
              <span className="legal-task-bullet" />
              <div>
                <div className="legal-task-title">{u.title}</div>
                <div className="legal-task-hint">{u.hint}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ---------------- Generic Info Modal for top cards ---------------- */

function InfoModal({ open, onClose, title, description }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{description}</p>
        <button className="btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ---------------- Home wrapper ---------------- */

function Home({ role, userId }) {
  const navigate = useNavigate();

  const roleTitleMap = {
    admin: "Admin Dashboard",
    educator: "Educator Dashboard",
    citizen: "Citizen Dashboard",
    legal: "Legal Expert Dashboard",
  };

  const dashboardTitle = roleTitleMap[role] || "Citizen Dashboard";

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
  });

  const openInfo = (type) => {
    if (type === "preamble") {
      setModalData({
        title: "About the Preamble",
        description:
          "The Preamble introduces the Constitution and declares India as a Sovereign, Socialist, Secular, Democratic Republic, aiming to secure justice, liberty, equality, and fraternity for all citizens.",
      });
    } else if (type === "rights") {
      setModalData({
        title: "About Fundamental Rights",
        description:
          "Fundamental Rights, mainly in Articles 14–21, protect key freedoms such as equality before law, freedom of speech and expression, and protection of life and personal liberty.",
      });
    } else if (type === "duties") {
      setModalData({
        title: "About Fundamental Duties",
        description:
          "Fundamental Duties under Article 51A remind every citizen to respect the Constitution, promote harmony, protect the environment, and preserve the unity of the nation.",
      });
    }
    setModalOpen(true);
  };

  return (
    <main className="page home-page">
      <InfoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        description={modalData.description}
      />

      <section className="hero">
        <h1 className="hero-title">{dashboardTitle}</h1>
        <p className="hero-text">
          This home view is tailored to your responsibilities on the
          Constitution Awareness platform.
        </p>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/articles")}
          >
            Explore Constitutional Articles
          </button>
        </div>
      </section>

      {/* Top cards */}
      <section className="grid-sections">
        <div className="card">
          <h2 className="card-title">Preamble</h2>
          <p className="card-text">
            Understand the vision, values, and objectives guiding the
            Constitution.
          </p>
          <div className="card-actions">
            <button
              className="link-chip"
              onClick={() => navigate("/articles#preamble")}
            >
              Read Section
            </button>
            <button
              className="link-chip"
              onClick={() => openInfo("preamble")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Fundamental Rights</h2>
          <p className="card-text">
            Explore rights that protect individual freedom and equality.
          </p>
          <div className="card-actions">
            <button
              className="link-chip"
              onClick={() => navigate("/articles#rights")}
            >
              View Rights
            </button>
            <button
              className="link-chip"
              onClick={() => openInfo("rights")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Fundamental Duties</h2>
          <p className="card-text">
            Discover responsibilities expected from every citizen.
          </p>
          <div className="card-actions">
            <button
              className="link-chip"
              onClick={() => navigate("/articles#duties")}
            >
              View Duties
            </button>
            <button
              className="link-chip"
              onClick={() => openInfo("duties")}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Role‑specific dashboards */}
      <section className="grid-sections" style={{ marginTop: 32 }}>
        {role === "admin" && <AdminDashboard />}
        {role === "educator" && <EducatorDashboard userId={userId} />}
        {role === "citizen" && <CitizenDashboard userId={userId} />}
        {role === "legal" && <LegalExpertDashboard />}
      </section>
    </main>
  );
}

export default Home;
