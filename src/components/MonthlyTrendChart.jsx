
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartColumnIncreasing } from "lucide-react";
import { getLastSixMonths } from "../utils/analytics";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

function MonthlyTrendChart({ expenses }) {
  const chartData = useMemo(() => {
    return getLastSixMonths(expenses);
  }, [expenses]);

  return (
    <div className="chart-card trend-chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title-row">
            <ChartColumnIncreasing size={20} />
            <h3>Monthly Spending Trend</h3>
          </div>

          <p>Your spending activity over the last six months.</p>
        </div>
      </div>

      <div className="trend-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 15,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E9EDF4"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#778399", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) =>
                value >= 1000
                  ? `₹${(value / 1000).toFixed(0)}k`
                  : `₹${value}`
              }
              tick={{ fill: "#778399", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={65}
              allowDecimals={false}
            />

            <Tooltip
              formatter={(value) => [
                formatCurrency(value),
                "Total Spending",
              ]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5EAF2",
                padding: "10px 14px",
              }}
              cursor={{ fill: "#EFF5FF" }}
            />

            <Bar
              dataKey="total"
              name="Spending"
              fill="#3978D4"
              radius={[7, 7, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyTrendChart;
