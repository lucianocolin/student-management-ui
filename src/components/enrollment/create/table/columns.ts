import type { ColumnDef } from "@tanstack/react-table";
import type { ISubjectResponse } from "../../../../interfaces/subject/ISubjectResponse";

enum COLUMNS {
  SUBJECT = "Subject",
  ACTIONS = "Actions",
}

export const createEnrollmentColumns: ColumnDef<ISubjectResponse>[] = [
  {
    accessorKey: "name",
    header: COLUMNS.SUBJECT,
  },
  // {
  //   header: COLUMNS.ACTIONS,
  // },
];
