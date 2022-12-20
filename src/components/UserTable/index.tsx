import React from "react";
import { User } from "../../models";
import UserTableItem, { UserTableItemsProps } from "./UserTableItem";

export type UserTableProps = {
  users: Array<User>;
  onUserSave: UserTableItemsProps["onSave"];
  onUserDelete: UserTableItemsProps["onDelete"];
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserSave,
  onUserDelete,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Expenses</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserTableItem
              key={user.id}
              user={user}
              onSave={onUserSave}
              onDelete={onUserDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
