import React from "react";
import { User } from "../../models";
import { useState } from "react";

export type UserTableItemsProps = {
  user: User;
  onSave: (payload: {
    id: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const UserTableItem: React.FC<UserTableItemsProps> = ({
  user,
  onSave,
  onDelete,
}) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    }
  }

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleCancelClick() {
    setFirstName(user.firstName);
    setLastName(user.lastName);

    setIsEditing(false);
  }

  async function handleSaveClick() {
    setIsSubmitting(true);
    await onSave({ id: user.id, firstName, lastName });

    setIsSubmitting(false);

    toggleEditing();
  }

  async function handleDeleteClick() {
    setIsSubmitting(true);
    await onDelete(user.id);
  }

  const isSaveButtonDisabled = isSubmitting || !firstName || !lastName;

  return (
    <tr>
      <td>
        {isEditing && (
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={handleChange}
          />
        )}
        {!isEditing && <span>{firstName}</span>}
      </td>
      <td>
        {isEditing && (
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={handleChange}
          />
        )}
        {!isEditing && <span>{lastName}</span>}
      </td>
      <td>${user.totalExpenses.toLocaleString("en-US")}</td>
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

export default UserTableItem;
