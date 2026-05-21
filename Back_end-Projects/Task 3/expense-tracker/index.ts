#!/usr/bin/env node

import { Command } from "commander";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  listExpenses,
  summarizeExpenses
} from "./commands/index.ts";

const program = new Command();

program.name("expense-tracker");

program
  .command("add")
  .requiredOption("--description <desc>")
  .requiredOption("--amount <amount>")
  .action(addExpense);

program
  .command("update")
  .requiredOption("--id <id>")
  .option("--description <desc>")
  .option("--amount <amount>")
  .action(updateExpense);

program
  .command("delete")
  .requiredOption("--id <id>")
  .action(deleteExpense);

program.command("list").action(listExpenses);

program
  .command("summary")
  .option("--month <month>")
  .action(summarizeExpenses);

program.parse();
