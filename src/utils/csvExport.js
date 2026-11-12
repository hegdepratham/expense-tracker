
export function exportExpensesToCSV(expenses, categories) {
  if (!expenses || expenses.length === 0) {
    alert("There are no expenses to export.");
    return;
  }

  const headers = [
    "ID",
    "Amount",
    "Category",
    "Date",
    "Note",
  ];

  const escapeCSV = (value) => {
    const text = String(value ?? "");

    return `"${text.replace(/"/g, '""')}"`;
  };

  const rows = expenses.map((expense) => {
    const category = categories.find(
      (item) => item.id === expense.categoryId
    );

    return [
      expense.id,
      expense.amount,
      category ? category.name : "Unknown Category",
      expense.date,
      expense.note || "",
    ].map(escapeCSV);
  });

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\r\n");

  // Add BOM to improve compatibility with Excel.
  const blob = new Blob(
    ["\uFEFF" + csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "expenses.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
