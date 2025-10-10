import DashboardLayout from "./DashboardLayout";
import Table from "./TableItem";

const Dashboard: React.FC = () => {
  return (
    <div className="">
      <DashboardLayout title="Dashboard">
        <div className="">
          <Table />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
