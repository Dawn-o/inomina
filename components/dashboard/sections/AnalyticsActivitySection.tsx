import { SpendingByCategoryChart } from "@/components/dashboard/ui/SpendingByCategoryChart";
import { RecentTransactions } from "@/components/dashboard/ui/RecentTransactions";
import { CategoryData } from "@/lib/utils/types";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface AnalyticsActivitySectionProps {
  categoryData: CategoryData[];
  transactions: Transaction[];
  loading?: boolean;
}

export function AnalyticsActivitySection({
  categoryData,
  transactions,
  loading = false,
}: AnalyticsActivitySectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Analytics & Activity
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingByCategoryChart
          categoryData={categoryData}
          loading={loading}
        />
        <RecentTransactions
          transactions={transactions.slice(0, 5)}
          loading={loading}
        />
      </div>
    </section>
  );
}
