import type {
    TransactionType,
    TransferTarget,
    TransactionMethod,
} from "./types";

export function getInitialForm(): {
    date: string;
    description?: string;
    category: string;
    amount: string;
    method: TransactionMethod;
    type: TransactionType;
    hasFees?: boolean;
    feesAmount?: string;
    transferTarget?: TransferTarget;
} {
    return {
        date: "",
        description: "",
        category: "",
        amount: "",
        method: "Cash",
        type: "Expenses",
        hasFees: false,
        feesAmount: "",
        transferTarget: "",
    };
}

export function handleFormChange(form: any, setForm: (f: any) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
}

export function handleFormSelect(form: any, setForm: (f: any) => void) {
    return (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };
}
