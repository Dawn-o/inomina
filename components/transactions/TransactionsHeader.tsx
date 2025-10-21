import { Button } from "@/components/ui/button";
import { Plus, BarChart, CalendarDays, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TransactionsHeaderProps {
  tab: "daily" | "calendar" | "monthly";
  setTab: (tab: "daily" | "calendar" | "monthly") => void;
  onAdd: () => void;
}

export function TransactionsHeader({
  tab,
  setTab,
  onAdd,
}: TransactionsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as any)}
        className="w-auto"
      >
        <TabsList>
          <TabsTrigger value="daily">
            <BarChart className="w-4 h-4 mr-1" /> Daily
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarDays className="w-4 h-4 mr-1" /> Calendar
          </TabsTrigger>
          <TabsTrigger value="monthly">
            <List className="w-4 h-4 mr-1" /> Monthly
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
    </div>
  );
}
