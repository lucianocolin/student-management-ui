import { useGetMyUser } from "../../services/auth/useAuth";
import { useGetStudent } from "../../services/student/useStudent";
import Loading from "../../components/common/Loading";
const Grades = () => {
  const { data: myUser, isPending: isMyUserPending } = useGetMyUser();
  const { data: student, isPending: isStudentPending } = useGetStudent(
    myUser?.studentId || ""
  );

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
      <div className="flex justify-center">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Subjects
                </th>
                <th scope="col" className="px-6 py-3">
                  Grades
                </th>
              </tr>
            </thead>
            <tbody>
              {student?.subjects.map((subject, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  <td className="px-6 py-4">{subject}</td>
                  <td className="px-6 py-4">
                    {student.qualifications?.[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Grades;
