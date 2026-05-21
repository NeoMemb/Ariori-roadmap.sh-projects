import fs from "fs";
import { Expenses } from "../types.ts";

const FILE = "./data/expenses.json";

export function readExpenses(): Expenses {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
  }

  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function writeExpenses(expenses: JSON[]): void {
  fs.writeFileSync(FILE, JSON.stringify(expenses, null, 2));
}
