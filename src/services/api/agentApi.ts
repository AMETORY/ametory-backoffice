import type { PaginationRequest } from "../../objects/pagination";
import { customFetch } from "./baseApi";

export const getAgents = async (req: PaginationRequest) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(req.page));
  queryParams.set("size", String(req.size));
  if (req.search) queryParams.set("search", req.search);
  return await customFetch(`api/v1/admin/gemini/list?${queryParams}`, {
    method: "GET",
  });
};

export const getAgent = async (id: string) => {
  return await customFetch(`api/v1/admin/gemini/${id}`, {
    method: "GET",
  });
};

export const createAgent = async (data: any) => {
  return await customFetch(`api/v1/admin/gemini/create`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateAgent = async (id: string, data: any) => {
  return await customFetch(`api/v1/admin/gemini/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteAgent = async (id: string) => {
  return await customFetch(`api/v1/admin/gemini/${id}`, {
    method: "DELETE",
  });
};
