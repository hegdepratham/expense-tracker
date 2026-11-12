
import { useState } from "react";
import { X, IndianRupee, CalendarDays, Tag, FileText } from "lucide-react";

function ExpenseForm({ categories, onAddExpense, onClose }) {
  const getToday = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    return new Date(today.getTime() - offset * 60000)
      .toISOString()
      .slice(0, 10);
  };

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(getToday());
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    if (!categoryId) {
      setError("Please select an expense category.");
      return;
    }

    if (!date) {
      setError("Please select an expense date.");
      return;
    }

    if (note.length > 120) {
      setError("Note cannot exceed 120 characters.");
      return;
    }

    const newExpense = {
      id: crypto.randomUUID(),
      amount: numericAmount,
      categoryId,
      date,
      note: note.trim(),
    };

    onAddExpense(newExpense);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="expense-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="expense-form-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="expense-form-title">Add New Expense</h2>
            <p>Enter your transaction details below.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label htmlFor="expense-amount">
              <IndianRupee size={16} />
              Amount
            </label>

            <input
              id="expense-amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expense-category">
              <Tag size={16} />
              Category
            </label>

            <select
              id="expense-category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              required
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="expense-date">
              <CalendarDays size={16} />
              Date
            </label>

            <input
              id="expense-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expense-note">
              <FileText size={16} />
              Note <span className="optional-label">(Optional)</span>
            </label>

            <textarea
              id="expense-note"
              placeholder="What was this expense for?"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={120}
              rows={3}
            />

            <span className="character-count">
              {note.length}/120 characters
            </span>
          </div>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="button-primary">
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
