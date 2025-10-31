"use client";

import { useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { expenseCategories, incomeCategories } from "@/lib/utils/categories";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  transactionSchema,
  TransactionFormValues,
} from "@/lib/schemas/transaction";
import { addTransaction } from "@/app/transactions/actions";
import {
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Calendar,
  DollarSign,
  CreditCard,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TransactionType = "Income" | "Expenses" | "Transfer";

interface TransactionFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultType?: TransactionType;
  onSubmit?: (data: TransactionFormValues) => void;
}

export function TransactionForm({
  open,
  setOpen,
  defaultType = "Expenses",
  onSubmit,
}: TransactionFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: defaultType,
      date: "",
      amount: 0,
      category: "",
      method: "",
      transferTarget: "Other",
      hasFees: false,
      feesAmount: 0,
      description: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (open) {
      const todayStr = new Date().toISOString().slice(0, 16);
      form.setValue("date", todayStr);
      form.setValue("type", defaultType);
    }
  }, [open, defaultType, form]);

  const type = form.watch("type");
  const hasFees = form.watch("hasFees");
  const categories =
    type === "Income"
      ? incomeCategories
      : type === "Expenses"
        ? expenseCategories
        : [];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5" />
            Add Transaction
          </DialogTitle>
        </DialogHeader>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit((data) => {
            startTransition(async () => {
              await addTransaction(data);
              onSubmit?.(data);
              setOpen(false);
              form.reset();
            });
          })}
        >
          <div className="px-6 py-4 space-y-6">
            <div className="space-y-3">
              <Controller
                name="type"
                control={form.control}
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant={field.value === "Income" ? "default" : "outline"}
                      onClick={() => field.onChange("Income")}
                      className="h-12 flex flex-col gap-1 transition-all duration-200"
                    >
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs">Income</span>
                    </Button>
                    <Button
                      type="button"
                      variant={
                        field.value === "Expenses" ? "default" : "outline"
                      }
                      onClick={() => field.onChange("Expenses")}
                      className="h-12 flex flex-col gap-1 transition-all duration-200"
                    >
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-xs">Expenses</span>
                    </Button>
                    <Button
                      type="button"
                      variant={
                        field.value === "Transfer" ? "default" : "outline"
                      }
                      onClick={() => field.onChange("Transfer")}
                      className="h-12 flex flex-col gap-1 transition-all duration-200"
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                      <span className="text-xs">Transfer</span>
                    </Button>
                  </div>
                )}
              />
            </div>

            <Separator />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </FieldLabel>
                  <Input
                    {...field}
                    id="date"
                    type="datetime-local"
                    className="h-10"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Amount
                  </FieldLabel>
                  <Input
                    {...field}
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    className="h-10"
                    placeholder="0.00"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {type !== "Transfer" && (
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Category</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <SelectTrigger
                          className="h-10"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              <span className="flex items-center gap-2">
                                <cat.icon className="h-4 w-4" />
                                {cat.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="method"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Method
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <SelectTrigger
                          className="h-10"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">💵 Cash</SelectItem>
                          <SelectItem value="Account">🏦 Account</SelectItem>
                          <SelectItem value="Card">💳 Card</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            )}
            {type === "Transfer" && (
              <div className="space-y-4">
                <Controller
                  name="method"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Method
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <SelectTrigger
                          className="h-10"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">💵 Cash</SelectItem>
                          <SelectItem value="Account">🏦 Account</SelectItem>
                          <SelectItem value="Card">💳 Card</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-4">
                    <Controller
                      name="transferTarget"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Transfer To</FieldLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            name={field.name}
                          >
                            <SelectTrigger
                              className="h-10"
                              aria-invalid={fieldState.invalid}
                            >
                              <SelectValue placeholder="Select target" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Other">Other</SelectItem>
                              <SelectItem value="Yourself">Yourself</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <Controller
                    name="hasFees"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Fees</FieldLabel>
                        <Toggle
                          pressed={field.value}
                          onPressedChange={field.onChange}
                          className="h-10 w-full justify-start"
                          aria-label="Toggle transfer fees"
                        >
                          {field.value ? "Has Fees" : "No Fees"}
                        </Toggle>
                      </Field>
                    )}
                  />
                </div>

                {hasFees && (
                  <Controller
                    name="feesAmount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Fees Amount</FieldLabel>
                        <Input
                          {...field}
                          id="feesAmount"
                          type="number"
                          min="0"
                          step="0.01"
                          className="h-10"
                          placeholder="0.00"
                          aria-invalid={fieldState.invalid}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}
              </div>
            )}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    {...field}
                    id="description"
                    placeholder="Add a note or description..."
                    className="h-10"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                form.reset();
              }}
              disabled={isPending}
              className="h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="h-9 min-w-[80px]"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
