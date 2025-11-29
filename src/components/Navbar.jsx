import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">Constitution Awareness</div>
      <nav className="navbar-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About Constitution
        </NavLink>
        <NavLink to="/articles" className="nav-link">
          Articles
        </NavLink>
      </nav>
      <button className="btn-logout" onClick={handleLogoutClick}>
        Logout
      </button>
    </header>
  );
}

export default Navbar;