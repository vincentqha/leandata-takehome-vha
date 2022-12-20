import { Api } from "../api";
import { ExpenseTableItem } from "../components/ExpenseTable";
import { CategoryExpense, Expense, User } from "../models";

export async function deleteUser(payload: {
  id: string;
  expenses: Array<ExpenseTableItem>;
  categoryExpenses: Array<CategoryExpense>;
  users: Array<User>;
}) {
  const { id, expenses, categoryExpenses, users } = payload;

  // If user exists, delete the user and their expenses and update the category's total expenses

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    // Call the API

    await Api.deleteUser(id);

    // Remove all expenses belonging to the user but keep a temporary array to update the categories

    const newExpenses = [...expenses];
    const expensesToDelete: Array<Expense> = [];

    newExpenses.forEach((expense, index) => {
      if (expense.userId === id) {
        expensesToDelete.push({ ...expense });
        newExpenses.splice(index, 1);
      }
    });

    // Aggregate the totals from the temporary array and subtract from their respective category total

    const newCategoryExpenses = [...categoryExpenses];

    newCategoryExpenses.forEach((categoryExpense, index) => {
      const total = expensesToDelete
        .filter((expense) => expense.category === categoryExpense.category)
        .reduce((prev, curr) => prev + curr.cost, 0);

      newCategoryExpenses[index] = {
        ...newCategoryExpenses[index],
        totalExpenses: newCategoryExpenses[index].totalExpenses - total,
      };
    });

    // Remove user from the users array

    const newUsers = [...users];
    newUsers.splice(userIndex, 1);

    return {
      users: newUsers,
      expenses: newExpenses,
      categoryExpenses: newCategoryExpenses,
    };
  }

  return undefined;
}
