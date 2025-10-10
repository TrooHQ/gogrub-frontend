import DashboardLayout from "./DashboardLayout";
// import TopMenuNav from "./TopMenuNav";
// import More from "../../assets/more_vert.svg";
import Refresh from "../../assets/refresh.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ChangeBranchForTicket from "./ChangeBranchForTicket";
import { truncateText } from "../../utils/truncateText";
import { AppDispatch, RootState } from "@/src/store/store";
import { DropdownMenuTicketStatusUpdate } from "./DropDownTicketStatusUpdate";
import { fetchTickets } from "../../slices/ticketsSlice";
import ViewOrderModal from "./OrderModal";
import PaginationComponent from "./PaginationComponent";
import { HiOutlineDotsVertical } from "react-icons/hi";
import RefundModal from "./RefundModal";

const Tickets = () => {

  useEffect(() => {
    document.title = "View and Manage All Incoming Order Tickets in Real Time"
  }, [])


  const { selectedBranch } = useSelector((state: any) => state.branches);
  const { orderData, loadingOrder, orderDataPagination } = useSelector((state: RootState) => state.tickets);
  // const [openTicket, setOpenTicket] = useState<boolean>(false); // to open ticket details modal
  const [page, setPage] = useState(1);

  // console.log("orderDataPagination:", orderDataPagination);
  // console.log("Order Data:", orderData);

  // const [activeMenuIndex2, setActiveMenuIndex2] = useState<number | null>(null);

  // const handleTicketMenu = () => {
  //   setOpenTicket(!openTicket);
  // };

  // const toggleMenu2 = (index: number) => {
  //   setActiveMenuIndex2((prevIndex) => (prevIndex === index ? null : index));
  // };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTickets({ selectedBranch, page }));
  }, [dispatch, selectedBranch, page]);

  const handleRefresh = () => {
    dispatch(fetchTickets({ selectedBranch, page }));
  };

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [SingleOrderItem, setSingleOrderItem] = useState({});

  useEffect(() => {
    if (orderId) {

      const order = orderData?.find((order: any) => order._id === orderId);
      console.log("Order:", order);
      setSingleOrderItem(order)

      setOrderModal(true);
    } else {
      setOrderModal(false);
    }
  }, [orderId, orderData])


  // refund order process
  const [showMenuOptions, setShowMenuOptions] = useState<number | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const [refundOrder, setRefundOrder] = useState<any | null>(null);

  const handleShowMenu = (index: number) => {
    setShowMenuOptions((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleRefundData = (id: any) => {
    const rd = orderData?.find((item: any) => item._id === id);
    setRefundOrder(rd);
    setShowRefundModal(!showRefundModal);
    // setOrder(rd);
    // setRefundOrder(!refundOrder);
  }

  const handleCancelRefundData = () => {
    setRefundOrder(null);
    setShowRefundModal(!showRefundModal);
  }

  return (
    <div>
      <DashboardLayout title="Tickets">
        {/* <TopMenuNav pathName="Tickets" /> */}
        <div className="">
          <div className="mt-[40px]">
            {/* <ChangeBranchForTicket handleRefresh={handleRefresh} /> */}
            <div className="flex items-center justify-between">
              <div className="border border-black bg-white w-[196px] rounded-[5px] px-[16px] py-[10px] font-[500] text-gray-500">
                <button
                  onClick={handleRefresh}
                  className="text-[16px] flex items-center gap-[8px]"
                >
                  <img src={Refresh} alt="" />
                  {loadingOrder ? "Fetching..." : "Refresh Tickets"}
                </button>
              </div>
            </div>

            <div className="">

              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px] overflow-x-scroll">
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">Tickets</p>

                <div className="w-full overflow-x-auto">
                  <table className="min-w-[700px] w-full mt-[24px] table-auto">
                    <thead>
                      <tr className="h-[1px]">
                        <th className="py-2 border-b border-b-grey100">Date</th>
                        <th className="py-2 border-b border-b-grey100">Time</th>
                        <th className="py-2 border-b border-b-grey100">Order No</th>
                        <th className="py-2 border-b border-b-grey100">Customer</th>
                        <th className="py-2 border-b border-b-grey100">Status</th>
                        <th className="py-2 border-b border-b-grey100">Bill</th>
                        <th className="py-2 border-b border-b-grey100">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loadingOrder ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center">Loading...</td>
                        </tr>
                      ) : orderData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center">No order available</td>
                        </tr>
                      ) : (
                        orderData.map((item, index) => (
                          <tr
                            key={index}
                            className={`relative text-center py-[14px] px-[32px] items-center font-base text-normal text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                              }`}
                          >
                            <td className="py-4">{item.createdAt.slice(0, 10)}</td>
                            <td className="py-4">{item.createdAt.slice(11, 16)}</td>
                            <td className="py-4">{item.order_number || "-"}</td>
                            <td className="py-4">
                              {item.customer_name
                                ? truncateText(
                                  item.customer_name.charAt(0).toUpperCase() + item.customer_name.slice(1),
                                  10
                                )
                                : ""}
                            </td>
                            <td className="flex justify-center py-4">
                              <span className="flex items-center gap-[10px] bg-orange-500 text-orange-100 px-[10px] py-[5px] rounded-full text-sm">
                                {item.status === "Ordered" ? "Pending" : item.status}
                              </span>
                            </td>
                            <td className="py-4">&#x20A6;{item.total_price.toLocaleString()}</td>
                            <td className="py-4">
                              <HiOutlineDotsVertical
                                onClick={() => handleShowMenu(index)}
                                className="mx-auto text-2xl"
                              />
                              {showMenuOptions === index && (
                                <DropdownMenuTicketStatusUpdate
                                  getTickets={fetchTickets}
                                  branchId={selectedBranch.id}
                                  orderId={item._id}
                                  setOrderId={setOrderId}
                                  hasRefunded={item?.isRefunded}
                                  toggleOff={() => setShowMenuOptions(null)}
                                  handleRefundData={handleRefundData}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-center w-full my-4">
                  <PaginationComponent setPage={setPage} pagination={orderDataPagination} />
                </div>
              </div>
            </div>
          </div>
          {refundOrder && <RefundModal
            getTickets={() => dispatch(fetchTickets({ selectedBranch, page }))}
            cancelVoidOrder={handleCancelRefundData}
            voidOrderItem={refundOrder}
          />}
          {orderModal && <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/40">
            <ViewOrderModal
              setOrderId={setOrderId}
              SingleOrderItem={SingleOrderItem}
            />
          </div>}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Tickets;