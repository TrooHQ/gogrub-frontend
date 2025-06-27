import EditProfileModal from "../../components/Dashboard/Profile/EditProfileModal";
import SectionHeader from "../../components/Dashboard/Profile/SectionHeader";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProfileDetails = () => {
  // const { userDetails } = useSelector((state: any) => state.user);
  const { personalInfo, loading } = useSelector((state: any) => state.allBusinessInfo);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <SectionHeader title="Profile Details" onEditClick={handleEditClick} />

      {/* <div className="flex items-center mb-8 space-x-4">
        <img
          src={userDetails?.photo || userDetails?.business_logo || ""}
          alt={`${userDetails?.first_name} ${userDetails?.last_name}`}
          className="object-cover w-20 h-20 border border-gray-300 rounded-full "
        />
        <div>
          <h3 className="text-[16px] font-medium text-[#121212]">
            {userDetails?.first_name} {userDetails?.last_name}
          </h3>
          <p className="text-gray-600">{userDetails?.user_role}</p>
        </div>
      </div> */}

      <div className="space-y-8">
        <div>
          <SectionHeader title="Personal Information" onEditClick={handleEditClick} showEdit={false} />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">First Name</p>
              <p className="text-[#121212] font-medium text-base">{personalInfo?.first_name}</p>
            </div>
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">Last Name</p>
              <p className="text-[#121212] font-medium text-base">{personalInfo?.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">Email</p>
              <p className="text-[#121212] font-medium text-base">{personalInfo?.personal_email}</p>
            </div>
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">Phone Number</p>
              <p className="text-[#121212] font-medium text-base">{personalInfo?.phone_number}</p>
            </div>
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">Role</p>
              <p className="text-[#121212] font-medium text-base">{personalInfo?.user_role}</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader title="Address" onEditClick={handleEditClick} showEdit={false} />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">Country</p>
              <p className="text-[#121212] font-medium text-base">{personalInfo?.country}</p>
            </div>
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">City/State</p>
              <p className="text-[#121212] font-medium text-base">
                {personalInfo?.city}, {personalInfo?.state}
              </p>
            </div>
            {/* <div>
              <p className="text-sm text-[#606060] font-normal mb-1">Business Email</p>
              <p className="text-[#121212] font-medium text-base">{personalInfo?.business_email}</p>
            </div>
            <div>
              <p className="text-sm text-[#606060] font-normal mb-1">Business Address</p>
              <p className="text-[#121212] font-medium text-base">
                {personalInfo?.business_address}
              </p>
            </div> */}
          </div>
        </div>
      </div>

      <EditProfileModal
        personalInfo={personalInfo}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        loading={loading}
      />
    </div>
  );
};

export default ProfileDetails;
