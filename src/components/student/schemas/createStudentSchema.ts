import * as yup from "yup";
import { CAREER_REQUIRED } from "../../../constants/student/student-schema-errors";

export const createStudentSchema = yup.object({
  careerId: yup.string().required(CAREER_REQUIRED),
});
