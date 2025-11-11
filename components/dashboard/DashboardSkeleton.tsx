import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export function FinancialOverviewSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Financial Overview
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              Monthly earnings
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
              Monthly spending
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
              <PiggyBank className="h-4 w-4 mr-2" />
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
  );
}

export function AnalyticsActivitySkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Analytics & Activity
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <div className="h-5 w-5 rounded bg-muted mr-2"></div>
              Spending by Category
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Breakdown of spending by category
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[300px]">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <div className="h-5 w-5 rounded bg-muted mr-2"></div>
              Recent Transactions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your latest financial activity
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
