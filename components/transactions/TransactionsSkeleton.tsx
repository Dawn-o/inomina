import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

export function TransactionsSkeleton() {
  return (
    <>
      {/* Header */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-3">
          <Receipt className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        </div>
        <p className="text-muted-foreground">
          Track and manage your financial transactions with detailed insights.
        </p>
      </div>

      {/* Navigation skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 border rounded-lg">
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-muted rounded-md" />
          <div className="h-9 w-20 bg-muted rounded-md" />
          <div className="h-9 w-20 bg-muted rounded-md" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Filter by:</span>
          <div className="flex gap-1">
            <div className="h-8 w-8 bg-muted rounded" />
            <div className="h-8 w-8 bg-muted rounded" />
          </div>
          <div className="h-9 w-24 bg-muted rounded-md" />
        </div>
      </div>

      {/* Summary */}
      <section className="space-y-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-primary rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">Summary</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-1" />
              <p className="text-xs text-muted-foreground mt-1">
                Total earnings
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
                Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-1" />
              <p className="text-xs text-muted-foreground mt-1">
                Total spending
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                Net Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-1" />
              <p className="text-xs text-muted-foreground mt-1">
                Income - Expenses
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Savings Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <p className="text-xs text-muted-foreground mt-1">
                Of income saved
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-primary rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Transactions
          </h2>
        </div>

        <div className="border rounded-lg">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground">
              Your latest financial activity
            </p>
          </div>
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
