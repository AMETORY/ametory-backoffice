import { useState, type FC } from "react";
import { Route, Routes } from "react-router";
import { LoadingContext } from "../contexts/LoadingContext";
import { ProfileProvider } from "../contexts/ProfileProvider";
import { SearchContext } from "../contexts/SearchContext";
import { CountApproval } from "../models/common";
import type { UserModel } from "../models/user";
import Forgot from "../pages/Forgot";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProfileScreen from "../pages/ProfileScreen";
import RolePage from "../pages/RolePage";
import UserPage from "../pages/UserPage";
import VerificationPage from "../pages/VerificationPage";
import AdminPage from "../pages/AdminPage";
import DevicePage from "../pages/DevicePage";
import AgentPage from "../pages/AgentPage";
import SettingPage from "../pages/SettingPage";

interface PrivateRoutesProps {}

const PrivateRoutes: FC<PrivateRoutesProps> = ({}) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserModel | null>(null);
  const [count, setCount] = useState<CountApproval | null>(null);
  const [companyID, setCompanyID] = useState<string | null>(null);

  return (
    <ProfileProvider>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/user" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/device" element={<DevicePage />} />
            <Route path="/agent" element={<AgentPage />} />
            <Route path="/role" element={<RolePage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/profile" element={<ProfileScreen />} />
            {/* <Route path="/company/:companyId" element={<CompanyPage />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/verify/:token" element={<VerificationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchContext.Provider>
      </LoadingContext.Provider>
    </ProfileProvider>
  );
};
export default PrivateRoutes;
