import "./DashboardPage.css";
import DashboardInfor from "../../components/Dashboard/DashboardInfor/DashboardInfor";
import LatestTransactions from "../../components/Dashboard/LatestTransactions/LatestTransactions";

export default function DashboardPage() {
  return (
    <div>
      <DashboardInfor />
      <LatestTransactions />
    </div>
  );
}
