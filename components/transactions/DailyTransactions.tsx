import { useState } from "react";
import { TransactionDialog } from "@/components/transactions/TransactionDialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Repeat2, BadgeDollarSign, ReceiptText } from "lucide-react";
import { categories } from "@/lib/categories";
import { TransactionType } from "@/lib/types";

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

type DailyTransactionsProps = {
  grouped: {
    [date: string]: Transaction[];
  };
};

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

function getCategoryIcon(category: string | undefined) {
  const found = categories.find((cat) => cat.value === category);
  return found ? found.icon : null;
}

export function DailyTransactions({ grouped }: DailyTransactionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [editType, setEditType] = useState<TransactionType | null>(null);

  function handleEdit(tx: Transaction) {
    setEditForm({ ...tx });
    setEditType(tx.type as TransactionType);
    setEditOpen(true);
  }

  return (
    <>
      <div className="space-y-6">
        {Object.keys(grouped)
          .sort((a, b) => (a < b ? 1 : -1))
          .map((date) => {
            const display = formatDateDisplay(date);
            return (
              <Card key={date}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-violet-600 text-white px-3 py-2 text-lg font-bold w-12 text-center">
                      {display.day}
                    </span>
                    <span className="rounded bg-violet-100 text-violet-700 px-2 py-1 text-xs font-semibold w-12 text-center">
                      {display.weekday}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2 w-20 text-left">
                      {display.dateString}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3 text-left">
                          Category
                        </TableHead>
                        <TableHead className="w-1/3 text-center">
                          Method
                        </TableHead>
                        <TableHead className="w-1/4 text-right">
                          Amount
                        </TableHead>
                        <TableHead className="w-1/6 text-center">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grouped[date].map((tx: Transaction) => {
                        const Icon: React.ComponentType<{
                          className?: string;
                        }> | null = getCategoryIcon(tx.category);
                        return (
                          <TableRow key={tx.id}>
                            <TableCell className="w-1/3 text-left">
                              <div className="flex items-center gap-2">
                                {tx.type === "Transfer" ? (
                                  <>
                                    <Repeat2 className="h-4 w-4" />
                                    <span>Transfer</span>
                                  </>
                                ) : (
                                  <>
                                    {Icon && <Icon className="h-4 w-4" />}
                                    <span>{tx.category}</span>
                                  </>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="w-1/3 text-center">
                              {tx.method}
                            </TableCell>
                            <TableCell
                              className={`w-1/4 text-right font-bold ${
                                tx.type === "Transfer"
                                  ? tx.transferTarget === "Other"
                                    ? "text-red-600"
                                    : ""
                                  : tx.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              ${Math.abs(tx.amount).toLocaleString()}
                            </TableCell>
                            <TableCell className="w-1/6 text-center">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleEdit(tx)}
                              >
                                <ReceiptText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {grouped[date]
                        .filter(
                          (tx: Transaction) =>
                            tx.type === "Transfer" &&
                            tx.hasFees &&
                            tx.feesAmount
                        )
                        .map((tx: Transaction, idx: number) => (
                          <TableRow key={`fees-${tx.id}-${idx}`}>
                            <TableCell className="w-1/3 text-left">
                              <div className="flex items-center gap-2">
                                <BadgeDollarSign className="h-4 w-4" />
                                <span>Other (Transfer Fee)</span>
                              </div>
                            </TableCell>
                            <TableCell className="w-1/3 text-center">
                              {tx.method}
                            </TableCell>
                            <TableCell className="w-1/4 text-right font-bold text-red-600">
                              ${Number(tx.feesAmount).toLocaleString()}
                            </TableCell>
                            <TableCell className="w-1/6" />
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })}
      </div>
      {editOpen && (
        <TransactionDialog
          open={editOpen}
          setOpen={setEditOpen}
          selectedType={editType}
          setSelectedType={setEditType}
          onTypeSelect={() => {}}
          form={editForm}
          setForm={setEditForm}
          onFormChange={(e) => {
            setEditForm((f: any) => ({
              ...f,
              [e.target.name]: e.target.value,
            }));
          }}
          onFormSelect={(name, value) => {
            setEditForm((f: any) => ({
              ...f,
              [name]: value,
            }));
          }}
          handleAdd={() => {
            setEditOpen(false);
          }}
        />
      )}
    </>
  );
}
