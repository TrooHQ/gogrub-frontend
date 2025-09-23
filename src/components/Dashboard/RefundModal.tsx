// import Modal from "../../Modal";
// import Close from "../../../assets/closeIcon.svg";
import { FormControlLabel, Switch } from "@mui/material";
import { useState, useEffect } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { CloseRounded } from "@mui/icons-material";



type refundModalProps = {
  voidOrderItem?: any;
  cancelVoidOrder: () => void;
  getTickets?: () => void;
};

const RefundModal = ({
  voidOrderItem,
  cancelVoidOrder,
  getTickets
}: refundModalProps) => {



  useEffect(() => {
    setRefundAmount(voidOrderItem?.total_price);
  }, [voidOrderItem])

  const [refundStatus, setRefundStatus] = useState<boolean>(true);
  const [refundAmount, setRefundAmount] = useState<number>(voidOrderItem?.total_price);
  const [isValidRefund, setIsValidRefund] = useState<boolean>(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const handleToggleRefund = (value: boolean) => {
    setRefundStatus(value);
    if (value) {
      setRefundAmount(voidOrderItem?.total_price);
      setIsValidRefund(true);
    } else {
      setRefundAmount(0);
    }
  };

  const handleRefundAmount = (am: string) => {
    const amount = Number(am);

    if (amount) {
      setRefundAmount(amount)

      if (amount > voidOrderItem?.total_price) {
        setIsValidRefund(false)
      }
    }
  }

  const handleRefund = async () => {

    const payload = {
      "orderId": voidOrderItem?._id,
      "transactionRef": voidOrderItem?.transactionRef,
      "amount": refundAmount
    }

    // order/refundOrderAmount/
    try {
      // setIsLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/order/refundOrderAmount`,
        payload
      );

      toast.success("Refund successful");
      console.log("response", response);
      getTickets && getTickets()
      // setVoidOrderMenu(false)
      cancelVoidOrder();
      setShowConfirmationModal(false)
    } catch (error) {
      toast.error("Error refunding order");
      console.error("Error refunding order:", error);
    } finally {
      // setIsLoading(false);
      console.log("Refund process completed");
    }

  }



  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full min-h-screen bg-black/40 ">
      <div className=" p-5  bg-white relative rounded-[20px]  w-[539px]">
        <div
          className="flex items-center justify-end cursor-pointer"
          onClick={cancelVoidOrder}
        >
          <CloseRounded className='text-black cursor-pointer fill-black' />
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-[24px] font-[500] text-black">Refund Order</p>

          <div className="w-full">

            <div className="w-full p-4 bg-gray-100 rounded-md">

              <div className="flex items-center justify-between w-full py-2 border-b border-gray-500">
                <h4>Order No:</h4>
                <h4 className="font-semibold" >#{voidOrderItem?.order_number}</h4>
              </div>

              <div className="flex items-center justify-between w-full py-2 border-b border-gray-500">
                <h4>Order Type:</h4>
                <h4 className="capitalize">{voidOrderItem?.order_type ?? "-"}</h4>
              </div>

              <div className="flex items-center justify-between w-full py-2 border-b border-gray-500">
                <h4>Payment Method:</h4>
                <h4 className="capitalize">{voidOrderItem?.paymentMethod ?? "-"}</h4>
              </div>

              <div className="flex items-center justify-between w-full py-2 border-b border-gray-500">
                <h4>Customer:</h4>
                <h4>{voidOrderItem?.customer_name}</h4>
              </div>

              <div className="flex items-center justify-between w-full py-2 border-b border-gray-500">
                <h4>Status:</h4>
                <h4>{voidOrderItem?.status}</h4>
              </div>

              <div className="flex items-center justify-between w-full py-2">
                <h4>Total Amount:</h4>
                <h4>{voidOrderItem?.total_price}</h4>
              </div>

              <div className="p-4 mt-4 border border-gray-300 rounded-md ">
                <FormControlLabel
                  control={
                    <Switch
                      checked={refundStatus}
                      onChange={(e) => handleToggleRefund(e.target.checked)}
                      // onChange={(e) => setRefundStatus(e.target.checked)}
                      name="refundStatus"
                    />
                  }
                  label={refundStatus ? "Refund All" : "Partial Refund"}
                />
                <div className="w-full">
                  <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter refund amount" disabled={refundStatus} onChange={(e) => handleRefundAmount(e.target.value)} value={refundAmount} />
                  {!isValidRefund && <span className="text-red-500">Refund amount exceeds actual price</span>}
                </div>
              </div>

            </div>


            <div className="flex items-center justify-center gap-4 mt-5">

              <button className="font-[500] text-[16px] text-black cursor-pointer border-black rounded px-[24px]  py-[10px] border w-full"
                onClick={cancelVoidOrder}                >Cancel                </button>

              <button onClick={() => setShowConfirmationModal(true)} className=" text-[16px] border border-black bg-black rounded px-[24px]  py-[10px] font-[500] text-[#ffffff] w-full" disabled={!isValidRefund}>                  Refund                </button>
            </div>
          </div>
        </div>
      </div>
      {/* </Modal> */}
      {showConfirmationModal && <RefundConfirmation setShowConfirmationModal={setShowConfirmationModal} confirmRefund={handleRefund} />}
    </div>
  );
};

export default RefundModal;


const RefundConfirmation = ({ setShowConfirmationModal, confirmRefund }: any) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full min-h-screen bg-black/40 ">
      <div className="w-[539px] p-6 px-10 bg-gray-100 rounded-md ">
        <div className="px-10">
          <h4 className="my-6 text-2xl font-semibold">Are you sure you want to refund this order?</h4>
          <div className="flex items-center justify-between w-full gap-6 py-4 border-t border-gray-500">
            <button className="font-[500] text-sm text-black cursor-pointer border-black rounded px-[24px]  py-[10px] border w-full" onClick={() => setShowConfirmationModal(false)}>No</button>
            <button className=" text-sm border border-black bg-black rounded px-[24px]  py-[10px] font-[500] text-[#ffffff] w-full" onClick={confirmRefund}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
}