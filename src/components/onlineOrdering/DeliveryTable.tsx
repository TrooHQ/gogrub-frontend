import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Modal from "../Modal";
// import CustomInput from "../inputFields/CustomInput";
// import { toast } from "react-toastify";
import AddDeliveryService from "./AddDeliveryService";

// interface DeliveryDetails {
//   state: string;
//   fixedPrice: number;
//   support_link: string;
//   canScheduleOrder: boolean;
// }

const DeliveryTable = ({ deliveryDetails }: { deliveryDetails?: any; }) => {


  console.log("deliveryDetails table", deliveryDetails);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [formData, setFormData] = useState(
  //   deliveryDetails || {
  //     state: "",
  //     fixedPrice: 0,
  //     support_link: "",
  //     canScheduleOrder: false,
  //   }
  // );
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

  return (
    <div>
      {deliveryDetails ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#606060] text-white text-center text-base font-normal">
                <th className="py-2 px-4 text-base font-normal min-w-[100px]">
                  State
                </th>
                <th className="px-4 py-2 text-base font-normal">Fixed Price</th>
                <th className="px-4 py-2 text-base font-normal">
                  Support Link
                </th>
                <th className="px-4 py-2 text-base font-normal">Actions</th>
              </tr>
            </thead>

            <hr className="mb-2 text-[#E7E7E7]" />

            <tbody>
              <tr className="bg-[#F8F8F8]">
                <td className="px-4 py-2 text-base font-normal text-center">
                  {deliveryDetails.state}
                </td>
                <td className="px-4 py-2 text-base font-normal text-center">
                  {deliveryDetails.fixedPrice}
                </td>
                <td className="px-4 py-2 text-base font-normal text-center">
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
        <p className="mt-4 text-center text-gray-500">
          No delivery details available.
        </p>
      )}

      {/* Edit Delivery Details Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <AddDeliveryService editId={deliveryDetails?._id} onClose={handleCloseEditModal} />
      </Modal>
    </div>
  );
};

export default DeliveryTable;
