import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin, isAuthenticated }) {
  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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

  /* ---------------- LOGIN ---------------- */

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await onLogin(email, password);

    if (!result.ok) {
      setError(result.message || "Invalid credentials.");
    }
  };

  /* ---------------- SIGNUP (Frontend Only) ---------------- */

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

    const storedUsers =
      JSON.parse(localStorage.getItem("demoUsers")) || [];

    const userExists = storedUsers.some(
      (u) => u.email === signupData.email
    );

    if (userExists) {
      setError("User already exists with this email.");
      return;
    }

    storedUsers.push({
      id: Date.now().toString(),
      ...signupData,
    });

    localStorage.setItem("demoUsers", JSON.stringify(storedUsers));

    setSuccess("Account created successfully. You can log in now.");
    setMode("login");
    setEmail(signupData.email);
  };

  return (
    <div className="login-page">
      <video
        className="login-video-bg"
        src="/LOGIN OUTRO.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="login-overlay" />

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

              <form className="login-form" onSubmit={handleLoginSubmit}>
                <label className="form-label">
                  Email
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    required
                  />
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
                  Security check
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span>{captcha}</span>
                    <input
                      className="form-input"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
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