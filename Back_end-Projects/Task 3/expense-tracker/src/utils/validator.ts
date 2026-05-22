import type { Expense } from "../types.ts";
export function validateAmount(amount: number) {
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
}

// const expenses = JSON.parse(text) as Expense[];

export function validateId(expenses: Expense[], id: number) : Expense {
  const expense = expenses.find(e => e.id === id);

  if (!expense) {
    throw new Error("Expense ID not found");
  }

  return expense;
}
