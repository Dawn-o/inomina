import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import type { TransactionType } from "@/lib/types";
import { useEffect } from "react";

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
  useEffect(() => {
    if (open && !form.date) {
      const todayStr = new Date().toISOString().slice(0, 16);
      setForm((prev: any) => ({ ...prev, date: todayStr }));
    }
  }, [open, form.date, setForm]);

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
        <TransactionForm
          form={form}
          selectedType={selectedType}
          handleChange={onFormChange}
          handleSelect={onFormSelect}
          setForm={setForm}
          handleAdd={handleAdd}
          setSelectedType={setSelectedType}
        />
      </DialogContent>
    </Dialog>
  );
}
