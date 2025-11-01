import {
  SummaryStat,
  MonthlyData,
  CategoryData,
  TrendData,
} from "@/lib/utils/types";
import { TrendingUp, TrendingDown, Target, Activity } from "lucide-react";

export const summaryStats: SummaryStat[] = [
  {
    title: "Total Income",
    value: "$28,100",
    change: "+12.5%",
    changeType: "positive",
    icon: TrendingUp,
    description: "This year",
  },
  {
    title: "Total Expenses",
    value: "$23,100",
    change: "+8.2%",
    changeType: "negative",
    icon: TrendingDown,
    description: "This year",
  },
  {
    title: "Net Savings",
    value: "$5,000",
    change: "+15.3%",
    changeType: "positive",
    icon: Target,
    description: "This year",
  },
  {
    title: "Savings Rate",
    value: "17.8%",
    change: "+2.1%",
    changeType: "positive",
    icon: Activity,
    description: "Of total income",
  },
];

export const monthlyData: MonthlyData[] = [
  { month: "Jan", income: 4500, expenses: 3200, savings: 1300 },
  { month: "Feb", income: 4800, expenses: 3100, savings: 1700 },
  { month: "Mar", income: 4600, expenses: 3400, savings: 1200 },
  { month: "Apr", income: 5200, expenses: 3300, savings: 1900 },
  { month: "May", income: 4900, expenses: 3600, savings: 1300 },
  { month: "Jun", income: 5100, expenses: 3500, savings: 1600 },
];

export const categoryData: CategoryData[] = [
  { name: "Food", value: 1200, color: "#f59e42" },
  { name: "Transport", value: 800, color: "#ef4444" },
  { name: "Entertainment", value: 600, color: "#10b981" },
  { name: "Shopping", value: 900, color: "#6366f1" },
  { name: "Bills", value: 1100, color: "#eab308" },
  { name: "Other", value: 400, color: "#a21caf" },
];

export const trendData: TrendData[] = [
  { date: "2024-01", income: 4500, expenses: 3200 },
  { date: "2024-02", income: 4800, expenses: 3100 },
  { date: "2024-03", income: 4600, expenses: 3400 },
  { date: "2024-04", income: 5200, expenses: 3300 },
  { date: "2024-05", income: 4900, expenses: 3600 },
  { date: "2024-06", income: 5100, expenses: 3500 },
];
