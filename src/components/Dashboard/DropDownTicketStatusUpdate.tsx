// import { SERVER_DOMAIN } from "@/src/Api/Api";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// export const DropdownMenuTicketStatusUpdate = ({}: {}) => {
export const DropdownMenuTicketStatusUpdate = ({ branchId, orderId, getTickets }: { branchId: any, orderId: any, getTickets: any }) => {

  const userDetails = useSelector((state: any) => state.user);
  const token = userDetails?.userData?.token;

  const updateOrderStatus = async (status: string) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    //     url: https://troox-backend-new.vercel.app/api/order/updateBranchOrder/

    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/order/updateBranchOrder/`,
        {
          branch_id: branchId,
          order_id: orderId,
          status: status,
        },
        headers
      );
      console.log(response.data);
      getTickets();
      toast.success(response.data.message || "Order Updated successfully");
    } catch (error) {
      toast.error("Error updating order");
    }
  }

  return (
    <ul className="w-[200px] shadow grid gap-[18px] dropdown-menu absolute bg-white p-[12px] text-black right-[25px] top-[40px] z-10">
      <li
        onClick={() => updateOrderStatus("completed")}
        className="font-[400] cursor-pointer text-left"
      >
        Complete Order
      </li>
      <li
        onClick={() => updateOrderStatus("cancelled")}
        className="font-[400] cursor-pointer text-left"
      >
        Cancel Order
      </li>
    </ul>
  );
};
