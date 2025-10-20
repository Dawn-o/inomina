import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationBarProps {
  tab: string;
  monthName: string;
  currentYear: number;
  currentMonthlyYear: number;
  onPrev: () => void;
  onNext: () => void;
}

export function NavigationBar({
  tab,
  monthName,
  currentYear,
  currentMonthlyYear,
  onPrev,
  onNext,
}: NavigationBarProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-2">
      <Button variant="ghost" size="icon" onClick={onPrev}>
        <ChevronLeft />
      </Button>
      {tab === "monthly" ? (
        <span className="font-semibold text-lg">{currentMonthlyYear}</span>
      ) : (
        <span className="font-semibold text-lg">
          {monthName} {currentYear}
        </span>
      )}
      <Button variant="ghost" size="icon" onClick={onNext}>
        <ChevronRight />
      </Button>
    </div>
  );
}
