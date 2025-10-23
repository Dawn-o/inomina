import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/categories";
type TransactionType = "Income" | "Expenses" | "Transfer";
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
  const todayStr = new Date().toISOString().slice(0, 16);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd();
      }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="date" className="mb-2 block">
            Date
          </Label>
          <Input
            id="date"
            name="date"
            type="datetime-local"
            value={form.date || todayStr}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount" className="mb-2 block">
            Amount
          </Label>
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
        {selectedType !== "Transfer" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="category" className="mb-2 block">
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => handleSelect("category", v)}
                required
              >
                <SelectTrigger className="w-full">
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
            <div className="flex-1">
              <Label htmlFor="method" className="mb-2 block">
                Method
              </Label>
              <Select
                value={form.method}
                onValueChange={(v) => handleSelect("method", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Account">Account</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {selectedType === "Transfer" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="method" className="mb-2 block">
                Method
              </Label>
              <Select
                value={form.method}
                onValueChange={(v) => handleSelect("method", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Account">Account</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {selectedType === "Transfer" && (
          <>
            <div className="flex gap-4">
              <div className="flex-6">
                <Label htmlFor="transferTarget" className="mb-2 block">
                  Transfer To
                </Label>
                <Select
                  value={form.transferTarget}
                  onValueChange={(v) =>
                    setForm((f: any) => ({
                      ...f,
                      transferTarget: v as TransferTarget,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Yourself">Yourself</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 mt-5">
                <Toggle
                  pressed={form.hasFees}
                  onPressedChange={(v) =>
                    setForm((f: any) => ({ ...f, hasFees: v }))
                  }
                  aria-label="Toggle transfer fees"
                >
                  {form.hasFees ? "Has Fees" : "No Fees"}
                </Toggle>
              </div>
            </div>
            {form.hasFees && (
              <div>
                <Label htmlFor="feesAmount" className="mb-2 block">
                  Fees Amount
                </Label>
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
          </>
        )}
        <div>
          <Label htmlFor="description" className="mb-2 block">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
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
