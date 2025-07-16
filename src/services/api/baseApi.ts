import { asyncStorage } from "../../utils/async_storage";
import {
  LOCAL_STORAGE_COMPANY_ID,
  LOCAL_STORAGE_ORGANIZER_ID,
  LOCAL_STORAGE_SUB_DISTRICT_ID,
  LOCAL_STORAGE_TOKEN,
} from "../../utils/constants";

export const customFetch = async <T>(
  url: string,
  options: RequestInit & { isBlob?: boolean; isMultipart?: boolean } = {},
): Promise<T> => {
  let token = await asyncStorage.getItem(LOCAL_STORAGE_TOKEN);
  let headers: Record<string, any> = {
    // 'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,

    ...options.headers,
  };
  let idOrg = await asyncStorage.getItem(LOCAL_STORAGE_ORGANIZER_ID);
  let idComp = await asyncStorage.getItem(LOCAL_STORAGE_COMPANY_ID);
  let idSubDistrict = await asyncStorage.getItem(LOCAL_STORAGE_SUB_DISTRICT_ID);
  if (idOrg) {
    headers["ID-Organizer"] = idOrg;
  }
  if (idComp) {
    headers["ID-Company"] = idComp;
  }
  if (idSubDistrict) {
    headers["ID-SubDistrict"] = idSubDistrict;
  }
  const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/${url}`, {
    ...options,
    headers,
  });

  let data;
  if (options.isBlob) {
    data = await response.blob();
  } else {
    data = await response.json();
  }

  if (!response.ok) {
    const error = new Error(
      data.message || data.error || "Something went wrong",
    );
    // @ts-ignore
    error.response = response;
    throw error;
  }

  return data;
};
