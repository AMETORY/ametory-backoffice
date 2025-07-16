import { customFetch } from "./baseApi";

export const processLogin = async (email: string, password: string) => {
  return await customFetch("api/v1/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const getProfile = async () => {
  return await customFetch("api/v1/admin/auth/profile", {});
};

export const processForgot = async (data: any) => {
  return await customFetch("api/v1/admin/auth/forgot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const changePassword = async (data: any) => {
  return await customFetch(`api/v1/admin/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const verifyEmail = async (token: string) => {
  return await customFetch(`api/v1/admin/auth/verification/${token}`, {
    method: "GET",
  });
};

export const updateProfile = async (data: any) => {
  return await customFetch(`api/v1/admin/auth/profile`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
