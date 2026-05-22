import { readExpenses, writeExpenses } from "../utils/fileHandler";
import { validateAmount } from "../utils/validator";
import type { Expense } from "../types.ts";

export function addExpense(options: Expense) {
  const expenses = readExpenses();

  const amount = Number(options.amount);
  validateAmount(amount);

  const expense = {
    id: expenses.length + 1,
    date: new Date().toISOString().split("T")[0]!,
    description: options.description,
    amount: amount,
  };

  expenses.push(expense);
  writeExpenses(expenses);

  console.log(`Expense added successfully (ID: ${expense.id})`);
}
