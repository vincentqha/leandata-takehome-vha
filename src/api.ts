import { mockUsers } from "./mock/users";
import { mockExpenses } from "./mock/expenses";
import { CategoryExpense, User } from "./models";
import { Expense } from "./models";
import { mockCategoryExpenses } from "./mock/categoryExpenses";
import { v4 } from "uuid";

async function getUsers(): Promise<Array<User>> {
  return mockUsers;
}

async function getExpenses(): Promise<Array<Expense>> {
  return mockExpenses;
}

async function getCategoryExpenses(): Promise<Array<CategoryExpense>> {
  return mockCategoryExpenses;
}

async function addUser(firstName: string, lastName: string): Promise<User> {
  const user: User = {
    firstName: firstName,
    lastName: lastName,
    totalExpenses: 0,
    id: v4(),
  };

  return user;
}

async function addExpense(payload: Omit<Expense, "id">): Promise<Expense> {
  const expense: Expense = {
    ...payload,
    id: v4(),
  };

  return expense;
}

async function updateUser(user: User): Promise<User> {
  return user;
}

async function deleteUser(id: string): Promise<{}> {
  return {};
}

async function updateExpense(expense: Expense): Promise<Expense> {
  return expense;
}

async function deleteExpense(id: string): Promise<{}> {
  return {};
}

export const Api = {
  getUsers,
  getExpenses,
  getCategoryExpenses,
  addUser,
  addExpense,
  updateUser,
  deleteUser,
  updateExpense,
  deleteExpense,
};
