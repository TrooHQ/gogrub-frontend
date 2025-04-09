import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import InRoomDining from "../onlineOrdering/InRoomDining";
import QRCodesAtTable from "../onlineOrdering/QRCodesAtTable";
import QRSidebar from "../onlineOrdering/QRSidebar";

const QROrdering = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [activeComponent, setActiveComponent] = useState("in-room dining");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "in-room dining":
        return <InRoomDining />;
      case "qr code at table":
        return <QRCodesAtTable />;
      default:
        return <InRoomDining />;
    }
  };

  return (
    <DashboardLayout>
      <TopMenuNav pathName="Online Ordering" />
      <div className="mt-6">
        <QRSidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <div className="flex">
          <div className="w-full mt-4 border border-[#B6B6B6] pt-5 px-6 h-fit min-h-[600px]">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QROrdering;
