import { Field, Form, Formik } from "formik";
import type { IRegisterUserProps } from "../../interfaces/auth/IRegisterUserProps";
import { registerUserSchema } from "./schemas/register-user.schema";
import Loading from "../common/Loading";

interface IRegisterUserFormProps {
  onClose: () => void;
  handleRegisterUser: (data: IRegisterUserProps) => Promise<void>;
  isRegisterUserPending: boolean;
}

const RegisterUserForm = ({
  onClose,
  handleRegisterUser,
  isRegisterUserPending,
}: IRegisterUserFormProps) => {
  const initialValues: IRegisterUserProps = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const handleSubmit = (values: IRegisterUserProps) => {
    handleRegisterUser(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerUserSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="col-span-2 py-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="font-medium">
                Full Name
              </label>
              {errors.fullName && touched.fullName && (
                <span
                  className="text-red-500 text-sm"
                  data-testid="register-full-name-error"
                >
                  {errors.fullName}
                </span>
              )}
              <Field
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-md p-2"
                data-testid="register-full-name-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="mt-4 font-medium">
                Email
              </label>
              {errors.email && touched.email && (
                <span
                  className="text-red-500 text-sm"
                  data-testid="register-email-error"
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
                data-testid="register-email-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="mt-4 font-medium">
                Password
              </label>
              {errors.password && touched.password && (
                <span
                  className="text-red-500 text-sm"
                  data-testid="register-password-error"
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
                data-testid="register-password-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="mt-4 font-medium">
                Phone Number
              </label>
              {errors.phoneNumber && touched.phoneNumber && (
                <span
                  className="text-red-500 text-sm"
                  data-testid="register-phone-number-error"
                >
                  {errors.phoneNumber}
                </span>
              )}
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="border border-gray-300 rounded-md p-2"
                data-testid="register-phone-number-input"
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
                className="bg-blue-500 text-white p-2 mt-3 rounded-md w-full h-10"
                type="submit"
                disabled={isRegisterUserPending}
                data-testid="submit-register-btn"
              >
                {isRegisterUserPending ? (
                  <div className="flex justify-center items-center">
                    <Loading />
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterUserForm;
