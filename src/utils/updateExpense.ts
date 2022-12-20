import { Api } from "../api";
import { ExpenseTableItem } from "../components/ExpenseTable";
import { CategoryExpense, User } from "../models";

export async function updateExpense(payload: {
  expense: ExpenseTableItem;
  expenses: Array<ExpenseTableItem>;
  categoryExpenses: Array<CategoryExpense>;
  users: Array<User>;
}) {
  const { expense, expenses, categoryExpenses, users } = payload;

  // If expense exists, update the expense and the totals for the respective user and category

  const expenseIndex = expenses.findIndex((e) => e.id === expense.id);

  if (expenseIndex !== -1) {
    const updated = {
      expenses,
      categoryExpenses,
      users,
    };

    const newExpenses = [...expenses];
    const prevExpense = { ...expenses[expenseIndex] };

    // Call the API

    await Api.updateExpense(expense);

    // If category changed, update the previous and new category totals by subtracting / adding the cost

    if (expense.category !== prevExpense.category) {
      const prevCategoryExpenseIndex = categoryExpenses.findIndex(
        (c) => c.category === prevExpense.category
      );
      const newCategoryExpenseIndex = categoryExpenses.findIndex(
        (c) => c.category === expense.category
      );

      // If prev and new category exists, update their totals

      if (prevCategoryExpenseIndex !== -1 && newCategoryExpenseIndex !== -1) {
        const newCategoryExpenses = [...categoryExpenses];

        // Remove the old expense's cost from the previous category

        newCategoryExpenses[prevCategoryExpenseIndex] = {
          ...newCategoryExpenses[prevCategoryExpenseIndex],
          totalExpenses:
            newCategoryExpenses[prevCategoryExpenseIndex].totalExpenses -
            prevExpense.cost,
        };

        // Add the new expense's cost to the new category

        newCategoryExpenses[newCategoryExpenseIndex] = {
          ...newCategoryExpenses[newCategoryExpenseIndex],
          totalExpenses:
            newCategoryExpenses[newCategoryExpenseIndex].totalExpenses +
            expense.cost,
        };

        updated.categoryExpenses = newCategoryExpenses;
      }
    } else if (expense.cost !== prevExpense.cost) {
      // If category did not change but the cost did change, update the category totals

      const newCategoryExpenseIndex = categoryExpenses.findIndex(
        (c) => c.category === expense.category
      );

      // If category exists, add the difference between the old and new expenses' cost to the category

      if (newCategoryExpenseIndex !== -1) {
        const newCategoryExpenses = [...categoryExpenses];

        const expenseDifference = expense.cost - prevExpense.cost;

        newCategoryExpenses[newCategoryExpenseIndex] = {
          ...newCategoryExpenses[newCategoryExpenseIndex],
          totalExpenses:
            newCategoryExpenses[newCategoryExpenseIndex].totalExpenses +
            expenseDifference,
        };

        updated.categoryExpenses = newCategoryExpenses;
      }
    }

    // Check to see if user was changed

    if (expense.userId !== prevExpense.userId) {
      const prevUserIndex = users.findIndex((u) => u.id === prevExpense.userId);
      const newUserIndex = users.findIndex((u) => u.id === expense.userId);

      if (prevUserIndex !== -1 && newUserIndex !== -1) {
        // If user changed, update the previous and new user totals by subtracting / adding the cost

        const newUsers = [...users];

        // Remove the old expense's cost from the previous user

        newUsers[prevUserIndex] = {
          ...newUsers[prevUserIndex],
          totalExpenses:
            newUsers[prevUserIndex].totalExpenses - prevExpense.cost,
        };

        // Add the new expense's cost to the new user

        newUsers[newUserIndex] = {
          ...newUsers[newUserIndex],
          totalExpenses: newUsers[newUserIndex].totalExpenses + expense.cost,
        };

        updated.users = newUsers;
      }
    } else if (expense.cost !== prevExpense.cost) {
      // If the user did not change but the cost did change, update the user totals

      const newUserIndex = users.findIndex((u) => u.id === expense.userId);

      if (newUserIndex !== -1) {
        const newUsers = [...users];

        // Add the difference between the old and new expenses' cost to the user

        const expenseDifference = expense.cost - prevExpense.cost;

        newUsers[newUserIndex] = {
          ...newUsers[newUserIndex],
          totalExpenses:
            newUsers[newUserIndex].totalExpenses + expenseDifference,
        };

        updated.users = newUsers;
      }
    }

    // Update the expense in the expenses array

    newExpenses[expenseIndex] = expense;

    updated.expenses = newExpenses;

    return updated;
  }

  return undefined;
}
