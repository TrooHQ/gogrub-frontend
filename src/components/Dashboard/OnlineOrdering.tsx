import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import DeliveryService from "../onlineOrdering/DeliveryService";
import PickupLocation from "../onlineOrdering/PickupLocation";
import YourLink from "../onlineOrdering/YourLink";
import Sidebar from "../onlineOrdering/Sidebar";
import Themes from "../onlineOrdering/Themes";

const OnlineOrdering = () => {
  // const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.title = "Control How Customers Place Orders Online Seamlessly and Efficiently"
  }, [])

  const param = new URLSearchParams(window.location.search);
  const tab = param.get("pg");

  const [activeComponent, setActiveComponent] = useState(tab ? "link" : "pickup location");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "pickup location":
        return <PickupLocation />;
      case "delivery service":
        return <DeliveryService />;
      case "link":
        return <YourLink />;
      case "themes":
        return <Themes />;
      default:
        return <PickupLocation />;
    }
  };

  return (
    <DashboardLayout>
      <TopMenuNav pathName="Online Ordering" />
      <div className="mt-6">
        <Sidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <div className="flex">
          <div className="w-full mt-4 border border-[#B6B6B6] pt-5 px-6 h-[700px] overflow-scroll">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OnlineOrdering;
