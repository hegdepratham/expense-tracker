
import {
  Plus,
  ArrowRight,
  Download,
  Wallet,
} from "lucide-react";

import SummaryCards from "./SummaryCards";
import ExpenseList from "./ExpenseList";
import CategoryChart from "./CategoryChart";
import MonthlyTrendChart from "./MonthlyTrendChart";

function Dashboard({
  expenses,
  categories,
  summary,
  onOpenExpenseForm,
  onDeleteExpense,
  onNavigate,
  onExportCSV,
}) {
  return (
    <div className="dashboard-page">
      {/* Dashboard heading */}
      <div className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">
            PERSONAL FINANCE OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p className="dashboard-subtitle">
            Welcome back! Here's an overview of your spending.
          </p>
        </div>

        <div className="dashboard-actions">
          <button
            type="button"
            className="button-secondary export-button"
            onClick={onExportCSV}
          >
            <Download size={17} />
            Export CSV
          </button>

          <button
            type="button"
            className="button-primary"
            onClick={onOpenExpenseForm}
          >
            <Plus size={19} />
            Add Expense
          </button>
        </div>
      </div>

      {/* Financial summary */}
      <section className="dashboard-section">
        <SummaryCards summary={summary} />
      </section>

      {/* Analytics charts */}
      <section className="dashboard-section analytics-grid">
        <CategoryChart
          expenses={expenses}
          categories={categories}
        />

        <MonthlyTrendChart expenses={expenses} />
      </section>

      {/* Recent transactions */}
      <section className="dashboard-section">
        <div className="dashboard-list-header">
          <div>
            <h2>Recent Transactions</h2>
            <p>Keep track of your latest spending.</p>
          </div>

          <button
            type="button"
            className="text-action-button"
            onClick={() => onNavigate("expenses")}
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        <ExpenseList
          expenses={expenses}
          categories={categories}
          onDeleteExpense={onDeleteExpense}
          limit={5}
        />
      </section>

      {/* Empty dashboard message */}
      {expenses.length === 0 && (
        <div className="dashboard-empty-tip">
          <div className="empty-tip-icon">
            <Wallet size={22} />
          </div>

          <div>
            <h3>Start tracking your spending</h3>
            <p>
              Add your first expense to see your financial
              summaries and analytics come to life.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
