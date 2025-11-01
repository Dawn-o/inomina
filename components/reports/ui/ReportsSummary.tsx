"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SummaryStat } from "@/lib/utils/types";

interface ReportsSummaryProps {
  stats: SummaryStat[];
}

export function ReportsSummary({ stats }: ReportsSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm hover:shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              <span className="flex items-center">
                <stat.icon className="h-4 w-4 mr-2" />
                {stat.title}
              </span>
              {stat.changeType === "positive" ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  stat.changeType === "positive" ? "default" : "destructive"
                }
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {stat.description}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
