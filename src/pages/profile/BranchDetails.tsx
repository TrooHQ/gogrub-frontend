import { useSelector } from "react-redux";
import SectionHeader from "../../components/Dashboard/Profile/SectionHeader";
import { useState } from "react";
import EditBranchDetailsModal from "../../components/Dashboard/Profile/EditBranchDetailsModal";

const BranchDetails = () => {
  const { userDetails, loading, userData } = useSelector((state: any) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { personalInfo, businessInfo } = useSelector((state: any) => state.allBusinessInfo);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  console.log("userDetails", userDetails)
  console.log("userData", userData)

  return (
    <div className="space-y-8">
      {
        <SectionHeader
          title="Business Details"
          onEditClick={handleEditClick}
          showEdit={personalInfo.user_role === "admin" ? true : false}
        />
      }

      <div className="flex items-center mb-8 space-x-4">
        <img
          src={businessInfo?.business_logo}
          alt={`${personalInfo?.first_name} ${personalInfo?.last_name}`}
          className="object-cover w-20 h-20 border border-gray-300 rounded-full "
        />
        <div>
          <h3 className="text-[16px] font-medium text-[#121212]">
            {personalInfo?.first_name} {personalInfo?.last_name}
          </h3>
          <p className="text-gray-600">{personalInfo?.user_role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <p className="mb-1 text-sm text-gray-600">Business Name</p>
          <p className="text-gray-900">
            {businessInfo?.business_name}
            {/* {personalInfo.user_role === "admin" ? "All branches" : userDetails.branch_name} */}
          </p>
        </div>
        <div>
          <p className="mb-1 text-sm text-gray-600">Business Email</p>
          <p className="text-gray-900">
            {businessInfo?.business_email}
            {/* {personalInfo.user_role === "admin" ? "All branches" : userDetails.branch_name} */}
          </p>
        </div>
        <div>
          <p className="mb-1 text-sm text-gray-600">Business Phone Number</p>
          <p className="text-gray-900">
            {businessInfo?.business_phone_number}
            {/* {personalInfo.user_role === "admin" ? "All branches" : userDetails.branch_name} */}
          </p>
        </div>
        <div>
          <p className="mb-1 text-sm text-gray-600">Business Address</p>
          <p className="text-gray-900">
            {businessInfo?.business_address}
            {/* {personalInfo.user_role === "admin" ? "All branches" : userDetails.branch_name} */}
          </p>
        </div>
        <div>
          <p className="mb-1 text-sm text-gray-600">CAC Number</p>
          <p className="text-gray-900">
            {businessInfo?.cac_number}
            {/* {personalInfo.user_role === "admin" ? "All branches" : userDetails.branch_name} */}
          </p>
        </div>
        {/* <div>
          <p className="mb-1 text-sm text-gray-600">Role</p>
          <p className="text-gray-900 capitalize">
            {personalInfo.user_role}
            {personalInfo.user_role !== "admin" ? "(" + businessInfo?.role || +")" : ""}
          </p>
        </div> */}
      </div>



      {/* <div>
        <SectionHeader
          title="Privileges"
          showEdit={personalInfo.user_role === "admin" ? true : false}
        />
        <ul className="space-y-3">
          {personalInfo.user_role === "admin"
            ? "All permissions"
            : userDetails.permissions.map((privilege: any, index: Key | null | undefined) => (
              <li key={index} className="text-gray-700">
                {privilege}
              </li>
            ))}
        </ul>
      </div> */}

      <EditBranchDetailsModal
        personalInfo={personalInfo}
        businessInfo={businessInfo}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        loading={loading}
      />
    </div>
  );
};

export default BranchDetails;
