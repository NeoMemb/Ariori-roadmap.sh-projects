import { readExpenses } from "../utils/fileHandler.js";

export function summarizeExpenses(options) {
  const expenses = readExpenses();

  let filtered = expenses;

  if (options.month) {
    filtered = expenses.filter(
      e => new Date(e.date).getMonth() + 1 === Number(options.month)
    );
  }

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  console.log(`Total expenses: $${total}`);
}
