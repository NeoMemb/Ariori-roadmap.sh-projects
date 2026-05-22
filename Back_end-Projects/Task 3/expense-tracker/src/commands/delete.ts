import { readExpenses, writeExpenses } from "../utils/fileHandler";

export function deleteExpense(options: { id: string }) {
  const expenses = readExpenses();

  const updated = expenses.filter(e => e.id !== parseInt(options.id));

  writeExpenses(updated);

  console.log("Expense deleted successfully");
}
