import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../configs/axios";
import type { IRegisterUserProps } from "../../interfaces/auth/IRegisterUserProps";
import type { ILoginUserProps } from "../../interfaces/auth/ILoginUserProps";
import type { IUserResponse } from "../../interfaces/user/IUserResponse";

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (data: IRegisterUserProps) => {
      const { data: response } = await api.post<IUserResponse>(
        "/auth/register",
        data
      );

      return response;
    },
  });
}

export function useLoginUser() {
  return useMutation({
    mutationFn: async (data: ILoginUserProps) => {
      const { data: response } = await api.post<IUserResponse>(
        "/auth/login",
        data
      );

      return response;
    },
  });
}

export function useGetMyUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data: response } = await api.get<IUserResponse>("/auth/me");

      return response;
    },
  });
}

export function useGetNotApprovedUsers() {
  return useQuery({
    queryKey: ["not-approved-users"],
    queryFn: async () => {
      const { data: response } = await api.get<IUserResponse[]>(
        "/auth/not-approved-users"
      );

      return response;
    },
  });
}

export function useApproveRegistrationRequest() {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/auth/approve/${id}`);
    },
  });
}
