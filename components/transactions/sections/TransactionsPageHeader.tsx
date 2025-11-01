import { Receipt } from "lucide-react";

interface TransactionsPageHeaderProps {
  title?: string;
  description?: string;
}

export function TransactionsPageHeader({
  title = "Transactions",
  description = "Track and manage your financial transactions with detailed insights.",
}: TransactionsPageHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Receipt className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
