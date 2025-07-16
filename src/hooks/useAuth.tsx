import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { asyncStorage } from "../utils/async_storage";
import {
  LOCAL_STORAGE_COMPANY,
  LOCAL_STORAGE_COMPANY_ID,
  LOCAL_STORAGE_ORGANIZER_ID,
  LOCAL_STORAGE_TOKEN,
} from "../utils/constants";

export const useAuth = () => {
  const [token, setToken] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await asyncStorage.getItem(LOCAL_STORAGE_TOKEN);
      if (token) {
        setToken(token);
      } else {
        const { pathname } = location;
      }
    };

    checkToken();
  }, [location, navigate]);

  const login = async (token: string) => {
    await asyncStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    setToken(token);
    navigate("/", { replace: true });
  };

  const logout = async () => {
    await asyncStorage.removeItem(LOCAL_STORAGE_TOKEN);
    await asyncStorage.removeItem(LOCAL_STORAGE_COMPANY_ID);
    await asyncStorage.removeItem(LOCAL_STORAGE_COMPANY);
    setToken(undefined);

    navigate("/login", { replace: true });
  };

  return { token, login, logout };
};
