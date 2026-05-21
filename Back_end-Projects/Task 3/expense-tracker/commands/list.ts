import { readExpenses } from "../utils/fileHandler.js";

export function listExpenses() {
  const expenses = readExpenses();

  console.table(expenses);
}
