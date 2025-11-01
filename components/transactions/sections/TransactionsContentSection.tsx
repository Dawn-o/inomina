import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MonthlySummary } from "@/components/transactions/ui/MonthlySummary";
import { DailyTransactions } from "@/components/transactions/ui/DailyTransactions";
import { CalendarView } from "@/components/transactions/ui/CalendarView";
import { EmptyState } from "@/components/display/EmptyState";
import { getAllMonthsSummary } from "@/lib/utils/transactions";
import type { Transaction } from "@/lib/utils/types";

interface TransactionsContentSectionProps {
  tab: "daily" | "calendar" | "monthly";
  filteredTransactions: Transaction[];
  grouped: Record<string, Transaction[]>;
  monthlySummary: any;
  currentMonthlyYear: number;
  currentMonth: number;
  currentYear: number;
  onUpdate: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export function TransactionsContentSection({
  tab,
  filteredTransactions,
  grouped,
  monthlySummary,
  currentMonthlyYear,
  currentMonth,
  currentYear,
  onUpdate,
  onDelete,
}: TransactionsContentSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">Transactions</h2>
      </div>

      <Tabs value={tab} className="w-full">
        <TabsContent value="daily">
          {filteredTransactions.length === 0 ? (
            <EmptyState
              title="No transactions found"
              description="Add a transaction to get started."
            />
          ) : (
            <DailyTransactions
              grouped={grouped}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          )}
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView
            transactions={filteredTransactions}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </TabsContent>
        <TabsContent value="monthly">
          {Object.values(
            getAllMonthsSummary(monthlySummary, currentMonthlyYear),
          ).every((m) => m.income === 0 && m.expenses === 0) ? (
            <EmptyState
              title="No monthly data found"
              description="Try adding transactions for this year."
            />
          ) : (
            <MonthlySummary
              months={getAllMonthsSummary(monthlySummary, currentMonthlyYear)}
              year={currentMonthlyYear}
            />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
