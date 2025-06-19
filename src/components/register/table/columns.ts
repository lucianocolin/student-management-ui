import type { ColumnDef } from "@tanstack/react-table";
import type { IUserResponse } from "../../../interfaces/user/IUserResponse";

enum COLUMNS {
  FULL_NAME = "Full Name",
  EMAIL = "Email",
  PHONE_NUMBER = "Phone Number",
}

export const registrationRequestsColumns: ColumnDef<IUserResponse>[] = [
  {
    accessorKey: "fullName",
    header: COLUMNS.FULL_NAME,
  },
  {
    accessorKey: "email",
    header: COLUMNS.EMAIL,
  },
  {
    accessorKey: "phoneNumber",
    header: COLUMNS.PHONE_NUMBER,
  },
];
