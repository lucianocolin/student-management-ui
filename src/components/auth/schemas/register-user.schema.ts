import * as yup from "yup";
import {
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  FULL_NAME_MAX,
  FULL_NAME_MIN,
  FULL_NAME_REQUIRED,
  PASSWORD_FORMAT,
  PASSWORD_REQUIRED,
  PHONE_NUMBER_MIN,
  PHONE_NUMBER_REQUIRED,
} from "../../../constants/auth/register-user-schema-errors";

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\]:;<>,.?~\\/-]).{8,}$/;

export const registerUserSchema = yup.object({
  fullName: yup
    .string()
    .required(FULL_NAME_REQUIRED)
    .min(2, FULL_NAME_MIN)
    .max(50, FULL_NAME_MAX),
  email: yup.string().email(EMAIL_FORMAT).required(EMAIL_REQUIRED),
  password: yup
    .string()
    .required(PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, PASSWORD_FORMAT),
  phoneNumber: yup
    .string()
    .required(PHONE_NUMBER_REQUIRED)
    .min(2, PHONE_NUMBER_MIN),
});
