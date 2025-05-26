import { useQuery } from "@tanstack/react-query";
import { api } from "../../configs/axios";
import type { ICareerResponse } from "../../interfaces/career/ICareerResponse";

export const useGetCareers = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const { data: response } = await api.get<ICareerResponse[]>("/career");

      return response;
    },
  });
};
