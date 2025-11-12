import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target, Activity } from "lucide-react";

export function ReportsSummarySkeleton() {
  const icons = [TrendingUp, TrendingDown, Target, Activity];
  const titles = [
    "Total Income",
    "Total Expenses",
    "Net Savings",
    "Savings Rate",
  ];
  const descriptions = [
    "This period",
    "This period",
    "This period",
    "Of total income",
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Summary Statistics
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {titles.map((title, i) => {
          const Icon = icons[i];
          return (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  <span className="flex items-center">
                    <Icon className="h-4 w-4 mr-2" />
                    {title}
                  </span>
                  <Skeleton className="h-4 w-4 rounded" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24 mb-2" />
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <span className="text-xs text-muted-foreground">
                    {descriptions[i]}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function ReportsContentSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Reports & Analytics
        </h2>
      </div>

      {/* Tabs skeleton */}
      <div className="w-full">
        <div className="grid w-full grid-cols-4 h-12 p-1 bg-muted/50 rounded-lg mb-6">
          <div className="flex items-center gap-2 h-10 px-4 rounded-md bg-muted">
            <div className="h-4 w-4 rounded bg-muted-foreground/20"></div>
            <span className="hidden sm:inline text-sm">Overview</span>
          </div>
          <div className="flex items-center gap-2 h-10 px-4 rounded-md">
            <div className="h-4 w-4 rounded bg-muted-foreground/20"></div>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              Income
            </span>
          </div>
          <div className="flex items-center gap-2 h-10 px-4 rounded-md">
            <div className="h-4 w-4 rounded bg-muted-foreground/20"></div>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              Expenses
            </span>
          </div>
          <div className="flex items-center gap-2 h-10 px-4 rounded-md">
            <div className="h-4 w-4 rounded bg-muted-foreground/20"></div>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              Trends
            </span>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Chart skeleton */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <div className="h-5 w-5 rounded bg-muted mr-2"></div>
                Monthly Overview
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Income, expenses, and savings by month
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px]">
                <Skeleton className="h-32 w-32 rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Second chart skeleton */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <div className="h-5 w-5 rounded bg-muted mr-2"></div>
                Expense Categories
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
        </div>
      </div>
    </section>
  );
}
