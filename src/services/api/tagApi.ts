import type { PaginationRequest } from "../../objects/pagination";
import { customFetch } from "./baseApi";

export const getTags = async (req: PaginationRequest) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(req.page));
  queryParams.set("size", String(req.size));
  if (req.search) queryParams.set("search", req.search);
  return await customFetch(`api/v1/tags?${queryParams}`, {
    method: "GET",
  });
};

export const getTag = async (id: string) => {
  return await customFetch(`api/v1/tags/${id}`, {
    method: "GET",
  });
};

export const createTag = async (data: any) => {
  return await customFetch(`api/v1/tags`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateTag = async (id: string, data: any) => {
  return await customFetch(`api/v1/tags/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteTag = async (id: string) => {
  return await customFetch(`api/v1/tags/${id}`, {
    method: "DELETE",
  });
};
