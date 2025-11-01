import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar, BarChart3 } from "lucide-react";

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
  const isMonthlyView = tab === "monthly";

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {isMonthlyView ? (
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Calendar className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <div className="text-sm text-muted-foreground">
                  {isMonthlyView ? "Year View" : "Month View"}
                </div>
                <div className="text-xl font-bold">
                  {isMonthlyView
                    ? currentMonthlyYear
                    : `${monthName} ${currentYear}`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrev}
              className="h-9 w-9 p-0 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="px-3 py-1 bg-muted rounded-md">
              <span className="text-sm font-medium text-muted-foreground">
                {isMonthlyView ? "Year" : "Month"}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              className="h-9 w-9 p-0 hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
