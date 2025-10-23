import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import type { TransactionType } from "@/lib/types";

interface TransactionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedType: TransactionType | null;
  setSelectedType: (type: TransactionType | null) => void;
  onTypeSelect: (type: TransactionType) => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSelect: (name: string, value: string) => void;
  handleAdd: () => void;
}

export function TransactionDialog({
  open,
  setOpen,
  selectedType,
  setSelectedType,
  onTypeSelect,
  form,
  setForm,
  onFormChange,
  onFormSelect,
  handleAdd,
}: TransactionDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setSelectedType(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        {!selectedType ? (
          <div className="flex flex-col gap-4">
            <Label className="mb-2">Choose Transaction Type</Label>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => onTypeSelect("Income")}>
                Income
              </Button>
              <Button
                variant="outline"
                onClick={() => onTypeSelect("Expenses")}
              >
                Expenses
              </Button>
              <Button
                variant="outline"
                onClick={() => onTypeSelect("Transfer")}
              >
                Transfer
              </Button>
            </div>
          </div>
        ) : (
          <TransactionForm
            form={form}
            selectedType={selectedType}
            handleChange={onFormChange}
            handleSelect={onFormSelect}
            setForm={setForm}
            handleAdd={handleAdd}
            setSelectedType={setSelectedType}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
