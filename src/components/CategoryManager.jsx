
import { useState } from "react";
import {
  Tags,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Palette,
} from "lucide-react";

function CategoryManager({
  categories,
  expenses,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#3978D4");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setCategoryName("");
    setCategoryColor("#3978D4");
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      setError("Please enter a category name.");
      return;
    }

    if (trimmedName.length > 30) {
      setError("Category name cannot exceed 30 characters.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === trimmedName.toLowerCase() &&
        category.id !== editingId
    );

    if (duplicate) {
      setError("This category already exists.");
      return;
    }

    if (editingId) {
      onUpdateCategory(editingId, {
        name: trimmedName,
        color: categoryColor,
      });
    } else {
      onAddCategory({
        id: crypto.randomUUID(),
        name: trimmedName,
        color: categoryColor,
      });
    }

    resetForm();
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
    setCategoryColor(category.color);
    setError("");
  };

  const handleDelete = (category) => {
    const usageCount = expenses.filter(
      (expense) => expense.categoryId === category.id
    ).length;

    if (usageCount > 0) {
      window.alert(
        `Cannot delete "${category.name}" because ${usageCount} expense(s) are using it. Delete or reassign those expenses first.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the "${category.name}" category?`
    );

    if (confirmed) {
      onDeleteCategory(category.id);

      if (editingId === category.id) {
        resetForm();
      }
    }
  };

  return (
    <div className="category-manager">
      <div className="category-manager-header">
        <div>
          <h2>Manage Categories</h2>
          <p>Create and customize your expense categories.</p>
        </div>

        <div className="category-total">
          <Tags size={17} />
          {categories.length} Categories
        </div>
      </div>

      <div className="category-form-card">
        <h3>
          {editingId ? "Edit Category" : "Create New Category"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="category-form-grid">
            <div className="form-group">
              <label htmlFor="category-name">
                Category Name
              </label>

              <input
                id="category-name"
                type="text"
                placeholder="e.g. Healthcare"
                value={categoryName}
                onChange={(event) =>
                  setCategoryName(event.target.value)
                }
                maxLength={30}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category-color">
                <Palette size={15} />
                Choose Colour
              </label>

              <div className="color-picker-wrapper">
                <input
                  id="category-color"
                  type="color"
                  value={categoryColor}
                  onChange={(event) =>
                    setCategoryColor(event.target.value)
                  }
                />

                <span>{categoryColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="category-form-actions">
            <button type="submit" className="button-primary">
              {editingId ? (
                <>
                  <Check size={17} />
                  Update Category
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Add Category
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                className="button-secondary"
                onClick={resetForm}
              >
                <X size={17} />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const usageCount = expenses.filter(
            (expense) => expense.categoryId === category.id
          ).length;

          return (
            <div className="category-card" key={category.id}>
              <div className="category-card-top">
                <div
                  className="category-color-indicator"
                  style={{ backgroundColor: category.color }}
                >
                  <Tags size={20} color="#FFFFFF" />
                </div>

                <div className="category-card-actions">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => handleEdit(category)}
                    title="Edit category"
                    aria-label={`Edit ${category.name}`}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    className="icon-button delete-button"
                    onClick={() => handleDelete(category)}
                    title={
                      usageCount > 0
                        ? "Category is in use"
                        : "Delete category"
                    }
                    aria-label={`Delete ${category.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3>{category.name}</h3>

              <p>
                {usageCount} {usageCount === 1 ? "expense" : "expenses"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryManager;
