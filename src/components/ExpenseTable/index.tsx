import React from "react";
import { Expense, User } from "../../models";
import TableItem, { ExpenseTableItemProps } from "./ExpenseTableItem";

export type ExpenseTableItem = Expense & {
  fullName: string;
};

export type ExpenseTableProps = {
  expenses: Array<ExpenseTableItem>;
  users: Array<User>;
  onExpenseSave: ExpenseTableItemProps["onSave"];
  onExpenseDelete: ExpenseTableItemProps["onDelete"];
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  users,
  onExpenseSave,
  onExpenseDelete,
}) => {
  return (
    <div>
      <h3>Expense Table</h3>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <TableItem
              key={expense.id}
              expense={expense}
              users={users}
              onSave={onExpenseSave}
              onDelete={onExpenseDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
