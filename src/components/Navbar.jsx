
import { Menu, Wallet } from "lucide-react";

function Navbar({ onMenuClick, pageTitle }) {
  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="navbar-brand">
          <div className="brand-icon">
            <Wallet size={21} />
          </div>

          <div className="brand-text">
            <h2>Expense Tracker</h2>
            <span>Personal Finance Dashboard</span>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-page-title">
          {pageTitle || "Dashboard"}
        </div>

        <div className="navbar-avatar" title="User">
          PT
        </div>
      </div>
    </header>
  );
}

export default Navbar;
