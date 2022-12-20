import React from "react";
import { CategoryExpense } from "../../models";

type CompanyExpenseTableProps = {
  categoryExpenses: Array<CategoryExpense>;
};

const CompanyExpenseTable: React.FC<CompanyExpenseTableProps> = ({
  categoryExpenses,
}) => {
  return (
    <div>
      <h3>Company Expense Table</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {categoryExpenses.map((item) => (
            <tr key={item.category}>
              <td>{item.category}</td>
              <td>${item.totalExpenses.toLocaleString("en-US")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyExpenseTable;
