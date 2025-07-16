import type { PaginationRequest } from "../../objects/pagination";
import { customFetch } from "./baseApi";

export const getDevices = async (req: PaginationRequest) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(req.page));
  queryParams.set("size", String(req.size));
  if (req.search) queryParams.set("search", req.search);
  return await customFetch(`api/v1/admin/devices?${queryParams}`, {
    method: "GET",
  });
};

export const getDevice = async (id: string) => {
  return await customFetch(`api/v1/admin/devices/${id}`, {
    method: "GET",
  });
};

export const createDevice = async (data: any) => {
  return await customFetch(`api/v1/admin/devices`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateDevice = async (id: string, data: any) => {
  return await customFetch(`api/v1/admin/devices/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
export const createQRDevice = async (id: string) => {
  return await customFetch(`api/v1/admin/devices/${id}/create-qr`, {
    method: "PUT",
  });
};
export const getQrImage = async (id: string) => {
  return await customFetch(`api/v1/admin/devices/${id}/qr-image`, {});
};

export const deleteDevice = async (id: string) => {
  return await customFetch(`api/v1/admin/devices/${id}`, {
    method: "DELETE",
  });
};
export const sendGeminiChat = async (id: string, data: any) => {
  return await customFetch(`api/v1/admin/devices/${id}/chat`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
