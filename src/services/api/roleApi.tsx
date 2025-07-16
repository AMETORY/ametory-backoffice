import { customFetch } from "./baseApi";
import type { RoleModel } from "../../models/role";

// Create a new role
export const createRole = async (data: RoleModel) => {
  return await customFetch("api/v1/admin/role/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Get all roles
export const getRoles = async (req: {
  page?: number;
  size?: number;
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (req.page) queryParams.set("page", String(req.page));
  if (req.size) queryParams.set("size", String(req.size));
  if (req.search) queryParams.set("search", req.search);

  return await customFetch(`api/v1/admin/role/list?${queryParams}`, {
    method: "GET",
  });
};
// Get role detail
export const getRoleDetail = async (id: string) => {
  return await customFetch(`api/v1/admin/role/${id}`, {
    method: "GET",
  });
};
export const getPermissions = async () => {
  return await customFetch(`api/v1/admin/role/permissions`, {
    method: "GET",
  });
};

// Update an existing role
export const updateRole = async (id: string, data: Partial<RoleModel>) => {
  return await customFetch(`api/v1/admin/role/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Delete a role
export const deleteRole = async (id: string) => {
  return await customFetch(`api/v1/admin/role/${id}`, {
    method: "DELETE",
  });
};
