"use server";

import { transactionSchema, TransactionFormValues } from "@/lib/schemas/transaction";

export async function addTransaction(data: TransactionFormValues) {
  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  // TODO: Save to database here

  return { success: true };
}
