"use client";

import { Transaction } from "@/lib/utils/types";
import { groupByDate, getSummary } from "@/lib/utils/transactions";

interface CalendarViewProps {
  transactions: Transaction[];
  currentMonth: number;
  currentYear: number;
}

interface DayData {
  date: number;
  income: number;
  expenses: number;
  total: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function CalendarView({
  transactions,
  currentMonth,
  currentYear,
}: CalendarViewProps) {
  const grouped = groupByDate(transactions);
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const todayDate = today.getDate();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();

  const firstDayOfWeek = firstDay.getDay();

  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays: DayData[] = [];

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      date: prevMonthLastDay - i,
      income: 0,
      expenses: 0,
      total: 0,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const dayTransactions = grouped[dateStr] || [];
    const summary = getSummary(dayTransactions);

    calendarDays.push({
      date: day,
      income: summary.income,
      expenses: summary.expenses,
      total: summary.total,
      isCurrentMonth: true,
      isToday: isCurrentMonth && day === todayDate,
    });
  }

  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      date: day,
      income: 0,
      expenses: 0,
      total: 0,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              min-h-[120px] p-2 border rounded-md flex flex-col justify-between
              ${day.isCurrentMonth ? "bg-background" : "bg-muted/30 text-muted-foreground"}
              ${day.isToday ? "ring-2 ring-primary" : ""}
            `}
          >
            <div className="text-sm font-medium">{day.date}</div>

            {day.isCurrentMonth && (day.income > 0 || day.expenses > 0) && (
              <div className="text-xs space-y-1">
                {day.income > 0 && (
                  <div className="text-green-600">
                    +{formatCurrency(day.income)} Income
                  </div>
                )}
                {day.expenses > 0 && (
                  <div className="text-red-600">
                    -{formatCurrency(day.expenses)} Expenses
                  </div>
                )}
                <div
                  className={`font-medium ${day.total >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {formatCurrency(day.total)} Total
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
