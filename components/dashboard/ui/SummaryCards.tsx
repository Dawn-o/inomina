import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

type SummaryData = {
  balance?: number;
  income?: number;
  expenses?: number;
  savings?: number;
};

export function SummaryCards({
  data,
  loading,
}: {
  data: SummaryData;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-32 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const balance = data.balance ?? 0;
  const income = data.income ?? 0;
  const expenses = data.expenses ?? 0;
  const total = income - expenses;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
            Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ${income.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Monthly earnings</p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
            Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            ${expenses.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Monthly spending</p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <DollarSign
              className={`h-4 w-4 mr-2 ${total >= 0 ? "text-green-600" : "text-red-600"}`}
            />
            Net Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${total >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {total >= 0 ? "+" : ""}${total.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Income - Expenses
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <PiggyBank className="h-4 w-4 mr-2" />
            Savings Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{savingsRate.toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground mt-1">Of income saved</p>
        </CardContent>
      </Card>
    </div>
  );
}
