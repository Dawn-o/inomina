import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  income: number;
  expenses: number;
  total: number;
}

export function SummaryCards({ income, expenses, total }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="py-4 flex flex-col items-center">
          <span className="text-xs text-muted-foreground">Income</span>
          <span className="text-2xl font-bold text-green-600">
            ${income.toLocaleString()}
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4 flex flex-col items-center">
          <span className="text-xs text-muted-foreground">Expenses</span>
          <span className="text-2xl font-bold text-red-600">
            ${expenses.toLocaleString()}
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4 flex flex-col items-center">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="text-2xl font-bold">${total.toLocaleString()}</span>
        </CardContent>
      </Card>
    </div>
  );
}
