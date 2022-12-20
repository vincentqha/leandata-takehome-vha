import React, { useState } from "react";
import { ExpenseTableItem as TableItem } from ".";
import { User } from "../../models";
import { getUserFullName } from "../../utils/getUserFullName";

export type ExpenseTableItemProps = {
  expense: TableItem;
  users: Array<User>;
  onSave: (expense: TableItem) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const ExpenseTableItem: React.FC<ExpenseTableItemProps> = ({
  expense,
  users,
  onSave,
  onDelete,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentExpense, setCurrentExpense] = useState<TableItem>(expense);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "userId") {
      setCurrentExpense({
        ...currentExpense,
        userId: value,
      });
    } else if (name === "category") {
      setCurrentExpense({
        ...currentExpense,
        category: value as any,
      });
    } else if (name === "description") {
      setCurrentExpense({
        ...currentExpense,
        description: value,
      });
    } else if (name === "cost" && event.target instanceof HTMLInputElement) {
      setCurrentExpense({
        ...currentExpense,
        cost: event.target.valueAsNumber,
      });
    }
  }

  async function handleDeleteClick() {
    setIsSubmitting(true);

    await onDelete(expense.id);
  }

  async function handleSaveClick() {
    setIsSubmitting(true);

    await onSave(currentExpense);

    setIsSubmitting(false);
    toggleEditing();
  }

  function handleCancelClick() {
    setCurrentExpense(expense);
    setIsEditing(false);
  }

  const isSaveButtonDisabled =
    isSubmitting ||
    !currentExpense.userId ||
    !currentExpense.category ||
    !currentExpense.description ||
    currentExpense.cost <= 0 ||
    Number.isNaN(currentExpense.cost);

  return (
    <tr>
      <td>
        {isEditing && (
          <select
            value={currentExpense.userId}
            name="userId"
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {getUserFullName(user)}
              </option>
            ))}
          </select>
        )}
        {!isEditing && <span>{expense.fullName}</span>}
      </td>
      <td>
        {isEditing && (
          <select
            value={currentExpense.category}
            name="category"
            onChange={handleChange}
          >
            <option value="Equipment">Equipment</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
        )}
        {!isEditing && <span>{expense.category}</span>}
      </td>
      <td>
        {isEditing && (
          <input
            type="text"
            value={currentExpense.description}
            name="description"
            onChange={handleChange}
          />
        )}
        {!isEditing && <span>{currentExpense.description}</span>}
      </td>
      <td>
        {isEditing && (
          <input
            type="number"
            value={Number.isNaN(currentExpense.cost) ? "" : currentExpense.cost}
            name="cost"
            onChange={handleChange}
          />
        )}
        {!isEditing && <span>${expense.cost.toLocaleString("en-US")}</span>}
      </td>
      <td>
        {!isEditing && (
          <>
            <button onClick={toggleEditing} disabled={isSubmitting}>
              Edit
            </button>
            <button onClick={handleDeleteClick} disabled={isSubmitting}>
              Delete
            </button>
          </>
        )}
        {isEditing && (
          <>
            <button onClick={handleSaveClick} disabled={isSaveButtonDisabled}>
              Save
            </button>
            <button onClick={handleCancelClick} disabled={isSubmitting}>
              Cancel
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ExpenseTableItem;
