import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import More from "../../assets/more_vert.svg";
import Refresh from "../../assets/refresh.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeBranchForTicket from "./ChangeBranchForTicket";
import { truncateText } from "../../utils/truncateText";
import { AppDispatch, RootState } from "@/src/store/store";
import { DropdownMenuTicketStatusUpdate } from "./DropDownTicketStatusUpdate";
import { fetchTickets } from "../../slices/ticketsSlice";

const Tickets = () => {
  const { selectedBranch } = useSelector((state: any) => state.branches);
  const { orderData, loadingOrder } = useSelector((state: RootState) => state.tickets);
  const [openTicket, setOpenTicket] = useState<boolean>(false); // to open ticket details modal

  console.log("Selected Branch:", selectedBranch);
  console.log("Order Data:", orderData);

  const [activeMenuIndex2, setActiveMenuIndex2] = useState<number | null>(null);

  const handleTicketMenu = () => {
    setOpenTicket(!openTicket);
  };

  const toggleMenu2 = (index: number) => {
    setActiveMenuIndex2((prevIndex) => (prevIndex === index ? null : index));
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTickets({ selectedBranch }));
  }, [dispatch, selectedBranch]);

  const handleRefresh = () => {
    dispatch(fetchTickets({ selectedBranch }));
  };

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Tickets" />
        <div className="">
          <div className="mt-[40px]">
            <ChangeBranchForTicket handleRefresh={handleRefresh} />
            <div className="flex items-center justify-between">
              <div className="border border-purple500 bg-white w-[196px] rounded-[5px] px-[16px] py-[10px] font-[500] text-purple500">
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

              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">                  Tickets                </p>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-7 border-b">
                  <p className=" text-[14px] text-[#121212]">Date</p>
                  <p className=" text-[14px] text-[#121212]">Time</p>
                  <p className=" text-[14px] text-[#121212]">Order No</p>
                  <p className=" text-[14px] text-[#121212]">Customer </p>
                  <p className=" text-[14px] text-[#121212]">Status </p>
                  <p className=" text-[14px] text-[#121212]">Bill</p>
                  <p className=" text-[14px] text-[#121212]">Actions </p>
                </div>
                {loadingOrder ? (
                  <p className="px-8">Loading...</p>
                ) : orderData.length === 0 ? (
                  <p className="px-8">No order available</p>
                ) : (
                  orderData.map((item, index) => (
                    <div
                      className={`text-center py-[14px] px-[32px] grid grid-cols-7 items-center font-base text-normal text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                        }`}
                      key={index}
                    >
                      <p className="" onClick={handleTicketMenu}>
                        {item.createdAt.slice(0, 10)}
                      </p>
                      <p className="" onClick={handleTicketMenu}>
                        {item.createdAt.slice(11, 16)}
                      </p>
                      <p onClick={handleTicketMenu}>
                        {item.order_number || "-"}
                      </p>
                      <p                      >
                        {item.customer_name
                          ? truncateText(
                            item.customer_name.charAt(0).toUpperCase() +
                            item.customer_name.slice(1),
                            10
                          )
                          : ""}
                      </p>
                      <div className="mx-auto w-fit">
                        <div className="flex items-center gap-[10px]">
                          {item.status?.toLowerCase() === "cancelled" ?
                            <div className="w-[12px] h-[12px] rounded-full bg-red-600" />
                            : item.status?.toLowerCase() === "completed" ?
                              <div className="w-[12px] h-[12px] rounded-full bg-green-600" />
                              :
                              <div className="w-[12px] h-[12px] rounded-full bg-orange-600" />
                          }
                          <p>{item.status === "Ordered" ? "Pending" : item.status}</p>
                        </div>
                      </div>
                      <p>&#x20A6;{item.total_price.toLocaleString()}</p>
                      <div className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                        <div
                          className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                          onClick={() => toggleMenu2(index)}
                        >
                          <>
                            {item.status?.toLowerCase() === "cancelled" || item.status?.toLowerCase() === "completed" ? null :
                              <img src={More} alt="" className="w-[5px]" />
                            }
                          </>
                        </div>
                        {activeMenuIndex2 === index && (
                          <DropdownMenuTicketStatusUpdate
                            getTickets={fetchTickets}
                            branchId={selectedBranch.id}
                            orderId={item._id}
                          />

                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* <RefundMenu
                refundMenu={refundMenu}
                handleRefundMenu={handleRefundMenu}
                refundType={refundType}
                setRefundType={setRefundType}
                openInput={openInput}
                setOpenInput={setOpenInput}
                refundAmount={refundAmount}
                setRefundAmount={setRefundAmount}
                setRefundMenu={setRefundMenu}
              /> */}

              {/* <VacateTableModal
                vacateTableMenu={vacateTableMenu}
                handleVacateTableMenu={handleVacateTableMenu}
                setVacateTableMenu={setVacateTableMenu}
              /> */}

              {/* <OpenTicketModal
                openTicket={openTicket}
                handleTicketMenu={handleTicketMenu}
                setOpenTicket={setOpenTicket}
                data={data}
                openTicketData={openTicketData}
              /> */}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Tickets;


//  {userData?.onboarding_type !== "gogrub" && (
//               <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
//                 <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
//                   Tickets
//                 </p>

//                 <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-7 border-b">
//                   <p className=" text-[14px] text-[#121212]">Date</p>
//                   <p className=" text-[14px] text-[#121212]">Time</p>
//                   <p className=" text-[14px] text-[#121212]">Order No</p>
//                   <p className=" text-[14px] text-[#121212]">Customer </p>
//                   <p className=" text-[14px] text-[#121212]">Status </p>
//                   <p className=" text-[14px] text-[#121212]">Bill </p>
//                   <p className=" text-[14px] text-[#121212]">Actions </p>
//                 </div>
//                 {isLoading ? (
//                   <p className="px-8">Loading...</p>
//                 ) : orderData.length === 0 ? (
//                   <p className="px-8">No order available</p>
//                 ) : (
//                   orderData.map((item, index) => (
//                     <div
//                       className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-7 items-center  font-base text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
//                         }`}
//                       key={index}
//                     >
//                       <p className="" onClick={handleTicketMenu}>
//                         {item.createdAt.slice(0, 10)}
//                       </p>
//                       <p className="" onClick={handleTicketMenu}>
//                         {item.createdAt.slice(11, 16)}
//                       </p>
//                       <p onClick={handleTicketMenu}>
//                         {item.order_number || "-"}
//                       </p>
//                       <p onClick={handleTicketMenu}>
//                         {item.customer_name
//                           ? truncateText(
//                             item.customer_name.charAt(0).toUpperCase() +
//                             item.customer_name.slice(1),
//                             10
//                           )
//                           : ""}
//                       </p>
//                       <div className="flex items-center justify-center gap-[10px]">
//                         {item.status?.toLowerCase() === "cancelled" && (
//                           <img
//                             src={red}
//                             alt=""
//                             className="w-[12px] h-[12px]"
//                           />
//                         )}
//                         {item.status === "Ordered" && (
//                           <img
//                             src={red}
//                             alt=""
//                             className="w-[12px] h-[12px]"
//                           />
//                         )}
//                         {item.status === "Served" && (
//                           <img
//                             src={green}
//                             alt=""
//                             className="w-[12px] h-[12px]"
//                           />
//                         )}
//                         {item.status === "Ready" && (
//                           <img
//                             src={orange}
//                             alt=""
//                             className="w-[12px] h-[12px]"
//                           />
//                         )}
//                         {item.status === "Pending" && (
//                           <img
//                             src={orange}
//                             alt=""
//                             className="w-[12px] h-[12px]"
//                           />
//                         )}
//                         <p className="capitalize">{item.status}</p>
//                       </div>
//                       <p>&#x20A6;{item.total_price.toLocaleString()}</p>
//                       <div className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
//                         <div
//                           className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
//                           onClick={() => toggleMenu(index)}
//                         >
//                           <img
//                             src={More}
//                             alt="More Options"
//                             className="w-[5px]"
//                           />
//                         </div>
//                         {activeMenuIndex === index && (
//                           <DropdownMenu
//                             handleVoidOrderMenu={() => handleVoidOrderMenu()}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}

//             {activeMenuIndex !== null ? (
//               <VoidOrderMenu
//                 voidOrderMenu={voidOrderMenu}
//                 handleVoidOrderMenu={handleVoidOrderMenu}
//                 setVoidOrderMenu={setVoidOrderMenu}
//                 handleVoidOrder={handleVoidOrder}
//               />
//             ) : (
//               <VoidOrderMenu
//                 voidOrderMenu={voidOrderMenu}
//                 handleVoidOrderMenu={handleVoidOrderMenu}
//                 setVoidOrderMenu={setVoidOrderMenu}
//                 handleVoidOrder={handleVoidOrder2}
//               />
//             )}