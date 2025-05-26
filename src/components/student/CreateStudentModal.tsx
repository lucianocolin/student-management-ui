import type { ICareerResponse } from "../../interfaces/career/ICareerResponse";
import type { ICreateStudentProps } from "../../interfaces/student/ICreateStudentProps";
import type { IUserResponse } from "../../interfaces/user/IUserResponse";
import CreateStudentForm from "./CreateStudentForm";

interface ICreateStudentModal {
  isOpen: boolean;
  onClose: () => void;
  user: IUserResponse;
  handleCreateStudent: (data: ICreateStudentProps) => Promise<void>;
  isCreateStudentPending: boolean;
  careers: ICareerResponse[];
}

const CreateStudentModal = ({
  isOpen,
  onClose,
  user,
  handleCreateStudent,
  isCreateStudentPending,
  careers,
}: ICreateStudentModal) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center"
      data-testid="create-student-modal"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg z-60 w-[30%]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register Student
        </h2>
        <CreateStudentForm
          onClose={onClose}
          user={user}
          handleCreateStudent={handleCreateStudent}
          isCreateStudentPending={isCreateStudentPending}
          careers={careers}
        />
      </div>
    </div>
  );
};

export default CreateStudentModal;
