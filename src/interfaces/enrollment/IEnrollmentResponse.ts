import type { IStudentResponse } from "../student/IStudentResponse";
import type { ISubjectResponse } from "../subject/ISubjectResponse";

export interface IEnrollmentResponse {
  id: string;
  studentId: string;
  subjectId: string;
  grade?: number | null;
  enrolledAt: Date;
  approved: boolean;
  student?: IStudentResponse;
  subject?: ISubjectResponse;
}
