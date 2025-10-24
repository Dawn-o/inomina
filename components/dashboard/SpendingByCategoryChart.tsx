import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { EmptyState } from "@/components/display/EmptyState";

type ChartData = {
  category: string;
  amount: number;
  fill: string;
}[];

type ChartConfig = Record<string, { label: string; color?: string }>;

export function SpendingByCategoryChart({
  chartData,
  chartConfig,
  loading,
}: {
  chartData: ChartData;
  chartConfig: ChartConfig;
  loading?: boolean;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <Skeleton className="h-32 w-32 rounded-full" />
          </div>
        ) : chartData.length === 0 ? (
          <EmptyState
            title="No Expense Data"
            description="You have no expenses to display for this period."
          />
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  labelLine={false}
                  label={(props) => {
                    const percent = props.percent as number;
                    return `${props.name} ${(percent * 100).toFixed(0)}%`;
                  }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
