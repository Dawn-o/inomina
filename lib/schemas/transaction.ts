import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["Income", "Expenses", "Transfer"]),
  date: z.string().min(1, "Date is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  method: z.string().min(1, "Method is required"),
  transferTarget: z.string().optional(),
  hasFees: z.boolean().optional(),
  feesAmount: z.number().optional(),
  description: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
