import { createClient } from "@/lib/supabase/client";
import type {
  SummaryStat,
  MonthlyData,
  CategoryData,
  TrendData,
} from "@/lib/utils/types";
import { TrendingUp, TrendingDown, Target, Activity } from "lucide-react";

export async function getReportsSummaryStats(
  timeRange: string = "6months",
): Promise<SummaryStat[]> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "1month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case "3months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case "6months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case "1year":
        startDate = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    }

    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select("amount, type, date")
      .eq("user_id", user.id)
      .gte("date", startDate.toISOString().split("T")[0]);

    if (fetchError) {
      console.error("Reports summary fetch error:", fetchError);
      throw new Error("Failed to fetch reports data");
    }

    let totalIncome = 0;
    let totalExpenses = 0;

    (transactions || []).forEach((tx) => {
      if (tx.type === "Income") {
        totalIncome += tx.amount;
      } else if (tx.type === "Expenses") {
        totalExpenses += Math.abs(tx.amount);
      }
    });

    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

    const prevStartDate = new Date(startDate);
    const periodLength = now.getTime() - startDate.getTime();
    prevStartDate.setTime(startDate.getTime() - periodLength);

    const { data: prevTransactions, error: prevFetchError } = await supabase
      .from("transactions")
      .select("amount, type")
      .eq("user_id", user.id)
      .gte("date", prevStartDate.toISOString().split("T")[0])
      .lt("date", startDate.toISOString().split("T")[0]);

    let prevIncome = 0;
    let prevExpenses = 0;

    if (!prevFetchError && prevTransactions) {
      prevTransactions.forEach((tx) => {
        if (tx.type === "Income") {
          prevIncome += tx.amount;
        } else if (tx.type === "Expenses") {
          prevExpenses += Math.abs(tx.amount);
        }
      });
    }

    const prevSavings = prevIncome - prevExpenses;

    const incomeChange =
      prevIncome > 0 ? ((totalIncome - prevIncome) / prevIncome) * 100 : 0;
    const expensesChange =
      prevExpenses > 0
        ? ((totalExpenses - prevExpenses) / prevExpenses) * 100
        : 0;
    const savingsChange =
      prevSavings !== 0
        ? ((netSavings - prevSavings) / Math.abs(prevSavings)) * 100
        : 0;
    const savingsRateChange =
      prevIncome > 0 ? savingsRate - (prevSavings / prevIncome) * 100 : 0;

    const summaryStats: SummaryStat[] = [
      {
        title: "Total Income",
        value: `$${totalIncome.toLocaleString()}`,
        change: `${incomeChange >= 0 ? "+" : ""}${incomeChange.toFixed(1)}%`,
        changeType: incomeChange >= 0 ? "positive" : "negative",
        icon: TrendingUp,
        description: `vs previous ${timeRange}`,
      },
      {
        title: "Total Expenses",
        value: `$${totalExpenses.toLocaleString()}`,
        change: `${expensesChange >= 0 ? "+" : ""}${expensesChange.toFixed(1)}%`,
        changeType: expensesChange >= 0 ? "negative" : "positive",
        icon: TrendingDown,
        description: `vs previous ${timeRange}`,
      },
      {
        title: "Net Savings",
        value: `$${netSavings.toLocaleString()}`,
        change: `${savingsChange >= 0 ? "+" : ""}${savingsChange.toFixed(1)}%`,
        changeType: savingsChange >= 0 ? "positive" : "negative",
        icon: Target,
        description: `vs previous ${timeRange}`,
      },
      {
        title: "Savings Rate",
        value: `${savingsRate.toFixed(1)}%`,
        change: `${savingsRateChange >= 0 ? "+" : ""}${savingsRateChange.toFixed(1)}%`,
        changeType: savingsRateChange >= 0 ? "positive" : "negative",
        icon: Activity,
        description: "Of total income",
      },
    ];

    return summaryStats;
  } catch (error) {
    console.error("Reports summary error:", error);
    return [
      {
        title: "Total Income",
        value: "$0",
        change: "+0.0%",
        changeType: "positive" as const,
        icon: TrendingUp,
        description: "This period",
      },
      {
        title: "Total Expenses",
        value: "$0",
        change: "+0.0%",
        changeType: "negative" as const,
        icon: TrendingDown,
        description: "This period",
      },
      {
        title: "Net Savings",
        value: "$0",
        change: "+0.0%",
        changeType: "positive" as const,
        icon: Target,
        description: "This period",
      },
      {
        title: "Savings Rate",
        value: "0.0%",
        change: "+0.0%",
        changeType: "positive" as const,
        icon: Activity,
        description: "Of total income",
      },
    ];
  }
}

