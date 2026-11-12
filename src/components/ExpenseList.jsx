
import { Trash2, Receipt, CalendarDays } from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

function ExpenseList({ expenses, categories, onDeleteExpense, limit }) {
  const sortedExpenses = [...expenses].sort(
    (a, b) => b.date.localeCompare(a.date) ||
      String(b.id).localeCompare(String(a.id))
  );

  const displayedExpenses = limit
    ? sortedExpenses.slice(0, limit)
    : sortedExpenses;

  const handleDelete = (expense) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this expense of ${formatCurrency(expense.amount)}?`
    );

    if (confirmed) {
      onDeleteExpense(expense.id);
    }
  };

  return (
    <div className="expense-list-card">
      <div className="section-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest recorded expenses</p>
        </div>

        <span className="transaction-count">
          {expenses.length} records
        </span>
      </div>

      {displayedExpenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Receipt size={32} />
          </div>

          <h3>No expenses yet</h3>

          <p>
            Your transactions will appear here once you add your first expense.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {displayedExpenses.map((expense) => {
                const category = categories.find(
                  (item) => item.id === expense.categoryId
                );

                return (
                  <tr key={expense.id}>
                    <td className="expense-amount">
                      {formatCurrency(expense.amount)}
                    </td>

                    <td>
                      {category ? (
                        <span
                          className="category-badge"
                          style={{
                            backgroundColor: `${category.color}20`,
                            color: category.color,
                          }}
                        >
                          <span
                            className="category-dot"
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </span>
                      ) : (
                        <span className="category-badge">
                          Unknown Category
                        </span>
                      )}
                    </td>

                    <td>
                      <span className="expense-date">
                        <CalendarDays size={14} />
                        {new Date(
                          `${expense.date}T00:00:00`
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    <td className="expense-note">
                      {expense.note || "—"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(expense)}
                        aria-label={`Delete expense ${expense.id}`}
                        title="Delete expense"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
