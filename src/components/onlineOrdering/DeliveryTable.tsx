import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchDeliveryDetails,
  updateDeliveryDetails,
} from "../../slices/assetSlice";
import CustomInput from "../inputFields/CustomInput";
import { toast } from "react-toastify";

interface DeliveryDetails {
  state: string;
  fixedPrice: number;
  support_link: string;
  canScheduleOrder: boolean;
}

const DeliveryTable = ({ deliveryDetails }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DeliveryDetails>(
    deliveryDetails || {
      state: "",
      fixedPrice: 0,
      support_link: "",
      canScheduleOrder: false,
    }
  );
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      await dispatch(updateDeliveryDetails(formData)).unwrap();
      dispatch(fetchDeliveryDetails());
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update delivery details. Please try again.");
      console.error("Error updating delivery details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {deliveryDetails ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#606060] text-white text-center text-base font-normal">
                <th className="py-2 px-4 text-base font-normal min-w-[100px]">
                  State
                </th>
                <th className="py-2 px-4 text-base font-normal">Fixed Price</th>
                <th className="py-2 px-4 text-base font-normal">
                  Support Link
                </th>
                <th className="py-2 px-4 text-base font-normal">Actions</th>
              </tr>
            </thead>

            <hr className="mb-2 text-[#E7E7E7]" />

            <tbody>
              <tr className="bg-[#F8F8F8]">
                <td className="text-base font-normal py-2 px-4 text-center">
                  {deliveryDetails.state}
                </td>
                <td className="text-base py-2 px-4 text-center font-normal">
                  {deliveryDetails.fixedPrice}
                </td>
                <td className="text-base py-2 px-4 text-center font-normal">
                  {deliveryDetails.support_link || "N/A"}
                </td>
                <td className="text-center">
                  <IconButton aria-label="more" onClick={handleMenuOpen}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No delivery details available.
        </p>
      )}

      {/* Edit Delivery Details Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <form className="p-6 bg-white rounded-[20px] w-[500px]">
          <h2 className="text-[24px] mb-[24px] font-[500] text-purple500">
            Edit Delivery Details
          </h2>

          <div className="mt-6 flex-grow">
            <CustomInput
              type="text"
              label="Location"
              value={formData.state}
              onChange={(value) => setFormData({ ...formData, state: value })}
            />
          </div>

          <div className="mt-6 flex-grow">
            <CustomInput
              type="number"
              label="Fixed Price"
              value={formData.fixedPrice}
              onChange={(value) =>
                setFormData({ ...formData, fixedPrice: Number(value) })
              }
            />
          </div>

          <div className="mt-6 flex-grow">
            <CustomInput
              type="text"
              label="Support link (Optional)"
              value={formData.support_link}
              onChange={(value) =>
                setFormData({ ...formData, support_link: value })
              }
            />
          </div>

          <div className="flex justify-end items-center gap-2 mt-7">
            <button
              className="border border-purple500 text-purple500 px-6 py-2 rounded"
              onClick={handleCloseEditModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-purple500 text-white px-6 py-2.5 rounded"
              onClick={handleSaveChanges}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DeliveryTable;
