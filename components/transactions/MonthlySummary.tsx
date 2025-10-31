import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MonthlySummaryProps {
  months: { month: number; income: number; expenses: number }[];
  year: number;
}

export function MonthlySummary({ months, year }: MonthlySummaryProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map(({ month, income, expenses }) => {
          const monthName = new Date(year, month).toLocaleString("en-US", {
            month: "long",
          });
          const net = income - expenses;
          const savingsRate = income > 0 ? (net / income) * 100 : 0;
          const hasData = income > 0 || expenses > 0;

          return (
            <Card
              key={monthName}
              className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  {monthName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hasData ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Income
                        </span>
                      </div>
                      <span className="font-bold text-green-600">
                        ${income.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Expenses
                        </span>
                      </div>
                      <span className="font-bold text-red-600">
                        ${expenses.toLocaleString()}
                      </span>
                    </div>

                    {income > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Savings Rate</span>
                          <span>{savingsRate.toFixed(0)}%</span>
                        </div>
                        <Progress
                          value={Math.min(savingsRate, 100)}
                          className="h-2"
                        />
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all duration-300 ease-in-out"
                            style={{ width: `${Math.min(savingsRate, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign
                            className={`h-4 w-4 ${net >= 0 ? "text-green-600" : "text-red-600"}`}
                          />
                          <span className="text-sm font-medium text-muted-foreground">
                            Net
                          </span>
                        </div>
                        <span
                          className={`font-bold text-lg ${net >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {net >= 0 ? "+" : ""}${net.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No data for this month</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
