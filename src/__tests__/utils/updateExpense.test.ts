import { ExpenseTableItem } from "../../components/ExpenseTable";
import { CategoryExpense, User } from "../../models";
import { updateExpense } from "../../utils/updateExpense";

describe("updateExpense", () => {
  const expense: ExpenseTableItem = {
    id: "1b8fe422-549d-4deb-ab9f-7162b0e805af",
    userId: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
    category: "Food",
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
    {
      id: "e812a855-6832-4cd2-8626-c6d8eff3ac83",
      userId: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      category: "Food",
      description: "lunch with Spotify",
      cost: 200,
      fullName: "Vincent Ha",
    },
  ];

  const categoryExpenses: Array<CategoryExpense> = [
    {
      category: "Food",
      totalExpenses: 300,
    },
  ];

  const users: Array<User> = [
    {
      id: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      firstName: "Vincent",
      lastName: "Ha",
      totalExpenses: 300,
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
      {
        ...expenses[1],
      },
    ]);

    expect(result!.categoryExpenses).toEqual([
      {
        category: "Food",
        totalExpenses: 400,
      },
    ]);

    expect(result!.users).toEqual([
      {
        ...users[0],
        totalExpenses: 400,
      },
    ]);
  });
});
