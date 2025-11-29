import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";

function Login({ onLogin, isAuthenticated }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "citizen",
    password: "",
    expertise: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // CAPTCHA state
  const [captcha, setCaptcha] = useState("7K4Q");
  const [captchaInput, setCaptchaInput] = useState("");

  const regenerateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(code);
    setCaptchaInput("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const isStrongPassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(pwd);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await onLogin(email, password, role);
    if (!result.ok) {
      setError(result.message || "Please enter valid credentials.");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // CAPTCHA check
    if (captchaInput.trim().toUpperCase() !== captcha) {
      setError("Security check failed. Please type the code shown above.");
      regenerateCaptcha();
      return;
    }

    if (!isStrongPassword(signupData.password)) {
      setError(
        "Password must have at least 8 characters, including one uppercase, one lowercase, one digit, and one special character."
      );
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      setSuccess("Account created successfully. You can log in now.");
      setMode("login");
      setEmail(signupData.email);
      setRole(signupData.role);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  const expertiseOptions = ["preamble", "rights", "duties", "federalism"];

  return (
    <div className="login-page">
      {/* Fullscreen background video */}
      <video
        className="login-video-bg"
        src="/LOGIN OUTRO.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="login-overlay" />

      {/* Right-side content */}
      <div className="login-content">
        <div className="login-card login-card--glass">
          <header className="login-header">
            <h1 className="login-title">Constitution Awareness Portal</h1>
            <p className="login-subtitle">
              Learn, teach, and uphold the values of the Indian Constitution.
            </p>
          </header>

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          {mode === "login" ? (
            <>
              <h2 className="login-title" style={{ fontSize: "1.3rem" }}>
                Login
              </h2>
              <p className="login-subtitle">
                Sign in to continue to the Constitution Awareness portal.
              </p>

              <form className="login-form" onSubmit={handleLoginSubmit}>
                <label className="form-label">
                  Email
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="form-label">
                  Password
                  <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </label>

                <label className="form-label">
                  Role
                  <select
                    className="form-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="educator">Educator</option>
                    <option value="citizen">Citizen / Student</option>
                    <option value="legal">Legal Expert</option>
                  </select>
                </label>

                <button type="submit" className="btn-primary">
                  Login
                </button>
              </form>

              <p className="login-footer-text">
                New here?{" "}
                <button
                  type="button"
                  className="link-chip"
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setMode("signup");
                    regenerateCaptcha();
                  }}
                >
                  Create an account
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="login-title" style={{ fontSize: "1.3rem" }}>
                Sign Up
              </h2>
              <p className="login-subtitle">
                Create an account to access student, educator, or expert tools.
              </p>

              <form className="login-form" onSubmit={handleSignupSubmit}>
                <label className="form-label">
                  Full name
                  <input
                    type="text"
                    className="form-input"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData((d) => ({ ...d, name: e.target.value }))
                    }
                    required
                  />
                </label>

                <label className="form-label">
                  Email
                  <input
                    type="email"
                    className="form-input"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData((d) => ({ ...d, email: e.target.value }))
                    }
                    required
                  />
                </label>

                <label className="form-label">
                  Phone number
                  <input
                    type="tel"
                    className="form-input"
                    value={signupData.phone}
                    onChange={(e) =>
                      setSignupData((d) => ({ ...d, phone: e.target.value }))
                    }
                    required
                  />
                </label>

                <label className="form-label">
                  Location
                  <input
                    type="text"
                    className="form-input"
                    value={signupData.location}
                    onChange={(e) =>
                      setSignupData((d) => ({
                        ...d,
                        location: e.target.value,
                      }))
                    }
                    required
                  />
                </label>

                <label className="form-label">
                  Role
                  <select
                    className="form-input"
                    value={signupData.role}
                    onChange={(e) =>
                      setSignupData((d) => ({ ...d, role: e.target.value }))
                    }
                  >
                    <option value="citizen">Student / Citizen</option>
                    <option value="educator">Educator</option>
                    <option value="legal">Legal Expert</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>

                {signupData.role === "educator" && (
                  <label className="form-label">
                    Expertise areas
                    <div className="checkbox-group">
                      {expertiseOptions.map((cat) => (
                        <label
                          key={cat}
                          style={{ display: "block", fontWeight: "normal" }}
                        >
                          <input
                            type="checkbox"
                            checked={signupData.expertise.includes(cat)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setSignupData((d) => {
                                const next = new Set(d.expertise);
                                if (checked) next.add(cat);
                                else next.delete(cat);
                                return {
                                  ...d,
                                  expertise: Array.from(next),
                                };
                              });
                            }}
                          />{" "}
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </label>
                      ))}
                    </div>
                  </label>
                )}

                {/* CAPTCHA block */}
                <label className="form-label">
                  Security check
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      marginTop: "4px",
                    }}
                  >
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "10px",
                        background: "#111827",
                        color: "#f9fafb",
                        letterSpacing: "0.25em",
                        fontWeight: 700,
                      }}
                    >
                      {captcha}
                    </span>
                    <input
                      className="form-input"
                      style={{ flex: 1 }}
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Type the code"
                      required
                    />
                    <button
                      type="button"
                      className="link-chip"
                      onClick={regenerateCaptcha}
                    >
                      Refresh
                    </button>
                  </div>
                </label>

                <label className="form-label">
                  Password
                  <input
                    type="password"
                    className="form-input"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData((d) => ({
                        ...d,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                </label>
                <p className="password-hint">
                  Must be at least 8 characters and include one uppercase, one
                  lowercase, one digit, and one special character.
                </p>

                <button type="submit" className="btn-primary">
                  Sign Up
                </button>
              </form>

              <p className="login-footer-text">
                Already have an account?{" "}
                <button
                  type="button"
                  className="link-chip"
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setMode("login");
                  }}
                >
                  Back to login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
