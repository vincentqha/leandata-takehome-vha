import { User } from "../models";

export function getUserFullName(user: User | undefined) {
  return `${user?.firstName || ""} ${user?.lastName || ""}`;
}
