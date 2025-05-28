import { useGetMyUser } from "../../services/auth/useAuth";
import { useGetStudent } from "../../services/student/useStudent";
import Loading from "../../components/common/Loading";
import EnrollmentTable from "../../components/enrollment/table/EnrollmentTable";
import { useGetEnrollments } from "../../services/enrollment/useEnrollment";
const Grades = () => {
  const { data: myUser, isPending: isMyUserPending } = useGetMyUser();
  const { data: student, isPending: isStudentPending } = useGetStudent(
    myUser?.studentId ?? ""
  );
  const { data: enrollments } = useGetEnrollments(myUser?.studentId ?? "", {
    enabled: !!myUser?.studentId,
    queryKey: ["enrollments"],
  });

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">No student found</h1>
      </div>
    );
  }

  if (isMyUserPending || isStudentPending) {
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
        data-testid="grades-title"
      >
        Grades: {student?.fullName}
      </h1>
      <div className="px-[10%]">
        <p className="pb-3 text-lg" data-testid="grades-career">
          <span className="font-bold">Career:</span> {student?.career.name}
        </p>
        <div className="flex justify-center">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <EnrollmentTable enrollments={enrollments || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Grades;
