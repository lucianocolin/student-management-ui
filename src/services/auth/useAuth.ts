import { useMutation } from "@tanstack/react-query";
import { api } from "../../configs/axios";
import type { IRegisterUserProps } from "../../interfaces/auth/IRegisterUserProps";

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (data: IRegisterUserProps) => {
      const { data: response } = await api.post("/auth/register", data);

      return response;
    },
  });
}
