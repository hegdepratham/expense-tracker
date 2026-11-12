
import {
  LayoutDashboard,
  Receipt,
  Tags,
  ChartNoAxesCombined,
  Wallet,
  X,
  TrendingUp,
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: Receipt,
  },
  {
    id: "categories",
    label: "Categories",
    icon: Tags,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
  },
];

function Sidebar({
  activePage,
  onNavigate,
  isOpen,
  onClose,
}) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-mobile-header">
          <div className="sidebar-logo">
            <Wallet size={22} />
            <span>Expense Tracker</span>
          </div>

          <button
            className="sidebar-close-button"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={21} />
          </button>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-heading">MAIN MENU</p>

          <nav className="sidebar-navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={`sidebar-link ${
                    activePage === item.id ? "active" : ""
                  }`}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-icon">
              <TrendingUp size={19} />
            </div>

            <h4>Smart Spending</h4>

            <p>
              Track your expenses and make better financial decisions.
            </p>
          </div>

          <div className="sidebar-footer">
            <span className="sidebar-status-dot" />
            Your data is stored locally
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
