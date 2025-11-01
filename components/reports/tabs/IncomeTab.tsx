"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { TrendData } from "@/lib/utils/types";

interface IncomeTabProps {
  trendData: TrendData[];
}

export function IncomeTab({ trendData }: IncomeTabProps) {
  return (
    <Card className="shadow-sm hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Income Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your income sources and trends over time
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              name="Income"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
