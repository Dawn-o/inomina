import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/display/EmptyState";

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
};

export function RecentTransactions({
  transactions,
  loading,
}: {
  transactions: Transaction[];
  loading?: boolean;
}) {
  return (
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
        {loading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Date</TableHead>
                <TableHead className="font-medium">Description</TableHead>
                <TableHead className="font-medium">Category</TableHead>
                <TableHead className="font-medium text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-14 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No Transactions"
            description="You have no recent transactions. Add one to get started."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Date</TableHead>
                <TableHead className="font-medium">Description</TableHead>
                <TableHead className="font-medium">Category</TableHead>
                <TableHead className="font-medium text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, index) => (
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
        )}
      </CardContent>
    </Card>
  );
}
