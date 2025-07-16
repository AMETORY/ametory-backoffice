import { useContext, type FC } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../hooks/useAuth";
import { PermissionContext } from "../contexts/ProfileContext";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <DashboardLayout>
      <h3>DASHBOARD</h3>
    </DashboardLayout>
  );
};
export default HomePage;
