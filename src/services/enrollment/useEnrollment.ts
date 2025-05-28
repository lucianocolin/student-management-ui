import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "../../configs/axios";
import type { IEnrollmentResponse } from "../../interfaces/enrollment/IEnrollmentResponse";
import type { ICreateEnrollmentProps } from "../../interfaces/enrollment/ICreateEnrollmentProps";

export const useGetEnrollments = (
  studentId?: string,
  options?: UseQueryOptions<IEnrollmentResponse[], Error>
) => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const { data: response } = await api.get<IEnrollmentResponse[]>(
        `/enrollment?studentId=${studentId}`
      );

      return response;
    },
    ...options,
  });
};

export const useCreateEnrollment = () => {
  return useMutation({
    mutationFn: async (data: ICreateEnrollmentProps) => {
      const { data: response } = await api.post<IEnrollmentResponse>(
        "/enrollment",
        data
      );

      return response;
    },
  });
};
