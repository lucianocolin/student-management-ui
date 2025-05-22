import * as yup from "yup";
import {
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  PASSWORD_FORMAT,
  PASSWORD_REQUIRED,
} from "../../../constants/auth/auth-schema-errors";

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\]:;<>,.?~\\/-]).{8,}$/;

export const loginUserSchema = yup.object({
  email: yup.string().email(EMAIL_FORMAT).required(EMAIL_REQUIRED),
  password: yup
    .string()
    .required(PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, PASSWORD_FORMAT),
});
