import { Api } from "../api";
import { ExpenseTableItem } from "../components/ExpenseTable";
import { User } from "../models";

export async function updateUser(payload: {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  users: Array<User>;
  expenses: Array<ExpenseTableItem>;
}) {
  const { user, users, expenses } = payload;

  // If user exists, update their name and all expenses with the user's new name

  const userIndex = users.findIndex((u) => u.id === user.id);

  if (userIndex !== -1) {
    // Call the API

    const newUser = {
      ...users[userIndex],
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await Api.updateUser(newUser);

    // Loop through the expenses array and update each expense's full name

    const newExpenses = [...expenses];

    newExpenses.forEach((expense, index) => {
      if (expense.userId === user.id) {
        newExpenses[index] = {
          ...expense,
          fullName: `${user.firstName} ${user.lastName}`,
        };
      }
    });

    // Update the user in the users array

    const newUsers = [...users];
    newUsers[userIndex] = newUser;

    return {
      users: newUsers,
      expenses: newExpenses,
    };
  }

  return undefined;
}
