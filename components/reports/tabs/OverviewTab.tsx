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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart3, PieChart } from "lucide-react";
import { MonthlyData, CategoryData } from "@/lib/utils/types";

interface OverviewTabProps {
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
}

export function OverviewTab({ monthlyData, categoryData }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <Card className="shadow-sm hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Monthly Overview
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Income, expenses, and savings by month
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              <Bar dataKey="savings" fill="#6366f1" name="Savings" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
        </CardContent>
      </Card>
    </div>
  );
}
