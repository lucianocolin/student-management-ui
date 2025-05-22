import { Field, Form, Formik } from "formik";
import Loading from "../common/Loading";
import type { ILoginUserProps } from "../../interfaces/auth/ILoginUserProps";
import { loginUserSchema } from "./schemas/login-user.schema";

interface ILoginUserFormProps {
  onClose: () => void;
  handleLoginUser: (data: ILoginUserProps) => Promise<void>;
  isLoginUserPending: boolean;
}

const LoginUserForm = ({
  onClose,
  handleLoginUser,
  isLoginUserPending,
}: ILoginUserFormProps) => {
  const initialValues: ILoginUserProps = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: ILoginUserProps) => {
    handleLoginUser(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginUserSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="col-span-2 py-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              {errors.email && touched.email && (
                <span
                  className="text-red-500 text-sm"
                  data-testid="login-email-error"
                >
                  {errors.email}
                </span>
              )}
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-2"
                data-testid="login-email-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="mt-4 font-medium">
                Password
              </label>
              {errors.password && touched.password && (
                <span
                  className="text-red-500 text-sm"
                  data-testid="login-password-error"
                >
                  {errors.password}
                </span>
              )}
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-2"
                data-testid="login-password-input"
              />
            </div>

            <div className="flex flex-col pt-2 gap-2">
              <button
                className="bg-red-500 text-white p-2 mt-3 rounded-md w-full h-10"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white p-2 mt-3 rounded-md w-full h-10"
                type="submit"
                disabled={isLoginUserPending}
                data-testid="submit-login-btn"
              >
                {isLoginUserPending ? (
                  <div className="flex justify-center items-center">
                    <Loading />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginUserForm;
