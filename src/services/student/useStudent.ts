import { useQuery } from "@tanstack/react-query";
import { api } from "../../configs/axios";
import type { IStudentResponse } from "../../interfaces/student/IStudentResponse";

export const useGetStudent = (id: string) => {
  return useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const { data: response } = await api.get<IStudentResponse>(
        `/student/${id}`
      );

      return response;
    },
    enabled: !!id,
  });
};
