
import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart as PieChartIcon, CalendarDays } from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

function CategoryChart({ expenses, categories }) {
  const getCurrentMonth = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");

    return `${today.getFullYear()}-${month}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);

  const chartData = useMemo(() => {
    const totals = {};

    categories.forEach((category) => {
      totals[category.id] = {
        id: category.id,
        name: category.name,
        amount: 0,
        color: category.color,
      };
    });

    expenses
      .filter((expense) => expense.date.startsWith(selectedMonth))
      .forEach((expense) => {
        if (totals[expense.categoryId]) {
          totals[expense.categoryId].amount += Number(expense.amount);
        }
      });

    return Object.values(totals).filter(
      (category) => category.amount > 0
    );
  }, [expenses, categories, selectedMonth]);

  const totalSpending = chartData.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title-row">
            <PieChartIcon size={19} />
            <h3>Category Breakdown</h3>
          </div>

          <p>Understand where your money goes.</p>
        </div>

        <div className="chart-month-picker">
          <CalendarDays size={16} />

          <input
            type="month"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            aria-label="Select month for category breakdown"
          />
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="chart-empty-state">
          <PieChartIcon size={36} />
          <h3>No spending data</h3>
          <p>
            Add expenses for this month to see your category breakdown.
          </p>
        </div>
      ) : (
        <>
          <div className="donut-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="85%"
                  paddingAngle={4}
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E5EAF2",
                    padding: "10px 14px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-center">
              <span>Total Spending</span>
              <strong>{formatCurrency(totalSpending)}</strong>
            </div>
          </div>

          <div className="chart-legend">
            {chartData.map((category) => (
              <div
                className="chart-legend-item"
                key={category.id}
              >
                <div className="legend-category">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: category.color }}
                  />

                  <span>{category.name}</span>
                </div>

                <div className="legend-amount">
                  {formatCurrency(category.amount)}
                  <span>
                    {((category.amount / totalSpending) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryChart;
