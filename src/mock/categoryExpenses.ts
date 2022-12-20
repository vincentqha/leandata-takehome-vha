import { CategoryExpense } from "../models";
import { mockExpenses } from "./expenses";

export const mockCategoryExpenses: Array<CategoryExpense> = [
  {
    category: "Food",
    totalExpenses: mockExpenses
      .filter((expense) => expense.category === "Food")
      .reduce((prev, curr) => prev + curr.cost, 0),
  },
  {
    category: "Travel",
    totalExpenses: mockExpenses
      .filter((expense) => expense.category === "Travel")
      .reduce((prev, curr) => prev + curr.cost, 0),
  },
  {
    category: "Equipment",
    totalExpenses: mockExpenses
      .filter((expense) => expense.category === "Equipment")
      .reduce((prev, curr) => prev + curr.cost, 0),
  },
];
