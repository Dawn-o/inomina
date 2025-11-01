import { LayoutDashboard } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
}

export function DashboardHeader({
  title = "Dashboard",
  description = "Welcome back! Here's an overview of your financial activity.",
}: DashboardHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
