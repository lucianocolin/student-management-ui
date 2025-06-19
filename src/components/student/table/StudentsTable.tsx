import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { IStudentResponse } from "../../../interfaces/student/IStudentResponse";
import { studentsColumns } from "./columns";
import Loading from "../../common/Loading";
import AssignGradesModal from "../../enrollment/AssignGradesModal";
import { useState } from "react";
import type { IEnrollmentResponse } from "../../../interfaces/enrollment/IEnrollmentResponse";

interface IStudentsTableProps {
  students: IStudentResponse[];
  isStudentsPending: boolean;
  handleDeleteStudent: (id: string) => Promise<void>;
  enrollments: IEnrollmentResponse[];
  handleAssignGrade: (enrollmentId: string, grade: number) => Promise<void>;
}

const StudentsTable = ({
  students,
  isStudentsPending,
  handleDeleteStudent,
  enrollments,
  handleAssignGrade,
}: IStudentsTableProps) => {
  const [isAssignGradesModalOpen, setIsAssignGradesModalOpen] =
    useState<boolean>(false);
  const [enrollmentsFiltered, setEnrollmentsFiltered] =
    useState<IEnrollmentResponse[]>(enrollments);

  const handleAssignGradesOpen = (id: string) => {
    setEnrollmentsFiltered(
      enrollments.filter((enrollment) => enrollment.studentId === id)
    );

    setIsAssignGradesModalOpen(!isAssignGradesModalOpen);
  };

  const table = useReactTable({
    data: students,
    columns: studentsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return isStudentsPending ? (
    <div className="flex justify-center h-screen">
      <Loading />
    </div>
  ) : (
    <>
      <div>
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          data-testid="students-table"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-6 py-3"
                    data-testid={`header-${header.id}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                <th className="px-6 py-3">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                data-testid={`row-${row.id}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4"
                    data-testid={`cell-${cell.id}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-4"
                    onClick={() =>
                      handleAssignGradesOpen(row.original.id as string)
                    }
                    data-testid={`add-grade-btn-${row.id}`}
                  >
                    Add Grade
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() =>
                      handleDeleteStudent(row.original.id as string)
                    }
                    data-testid={`delete-student-btn-${row.id}`}
                  >
                    Delete Student
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssignGradesModal
        isOpen={isAssignGradesModalOpen}
        onClose={() => setIsAssignGradesModalOpen(false)}
        enrollments={enrollmentsFiltered}
        handleAssignGrade={handleAssignGrade}
      />
    </>
  );
};

export default StudentsTable;
