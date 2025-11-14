"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Transaction } from "@/lib/utils/types";

export function useRealtimeTransactions(
  initialTransactions: Transaction[] = [],
) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    const supabase = createClient();
    let channel: any = null;

    const setupRealtime = async () => {
      try {
        console.log("🔄 Setting up realtime subscription...");

        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        console.log("👤 User check:", { user: user?.id, error: userError });

        if (userError || !user) {
          console.error("❌ User not authenticated for realtime:", userError);
          return;
        }

        // Create realtime channel for transactions
        console.log("📡 Creating realtime channel for user:", user.id);
        channel = supabase
          .channel(`transactions_${user.id}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "transactions",
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
              try {
                console.log(
                  "📨 Realtime event received:",
                  payload.eventType,
                  payload.new || payload.old,
                );

                if (payload.eventType === "INSERT" && payload.new) {
                  const newTransaction = transformTransaction(payload.new);
                  setTransactions((prev) => [newTransaction, ...prev]);
                } else if (payload.eventType === "UPDATE" && payload.new) {
                  const updatedTransaction = transformTransaction(payload.new);
                  setTransactions((prev) =>
                    prev.map((tx) =>
                      tx.id === updatedTransaction.id ? updatedTransaction : tx,
                    ),
                  );
                } else if (payload.eventType === "DELETE" && payload.old) {
                  const deletedId = payload.old.id;
                  setTransactions((prev) =>
                    prev.filter((tx) => tx.id !== deletedId),
                  );
                }
              } catch (error) {
                console.error("Error processing realtime event:", error);
              }
            },
          )
          .subscribe((status, err) => {
            console.log("🔗 Realtime subscription status:", status, err);
            if (err) {
              console.error("❌ Realtime subscription error:", err);
            } else {
              if (status === "SUBSCRIBED") {
                console.log("✅ Realtime connected successfully!");
              }
            }
          });
      } catch (error) {
        console.error("❌ Failed to setup realtime:", error);
      }
    };

    setupRealtime();

    // Cleanup function
    return () => {
      if (channel) {
        console.log("🧹 Cleaning up realtime channel");
        try {
          supabase.removeChannel(channel);
        } catch (error) {
          console.error("❌ Error cleaning up realtime channel:", error);
        }
      }
    };
  }, []);

  // Helper function to transform database transaction to our Transaction type
  const transformTransaction = (dbTx: any): Transaction => ({
    id: dbTx.id,
    date: dbTx.date,
    description: dbTx.description || "",
    category: dbTx.category,
    amount:
      dbTx.type === "Expenses" ? -Math.abs(dbTx.amount) : Math.abs(dbTx.amount),
    method: dbTx.method as any,
    type: dbTx.type as any,
    hasFees: dbTx.has_fees,
    feesAmount: dbTx.fees_amount,
    transferTarget: dbTx.transfer_target as any,
  });

  return { transactions, setTransactions };
}
