import { SummaryCards } from "@/components/dashboard/ui/SummaryCards";

interface FinancialOverviewSectionProps {
  summary: {
    balance: number;
    income: number;
    expenses: number;
  };
}

export function FinancialOverviewSection({
  summary,
}: FinancialOverviewSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Financial Overview
        </h2>
      </div>
      <SummaryCards data={summary} />
    </section>
  );
}
