import { User } from "../../models";
import { getUserFullName } from "../../utils/getUserFullName";

describe("getUserFullName", () => {
  it("return the full name of the User", () => {
    const user: User = {
      id: "23e1085c-5c69-4aa5-a3cf-7da403f8fa1a",
      firstName: "Vincent",
      lastName: "Ha",
      totalExpenses: 600,
    };

    const data = getUserFullName(user);

    expect(data).toEqual("Vincent Ha");
  });
});
