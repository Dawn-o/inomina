"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const summaryData = {
  balance: 12500,
  income: 4500,
  expenses: 3200,
  savings: 1300,
};

const recentTransactions = [
  {
    id: 1,
    date: "2023-10-15",
    description: "Grocery Shopping",
    category: "Food",
    amount: -150,
  },
  {
    id: 2,
    date: "2023-10-14",
    description: "Salary",
    category: "Income",
    amount: 3000,
  },
  {
    id: 3,
    date: "2023-10-13",
    description: "Gas",
    category: "Transport",
    amount: -80,
  },
  {
    id: 4,
    date: "2023-10-12",
    description: "Freelance Work",
    category: "Income",
    amount: 1500,
  },
  {
    id: 5,
    date: "2023-10-11",
    description: "Rent",
    category: "Housing",
    amount: -1200,
  },
];

const chartData = [
  { category: "Food", amount: 450, fill: "var(--chart-1)" },
  { category: "Transport", amount: 300, fill: "var(--chart-2)" },
  { category: "Housing", amount: 1200, fill: "var(--chart-3)" },
  { category: "Entertainment", amount: 200, fill: "var(--chart-4)" },
  { category: "Other", amount: 150, fill: "var(--chart-5)" },
];

const chartConfig = {
  amount: {
    label: "Amount",
  },
  Food: {
    label: "Food",
    color: "var(--chart-1)",
  },
  Transport: {
    label: "Transport",
    color: "var(--chart-2)",
  },
  Housing: {
    label: "Housing",
    color: "var(--chart-3)",
  },
  Entertainment: {
    label: "Entertainment",
    color: "var(--chart-4)",
  },
  Other: {
    label: "Other",
    color: "var(--chart-5)",
  },
};

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${summaryData.balance.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${summaryData.income.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              ${summaryData.expenses.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <PiggyBank className="h-4 w-4 mr-2" />
              Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${summaryData.savings.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
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
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <Link href="/transactions">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Description</TableHead>
                  <TableHead className="font-medium">Category</TableHead>
                  <TableHead className="font-medium text-right">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.slice(0, 5).map((tx, index) => (
                  <TableRow
                    key={tx.id}
                    className={index % 2 === 0 ? "bg-muted/20" : ""}
                  >
                    <TableCell className="text-sm">{tx.date}</TableCell>
                    <TableCell className="text-sm">{tx.description}</TableCell>
                    <TableCell className="text-sm">{tx.category}</TableCell>
                    <TableCell
                      className={`text-right text-sm font-medium ${
                        tx.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : "-"}$
                      {Math.abs(tx.amount).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-start">
        <Link href="/transactions">
          <Button size="lg" className="w-full sm:w-auto">
            <Plus className="mr-2 h-5 w-5" />
            Add Transaction
          </Button>
        </Link>
        <Link href="/reports">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <BarChart3 className="mr-2 h-5 w-5" />
            View Reports
          </Button>
        </Link>
      </div>
    </div>
  );
}
