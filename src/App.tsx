import React, { useState } from "react";
import "./App.css";
import UserTable, { UserTableProps } from "./components/UserTable";
import { CategoryExpense, User } from "./models";
import { deleteUser } from "./utils/deleteUser";
import { Api } from "./api";
import { ExpenseTableItem } from "./components/ExpenseTable";
import { updateUser } from "./utils/updateUser";

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [expenses, setExpenses] = useState<Array<ExpenseTableItem>>([]);
  const [categoryExpenses, setCategoryExpenses] = useState<
    Array<CategoryExpense>
  >([]);

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

  return (
    <div className="App">
      <h1>LeanData Take Home Project</h1>
      <UserTable
        users={users}
        onUserSave={handleUserSave}
        onUserDelete={handleUserDelete}
      />
    </div>
  );
}

export default App;
