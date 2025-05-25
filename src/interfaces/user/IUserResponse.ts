import type { USER_ROLES } from "../../enums/user/user-roles";

export interface IUserResponse {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: USER_ROLES[];
  token?: string;
  studentId?: string;
}
