import type { ICareerResponse } from "../career/ICareerResponse";

export interface ISubjectResponse {
  id?: string;
  name: string;
  career: ICareerResponse;
}
