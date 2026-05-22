export interface Expense {
    id: string | number;
    date: string;
    description: string;
    amount: number;
}

export interface ExpenseMonthlySummary {
    month: string;
    total: number;
}