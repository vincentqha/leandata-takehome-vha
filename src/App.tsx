import React, { useEffect, useState } from "react";
import "./App.css";
import UserTable, { UserTableProps } from "./components/UserTable";
import { CategoryExpense, User } from "./models";
import { deleteUser } from "./utils/deleteUser";
import { Api } from "./api";
import { ExpenseTableItem } from "./components/ExpenseTable";
import { updateUser } from "./utils/updateUser";
import AddUserForm from "./components/AddUserForm";
import { convertExpenseToExpenseTableItem } from "./utils/expenseTableItem";

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [expenses, setExpenses] = useState<Array<ExpenseTableItem>>([]);
  const [categoryExpenses, setCategoryExpenses] = useState<
    Array<CategoryExpense>
  >([]);

  useEffect(() => {
    Promise.all([
      Api.getUsers(),
      Api.getExpenses(),
      Api.getCategoryExpenses(),
    ]).then((result) => {
      const users = result[0];
      const expenses = result[1];
      const categoryExpenses = result[2];
      const expenseTableItems = expenses.map((expense) =>
        convertExpenseToExpenseTableItem(expense, users)
      );

      setUsers(users);
      setExpenses(expenseTableItems);
      setCategoryExpenses(categoryExpenses);
    });
  }, []);

  const handleUserSave: UserTableProps["onUserSave"] = async (payload) => {
    const result = await updateUser({
      user: payload,
      users,
      expenses,
    });

    if (result) {
      setUsers(result.users);
      setExpenses(result.expenses);
    }
  };

  const handleUserDelete: UserTableProps["onUserDelete"] = async (id) => {
    const result = await deleteUser({
      id,
      expenses,
      categoryExpenses,
      users,
    });

    if (result) {
      setExpenses(result.expenses);
      setCategoryExpenses(result.categoryExpenses);
      setUsers(result.users);
    }
  };

  async function handleUserSubmit(firstName: string, lastName: string) {
    const user = await Api.addUser(firstName, lastName);

    setUsers([...users, user]);
  }

  return (
    <div className="App">
      <h1>LeanData Take Home Project</h1>
      <UserTable
        users={users}
        onUserSave={handleUserSave}
        onUserDelete={handleUserDelete}
      />
      <AddUserForm onSubmit={handleUserSubmit} />
    </div>
  );
}

export default App;
