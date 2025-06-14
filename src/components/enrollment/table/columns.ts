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
      const row = info.row.original;
      const grade = row.grade;
      const isApproved = info.getValue() as boolean;

      if (!grade) {
        return "Taking";
      }

      if (isApproved) {
        return "Approved";
      }

      return "Failed";
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
