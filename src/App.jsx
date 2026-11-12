
import { useMemo, useState } from "react";
import { Plus, Download } from "lucide-react";

import useLocalStorage from "./hooks/useLocalStorage";
import { getMonthlySummary } from "./utils/analytics";
import { exportExpensesToCSV } from "./utils/csvExport";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategoryManager from "./components/CategoryManager";
import SummaryCards from "./components/SummaryCards";
import CategoryChart from "./components/CategoryChart";
import MonthlyTrendChart from "./components/MonthlyTrendChart";

const defaultCategories = [
  {
    id: "food",
    name: "Food",
    color: "#F59E0B",
  },
  {
    id: "transport",
    name: "Transport",
    color: "#3978D4",
  },
  {
    id: "bills",
    name: "Bills",
    color: "#8B5CF6",
  },
  {
    id: "shopping",
    name: "Shopping",
    color: "#EC4899",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    color: "#14B8A6",
  },
  {
    id: "other",
    name: "Other",
    color: "#64748B",
  },
];

const pageTitles = {
  dashboard: "Dashboard",
  expenses: "Expenses",
  categories: "Categories",
  analytics: "Analytics",
};

function App() {
  // Persistent application data
  const [expenses, setExpenses] = useLocalStorage(
    "expense-tracker-expenses",
    []
  );

  const [categories, setCategories] = useLocalStorage(
    "expense-tracker-categories",
    defaultCategories
  );

  // Navigation and interface state
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  // Calculate this month's financial summary
  const summary = useMemo(() => {
    return getMonthlySummary(expenses);
  }, [expenses]);

  // Add a new expense
  const handleAddExpense = (newExpense) => {
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      newExpense,
    ]);

    setIsExpenseFormOpen(false);
  };

  // Delete an expense
  const handleDeleteExpense = (expenseId) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter(
        (expense) => expense.id !== expenseId
      )
    );
  };

  // Add a custom category
  const handleAddCategory = (newCategory) => {
    setCategories((previousCategories) => [
      ...previousCategories,
      newCategory,
    ]);
  };

  // Update an existing category
  const handleUpdateCategory = (categoryId, updatedDetails) => {
    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        category.id === categoryId
          ? { ...category, ...updatedDetails }
          : category
      )
    );
  };

  // Delete a category
  const handleDeleteCategory = (categoryId) => {
    setCategories((previousCategories) =>
      previousCategories.filter(
        (category) => category.id !== categoryId
      )
    );
  };

  // Export all expenses
  const handleExportCSV = () => {
    exportExpensesToCSV(expenses, categories);
  };

  // Navigate between application pages
  const handleNavigate = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false);
  };

  // Render the selected page
  const renderPage = () => {
    switch (activePage) {
      case "expenses":
        return (
          <div className="content-page">
            <div className="page-intro">
              <div>
                <p className="dashboard-eyebrow">
                  TRANSACTION HISTORY
                </p>

                <h1>All Expenses</h1>

                <p className="dashboard-subtitle">
                  View and manage all your recorded transactions.
                </p>
              </div>
            </div>

            <ExpenseList
              expenses={expenses}
              categories={categories}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        );

      case "categories":
        return (
          <div className="content-page">
            <CategoryManager
              categories={categories}
              expenses={expenses}
              onAddCategory={handleAddCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </div>
        );

      case "analytics":
        return (
          <div className="content-page">
            <div className="page-intro">
              <div>
                <p className="dashboard-eyebrow">
                  FINANCIAL INSIGHTS
                </p>

                <h1>Analytics</h1>

                <p className="dashboard-subtitle">
                  Explore your spending patterns and monthly performance.
                </p>
              </div>
            </div>

            <section className="dashboard-section">
              <SummaryCards summary={summary} />
            </section>

            <section className="dashboard-section analytics-grid">
              <CategoryChart
                expenses={expenses}
                categories={categories}
              />

              <MonthlyTrendChart expenses={expenses} />
            </section>
          </div>
        );

      case "dashboard":
      default:
        return (
          <Dashboard
            expenses={expenses}
            categories={categories}
            summary={summary}
            onOpenExpenseForm={() => setIsExpenseFormOpen(true)}
            onDeleteExpense={handleDeleteExpense}
            onNavigate={handleNavigate}
            onExportCSV={handleExportCSV}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar
        pageTitle={pageTitles[activePage]}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <div className="app-body">
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="main-content">
          {activePage !== "dashboard" && (
            <div className="page-toolbar">
              <button
                type="button"
                className="button-secondary export-button"
                onClick={handleExportCSV}
              >
                <Download size={17} />
                Export CSV
              </button>

              <button
                type="button"
                className="button-primary"
                onClick={() => setIsExpenseFormOpen(true)}
              >
                <Plus size={18} />
                Add Expense
              </button>
            </div>
          )}

          {renderPage()}
        </main>
      </div>

      {/* Add Expense Modal */}
      {isExpenseFormOpen && (
        <ExpenseForm
          categories={categories}
          onAddExpense={handleAddExpense}
          onClose={() => setIsExpenseFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
