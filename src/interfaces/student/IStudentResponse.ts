export interface IStudentResponse {
  id?: string;
  fullName: string;
  email: string;
  collegeId: number;
  career: string;
  subjects: string[];
  qualifications?: number[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
