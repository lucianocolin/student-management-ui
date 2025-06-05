import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import { useGetMyUser } from "../../services/auth/useAuth";
import { USER_ROLES } from "../../enums/user/user-roles";
import { useNavigate } from "react-router-dom";
import {
  useDeleteStudent,
  useGetStudents,
} from "../../services/student/useStudent";
import StudentsTable from "../../components/student/table/StudentsTable";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  DELETE_STUDENT_ERROR,
  DELETE_STUDENT_SUCCESS,
} from "../../constants/student/student-messages";
import { useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const { data: myUser, isPending: isMyUserPending } = useGetMyUser();
  const { data: students, isPending: isStudentsPending } =
    useGetStudents(search);
  const { mutateAsync: deleteStudent } = useDeleteStudent();

  const handleDeleteStudent = async (id: string) => {
    try {
      await deleteStudent(id);

      await queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success(DELETE_STUDENT_SUCCESS);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : DELETE_STUDENT_ERROR;

      toast.error(errorMessage);
    }
    await deleteStudent(id);
  };

  useEffect(() => {
    if (!isMyUserPending && !myUser?.roles.includes(USER_ROLES.ADMIN)) {
      navigate("/");
    }
  }, [myUser, isMyUserPending, navigate]);

  if (isMyUserPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <h1
        className="text-center text-2xl font-bold py-5"
        data-testid="admin-title"
      >
        Admin Panel - Students
      </h1>
      <div className="container mx-auto">
        <input
          type="text"
          placeholder="Search"
          className="mb-4 border border-gray-400 rounded-md p-2 w-[40%]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="admin-search-input"
        />
        <StudentsTable
          students={students ?? []}
          isStudentsPending={isStudentsPending}
          handleDeleteStudent={handleDeleteStudent}
        />
      </div>
    </>
  );
};

export default Admin;
