import { readExpenses, writeExpenses } from "../utils/fileHandler.js";
import { validateAmount } from "../utils/validator.ts";

export function addExpense(options) {
  const expenses = readExpenses();

  const amount = Number(options.amount);
  validateAmount(amount);

  const expense = {
    id: expenses.length + 1,
    date: new Date().toISOString().split("T")[0],
    description: options.description,
    amount: amount,
  };

  expenses.push(expense);
  writeExpenses(expenses);

  console.log(`Expense added successfully (ID: ${expense.id})`);
}
