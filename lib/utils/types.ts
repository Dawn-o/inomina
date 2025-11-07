export type TransactionMethod = "Cash" | "Account" | "Card";
export type TransactionType = "Income" | "Expenses" | "Transfer";
export type TransferTarget = "Other" | "Yourself";

export interface Transaction {
  id: number;
  date: string;
  description: string;
  category?: string;
  amount: number;
  method: TransactionMethod;
  type: TransactionType;
  hasFees?: boolean;
  feesAmount?: number;
  transferTarget?: TransferTarget;
}

export interface SummaryStat {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface TrendData {
  date: string;
  income: number;
  expenses: number;
}
