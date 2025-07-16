import { customFetch } from "./baseApi";

export const getCompany = async (id: string) => {
  return await customFetch(`api/v1/company/${id}`, {});
};

export const updateCompany = async (id: string, data: any) => {
  return await customFetch(`api/v1/company/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
