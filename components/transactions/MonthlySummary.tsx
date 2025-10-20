import { Card, CardContent } from "@/components/ui/card";

interface MonthlySummaryProps {
  months: { month: number; income: number; expenses: number }[];
  year: number;
}

export function MonthlySummary({ months, year }: MonthlySummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {months.map(({ month, income, expenses }) => {
        const monthName = new Date(year, month).toLocaleString("en-US", {
          month: "long",
        });
        return (
          <Card key={monthName} className="h-14 flex items-center">
            <CardContent className="flex justify-between items-center h-full px-4 py-2 w-full">
              <span className="font-semibold">{monthName}</span>
              <span className="text-green-600 font-bold">
                ${income.toLocaleString()}
              </span>
              <span className="text-red-600 font-bold">
                ${expenses.toLocaleString()}
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
