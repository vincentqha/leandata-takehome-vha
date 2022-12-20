export type Category = "Food" | "Travel" | "Equipment";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  totalExpenses: number;
};

export type Expense = {
  id: string;
  userId: string;
  category: Category;
  description: string;
  cost: number;
};

export type CategoryExpense = {
  category: Category;
  totalExpenses: number;
};
