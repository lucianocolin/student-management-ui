import { useMutation } from "@tanstack/react-query";
import { api } from "../../configs/axios";
import type { IRegisterUserProps } from "../../interfaces/auth/IRegisterUserProps";
import type { ILoginUserProps } from "../../interfaces/auth/ILoginUserProps";

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (data: IRegisterUserProps) => {
      const { data: response } = await api.post("/auth/register", data);

      return response;
    },
  });
}

export function useLoginUser() {
  return useMutation({
    mutationFn: async (data: ILoginUserProps) => {
      const { data: response } = await api.post("/auth/login", data);

      return response;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.token);
    },
  });
}
