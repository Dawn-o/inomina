"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingDown } from "lucide-react";
import { CategoryData } from "@/lib/utils/types";

interface ExpensesTabProps {
  categoryData: CategoryData[];
}

export function ExpensesTab({ categoryData }: ExpensesTabProps) {
  return (
    <Card className="shadow-sm hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
          Expense Breakdown
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Analyze your spending patterns and identify areas for savings
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ef4444" name="Amount" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
