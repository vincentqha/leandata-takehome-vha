import { Api } from "../api";
import { ExpenseTableItem } from "../components/ExpenseTable";
import { CategoryExpense, User } from "../models";

export async function deleteExpense(payload: {
  id: string;
  expenses: Array<ExpenseTableItem>;
  categoryExpenses: Array<CategoryExpense>;
  users: Array<User>;
}) {
  const { id, users, expenses, categoryExpenses } = payload;

  const updated = {
    expenses,
    categoryExpenses,
    users,
  };

  // If expense exists, update the expense, its category, and user belonging to the expense

  const expenseIndex = expenses.findIndex((e) => e.id === id);

  if (expenseIndex !== -1) {
    const expense = expenses[expenseIndex];

    // Call the API

    await Api.deleteExpense(id);

    // If category exists, subtract the expense's cost

    const categoryIndex = categoryExpenses.findIndex(
      (e) => e.category === expense.category
    );

    if (categoryIndex !== -1) {
      const newCategoryExpenses = [...categoryExpenses];
      newCategoryExpenses[categoryIndex] = {
        ...newCategoryExpenses[categoryIndex],
        totalExpenses:
          newCategoryExpenses[categoryIndex].totalExpenses - expense.cost,
      };

      updated.categoryExpenses = newCategoryExpenses;
    }

    // If user exists, subtract the expense's cost

    const userIndex = users.findIndex((u) => u.id === expense.userId);

    if (userIndex !== -1) {
      const newUsers = [...users];
      newUsers[userIndex] = {
        ...newUsers[userIndex],
        totalExpenses: newUsers[userIndex].totalExpenses - expense.cost,
      };

      updated.users = newUsers;
    }

    // Delete expense from the expenses array

    const newExpenses = [...expenses];

    newExpenses.splice(expenseIndex, 1);
    updated.expenses = newExpenses;
    return updated;
  }

  return undefined;
}
