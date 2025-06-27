import { useSelector } from "react-redux";
import SectionHeader from "../../components/Dashboard/Profile/SectionHeader";
import { useState } from "react";
import EditBranchDetailsModal from "../../components/Dashboard/Profile/EditBranchDetailsModal";

const BranchDetails = () => {
  const { userDetails, loading, userData } = useSelector((state: any) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  console.log("userDetails", userDetails)

  return (
    <div className="space-y-8">
      {
        <SectionHeader
          title="Business Details"
          onEditClick={handleEditClick}
          showEdit={userDetails.user_role === "admin" ? true : false}
        />
      }

      <div className="flex items-center mb-8 space-x-4">
        <img
          src={userDetails?.business_logo}
          alt={`${userDetails?.first_name} ${userDetails?.last_name}`}
          className="object-cover w-20 h-20 border border-gray-300 rounded-full "
        />
        <div>
          <h3 className="text-[16px] font-medium text-[#121212]">
            {userDetails?.first_name} {userDetails?.last_name}
          </h3>
          <p className="text-gray-600">{userDetails?.user_role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="mb-1 text-sm text-gray-600">Business Name</p>
          <p className="text-gray-900">
            {userDetails?.business_name}
            {/* {userDetails.user_role === "admin" ? "All branches" : userDetails.branch_name} */}
          </p>
        </div>
        <div>
          <p className="mb-1 text-sm text-gray-600">Role</p>
          <p className="text-gray-900 capitalize">
            {userDetails.user_role}
            {userDetails.user_role !== "admin" ? "(" + userDetails?.role || +")" : ""}
          </p>
        </div>
      </div>



      {/* <div>
        <SectionHeader
          title="Privileges"
          showEdit={userDetails.user_role === "admin" ? true : false}
        />
        <ul className="space-y-3">
          {userDetails.user_role === "admin"
            ? "All permissions"
            : userDetails.permissions.map((privilege: any, index: Key | null | undefined) => (
              <li key={index} className="text-gray-700">
                {privilege}
              </li>
            ))}
        </ul>
      </div> */}

      <EditBranchDetailsModal
        userDetails={userDetails}
        userData={userData}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        loading={loading}
      />
    </div>
  );
};

export default BranchDetails;
