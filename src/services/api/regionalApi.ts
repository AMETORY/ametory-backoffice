import type { PaginationRequest } from "../../objects/pagination";
import { customFetch } from "./baseApi";

export const getProvinces = async () => {
  return await customFetch("api/v1/regional/province", {
    method: "GET",
  });
};

export const getRegencies = async (provinceId: string) => {
  return await customFetch(
    `api/v1/regional/regency?province_id=${provinceId}`,
    {
      method: "GET",
    },
  );
};

export const getDistricts = async (regencyId: string) => {
  return await customFetch(`api/v1/regional/district?regency_id=${regencyId}`, {
    method: "GET",
  });
};

export const getVillages = async (districtId: string) => {
  return await customFetch(
    `api/v1/regional/village?district_id=${districtId}`,
    {
      method: "GET",
    },
  );
};

export const searchLocation = async (searchQuery: string) => {
  return await customFetch(`api/v1/regional/place?search=${searchQuery}`, {
    method: "GET",
  });
};

export const getAppSubDistricts = async (req: PaginationRequest) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(req.page));
  queryParams.set("size", String(req.size));
  if (req.search) queryParams.set("search", req.search);
  return await customFetch(`api/v1/admin/sub-district?${queryParams}`, {
    method: "GET",
  });
};
