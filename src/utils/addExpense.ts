import { Api } from "../api";
import { ExpenseTableItem } from "../components/ExpenseTable";
import { CategoryExpense, Expense, User } from "../models";
import { convertExpenseToExpenseTableItem } from "./expenseTableItem";

export async function addExpense(payload: {
  expense: Omit<Expense, "id">;
  expenses: Array<ExpenseTableItem>;
  categoryExpenses: Array<CategoryExpense>;
  users: Array<User>;
}) {
  const { expense, expenses, categoryExpenses, users } = payload;

  // Call the API

  const newExpense = await Api.addExpense(expense);

  const updated = {
    expense: newExpense,
    expenses,
    categoryExpenses,
    users,
  };

  // Transform expense data

  const expenseTableItem = convertExpenseToExpenseTableItem(newExpense, users);

  // If user exists, update their total expense by adding the new expense's cost

  const userIndex = users.findIndex((u) => u.id === newExpense.userId);

  if (userIndex !== -1) {
    const newUsers = [...users];

    newUsers[userIndex] = {
      ...newUsers[userIndex],
      totalExpenses: newUsers[userIndex].totalExpenses + newExpense.cost,
    };

    updated.users = newUsers;
  }

  // If category exists, update its total expense by adding the new expense's cost

  const categoryIndex = categoryExpenses.findIndex(
    (c) => c.category === newExpense.category
  );

  if (categoryIndex !== -1) {
    const newCategoryExpenses = [...categoryExpenses];

    newCategoryExpenses[categoryIndex] = {
      ...newCategoryExpenses[categoryIndex],
      totalExpenses:
        newCategoryExpenses[categoryIndex].totalExpenses + newExpense.cost,
    };

    updated.categoryExpenses = newCategoryExpenses;
  }

  // Append new expense to expenses

  updated.expenses = [...expenses, expenseTableItem];

  return updated;
}
