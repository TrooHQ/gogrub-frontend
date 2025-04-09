import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Modal from "../Modal";
import Close from "../../assets/closeIcon.svg";
import DeleteAlert from "../../assets/mdi_delete.png";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { toast } from "react-toastify";
import { fetchPickupLocations } from "../../slices/assetSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import CustomInput from "../inputFields/CustomInput";
import { convertFirstLetterToUppercase } from "../../utils/convertFirstLetterToUppercase";

interface LocationTableProps {
  branches: {
    _id: string;
    created_by: string;
    state: string;
    address: string;
    support_link: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const LocationTable: React.FC<LocationTableProps> = ({ branches }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBranch, setSelectedBranch] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    address: "",
    support_link: "",
  });

  const token = localStorage.getItem("token");

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    branch: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBranch(branch);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBranch(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedBranch !== null) {
      const branchId = selectedBranch._id;
      try {
        setLoading(true);
        await axios.delete(
          `${SERVER_DOMAIN}/asset/removePickUpLocation/?locationId=${branchId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Deleted branch:", branchId);
        handleCloseDeleteModal();
        toast.success("Successfully deleted");
        dispatch(fetchPickupLocations());
      } catch (error) {
        console.error("Error deleting branch:", error);
        toast.error("Error deleting branch");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleEditClick = () => {
    setFormData({
      state: selectedBranch?.state || "",
      address: selectedBranch?.address || "",
      support_link: selectedBranch?.support_link || "",
    });
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  const handleEditConfirm = async () => {
    if (selectedBranch !== null) {
      try {
        setLoading(true);
        const response = await axios.put(
          `${SERVER_DOMAIN}/asset/editPickUpLocation/`,
          {
            ...formData,
            locationId: selectedBranch._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Updated branch:", response);
        dispatch(fetchPickupLocations());
        toast.success("Successfully edited");
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Error updating branch:", error);
        toast.error("Error updating branch");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#606060] text-white  text-base font-normal">
              <th className="py-2 px-4 text-base font-normal min-w-[100px] text-start">
                State
              </th>
              <th className="py-2 px-4 text-base font-normal text-start">
                Address
              </th>
              <th className="py-2 px-4 text-base font-normal">Support link</th>
              <th className="py-2 px-4 text-base font-normal">Actions</th>
            </tr>
          </thead>

          <hr className="mb-2 text-[#E7E7E7]" />

          <tbody>
            {branches.map((branch, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                }`}
              >
                <td className="text-base font-normal py-2 px-4">
                  {branch.state}
                </td>
                <td className="text-base py-2 px-4 break-words font-normal">
                  {convertFirstLetterToUppercase(branch.address)}
                </td>
                <td className="text-base py-2 px-4 break-words font-normal text-center">
                  {branch.support_link}
                </td>
                <td className="text-center">
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleMenuOpen(e, branch)}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[539px]">
          <div
            className="flex items-center justify-end cursor-pointer"
            onClick={handleCloseDeleteModal}
          >
            <img src={Close} alt="Close" />
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <img src={DeleteAlert} alt="Close" className="w-[64px] h-[64px]" />
            <p className="text-[16px] font-[400] text-grey500">
              Are you sure you want to delete this?
            </p>
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                className="border cursor-pointer border-[#090909] rounded px-[24px] py-[10px] font-[600] text-[#090909]"
                onClick={handleCloseDeleteModal}
              >
                No
              </button>
              <button
                className="border border-[#090909] bg-[#090909] rounded px-[24px] py-[10px] font-[500] text-white"
                onClick={handleConfirmDelete}
              >
                {loading ? "Wait..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form>
          <p className="text-[24px] mb-[24px] font-[500] text-purple500">
            Edit Pickup Location
          </p>

          <div>
            {/* <CustomSelect5
              label="Select a state"
              options={stateOptions}
              value={formData.state}
              onChange={(value) => setFormData({ ...formData, state: value })}
            /> */}
          </div>

          <div className="mt-6 flex-grow">
            <CustomInput
              type="text"
              label="What is your pickup address?"
              value={formData.address}
              onChange={(value) => setFormData({ ...formData, address: value })}
            />
          </div>

          <div className="mt-6 flex-grow">
            <CustomInput
              type="text"
              label="Support link (Optional)"
              value={formData.support_link}
              readOnly={true}
              onChange={(value) =>
                setFormData({ ...formData, support_link: value })
              }
            />
          </div>

          <div className="flex justify-end items-center gap-2 mt-7">
            <div
              className="border cursor-pointer border-purple500 rounded px-[24px] py-[10px] font-[600] text-purple500"
              onClick={() => setIsEditModalOpen(false)}
            >
              <p className="font-[500] text-[16px] text-purple500 cursor-pointer">
                Cancel
              </p>
            </div>
            <div className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff]">
              <button
                type="button"
                onClick={handleEditConfirm}
                className="text-[16px]"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LocationTable;
