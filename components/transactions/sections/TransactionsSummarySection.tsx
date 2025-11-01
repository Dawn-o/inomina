import { SummaryCards } from "@/components/transactions/ui/SummaryCards";

interface TransactionsSummarySectionProps {
  income: number;
  expenses: number;
  total: number;
}

export function TransactionsSummarySection({
  income,
  expenses,
  total,
}: TransactionsSummarySectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">Summary</h2>
      </div>
      <SummaryCards income={income} expenses={expenses} total={total} />
    </section>
  );
}
