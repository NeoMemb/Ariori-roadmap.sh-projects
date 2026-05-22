import fs from "fs";
import type { Expense } from "../types.ts";

const FILE = "./data/expenses.json";

export function readExpenses(): Expense[] {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
  }
  // In case the file exist, but TOTALLY empty...
  if (!fs.readFileSync(FILE, "utf-8").trim()) { return []}

  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function writeExpenses(expenses: Expense[]): void {
  fs.writeFileSync(FILE, JSON.stringify(expenses, null, 2));
}
