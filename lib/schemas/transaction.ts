import { z } from "zod";

export const transactionSchema = z
  .object({
    type: z.enum(["Income", "Expenses", "Transfer"]),
    date: z.string().min(1, "Date is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    category: z.string().optional(),
    method: z.string().min(1, "Method is required"),
    transferTarget: z.string().optional(),
    hasFees: z.boolean().optional(),
    feesAmount: z.number().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.type !== "Transfer" &&
        (!data.category || data.category.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Category is required for Income and Expenses",
      path: ["category"],
    },
  );

export type TransactionFormValues = z.infer<typeof transactionSchema>;
