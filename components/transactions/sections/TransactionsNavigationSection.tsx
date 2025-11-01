import { TransactionsHeader } from "@/components/transactions/sections/TransactionsHeader";

interface TransactionsNavigationSectionProps {
  tab: "daily" | "calendar" | "monthly";
  setTab: (tab: "daily" | "calendar" | "monthly") => void;
  onAdd: () => void;
  monthName: string;
  currentYear: number;
  currentMonthlyYear: number;
  onPrev: () => void;
  onNext: () => void;
}

export function TransactionsNavigationSection({
  tab,
  setTab,
  onAdd,
  monthName,
  currentYear,
  currentMonthlyYear,
  onPrev,
  onNext,
}: TransactionsNavigationSectionProps) {
  return (
    <section>
      <TransactionsHeader
        tab={tab}
        setTab={(v) => setTab(v as any)}
        onAdd={onAdd}
        monthName={monthName}
        currentYear={currentYear}
        currentMonthlyYear={currentMonthlyYear}
        onPrev={onPrev}
        onNext={onNext}
      />
    </section>
  );
}
