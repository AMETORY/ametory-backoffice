import type { PaginationRequest } from "../../objects/pagination";
import { customFetch } from "./baseApi";

export const getUsers = async (req: PaginationRequest) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(req.page));
  queryParams.set("size", String(req.size));
  if (req.search) queryParams.set("search", req.search);
  return await customFetch(`api/v1/admin/user/list?${queryParams}`, {
    method: "GET",
  });
};

export const getUser = async (id: string) => {
  return await customFetch(`api/v1/admin/user/${id}`, {
    method: "GET",
  });
};

export const inviteUser = async (data: any) => {
  return await customFetch(`api/v1/admin/user/invite`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateUser = async (id: string, data: any) => {
  return await customFetch(`api/v1/admin/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// export const deleteUser = async (id: string) => {
//   return await customFetch(`api/v1/admin/user/${id}`, {
//     method: "DELETE",
//   });
// };
