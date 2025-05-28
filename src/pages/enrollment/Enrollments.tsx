import { useQueryClient } from "@tanstack/react-query";
import CreateEnrollmentTable from "../../components/enrollment/create/table/CreateEnrollmentTable";
import type { ICreateEnrollmentProps } from "../../interfaces/enrollment/ICreateEnrollmentProps";
import { useGetMyUser } from "../../services/auth/useAuth";
import {
  useCreateEnrollment,
  useGetEnrollments,
} from "../../services/enrollment/useEnrollment";
import { useGetStudent } from "../../services/student/useStudent";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  CREATE_ENROLLMENT_ERROR,
  CREATE_ENROLLMENT_SUCCESS,
} from "../../constants/enrollment/enrollment-messages";

const Enrollments = () => {
  const queryClient = useQueryClient();
  const { data: myUser } = useGetMyUser();
  const { data: student } = useGetStudent(myUser?.studentId ?? "");
  const studentSubjects = student?.career.subjects ?? [];
  const { data: enrollments } = useGetEnrollments(myUser?.studentId ?? "", {
    enabled: !!myUser?.studentId,
    queryKey: ["enrollments"],
  });
  const { mutateAsync: createEnrollment } = useCreateEnrollment();

  const handleCreateEnrollment = async (data: ICreateEnrollmentProps) => {
    try {
      await createEnrollment(data);

      await queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast.success(CREATE_ENROLLMENT_SUCCESS);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : CREATE_ENROLLMENT_ERROR;

      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h1
        className="text-center text-2xl font-bold py-5"
        data-testid="enrollments-page-title"
      >
        Enroll in subjects
      </h1>
      <div className="px-[25%]">
        <p className="pb-3 text-lg" data-testid="enrollments-page-career">
          <span className="font-bold">Career:</span> {student?.career.name}
        </p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <CreateEnrollmentTable
            subjects={studentSubjects}
            enrollments={enrollments ?? []}
            handleCreateEnrollment={handleCreateEnrollment}
          />
        </div>
      </div>
    </div>
  );
};

export default Enrollments;
