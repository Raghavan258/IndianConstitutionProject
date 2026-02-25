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
import ConstitutionExplore from "./pages/ConstitutionExplore.jsx";
import "./index.css";

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

  // Frontend-only login (no backend)
  const handleLogin = async (email, password) => {
  try {
    const users = [
      {
        id: "1",
        email: "admin@gmail.com",
        password: "admin123",
        role: "Admin",
      },
      {
        id: "2",
        email: "student@gmail.com",
        password: "1234",
        role: "Citizen / Student",
      },
      {
        id: "3",
        email: "educator@gmail.com",
        password: "educator123",
        role: "Educator",
      },
      {
        id: "4",
        email: "legal@gmail.com",
        password: "legal123",
        role: "Legal Expert",
      },
    ];

    const foundUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!foundUser) {
      return { ok: false, message: "Invalid credentials." };
    }

    setIsAuthenticated(true);
    setUserRole(foundUser.role);
    setUserId(foundUser.id);

    localStorage.setItem(
      "session",
      JSON.stringify({
        role: foundUser.role,
        email: foundUser.email,
        userId: foundUser.id,
        isAuthenticated: true,
      })
    );

    return { ok: true };
  } catch {
    return { ok: false, message: "Login failed." };
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
      {isAuthenticated && (
        <Navbar onLogout={handleLogout} role={userRole} />
      )}

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