import React, { useEffect } from "react";
import { useState } from "react";
import { Expense, Category, User } from "../../models";
import { getUserFullName } from "../../utils/getUserFullName";

type AddExpenseFormProps = {
  onSubmit: (expense: Omit<Expense, "id">) => Promise<void>;
  users: Array<User>;
};

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onSubmit, users }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>("Equipment");
  const [description, setDescription] = useState<string>("");
  const [userId, setUserId] = useState<string>(users[0]?.id);
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    const firstUserId = users[0]?.id;
    if (!userId && firstUserId) {
      setUserId(firstUserId);
    }
  }, [users, userId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await onSubmit({
      userId: userId,
      category: category,
      description: description,
      cost: cost,
    });

    setDescription("");
    setIsSubmitting(false);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "userId") {
      setUserId(value);
    } else if (name === "category") {
      setCategory(value as any);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "cost" && event.target instanceof HTMLInputElement) {
      setCost(event.target.valueAsNumber);
    }
  }

  const isSubmitDisabled =
    isSubmitting ||
    !userId ||
    !category ||
    !description ||
    cost <= 0 ||
    Number.isNaN(cost);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={userId} name="userId" onChange={handleChange}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {getUserFullName(user)}
            </option>
          ))}
        </select>
        <select value={category} name="category" onChange={handleChange}>
          <option value="Equipment">Equipment</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
        </select>
        <input
          name="description"
          placeholder="Description"
          type="text"
          value={description}
          onChange={handleChange}
        />
        <input
          name="cost"
          placeholder="cost"
          type="number"
          value={Number.isNaN(cost) ? "" : cost}
          min={1}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitDisabled}>
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
