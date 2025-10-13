import DashboardLayout from "./DashboardLayout";
import InformationAccordion from "./components/InformationAccordion";
import { useEffect, useState } from "react";
import BranchModal from "./components/BranchModal";

const BusinessInformation = () => {

  useEffect(() => {
    document.title = "Manage Your Business Details Including Name, Contact, and Address"
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout title="Business Information">

      <div className="flex items-center justify-between mt-10">
        <div></div>
      </div>
      <InformationAccordion />
      <BranchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </DashboardLayout>
  );
};

export default BusinessInformation;
