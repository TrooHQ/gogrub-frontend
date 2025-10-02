// import { SERVER_DOMAIN } from "@/src/Api/Api";
import { AppDispatch, } from "@/src/store/store";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import RefundModal from "./RefundModal";
// import { useState } from "react";

// export const DropdownMenuTicketStatusUpdate = ({}: {}) => {
export const DropdownMenuTicketStatusUpdate = ({ branchId, orderId, getTickets, setOrderId, toggleOff, handleRefundData, hasRefunded }: { branchId: any, orderId: any, getTickets: any, setOrderId?: any, toggleOff?: any, handleRefundData?: any, hasRefunded?: boolean }) => {

  const userDetails = useSelector((state: any) => state.user);
  const token = userDetails?.userData?.token;

  const dispatch = useDispatch<AppDispatch>();

  const updateOrderStatus = async (status: string) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/order/updateGoGrubBranchOrder/`,
        {
          branch_id: branchId,
          order_id: orderId,
          status: status,
        },
        headers
      );
      // console.log(response.data);
      dispatch(getTickets({ selectedBranch: { id: branchId } }));
      toast.success(response.data.message || "Order Updated successfully");
      // window.location.reload();
    } catch (error) {
      toast.error("Error updating order");
    }
  }

  console.log("hasRefunded", hasRefunded);

  return (
    <div>
      <ul className="w-[200px] shadow grid gap-[18px] dropdown-menu absolute bg-white p-[12px] text-black right-[25px] top-[40px] z-10">
        <li
          onClick={() => { setOrderId && setOrderId(orderId); toggleOff && toggleOff(); }}
          className="font-[400] cursor-pointer text-left"
        >
          View Order
        </li>
        <li
          onClick={() => { updateOrderStatus("completed"); toggleOff && toggleOff(); }}
          className="font-[400] cursor-pointer text-left"
        >
          Complete Order
        </li>
        <li
          onClick={() => { hasRefunded !== true && handleRefundData(orderId) }}
          className={`font-[400] text-left  ${hasRefunded !== true ? "text-red-500  cursor-pointer" : "text-gray-300 cursor-not-allowed"}`}
        >
          Refund Order
        </li>
      </ul>

      {/* {order && <RefundModal
        cancelVoidOrder={handleCancelRefundData}
        voidOrderItem={order}
      />} */}
    </div>
  );
};

// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
// ***************************************************************************



export const DropdownMenuHistorStatusUpdate = ({ orderId, setOrderId, toggleOff, handleRefundData, hasRefunded }: { orderId: any, setOrderId?: any, toggleOff?: any, handleRefundData?: any, hasRefunded?: boolean }) => {

  console.log("hasRefunded", hasRefunded);

  return (
    <div>
      <ul className="w-[200px] shadow grid gap-[18px] dropdown-menu absolute bg-white p-[12px] text-black right-[25px] top-8 z-10">
        <li
          onClick={() => { setOrderId && setOrderId(orderId); toggleOff && toggleOff(); }}
          className="font-[400] cursor-pointer text-left"
        >
          View Order
        </li>

        {/* // onClick={() => { handleRefundData(orderId); toggleOff && toggleOff(); }} */}
        <li
          onClick={() => { hasRefunded !== true && handleRefundData(orderId); toggleOff && toggleOff(); }}
          className={`font-[400] text-left  ${hasRefunded !== true ? "text-red-500  cursor-pointer" : "text-gray-300 cursor-not-allowed"}`}
        >
          Refund Order
        </li>
      </ul>

    </div>
  );
};
