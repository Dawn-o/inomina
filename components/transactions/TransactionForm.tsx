"use client";

import { useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { expenseCategories, incomeCategories } from "@/lib/utils/categories";
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { transactionSchema, TransactionFormValues } from "@/lib/schemas/transaction";
import { addTransaction } from "@/app/transactions/actions";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => {
            startTransition(async () => {
              await addTransaction(data);
              onSubmit?.(data);
              setOpen(false);
              form.reset();
            });
          })}
        >
          <FieldGroup>
            <Controller
              name="type"
              control={form.control}
              render={({ field }) => (
                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    variant={field.value === "Income" ? "default" : "outline"}
                    onClick={() => field.onChange("Income")}
                  >
                    Income
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "Expenses" ? "default" : "outline"}
                    onClick={() => field.onChange("Expenses")}
                  >
                    Expenses
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "Transfer" ? "default" : "outline"}
                    onClick={() => field.onChange("Transfer")}
                  >
                    Transfer
                  </Button>
                </div>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="date">Date</FieldLabel>
                  <Input
                    {...field}
                    id="date"
                    type="datetime-local"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="amount">Amount</FieldLabel>
                  <Input
                    {...field}
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {type !== "Transfer" && (
              <div className="flex gap-4">
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="category">Category</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <SelectTrigger
                          id="category"
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
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="method"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="method">Method</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <SelectTrigger
                          id="method"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Account">Account</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            )}
            {type === "Transfer" && (
              <>
                <div className="flex gap-4">
                  <Controller
                    name="method"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="flex-1" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="method">Method</FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          name={field.name}
                        >
                          <SelectTrigger
                            id="method"
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Account">Account</SelectItem>
                            <SelectItem value="Card">Card</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <Controller
                    name="transferTarget"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="flex-6" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="transferTarget">
                          Transfer To
                        </FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          name={field.name}
                        >
                          <SelectTrigger
                            id="transferTarget"
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue placeholder="Select target" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Yourself">Yourself</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    name="hasFees"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex-1 mt-7">
                        <Toggle
                          pressed={field.value}
                          onPressedChange={field.onChange}
                          aria-label="Toggle transfer fees"
                        >
                          {field.value ? "Has Fees" : "No Fees"}
                        </Toggle>
                      </div>
                    )}
                  />
                </div>
                {hasFees && (
                  <Controller
                    name="feesAmount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="feesAmount">
                          Fees Amount
                        </FieldLabel>
                        <Input
                          {...field}
                          id="feesAmount"
                          type="number"
                          min="0"
                          step="0.01"
                          aria-invalid={fieldState.invalid}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                )}
              </>
            )}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    {...field}
                    id="description"
                    placeholder="Description"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    Add a note or description for this transaction.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                form.reset();
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
