import { Field, Form, Formik } from "formik";
import Loading from "../common/Loading";
import type { ICreateStudentProps } from "../../interfaces/student/ICreateStudentProps";
import { createStudentSchema } from "./schemas/createStudentSchema";
import type { IUserResponse } from "../../interfaces/user/IUserResponse";
import type { ICareerResponse } from "../../interfaces/career/ICareerResponse";

interface ICreateStudentForm {
  onClose: () => void;
  user: IUserResponse;
  handleCreateStudent: (data: ICreateStudentProps) => Promise<void>;
  isCreateStudentPending: boolean;
  careers: ICareerResponse[];
}

const CreateStudentForm = ({
  onClose,
  user,
  handleCreateStudent,
  isCreateStudentPending,
  careers,
}: ICreateStudentForm) => {
  const initialValues: ICreateStudentProps = {
    fullName: user.fullName,
    email: user.email,
    careerId: "",
    subjects: ["Programming", "Databases", "Math"],
  };

  const handleSubmit = (values: ICreateStudentProps) => {
    handleCreateStudent(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createStudentSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="col-span-2 py-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="careerId" className="font-medium">
                Career
              </label>
              {errors.careerId && touched.careerId && (
                <span
                  className="text-red-500 text-sm"
                  data-testid="career-error"
                >
                  {errors.careerId}
                </span>
              )}
              <Field
                as="select"
                name="careerId"
                id="careerId"
                className="border border-gray-300 rounded-md p-2"
                data-testid="career-select"
              >
                <option value="">Select a Career</option>
                {careers.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field>
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
                disabled={isCreateStudentPending}
                data-testid="submit-create-student-btn"
              >
                {isCreateStudentPending ? (
                  <div className="flex justify-center items-center">
                    <Loading />
                  </div>
                ) : (
                  "Create Student"
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateStudentForm;
