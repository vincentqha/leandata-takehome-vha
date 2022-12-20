import { ExpenseTableItem } from "../../components/ExpenseTable";
import { CategoryExpense, Expense, User } from "../../models";
import { addExpense } from "../../utils/addExpense";

describe("addExpense", () => {
  const expense: Omit<Expense, "id"> = {
    userId: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
    category: "Food",
    description: "company party",
    cost: 100,
  };

  const expenses: Array<ExpenseTableItem> = [];

  const categoryExpenses: Array<CategoryExpense> = [
    {
      category: "Food",
      totalExpenses: 0,
    },
  ];

  const users: Array<User> = [
    {
      id: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      firstName: "Vincent",
      lastName: "Ha",
      totalExpenses: 0,
    },
  ];

  it("should update expenses, category expenses, and users", async () => {
    const result = await addExpense({
      expense,
      expenses,
      categoryExpenses,
      users,
    });

    expect(result.expenses).toEqual([
      {
        ...result.expense,
        fullName: "Vincent Ha",
      },
    ]);

    expect(result.categoryExpenses).toEqual([
      {
        ...categoryExpenses[0],
        totalExpenses: categoryExpenses[0].totalExpenses + expense.cost,
      },
    ]);

    expect(result.users).toEqual([
      {
        ...users[0],
        totalExpenses: users[0].totalExpenses + expense.cost,
      },
    ]);
  });
});
