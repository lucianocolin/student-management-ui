import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ISubjectResponse } from "../../../../interfaces/subject/ISubjectResponse";
import { createEnrollmentColumns } from "./columns";
import type { IEnrollmentResponse } from "../../../../interfaces/enrollment/IEnrollmentResponse";
import type { ICreateEnrollmentProps } from "../../../../interfaces/enrollment/ICreateEnrollmentProps";

interface ICreateEnrollmentTableProps {
  subjects: ISubjectResponse[];
  enrollments: IEnrollmentResponse[];
  handleCreateEnrollment: (data: ICreateEnrollmentProps) => Promise<void>;
}

const CreateEnrollmentTable = ({
  subjects,
  enrollments,
  handleCreateEnrollment,
}: ICreateEnrollmentTableProps) => {
  const table = useReactTable({
    data: subjects,
    columns: createEnrollmentColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleCreate = async (subjectId: string) => {
    await handleCreateEnrollment({
      subjectId,
    });
  };

  return (
    <div>
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        data-testid="create-enrollment-table"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="px-6 py-3">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              data-testid={`row-${row.original.name}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="px-6 py-4">
                {enrollments.some(
                  (enrollment) => enrollment.subject?.id === row.original.id
                ) ? (
                  <p className="text-green-500" data-testid="already-enrolled">
                    You are already enrolled in this subject.
                  </p>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded px-4"
                    onClick={() => handleCreate(row.original.id as string)}
                  >
                    Enroll in subject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateEnrollmentTable;
