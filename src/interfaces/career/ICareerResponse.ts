import type { ISubjectResponse } from "../subject/ISubjectResponse";

export interface ICareerResponse {
  id: string;
  name: string;
  subjects: ISubjectResponse[];
}
