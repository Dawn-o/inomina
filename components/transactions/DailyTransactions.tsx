import { useState } from "react";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Repeat2,
  BadgeDollarSign,
  Edit,
  Trash2,
  Calendar,
  CreditCard,
  Banknote,
} from "lucide-react";
import { expenseCategories, incomeCategories } from "@/lib/utils/categories";
import { TransactionType } from "@/lib/utils/types";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category?: string;
  amount: number;
  method: string;
  type: string;
  hasFees?: boolean;
  feesAmount?: number;
  transferTarget?: string;
}

type DailyTransactionsProps = {
  grouped: {
    [date: string]: Transaction[];
  };
  onUpdate: (transaction: Transaction) => void;
  onDelete: (transactionId: number) => void;
};

function formatDateDisplay(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const weekday = date
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  return {
    day,
    weekday,
    month,
    year,
    dateString: `${month.toString().padStart(2, "0")}/${year}`,
  };
}

function getCategoryIcon(
  category: string | undefined,
  type: string | undefined,
) {
  let found;
  if (type === "Income") {
    found = incomeCategories.find((cat) => cat.value === category);
  } else if (type === "Expenses") {
    found = expenseCategories.find((cat) => cat.value === category);
  } else {
    found = undefined;
  }
  return found ? found.icon : null;
}

export function DailyTransactions({
  grouped,
  onUpdate,
  onDelete,
}: DailyTransactionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [editType, setEditType] = useState<TransactionType | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  function handleEdit(tx: Transaction) {
    setEditForm({ ...tx });
    setEditType(tx.type as TransactionType);
    setEditOpen(true);
  }

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return <Banknote className="h-4 w-4" />;
      case "card":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Banknote className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="space-y-8">
        {Object.keys(grouped)
          .sort((a, b) => (a < b ? 1 : -1))
          .map((date) => {
            const display = formatDateDisplay(date);
            const dayTransactions = grouped[date];
            const dayTotal = dayTransactions.reduce((sum, tx) => {
              if (tx.type === "Income") return sum + tx.amount;
              if (tx.type === "Expenses") return sum - Math.abs(tx.amount);
              if (tx.type === "Transfer" && tx.transferTarget === "Other")
                return sum - Math.abs(tx.amount);
              return sum;
            }, 0);

            return (
              <Card key={date} className="shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="flex flex-col items-center p-2"
                        >
                          <div className="text-2xl font-bold text-primary">
                            {display.day}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">
                            {display.weekday}
                          </div>
                        </Badge>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="flex flex-col">
                          <div className="text-sm font-medium">
                            {new Date(date).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {dayTransactions.length} transaction
                            {dayTransactions.length !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${dayTotal >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {dayTotal >= 0 ? "+" : ""}${dayTotal.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Day total
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dayTransactions.map((tx: Transaction) => {
                    const Icon: React.ComponentType<{
                      className?: string;
                    }> | null = getCategoryIcon(tx.category, tx.type);

                    return (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                            {tx.type === "Transfer" ? (
                              <Repeat2 className="h-5 w-5 text-muted-foreground" />
                            ) : Icon ? (
                              <Icon className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <Calendar className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {tx.description || tx.category || "Transaction"}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="secondary"
                                className="text-xs px-2 py-0"
                              >
                                {tx.type}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                {getMethodIcon(tx.method)}
                                {tx.method}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`text-lg font-bold ${
                              tx.type === "Transfer"
                                ? tx.transferTarget === "Other"
                                  ? "text-red-600"
                                  : "text-muted-foreground"
                                : tx.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                            }`}
                          >
                            {tx.type === "Transfer" &&
                            tx.transferTarget === "Other"
                              ? "-"
                              : tx.amount > 0
                                ? "+"
                                : "-"}
                            ${Math.abs(tx.amount).toLocaleString()}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-muted"
                              onClick={() => handleEdit(tx)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => onDelete(tx.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Transfer fees */}
                  {dayTransactions
                    .filter(
                      (tx: Transaction) =>
                        tx.type === "Transfer" && tx.hasFees && tx.feesAmount,
                    )
                    .map((tx: Transaction, idx: number) => (
                      <div
                        key={`fees-${tx.id}-${idx}`}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card/50 border-orange-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                            <BadgeDollarSign className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              Transfer Fee
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0 border-orange-200 text-orange-700"
                              >
                                Fee
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                {getMethodIcon(tx.method)}
                                {tx.method}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-red-600">
                          -${Number(tx.feesAmount).toLocaleString()}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            );
          })}
      </div>
      {editOpen && (
        <TransactionForm
          open={editOpen}
          setOpen={setEditOpen}
          defaultType={editType ?? "Expenses"}
          onSubmit={(data) => {
            setEditOpen(false);
          }}
        />
      )}
    </>
  );
}
