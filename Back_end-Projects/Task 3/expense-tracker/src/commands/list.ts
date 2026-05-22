import { readExpenses } from "../utils/fileHandler";

export function listExpenses() {
  const expenses = readExpenses();

  console.table(expenses);
}
