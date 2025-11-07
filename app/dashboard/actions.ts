import { createClient } from "@/lib/supabase/client";
import type { CategoryData } from "@/lib/utils/types";

export interface DashboardSummary {
  balance: number;
  income: number;
  expenses: number;
}

export interface DashboardTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select("amount, type")
      .eq("user_id", user.id);

    if (fetchError) {
      console.error("Dashboard summary fetch error:", fetchError);
      throw new Error("Failed to fetch dashboard data");
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

    const balance = totalIncome - totalExpenses;

    return {
      balance,
      income: totalIncome,
      expenses: totalExpenses,
    };
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return {
      balance: 0,
      income: 0,
      expenses: 0,
    };
  }
}

export async function getDashboardCategoryData(): Promise<CategoryData[]> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select("category, amount")
      .eq("user_id", user.id)
      .eq("type", "Expenses");

    if (fetchError) {
      console.error("Dashboard category fetch error:", fetchError);
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
    ];

    const categoryData: CategoryData[] = Array.from(categoryMap.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color: chartColors[index % chartColors.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    return categoryData;
  } catch (error) {
    console.error("Dashboard category error:", error);
    return [];
  }
}

export async function getRecentTransactions(): Promise<DashboardTransaction[]> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select("id, date, description, category, amount, type")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(5);

    if (fetchError) {
      console.error("Recent transactions fetch error:", fetchError);
      throw new Error("Failed to fetch recent transactions");
    }

    const recentTransactions: DashboardTransaction[] = (transactions || []).map(
      (tx) => ({
        id: tx.id.toString(),
        date: new Date(tx.date).toISOString().split("T")[0],
        description: tx.description || "",
        category: tx.category || tx.type,
        amount:
          tx.type === "Expenses" ? -Math.abs(tx.amount) : Math.abs(tx.amount),
      }),
    );

    return recentTransactions;
  } catch (error) {
    console.error("Recent transactions error:", error);
    return [];
  }
}
