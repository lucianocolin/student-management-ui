import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../configs/axios";
import type { IStudentResponse } from "../../interfaces/student/IStudentResponse";
import type { ICreateStudentProps } from "../../interfaces/student/ICreateStudentProps";
import { useDebounce } from "use-debounce";

export const useGetStudents = (search?: string) => {
  const [searchDebounce] = useDebounce(search, 300);
  const queryParams = searchDebounce ? `?search=${searchDebounce}` : "";

  return useQuery({
    queryKey: ["students", searchDebounce],
    queryFn: async () => {
      const { data: response } = await api.get<IStudentResponse[]>(
        `/student${queryParams}`
      );

      return response;
    },
  });
};

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

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: async (data: ICreateStudentProps) => {
      const { data: response } = await api.post<IStudentResponse>(
        "/student",
        data
      );

      return response;
    },
  });
};

export const useDeleteStudent = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/student/${id}`);
    },
  });
};
