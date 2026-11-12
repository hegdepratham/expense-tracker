
export function getMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function getMonthlyTotal(expenses, monthKey) {
  return expenses
    .filter((expense) => expense.date.startsWith(monthKey))
    .reduce((total, expense) => total + Number(expense.amount), 0);
}

export function getMonthlySummary(expenses, currentDate = new Date()) {
  const currentMonth = getMonthKey(currentDate);

  const previousDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  const previousMonth = getMonthKey(previousDate);

  const currentTotal = getMonthlyTotal(expenses, currentMonth);
  const previousTotal = getMonthlyTotal(expenses, previousMonth);

  let percentageChange = 0;

  if (previousTotal === 0) {
    percentageChange = currentTotal > 0 ? 100 : 0;
  } else {
    percentageChange =
      ((currentTotal - previousTotal) / previousTotal) * 100;
  }

  return {
    currentTotal,
    previousTotal,
    percentageChange,
    transactionCount: expenses.filter(
      (expense) => expense.date.startsWith(currentMonth)
    ).length,
  };
}

export function getCategoryBreakdown(expenses, categories, monthKey) {
  const categoryTotals = {};

  categories.forEach((category) => {
    categoryTotals[category.id] = {
      id: category.id,
      name: category.name,
      color: category.color,
      amount: 0,
    };
  });

  expenses
    .filter((expense) => expense.date.startsWith(monthKey))
    .forEach((expense) => {
      const categoryId = expense.categoryId;

      if (categoryTotals[categoryId]) {
        categoryTotals[categoryId].amount += Number(expense.amount);
      }
    });

  return Object.values(categoryTotals).filter(
    (category) => category.amount > 0
  );
}

export function getHighestSpendingCategory(expenses, categories, monthKey) {
  const breakdown = getCategoryBreakdown(
    expenses,
    categories,
    monthKey
  );

  if (breakdown.length === 0) {
    return null;
  }

  return breakdown.reduce((highest, category) =>
    category.amount > highest.amount ? category : highest
  );
}

export function getLastSixMonths(expenses, currentDate = new Date()) {
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );

    const monthKey = getMonthKey(date);

    months.push({
      month: date.toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit",
      }),
      monthKey,
      total: getMonthlyTotal(expenses, monthKey),
    });
  }

  return months;
}
