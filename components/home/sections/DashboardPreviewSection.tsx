import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Plus,
  Zap,
  Globe,
  TrendingUpIcon,
} from "lucide-react";

export function DashboardPreviewSection() {
  return (
    <section className="relative p-8 border border-border">
      <div className="overflow-hidden rounded-xl border border-border bg-card select-none pointer-events-none">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-4 flex-1 rounded bg-background/50 px-3 py-1 text-xs text-muted-foreground">
            inomina.vercel.app/dashboard
          </div>
        </div>

        <div className="p-8 bg-background/50 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s an overview of your financial activity.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <h3 className="text-xl font-semibold text-foreground">
                Financial Overview
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                    Income
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    $2,000
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monthly earnings
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
                    Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">$1,200</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monthly spending
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    Net Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+$800</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Income - Expenses
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <PiggyBank className="h-4 w-4 mr-2" />
                    Savings Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">40%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Of income saved
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <h3 className="text-xl font-semibold text-foreground">
                Analytics & Activity
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-sm">Food</span>
                      </div>
                      <span className="text-sm font-medium">$400</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-chart-1" />
                        <span className="text-sm">Transport</span>
                      </div>
                      <span className="text-sm font-medium">$200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-chart-2" />
                        <span className="text-sm">Shopping</span>
                      </div>
                      <span className="text-sm font-medium">$300</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Grocery</p>
                        <p className="text-xs text-muted-foreground">
                          Food • 2025-10-25
                        </p>
                      </div>
                      <span className="text-sm font-medium text-red-600">
                        -$50.00
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Salary</p>
                        <p className="text-xs text-muted-foreground">
                          Income • 2025-10-20
                        </p>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        +$2,000.00
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Bus Ticket</p>
                        <p className="text-xs text-muted-foreground">
                          Transport • 2025-10-19
                        </p>
                      </div>
                      <span className="text-sm font-medium text-red-600">
                        -$2.50
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <h3 className="text-xl font-semibold text-foreground">
                Quick Actions
              </h3>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link href="/transactions">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Plus className="mr-2 h-5 w-5" />
                    Add Transaction
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Reports
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-24 pb-20">
        <h2 className="text-2xl sm:text-3xl font-semibold leading-tight flex flex-col">
          <span>
            Track your finances <Zap className="inline-block h-5 w-5" />
          </span>
          <span>
            Analyze your spending <Globe className="inline-block h-5 w-5" />{" "}
            Reach your goals <TrendingUpIcon className="inline-block h-5 w-5" />
          </span>
        </h2>
      </div>
    </section>
  );
}
