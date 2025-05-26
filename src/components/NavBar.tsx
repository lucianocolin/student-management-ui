import { useState } from "react";
import studentLogo from "../assets/student.svg";
import RegisterUserModal from "./auth/RegisterUserModal";
import {
  useGetMyUser,
  useLoginUser,
  useRegisterUser,
} from "../services/auth/useAuth";
import type { IRegisterUserProps } from "../interfaces/auth/IRegisterUserProps";
import { toast } from "react-hot-toast";
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "../constants/auth/register-user-messages";
import { AxiosError } from "axios";
import LoginUserModal from "./auth/LoginUserModal";
import type { ILoginUserProps } from "../interfaces/auth/ILoginUserProps";
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
} from "../constants/auth/login-user-messages";
import { useAuth } from "../hooks/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_USER_SUCCESS } from "../constants/auth/logout-user-messages";
import { useQueryClient } from "@tanstack/react-query";
import CreateStudentModal from "./student/CreateStudentModal";
import { useCreateStudent } from "../services/student/useStudent";
import type { ICreateStudentProps } from "../interfaces/student/ICreateStudentProps";
import {
  CREATE_STUDENT_ERROR,
  CREATE_STUDENT_SUCCESS,
} from "../constants/student/student-messages";
import type { IUserResponse } from "../interfaces/user/IUserResponse";
import { useGetCareers } from "../services/career/useCareer";
import type { ICareerResponse } from "../interfaces/career/ICareerResponse";

const NavBar = () => {
  const queryClient = useQueryClient();
  const [isRegisterUserModalOpen, setIsRegisterUserModalOpen] =
    useState<boolean>(false);
  const [isLoginUserModalOpen, setIsLoginUserModalOpen] =
    useState<boolean>(false);
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState<boolean>(false);
  const { mutateAsync: register, isPending: isRegisterUserPending } =
    useRegisterUser();
  const { mutateAsync: login, isPending: isLoginUserPending } = useLoginUser();
  const { isAuthenticated, login: saveToken, logout } = useAuth();
  const navigate = useNavigate();
  const { data: myUser } = useGetMyUser();
  const hasStudentId = !!myUser?.studentId;
  const { data: careers } = useGetCareers();
  const { mutateAsync: createStudent, isPending: isCreateStudentPending } =
    useCreateStudent();

  const handleCloseRegisterUserModal = () => {
    setIsRegisterUserModalOpen(false);
  };

  const handleCloseLoginUserModal = () => {
    setIsLoginUserModalOpen(false);
  };

  const handleCloseCreateStudentModal = () => {
    setIsCreateStudentModalOpen(false);
  };

  const handleRegisterUser = async (data: IRegisterUserProps) => {
    try {
      await register(data);

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

  const handleLoginUser = async (data: ILoginUserProps) => {
    try {
      const response = await login(data);

      saveToken(response.token as string);
      toast.success(LOGIN_USER_SUCCESS);
      handleCloseLoginUserModal();
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : LOGIN_USER_ERROR;

      toast.error(errorMessage);
    }
  };

  const handleLogout = () => {
    logout();

    navigate("/");

    toast.success(LOGOUT_USER_SUCCESS);
  };

  const handleCreateStudent = async (data: ICreateStudentProps) => {
    try {
      await createStudent(data);

      toast.success(CREATE_STUDENT_SUCCESS);
      handleCloseCreateStudentModal();
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : CREATE_STUDENT_ERROR;

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
            <button onClick={() => navigate("/")}>Student Management</button>
          </h1>
        </div>

        <div className="flex gap-5 items-center">
          {isAuthenticated ? (
            <>
              {hasStudentId ? (
                <Link
                  to="/grades"
                  className="mr-4 font-bold"
                  data-testid="nav-grades-link"
                >
                  Grades
                </Link>
              ) : (
                <>
                  <span
                    className="mr-4 font-bold"
                    title="You must have a student ID to view your grades"
                  >
                    Grades
                  </span>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    onClick={() =>
                      setIsCreateStudentModalOpen(!isCreateStudentModalOpen)
                    }
                    data-testid="nav-create-student-btn"
                  >
                    Register Student Data
                  </button>
                </>
              )}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                onClick={handleLogout}
                data-testid="nav-logout-btn"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                data-testid="nav-login-btn"
                onClick={() => setIsLoginUserModalOpen(!isLoginUserModalOpen)}
              >
                Login
              </button>
              <button
                className="bg-[#FABC3D] hover:bg-[#E89D04] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                data-testid="nav-signup-btn"
                onClick={() =>
                  setIsRegisterUserModalOpen(!isRegisterUserModalOpen)
                }
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <RegisterUserModal
        isOpen={isRegisterUserModalOpen}
        onClose={handleCloseRegisterUserModal}
        handleRegisterUser={handleRegisterUser}
        isRegisterUserPending={isRegisterUserPending}
      />

      <LoginUserModal
        isOpen={isLoginUserModalOpen}
        onClose={handleCloseLoginUserModal}
        handleLoginUser={handleLoginUser}
        isLoginUserPending={isLoginUserPending}
      />

      <CreateStudentModal
        isOpen={isCreateStudentModalOpen}
        onClose={handleCloseCreateStudentModal}
        user={myUser as IUserResponse}
        handleCreateStudent={handleCreateStudent}
        isCreateStudentPending={isCreateStudentPending}
        careers={careers as ICareerResponse[]}
      />
    </>
  );
};

export default NavBar;
