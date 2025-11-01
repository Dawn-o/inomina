import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

interface SummaryCardsProps {
  income: number;
  expenses: number;
  total: number;
}

export function SummaryCards({ income, expenses, total }: SummaryCardsProps) {
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-sm hover:shadow-md">
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
          <p className="text-xs text-muted-foreground mt-1">Total earnings</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md">
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
          <p className="text-xs text-muted-foreground mt-1">Total spending</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md">
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

      <Card className="shadow-sm hover:shadow-md">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Target className="h-4 w-4 mr-2" />
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
