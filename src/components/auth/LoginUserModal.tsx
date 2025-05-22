import type { ILoginUserProps } from "../../interfaces/auth/ILoginUserProps";
import LoginUserForm from "./LoginUserForm";

interface ILoginUserModal {
  isOpen: boolean;
  onClose: () => void;
  handleLoginUser: (data: ILoginUserProps) => Promise<void>;
  isLoginUserPending: boolean;
}

const LoginUserModal = ({
  isOpen,
  onClose,
  handleLoginUser,
  isLoginUserPending,
}: ILoginUserModal) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center"
      data-testid="login-user-modal"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg z-60 w-[25%]">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <LoginUserForm
          onClose={onClose}
          handleLoginUser={handleLoginUser}
          isLoginUserPending={isLoginUserPending}
        />
      </div>
    </div>
  );
};

export default LoginUserModal;
