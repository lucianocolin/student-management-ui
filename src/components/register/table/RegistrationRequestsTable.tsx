import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { IUserResponse } from "../../../interfaces/user/IUserResponse";
import { registrationRequestsColumns } from "./columns";
import Loading from "../../common/Loading";

interface IRegistrationRequestsTableProps {
  notApprovedUsers: IUserResponse[];
  isNotApprovedUsersPending: boolean;
  isApprovePending: boolean;
  handleApproveRegistrationRequest: (id: string) => Promise<void>;
}

const RegistrationRequestsTable = ({
  notApprovedUsers,
  isNotApprovedUsersPending,
  isApprovePending,
  handleApproveRegistrationRequest,
}: IRegistrationRequestsTableProps) => {
  const table = useReactTable({
    data: notApprovedUsers,
    columns: registrationRequestsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return isNotApprovedUsersPending ? (
    <div className="flex justify-center h-screen">
      <Loading />
    </div>
  ) : (
    <div>
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        data-testid="registration-requests-table"
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
              <th>Actions</th>
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
              <td>
                <button
                  onClick={() => handleApproveRegistrationRequest(row.original.id)}
                  className={`text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${
                    isApprovePending
                      ? "bg-gray-500"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
                  data-testid={`approve-${row.id}`}
                >
                  {isApprovePending ? "Approving..." : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationRequestsTable;
