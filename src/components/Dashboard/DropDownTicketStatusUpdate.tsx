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
export const DropdownMenuTicketStatusUpdate = ({ branchId, orderId, getTickets, setOrderId, toggleOff, handleRefundData }: { branchId: any, orderId: any, getTickets: any, setOrderId?: any, toggleOff?: any, handleRefundData?: any }) => {

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

    //     url: https://troox-backend-new.vercel.app/api/order/updateBranchOrder/
    // /order/updateGoGrubBranchOrder/
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
      window.location.reload();
    } catch (error) {
      toast.error("Error updating order");
    }
  }

  // refund order process
  // const [refundOrder, setRefundOrder] = useState<any>(false);

  // const { orderData } = useSelector((state: RootState) => state.tickets);
  // const [order, setOrder] = useState<any | null>(null);

  // const handleRefundData = (id: any) => {
  //   const rd = orderData?.find((item: any) => item._id === id);
  //   setOrder(rd);
  //   setRefundOrder(!refundOrder);
  // }

  // const handleCancelRefundData = () => {
  //   setOrder(null);
  //   setRefundOrder(!refundOrder);
  //   toggleOff && toggleOff();
  // }


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
          onClick={() => { handleRefundData(orderId) }}
          className="font-[400] cursor-pointer text-left text-red-500"
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



export const DropdownMenuHistorStatusUpdate = ({ orderId, setOrderId, toggleOff, handleRefundData }: { orderId: any, setOrderId?: any, toggleOff?: any, handleRefundData?: any }) => {



  return (
    <div>
      <ul className="w-[200px] shadow grid gap-[18px] dropdown-menu absolute bg-white p-[12px] text-black right-[25px] top-8 z-10">
        <li
          onClick={() => { setOrderId && setOrderId(orderId); toggleOff && toggleOff(); }}
          className="font-[400] cursor-pointer text-left"
        >
          View Order
        </li>

        <li
          onClick={() => { handleRefundData(orderId); toggleOff && toggleOff(); }}
          className="font-[400] cursor-pointer text-left text-red-500"
        >
          Refund Order
        </li>
      </ul>

    </div>
  );
};
