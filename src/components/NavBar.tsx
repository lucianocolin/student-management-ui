import { useState } from "react";
import studentLogo from "../assets/student.svg";
import RegisterUserModal from "./auth/RegisterUserModal";
import { useRegisterUser } from "../services/auth/useAuth";
import type { IRegisterUserProps } from "../interfaces/auth/IRegisterUserProps";
import { toast } from "react-hot-toast";
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "../constants/auth/register-user-messages";
import { AxiosError } from "axios";

const NavBar = () => {
  const [isRegisterUserModalOpen, setIsRegisterUserModalOpen] =
    useState<boolean>(false);
  const { mutateAsync, isPending: isRegisterUserPending } = useRegisterUser();

  const handleCloseRegisterUserModal = () => {
    setIsRegisterUserModalOpen(false);
  };

  const handleRegisterUser = async (data: IRegisterUserProps) => {
    try {
      await mutateAsync(data);

      toast.success(REGISTER_USER_SUCCESS);
      handleCloseRegisterUserModal();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : REGISTER_USER_ERROR;

      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex p-2 px-10 shadow-md justify-between items-center">
        <div className="flex gap-4 items-center">
          <img
            src={studentLogo}
            alt="student logo"
            className="w-12"
            data-testid="nav-logo"
          />
          <h1 className="text-2xl font-bold" data-testid="nav-title">
            Student Management
          </h1>
        </div>

        <div className="flex gap-5 items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            data-testid="nav-login-btn"
          >
            Login
          </button>
          <button
            className="bg-[#FABC3D] hover:bg-[#E89D04] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            data-testid="nav-signup-btn"
            onClick={() => setIsRegisterUserModalOpen(!isRegisterUserModalOpen)}
          >
            Sign Up
          </button>
        </div>
      </div>

      <RegisterUserModal
        isOpen={isRegisterUserModalOpen}
        onClose={handleCloseRegisterUserModal}
        handleRegisterUser={handleRegisterUser}
        isRegisterUserPending={isRegisterUserPending}
      />
    </>
  );
};

export default NavBar;
