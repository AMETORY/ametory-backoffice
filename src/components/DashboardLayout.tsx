import { useContext, useEffect, type FC } from "react";

import { ChevronRightIcon } from "flowbite-react";
import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router";

import { LoadingContext } from "../contexts/LoadingContext";
import { CountApprovalContext } from "../contexts/ProfileContext";
import { useProfile } from "../contexts/ProfileProvider";
import { getProfile } from "../services/api/authApi";
import { asyncStorage } from "../utils/async_storage";
import { LOCAL_STORAGE_SUB_DISTRICT_ID } from "../utils/constants";
import Avatar from "./Avatar";
import CustomSidebar from "./CustomSidebar";
import Loading from "./Loading";
interface DashboardLayoutProps {
  permission?: string;
  children: React.ReactNode;
  breadcrumb?: { label: string; link: string }[];
  padding?: number;
  headerButton?: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  breadcrumb,
  permission,
  padding = 20,
  headerButton,
}) => {
  const { count, setCount } = useContext(CountApprovalContext);
  const { loading } = useContext(LoadingContext);
  const { setProfile, profile, setRole, setSubDistrict, subDistrict } =
    useProfile();

  const nav = useNavigate();
  useEffect(() => {
    getProfile().then((res: any) => {
      setProfile({
        ...res.data,
      });
      setRole(res.role);
      setSubDistrict(res.sub_district);
      asyncStorage.setItem(LOCAL_STORAGE_SUB_DISTRICT_ID, res.sub_district.id);
    });
  }, []);

  const TopNav = () => (
    <div className="flex h-[56px] items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
      {subDistrict ? (
        <div
          className="flex cursor-pointer items-center gap-1 rounded-xl border border-gray-200 px-4 py-1"
          onClick={() => nav(`/company/${subDistrict?.id}`)}
        >
          <span className="text-sm font-semibold text-gray-800">
            {subDistrict?.name}
          </span>
          {subDistrict?.address && (
            <span className="text-sm text-gray-400">|</span>
          )}
          <div
            className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
            title={subDistrict?.address}
          >
            <small>{subDistrict?.address}</small>
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className="flex items-center justify-end gap-2">
        {/* {!profile?.staff && (
          <div
            className="relative cursor-pointer"
            onClick={() => nav("/approval")}
          >
            <FiBell size={20} />
            {(count?.total ?? 0) > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[7pt] text-white">
                {count?.total}
              </span>
            )}
          </div>
        )} */}

        <div
          className="flex cursor-pointer items-center gap-2 rounded-2xl px-2 py-1 hover:border hover:border-gray-200 hover:bg-gray-100"
          onClick={() => nav("/profile")}
        >
          <Avatar user={profile} />
          <span className="text-sm">{profile?.full_name}</span>
        </div>
      </div>
    </div>
  );

  const CustomBreadcrumb = () =>
    breadcrumb && (
      <div className="mb-4 flex items-center gap-2">
        <GoHome
          className="cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => nav("/")}
        />
        {breadcrumb.map((item, index) => (
          <span key={index} className="flex cursor-pointer items-center gap-2">
            <ChevronRightIcon className="text-gray-400 hover:text-gray-600" />{" "}
            <span
              className="text-sm text-gray-400 hover:text-gray-600"
              onClick={() => nav(item.link)}
            >
              {item.label}
            </span>
          </span>
        ))}
      </div>
    );

  return (
    <div className="h-screen w-screen overflow-x-clip bg-gray-100">
      <CustomSidebar />
      <div className="h-screen pl-64">
        <TopNav />
        <div className="h-[calc(100vh-56px)] overflow-y-auto p-4">
          <div
            className="rounded-lg border border-gray-200 bg-white"
            style={{ padding }}
          >
            <div className="flex items-center justify-between">
              <CustomBreadcrumb />
              {headerButton}
            </div>
            {children}
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};
export default DashboardLayout;
