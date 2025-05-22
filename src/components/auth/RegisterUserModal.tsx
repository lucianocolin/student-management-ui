import type { IRegisterUserProps } from "../../interfaces/auth/IRegisterUserProps";
import RegisterUserForm from "./RegisterUserForm";

interface IRegisterUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleRegisterUser: (data: IRegisterUserProps) => Promise<void>;
  isRegisterUserPending: boolean;
}

const RegisterUserModal = ({
  isOpen,
  onClose,
  handleRegisterUser,
  isRegisterUserPending,
}: IRegisterUserModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center"
      data-testid="register-user-modal"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg z-60 w-[25%]">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <RegisterUserForm
          onClose={onClose}
          handleRegisterUser={handleRegisterUser}
          isRegisterUserPending={isRegisterUserPending}
        />
      </div>
    </div>
  );
};

export default RegisterUserModal;
