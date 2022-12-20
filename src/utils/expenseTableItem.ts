import { Expense, User } from "../models";
import { getUserFullName } from "./getUserFullName";

export function convertExpenseToExpenseTableItem(
  expense: Expense,
  users: Array<User>
) {
  const user = users.find((user) => user.id === expense.userId);

  return {
    ...expense,
    fullName: getUserFullName(user),
  };
}
