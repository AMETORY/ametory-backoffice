import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import { BsPeople } from "react-icons/bs";
import { GoDeviceMobile, GoGear } from "react-icons/go";
import { HiOutlineChartPie } from "react-icons/hi";
import { LuLock, LuLogOut } from "react-icons/lu";
import { MdSupportAgent } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: HiOutlineChartPie,
  },
  {
    label: "Pengguna",
    path: "/user",
    icon: BsPeople,
  },
  {
    label: "Pengaturan",
    icon: GoGear,
    children: [
      {
        label: "Hak Akses",
        path: "/role",
        icon: LuLock,
      },
      {
        label: "Device",
        path: "/device",
        icon: GoDeviceMobile,
      },
      {
        label: "Agent",
        path: "/agent",
        icon: MdSupportAgent,
      },
      {
        label: "Pengaturan",
        path: "/setting",
        icon: GoGear,
      },
    ],
  },
];

const CustomSidebar: FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const newOpenMenus: { [key: string]: boolean } = {};
    menuItems.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some(
          (child) => child.path && isActive(child.path),
        );
        if (isChildActive) {
          newOpenMenus[item.label] = true;
        }
      }
    });
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

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
            {menuItems.map((item) =>
              item.children ? (
                <SidebarCollapse
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  open={openMenus[item.label] || false}
                  onClick={() => toggleMenu(item.label)}
                >
                  {item.children.map((child) => (
                    <SidebarItem
                      key={child.path}
                      className={`cursor-pointer ${
                        isActive(child.path!) ? "menu-active" : ""
                      }`}
                      onClick={() => navigate(child.path!)}
                      icon={child.icon}
                    >
                      {child.label}
                    </SidebarItem>
                  ))}
                </SidebarCollapse>
              ) : (
                <SidebarItem
                  key={item.path}
                  className={`cursor-pointer ${
                    isActive(item.path!) ? "menu-active" : ""
                  }`}
                  onClick={() => navigate(item.path!)}
                  icon={item.icon}
                >
                  {item.label}
                </SidebarItem>
              ),
            )}
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
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
