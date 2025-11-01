import { BarChart3 } from "lucide-react";

interface ReportsHeaderProps {
  title?: string;
  description?: string;
}

export function ReportsHeader({
  title = "Reports",
  description = "Analyze your financial data with detailed insights and visualizations.",
}: ReportsHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
