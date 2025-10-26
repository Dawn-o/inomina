import { z } from "zod";

export const transactionSchema = z.object({
    amount: z.coerce.number().positive("Amount must be greater than zero"),
    category: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required"),
    description: z.string().optional().nullable(),
    type: z.enum(["Income", "Expenses", "Transfer"]),
    method: z.string().min(1, "Method is required"),
    transferTarget: z.string().optional().nullable(),
    hasFees: z.boolean().optional().nullable(),
    feesAmount: z.coerce.number().optional().nullable(),
});
