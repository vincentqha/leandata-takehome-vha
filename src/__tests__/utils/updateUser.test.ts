import { ExpenseTableItem } from "../../components/ExpenseTable";
import { User } from "../../models";
import { updateUser } from "../../utils/updateUser";

describe("updateUser", () => {
  const user = {
    id: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
    firstName: "John",
    lastName: "Doe",
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

  const users: Array<User> = [
    {
      id: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      firstName: "Vincent",
      lastName: "Ha",
      totalExpenses: 100,
    },
  ];

  it("should update expenses, category expenses, and users", async () => {
    const result = await updateUser({
      user,
      expenses,
      users,
    });

    expect(result!.expenses).toEqual([
      {
        ...expenses[0],
        fullName: "John Doe",
      },
    ]);

    expect(result!.users).toEqual([
      {
        ...users[0],
        firstName: "John",
        lastName: "Doe",
      },
    ]);
  });
});
