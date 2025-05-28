import type { ICareerResponse } from "../career/ICareerResponse";

export interface IStudentResponse {
  id?: string;
  fullName: string;
  email: string;
  collegeId: number;
  career: ICareerResponse;
  qualifications?: number[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
