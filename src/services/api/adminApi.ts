import type { PaginationRequest } from "../../objects/pagination";
import { customFetch } from "./baseApi";

export const getAdmins = async (req: PaginationRequest) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(req.page));
  queryParams.set("size", String(req.size));
  if (req.search) queryParams.set("search", req.search);
  return await customFetch(`api/v1/admin/admin/list?${queryParams}`, {
    method: "GET",
  });
};

export const getAdmin = async (id: string) => {
  return await customFetch(`api/v1/admin/admin/${id}`, {
    method: "GET",
  });
};

export const inviteAdmin = async (data: any) => {
  return await customFetch(`api/v1/admin/admin/invite`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateAdmin = async (id: string, data: any) => {
  return await customFetch(`api/v1/admin/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// export const deleteAdmin = async (id: string) => {
//   return await customFetch(`api/v1/admin/user/${id}`, {
//     method: "DELETE",
//   });
// };
