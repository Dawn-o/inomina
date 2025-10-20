import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/categories";
type TransactionType = "Income" | "Expenses" | "Transfer";
type TransactionMethod = "Cash" | "Account" | "Card";
type TransferTarget = "Other" | "Yourself";

interface TransactionFormProps {
  form: any;
  selectedType: TransactionType | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (name: string, value: string) => void;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleAdd: () => void;
  setSelectedType: (type: TransactionType | null) => void;
}

export function TransactionForm({
  form,
  selectedType,
  handleChange,
  handleSelect,
  setForm,
  handleAdd,
  setSelectedType,
}: TransactionFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        {selectedType !== "Transfer" && (
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => handleSelect("category", v)}
              required
            >
              <SelectTrigger>
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
          </div>
        )}
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <Label htmlFor="method">Method</Label>
          <Select
            value={form.method}
            onValueChange={(v) => handleSelect("method", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Account">Account</SelectItem>
              <SelectItem value="Card">Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {selectedType === "Transfer" && (
          <>
            <div>
              <Label htmlFor="transferTarget">Transfer To</Label>
              <Select
                value={form.transferTarget}
                onValueChange={(v) =>
                  setForm((f: any) => ({
                    ...f,
                    transferTarget: v as TransferTarget,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Yourself">Yourself</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex items-center gap-4">
              <Toggle
                pressed={form.hasFees}
                onPressedChange={(v) =>
                  setForm((f: any) => ({ ...f, hasFees: v }))
                }
                aria-label="Toggle transfer fees"
              >
                {form.hasFees ? "Has Fees" : "No Fees"}
              </Toggle>
              {form.hasFees && (
                <div>
                  <Label htmlFor="feesAmount">Fees Amount</Label>
                  <Input
                    id="feesAmount"
                    name="feesAmount"
                    type="number"
                    value={form.feesAmount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <DialogFooter>
        <Button type="submit">Add</Button>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedType(null)}
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
