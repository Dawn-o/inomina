import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { PieChart } from "lucide-react";
import { EmptyState } from "@/components/display/EmptyState";
import { CategoryData } from "@/lib/utils/types";

export function SpendingByCategoryChart({
  categoryData,
  loading,
}: {
  categoryData: CategoryData[];
  loading?: boolean;
}) {
  return (
    <Card className="shadow-sm hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <PieChart className="h-5 w-5 mr-2 text-purple-600" />
          Expense Categories
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Breakdown of spending by category
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <Skeleton className="h-32 w-32 rounded-full" />
          </div>
        ) : categoryData.length === 0 ? (
          <EmptyState
            title="No Expense Data"
            description="You have no expenses to display for this period."
          />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={categoryData as any}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }: any) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
