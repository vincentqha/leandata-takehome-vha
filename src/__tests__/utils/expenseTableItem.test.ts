import { Expense, User } from "../../models";
import { convertExpenseToExpenseTableItem } from "../../utils/expenseTableItem";

describe("convertExpenseToExpenseTableItem", () => {
  it("add fullName property to every Expense object", () => {
    const expense: Expense = {
      id: "1b8fe422-549d-4deb-ab9f-7162b0e805af",
      userId: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      category: "Food",
      description: "company party",
      cost: 100,
    };

    const users: Array<User> = [
      {
        id: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
        firstName: "Vincent",
        lastName: "Ha",
        totalExpenses: 1000,
      },
    ];

    const data = convertExpenseToExpenseTableItem(expense, users);

    expect(data).toEqual({
      ...expense,
      fullName: "Vincent Ha",
    });
  });
});
