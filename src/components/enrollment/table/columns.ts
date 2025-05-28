import type { ColumnDef } from "@tanstack/react-table";
import type { IEnrollmentResponse } from "../../../interfaces/enrollment/IEnrollmentResponse";

enum COLUMNS {
  SUBJECT = "Subject",
  GRADE = "Grade",
  STATUS = "Status",
  ENROLLMENT_DATE = "Enrollment Date",
  ACTIONS = "Actions",
}

export const enrollmentColumns: ColumnDef<IEnrollmentResponse>[] = [
  {
    accessorKey: "subject.name",
    header: COLUMNS.SUBJECT,
  },
  {
    accessorKey: "grade",
    header: COLUMNS.GRADE,
    cell: (info) => {
      return info.getValue() || "N/A";
    },
  },
  {
    accessorKey: "approved",
    header: COLUMNS.STATUS,
    cell: (info) => {
      return info.getValue() ? "Approved" : "Taking";
    },
  },
  {
    accessorKey: "enrolledAt",
    header: COLUMNS.ENROLLMENT_DATE,
    cell: (info) => {
      return new Date(info.getValue() as string).toLocaleDateString();
    },
  },
];
