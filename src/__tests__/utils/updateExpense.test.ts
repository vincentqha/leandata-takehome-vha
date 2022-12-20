import { ExpenseTableItem } from "../../components/ExpenseTable";
import { CategoryExpense, User } from "../../models";
import { updateExpense } from "../../utils/updateExpense";

describe("updateExpense", () => {
  const expense: ExpenseTableItem = {
    id: "1b8fe422-549d-4deb-ab9f-7162b0e805af",
    userId: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
    category: "Equipment",
    description: "company party",
    cost: 200,
    fullName: "Vincent Ha",
  };

  const expenses: Array<ExpenseTableItem> = [
    {
      id: "1b8fe422-549d-4deb-ab9f-7162b0e805af",
      userId: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      category: "Food",
      description: "company party",
      cost: 100,
      fullName: "Vincent Ha",
    },
  ];

  const categoryExpenses: Array<CategoryExpense> = [
    {
      category: "Food",
      totalExpenses: 100,
    },
    {
      category: "Equipment",
      totalExpenses: 0,
    },
  ];

  const users: Array<User> = [
    {
      id: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      firstName: "Vincent",
      lastName: "Ha",
      totalExpenses: 100,
    },
  ];

  it("should update expenses, category expenses, and users", async () => {
    const result = await updateExpense({
      expense,
      expenses,
      categoryExpenses,
      users,
    });

    expect(result!.expenses).toEqual([
      {
        ...expense,
      },
    ]);

    expect(result!.categoryExpenses).toEqual([
      {
        category: "Food",
        totalExpenses: 0,
      },
      {
        category: "Equipment",
        totalExpenses: 200,
      },
    ]);

    expect(result!.users).toEqual([
      {
        ...users[0],
        totalExpenses: users[0].totalExpenses + expense.cost,
      },
    ]);
  });
});
