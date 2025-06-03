import type { ColumnDef } from "@tanstack/react-table";
import type { IStudentResponse } from "../../../interfaces/student/IStudentResponse";

enum COLUMNS {
  FULL_NAME = "Full Name",
  COLLEGE_ID = "College ID",
  EMAIL = "Email",
  CAREER = "Career",
}

export const studentsColumns: ColumnDef<IStudentResponse>[] = [
  {
    accessorKey: "fullName",
    header: COLUMNS.FULL_NAME,
  },
  {
    accessorKey: "collegeId",
    header: COLUMNS.COLLEGE_ID,
  },
  {
    accessorKey: "email",
    header: COLUMNS.EMAIL,
  },
  {
    accessorKey: "career.name",
    header: COLUMNS.CAREER,
  },
];
