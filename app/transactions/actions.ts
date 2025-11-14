"use server";

import {
  transactionSchema,
  TransactionFormValues,
} from "@/lib/schemas/transaction";
import { createClient } from "@/lib/supabase/server";

import type { Transaction } from "@/lib/utils/types";

export async function addTransaction(data: TransactionFormValues) {
  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const transactionData = {
      user_id: user.id,
      type: data.type,
      date: new Date(data.date).toISOString(),
      amount: data.amount,
      category: data.category || null,
      method: data.method,
      transfer_target: data.transferTarget || null,
      has_fees: data.hasFees || false,
      fees_amount: data.feesAmount || 0,
      description: data.description || null,
    };

    const { error: insertError } = await supabase
      .from("transactions")
      .insert(transactionData);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw new Error("Failed to save transaction");
    }

    return { success: true };
  } catch (error) {
    console.error("Transaction creation error:", error);
    throw new Error("Failed to create transaction");
  }
}

export async function getTransactions(): Promise<Transaction[]> {
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
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError);
      throw new Error("Failed to fetch transactions");
    }

    const transformedTransactions: Transaction[] = (transactions || []).map(
      (tx) => ({
        id: tx.id,
        date: tx.date,
        description: tx.description || "",
        category: tx.category,
        amount:
          tx.type === "Expenses" ? -Math.abs(tx.amount) : Math.abs(tx.amount),
        method: tx.method as any,
        type: tx.type as any,
        hasFees: tx.has_fees,
        feesAmount: tx.fees_amount,
        transferTarget: tx.transfer_target as any,
      }),
    );

    return transformedTransactions;
  } catch (error) {
    console.error("Transaction fetch error:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function updateTransaction(
  id: number,
  data: TransactionFormValues,
) {
  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const transactionData = {
      type: data.type,
      date: new Date(data.date).toISOString(),
      amount: data.amount,
      category: data.category || null,
      method: data.method,
      transfer_target: data.transferTarget || null,
      has_fees: data.hasFees || false,
      fees_amount: data.feesAmount || 0,
      description: data.description || null,
    };

    const { error: updateError } = await supabase
      .from("transactions")
      .update(transactionData)
      .eq("id", id)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      throw new Error("Failed to update transaction");
    }

    return { success: true };
  } catch (error) {
    console.error("Transaction update error:", error);
    throw new Error("Failed to update transaction");
  }
}

export async function deleteTransaction(id: number) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { error: deleteError } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      throw new Error("Failed to delete transaction");
    }

    return { success: true };
  } catch (error) {
    console.error("Transaction delete error:", error);
    throw new Error("Failed to delete transaction");
  }
}
