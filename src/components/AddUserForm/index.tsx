import React, { useState } from "react";

type AddUserFormProps = {
  onSubmit: (firstName: string, lastName: string) => Promise<void>;
};

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await onSubmit(firstName, lastName);

    setFirstName("");
    setLastName("");
    setIsSubmitting(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    }
  }

  const isSubmitDisabled = isSubmitting || !firstName || !lastName;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitDisabled}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
