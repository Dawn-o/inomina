import { Button } from "@/components/ui/button";
import {
  Plus,
  BarChart3,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface TransactionsHeaderProps {
  tab: "daily" | "calendar" | "monthly";
  setTab: (tab: "daily" | "calendar" | "monthly") => void;
  onAdd: () => void;
  monthName?: string;
  currentYear?: number;
  currentMonthlyYear?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export function TransactionsHeader({
  tab,
  setTab,
  onAdd,
  monthName,
  currentYear,
  currentMonthlyYear,
  onPrev,
  onNext,
}: TransactionsHeaderProps) {
  const isMonthlyView = tab === "monthly";

  return (
    <div className="space-y-4">
      {(onPrev || onNext) && (
        <div className="flex items-center justify-left gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrev}
            className="h-8 w-8 p-0 hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-xs uppercase tracking-wider font-semibold px-4 py-2 bg-muted rounded-md">
            {isMonthlyView
              ? currentMonthlyYear
              : `${monthName} ${currentYear}`}{" "}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            className="h-8 w-8 p-0 hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-grid h-12 p-1 bg-muted/50">
            <TabsTrigger
              value="daily"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-10 px-3 sm:px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Daily</span>
              <Badge
                variant="secondary"
                className="hidden sm:inline-flex text-xs px-1.5 py-0.5"
              >
                Details
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-10 px-3 sm:px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Calendar</span>
              <Badge
                variant="secondary"
                className="hidden sm:inline-flex text-xs px-1.5 py-0.5"
              >
                Visual
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-10 px-3 sm:px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Monthly</span>
              <Badge
                variant="secondary"
                className="hidden sm:inline-flex text-xs px-1.5 py-0.5"
              >
                Summary
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          onClick={onAdd}
          size="lg"
          className="w-full sm:w-auto shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
}
