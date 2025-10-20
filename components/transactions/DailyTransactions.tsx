import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category?: string;
  amount: number;
  method: string;
  type: string;
  hasFees?: boolean;
  feesAmount?: number;
  transferTarget?: string;
}

function formatDateDisplay(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const weekday = date
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  return {
    day,
    weekday,
    month,
    year,
    dateString: `${month.toString().padStart(2, "0")}/${year}`,
  };
}

interface DailyTransactionsProps {
  grouped: Record<string, Transaction[]>;
}

export function DailyTransactions({ grouped }: DailyTransactionsProps) {
  return (
    <div className="space-y-6">
      {Object.keys(grouped)
        .sort((a, b) => (a < b ? 1 : -1))
        .map((date) => {
          const display = formatDateDisplay(date);
          return (
            <Card key={date}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-violet-600 text-white px-3 py-2 text-lg font-bold">
                    {display.day}
                  </span>
                  <span className="rounded bg-violet-100 text-violet-700 px-2 py-1 text-xs font-semibold">
                    {display.weekday}
                  </span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {display.dateString}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grouped[date].map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          {tx.type === "Transfer" ? "Transfer" : tx.category}
                        </TableCell>
                        <TableCell>{tx.method}</TableCell>
                        <TableCell
                          className={
                            tx.type === "Transfer"
                              ? tx.transferTarget === "Other"
                                ? "text-red-600"
                                : ""
                              : tx.amount > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          ${Math.abs(tx.amount).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="icon" variant="ghost">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {grouped[date]
                      .filter(
                        (tx) =>
                          tx.type === "Transfer" && tx.hasFees && tx.feesAmount
                      )
                      .map((tx, idx) => (
                        <TableRow key={`fees-${tx.id}-${idx}`}>
                          <TableCell>Other (Transfer Fee)</TableCell>
                          <TableCell>{tx.method}</TableCell>
                          <TableCell className="text-red-600">
                            ${Number(tx.feesAmount).toLocaleString()}
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
