import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Modal from "../Modal";
// import CustomInput from "../inputFields/CustomInput";
// import { toast } from "react-toastify";
import AddDeliveryService from "./AddDeliveryService";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchDeliveryDetails } from "../../slices/assetSlice";
import DeleteAlert from "../../assets/mdi_delete.png";
import Close from "../../assets/closeIcon.svg";

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

  const deleteDeliveryAddress = async () => {
    // Handle delete delivery service logic here
    // /asset/deleteDeliveryDetails/:delivery_id
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.delete(
        `${SERVER_DOMAIN}/asset/deleteDeliveryDetails/${deliveryDetails._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(resp)
      toast.success("Successfully deleted");
      fetchDeliveryDetails();
      window.location.reload();
    } catch (error: any) {
      console.log(error)
      toast.error("Error deleting");
    }

  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
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
                    <MenuItem onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>Delete</MenuItem>
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

      <DeleteModal handleConfirmDelete={deleteDeliveryAddress} isDeleteModalOpen={isDeleteModalOpen} handleDeleteModal={handleDeleteModal} />

      {/* Edit Delivery Details Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <AddDeliveryService editId={deliveryDetails?._id} onClose={handleCloseEditModal} />
      </Modal>
    </div>
  );
};

export default DeliveryTable;


const DeleteModal = ({ handleConfirmDelete, isDeleteModalOpen, handleDeleteModal }: { handleConfirmDelete: () => void, isDeleteModalOpen: boolean, handleDeleteModal: () => void }) => {



  return (
    <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModal}>
      <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[539px]">
        <div
          className="flex items-center justify-end cursor-pointer"
          onClick={handleDeleteModal}
        >
          <img src={Close} alt="Close" />
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <img src={DeleteAlert} alt="Close" className="w-[64px] h-[64px]" />
          <p className="text-[16px] font-[400] text-grey500">
            Are you sure you want to delete this?
          </p>
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              className="border cursor-pointer border-[#090909] rounded px-[24px] py-[10px] font-[600] text-[#090909]"
              onClick={handleDeleteModal}
            >
              No
            </button>
            <button
              className="border border-[#090909] bg-[#090909] rounded px-[24px] py-[10px] font-[500] text-white"
              onClick={handleConfirmDelete}
            >
              {"Yes"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}