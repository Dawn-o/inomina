import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Calendar,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/display/EmptyState";
import { expenseCategories, incomeCategories } from "@/lib/utils/categories";

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  method?: string;
  type?: string;
};

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

function getMethodIcon(method: string) {
  switch (method?.toLowerCase()) {
    case "cash":
      return <Banknote className="h-4 w-4" />;
    case "card":
      return <CreditCard className="h-4 w-4" />;
    default:
      return <Banknote className="h-4 w-4" />;
  }
}

export function RecentTransactions({
  transactions,
  loading,
}: {
  transactions: Transaction[];
  loading?: boolean;
}) {
  return (
    <Card className="shadow-sm hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Recent Transactions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your latest financial activity
          </p>
        </div>
        <Link href="/transactions">
          <Button variant="ghost" size="sm" className="hover:bg-muted">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg border bg-card/50"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No Transactions"
            description="You have no recent transactions. Add one to get started."
          />
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => {
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
                      {Icon ? (
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
                          {tx.category}
                        </Badge>
                        {tx.method && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {getMethodIcon(tx.method)}
                            {tx.method}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      tx.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : "-"}$
                    {Math.abs(tx.amount).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
