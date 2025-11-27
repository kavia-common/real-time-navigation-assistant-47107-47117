import React from "react";
import "./styles.css";

// PUBLIC_INTERFACE
export default function NavBar({ user }) {
  /** Top navigation bar with brand and user menu. */
  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="nav__logo">🧭</span>
        <span className="nav__title">Ocean Navigator</span>
      </div>
      <div className="nav__actions">
        <button className="btn--ghost">History</button>
        <button className="btn--ghost">Settings</button>
        <div className="user-pill" role="button" aria-label="User Menu">
          <div className="user-avatar">{(user?.name || "U").slice(0, 1)}</div>
          <div className="user-info">
            <div className="user-name">{user?.name || "Guest"}</div>
            <div className="user-email">{user?.email || ""}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
