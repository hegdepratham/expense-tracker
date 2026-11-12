
import {
  Wallet,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Receipt,
} from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

function SummaryCards({ summary }) {
  const {
    currentTotal,
    previousTotal,
    percentageChange,
    transactionCount,
  } = summary;

  const isIncrease = percentageChange > 0;

  const cards = [
    {
      title: "This Month",
      value: formatCurrency(currentTotal),
      icon: Wallet,
      color: "blue",
      description: "Total spending this month",
    },
    {
      title: "Last Month",
      value: formatCurrency(previousTotal),
      icon: CalendarDays,
      color: "purple",
      description: "Previous month's spending",
    },
    {
      title: "Monthly Change",
      value: `${Math.abs(percentageChange).toFixed(1)}%`,
      icon: isIncrease ? TrendingUp : TrendingDown,
      color: isIncrease ? "orange" : "green",
      description:
        percentageChange > 0
          ? "Spending increased"
          : percentageChange < 0
            ? "Spending decreased"
            : "No spending change",
      trend: true,
    },
    {
      title: "Transactions",
      value: transactionCount,
      icon: Receipt,
      color: "teal",
      description: "Transactions this month",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="summary-card" key={card.title}>
            <div className="summary-card-top">
              <div className={`summary-icon ${card.color}`}>
                <Icon size={21} />
              </div>
            </div>

            <div className="summary-card-content">
              <p className="summary-card-title">
                {card.title}
              </p>

              <h3 className="summary-card-value">
                {card.value}
              </h3>

              <p className="summary-card-description">
                {card.trend && (
                  <span
                    className={
                      isIncrease ? "trend-increase" : "trend-decrease"
                    }
                  >
                    {isIncrease ? "+" : percentageChange < 0 ? "-" : ""}
                  </span>
                )}

                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;