export async function getReportsMonthlyData(
  timeRange: string = "6months",
): Promise<MonthlyData[]> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const now = new Date();
    let startDate: Date;
    let monthsBack: number;

    switch (timeRange) {
      case "1month":
        monthsBack = 1;
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case "3months":
        monthsBack = 3;
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case "6months":
        monthsBack = 6;
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case "1year":
        monthsBack = 12;
        startDate = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
        break;
      default:
        monthsBack = 6;
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    }

    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select("amount, type, date")
      .eq("user_id", user.id)
      .gte("date", startDate.toISOString().split("T")[0]);

    if (fetchError) {
      console.error("Reports monthly fetch error:", fetchError);
      throw new Error("Failed to fetch monthly data");
    }

    const monthlyMap = new Map<string, { income: number; expenses: number }>();

    (transactions || []).forEach((tx) => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { income: 0, expenses: 0 });
      }

      const monthData = monthlyMap.get(monthKey)!;
      if (tx.type === "Income") {
        monthData.income += tx.amount;
      } else if (tx.type === "Expenses") {
        monthData.expenses += Math.abs(tx.amount);
      }
    });

    const monthlyData: MonthlyData[] = [];
    for (let i = monthsBack - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthName = date.toLocaleDateString("en-US", { month: "short" });

      const monthData = monthlyMap.get(monthKey) || { income: 0, expenses: 0 };
      const savings = monthData.income - monthData.expenses;

      monthlyData.push({
        month: monthName,
        income: monthData.income,
        expenses: monthData.expenses,
        savings,
      });
    }

    return monthlyData;
  } catch (error) {
    console.error("Reports monthly error:", error);
    return [];
  }
}

export async function getReportsCategoryData(
  timeRange: string = "6months",
): Promise<CategoryData[]> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "1month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case "3months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case "6months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case "1year":
        startDate = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    }

    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select("category, amount")
      .eq("user_id", user.id)
      .eq("type", "Expenses")
      .gte("date", startDate.toISOString().split("T")[0]);

    if (fetchError) {
      console.error("Reports category fetch error:", fetchError);
      throw new Error("Failed to fetch category data");
    }

    const categoryMap = new Map<string, number>();
    (transactions || []).forEach((tx) => {
      if (tx.category) {
        const current = categoryMap.get(tx.category) || 0;
        categoryMap.set(tx.category, current + Math.abs(tx.amount));
      }
    });

    const chartColors = [
      "#6366f1",
      "#f59e42",
      "#ef4444",
      "#10b981",
      "#eab308",
      "#a21caf",
      "#06b6d4",
      "#84cc16",
      "#f97316",
      "#ec4899",
    ];

    const categoryData: CategoryData[] = Array.from(categoryMap.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color: chartColors[index % chartColors.length],
      }))
      .sort((a, b) => b.value - a.value);

    return categoryData;
  } catch (error) {
    console.error("Reports category error:", error);
    return [];
  }
}

export async function getReportsTrendData(
  timeRange: string = "6months",
): Promise<TrendData[]> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const now = new Date();
    let startDate: Date;
    let monthsBack: number;

    switch (timeRange) {
      case "1month":
        monthsBack = 1;
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case "3months":
        monthsBack = 3;
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case "6months":
        monthsBack = 6;
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case "1year":
        monthsBack = 12;
        startDate = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
        break;
      default:
        monthsBack = 6;
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    }

    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select("amount, type, date")
      .eq("user_id", user.id)
      .gte("date", startDate.toISOString().split("T")[0]);

    if (fetchError) {
      console.error("Reports trend fetch error:", fetchError);
      throw new Error("Failed to fetch trend data");
    }

    const trendMap = new Map<string, { income: number; expenses: number }>();

    (transactions || []).forEach((tx) => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;

      if (!trendMap.has(monthKey)) {
        trendMap.set(monthKey, { income: 0, expenses: 0 });
      }

      const monthData = trendMap.get(monthKey)!;
      if (tx.type === "Income") {
        monthData.income += tx.amount;
      } else if (tx.type === "Expenses") {
        monthData.expenses += Math.abs(tx.amount);
      }
    });

    const trendData: TrendData[] = [];
    for (let i = monthsBack - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;

      const monthData = trendMap.get(monthKey) || { income: 0, expenses: 0 };

      trendData.push({
        date: monthKey,
        income: monthData.income,
        expenses: monthData.expenses,
      });
    }

    return trendData;
  } catch (error) {
    console.error("Reports trend error:", error);
    return [];
  }
}
