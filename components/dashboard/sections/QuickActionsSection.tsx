import { Plus, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function QuickActionsSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 justify-start">
          <Link href="/transactions">
            <Button
              size="lg"
              className="w-full sm:w-auto shadow-sm hover:shadow-lg bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Transaction
            </Button>
          </Link>
          <Link href="/reports">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto shadow-sm hover:shadow-lg border-2 hover:border-primary/50"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Reports
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
