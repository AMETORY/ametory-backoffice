import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { useContext, useEffect, useState, type FC } from "react";
import { BsPeople } from "react-icons/bs";
import { GrMapLocation, GrUserAdmin } from "react-icons/gr";
import { HiOutlineChartPie } from "react-icons/hi";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { LuLock, LuLogOut } from "react-icons/lu";
import {
  MdFeaturedPlayList,
  MdOutlineChecklist,
  MdSupportAgent,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { ProfileContext } from "../contexts/ProfileContext";
import { useAuth } from "../hooks/useAuth";
import { GoDeviceMobile, GoGear } from "react-icons/go";
import { VscChecklist } from "react-icons/vsc";
interface CustomSidebarProps {}
const CustomSidebar: FC<CustomSidebarProps> = ({}) => {
  const { profile } = useContext(ProfileContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openMaster, setOpenMaster] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const location = useLocation();

  const checkPermissions = (permission: string) => {
    return true;
  };

  useEffect(() => {
    // console.log(location.pathname);
    switch (location.pathname) {
      case "/role":
        setOpenSetting(true);
        break;

      default:
        if (location.pathname.includes("/company")) {
          setOpenSetting(true);
        }
        break;
    }
  }, [location.pathname]);
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0">
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className="sidebar-admin"
      >
        <SidebarLogo href="#" img="/icon-192.png" imgAlt="">
          <div>
            <h6 className="!text-white">{import.meta.env.VITE_APP_TITLE}</h6>
            <p className="text-sm !text-white">ADMIN</p>
          </div>
        </SidebarLogo>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              className={`cursor-pointer ${location.pathname === "/" ? "menu-active" : ""}`}
              onClick={() => {
                navigate("/");
              }}
              icon={HiOutlineChartPie}
            >
              Dashboard
            </SidebarItem>

            <SidebarItem
              className={`cursor-pointer ${location.pathname === "/user" ? "menu-active" : ""}`}
              onClick={() => {
                navigate("/user");
              }}
              icon={BsPeople}
            >
              Pengguna
            </SidebarItem>

            <SidebarItem
              className={`cursor-pointer ${location.pathname === "/role" ? "menu-active" : ""}`}
              onClick={() => {
                navigate("/role");
              }}
              icon={LuLock}
            >
              Hak Akses
            </SidebarItem>
            <SidebarItem
              className={`cursor-pointer ${location.pathname === "/device" ? "menu-active" : ""}`}
              onClick={() => {
                navigate("/device");
              }}
              icon={GoDeviceMobile}
            >
              Device
            </SidebarItem>
            <SidebarItem
              className={`cursor-pointer ${location.pathname === "/agent" ? "menu-active" : ""}`}
              onClick={() => {
                navigate("/agent");
              }}
              icon={MdSupportAgent}
            >
              Agent
            </SidebarItem>

            <SidebarItem
              className={`cursor-pointer ${location.pathname === "/setting" ? "menu-active" : ""}`}
              onClick={() => {
                navigate("/setting");
              }}
              icon={GoGear}
            >
              Pengaturan
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
      {/* <div
        className="absolute rotate-[30deg]"
        style={{
          bottom: -66,
          left: -80,
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <img src="/icon-192.png" className="w-64 text-white" alt="" />
      </div> */}
      <div className="absolute right-0 bottom-0 left-0">
        <ul className="w-full p-4">
          <li
            className="flex cursor-pointer flex-row items-center gap-2 rounded-lg p-2 text-white hover:bg-[#0D92F4] hover:text-gray-800"
            onClick={logout}
          >
            <LuLogOut />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default CustomSidebar;
