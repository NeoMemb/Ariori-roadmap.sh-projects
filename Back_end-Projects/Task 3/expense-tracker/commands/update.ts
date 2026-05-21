import type { Expense } from "../types.ts";
import { readExpenses, writeExpenses } from "../utils/fileHandler.ts";
import { validateId, validateAmount } from "../utils/validator.ts";

export function updateExpense(options : Expense) {
  const expenses = readExpenses();
  const id = Number(options.id);

  const expense = validateId(expenses, id);

  if (options.description) {
    expense.description = options.description;
  }

  if (options.amount) {
    validateAmount(Number(options.amount));
    expense.amount = Number(options.amount);
  }

  writeExpenses(expenses);

  console.log("Expense updated successfully");
}
