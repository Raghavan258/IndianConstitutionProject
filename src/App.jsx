import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AboutConstitution from "./pages/AboutConstitution.jsx";
import Articles from "./pages/Articles.jsx";
import VideoLibrary from "./pages/VideoLibrary.jsx";
import StudyNotes from "./pages/StudyNotes.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import Forums from "./pages/Forums.jsx";
import AdminArticles from "./pages/AdminArticles.jsx";
import AdminModules from "./pages/AdminModules.jsx";
import AdminQuizzes from "./pages/AdminQuizzes.jsx";
import "./index.css";
import ConstitutionExplore from "./pages/ConstitutionExplore.jsx";

const API_BASE = "http://localhost:5000";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  // Restore session from localStorage on refresh
  useEffect(() => {
    const stored = localStorage.getItem("session");
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (session.isAuthenticated && session.role) {
          setIsAuthenticated(true);
          setUserRole(session.role);
          setUserId(session.userId || null);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Async login that talks to Node + Mongo backend
  const handleLogin = async (email, password, role) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { ok: false, message: data.message || "Login failed." };
      }

      setIsAuthenticated(true);
      setUserRole(data.user.role);
      setUserId(data.user.id);

      localStorage.setItem(
        "session",
        JSON.stringify({
          token: data.token,
          role: data.user.role,
          email: data.user.email,
          userId: data.user.id,
          isAuthenticated: true,
        })
      );

      return { ok: true };
    } catch {
      return { ok: false, message: "Network error. Please try again." };
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    localStorage.removeItem("session");
  };

  return (
    <div className="app-root">
      {isAuthenticated && <Navbar onLogout={handleLogout} role={userRole} />}

      <Routes>
        <Route
          path="/videos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <VideoLibrary role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
  path="/constitution-explore"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <ConstitutionExplore />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminArticles role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modules"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminModules role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminQuizzes role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <StudyNotes role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forums"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Forums role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Quizzes role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home role={userRole} userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AboutConstitution role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Articles role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
