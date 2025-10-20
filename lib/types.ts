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