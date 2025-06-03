import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import red from "../../assets/red.svg";
import orange from "../../assets/orange.svg";
import green from "../../assets/green.svg";
import More from "../../assets/more_vert.svg";
import Refresh from "../../assets/refresh.svg";
import { useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import OpenTicketModal from "./ticketComponents/OpenTicketModal";
import VacateTableModal from "./ticketComponents/VacateTableModal";
import RefundMenu from "./ticketComponents/RefundMenu";
import VoidOrderMenu from "./ticketComponents/VoidOrderMenu";
import { useSelector } from "react-redux";
import { DropdownMenu } from "./DropdownMenuOpenTickets";
// import { DropdownMenuClosedTickets } from "./DropdownMenuClosedTickets";
import ChangeBranchForTicket from "./ChangeBranchForTicket";
import { truncateText } from "../../utils/truncateText";
import { RootState } from "@/src/store/store";
import { DropdownMenuTicketStatusUpdate } from "./DropDownTicketStatusUpdate";

const Tickets = () => {
  const { selectedBranch } = useSelector((state: any) => state.branches);
  console.log(selectedBranch);
  const [voidOrderMenu, setVoidOrderMenu] = useState<boolean>(false);
  const [refundMenu, setRefundMenu] = useState<boolean>(false);
  const [vacateTableMenu, setVacateTableMenu] = useState<boolean>(false);
  const [openTicket, setOpenTicket] = useState<boolean>(false); // to open ticket details modal
  const [data, setData] = useState<any[]>([]);
  const [closedData, setClosedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userDetails = useSelector((state: any) => state.user);
  const { userData } = useSelector((state: RootState) => state.user);

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [refundType, setRefundType] = useState<string>("");
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [activeMenuIndex2, setActiveMenuIndex2] = useState<number | null>(null);

  const token = userDetails?.userData?.token;

  const handleVoidOrderMenu = () => {
    setVoidOrderMenu(!voidOrderMenu);
  };
  const handleRefundMenu = () => {
    setRefundMenu(!refundMenu);
  };
  const handleVacateTableMenu = () => {
    setVacateTableMenu(!vacateTableMenu);
  };
  const handleTicketMenu = () => {
    setOpenTicket(!openTicket);
  };
  const [openTicketData, setopenTicketData] = useState<any>();
  const handleTicketMenu2 = (item: any) => {
    setOpenTicket(!openTicket);
    setopenTicketData(item);
  };

  const toggleMenu = (index: number) => {
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleMenu2 = (index: number) => {
    setActiveMenuIndex2((prevIndex) => (prevIndex === index ? null : index));
  };

  const getTickets = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setIsLoading(true);
      const response = await axios.get(
        // `${SERVER_DOMAIN}/order/getOpenTickets/?branch_id=${selectedBranch.id}`,
        `${SERVER_DOMAIN}/order/getOrderbyType/?branch_id=${selectedBranch.id}&queryType=ticket`,
        headers
      );
      // console.log(response.data);
      setData(response.data.data);
      // toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
    } finally {
      setIsLoading(false);
    }
  };
  // const getTickets = async () => {
  //   const headers = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get(
  //       `${SERVER_DOMAIN}/order/getOpenTickets/?branch_id=${selectedBranch.id}`,
  //       headers
  //     );
  //     console.log(response.data);
  //     setData(response.data.data);
  //     // toast.success(response.data.message || "Successful");
  //   } catch (error) {
  //     toast.error("Error retrieving tickets");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getClosedTickets = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getClosedTickets/?branch_id=${selectedBranch.id}`,
        headers
      );
      console.log(response.data);
      setClosedData(response.data.data);
      // toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
    getClosedTickets();
  }, [selectedBranch]);

  const handleVoidOrder = async () => {
    if (activeMenuIndex === null) {
      toast.error("No active menu selected");
      return;
    }

    console.log(data[activeMenuIndex], "pppp");

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/order/updateBranchOrder/`,
        {
          branch_id: selectedBranch.id,
          order_id: data[activeMenuIndex]._id,
          status: "cancel",
        },
        headers
      );
      console.log(response.data);
      getTickets();
      setVoidOrderMenu(false);
      setActiveMenuIndex(null);
      toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error voiding order");
    }
  };

  const handleVoidOrder2 = async () => {
    if (activeMenuIndex2 === null) {
      toast.error("No active menu selected");
      return;
    }

    console.log(data[activeMenuIndex2], "pppp");

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/order/updateBranchOrder/`,
        {
          branch_id: selectedBranch.id,
          order_id: data[activeMenuIndex2]._id,
          status: "cancel",
        },
        headers
      );
      console.log(response.data);
      getTickets();
      // getClosedTickets();
      setVoidOrderMenu(false);
      toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error voiding order");
    }
  };

  const handleRefresh = () => {
    getTickets();
    // getClosedTickets();
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
                  {isLoading ? "Fetching..." : "Refresh Tickets"}
                </button>
              </div>
            </div>

            <div className="">
              {userData?.onboarding_type !== "gogrub" && (
                <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                  <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                    Open tickets
                  </p>

                  <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-10 border-b">
                    <p className=" text-[14px] text-[#121212]">Date</p>
                    <p className=" text-[14px] text-[#121212]">Time</p>
                    {/* <p className=" text-[14px] text-[#121212]">Table No</p> */}
                    <p className=" text-[14px] text-[#121212]">Order No</p>
                    <p className=" text-[14px] text-[#121212]">Customer </p>
                    {/* <p className=" text-[14px] text-[#121212]">Waiter </p> */}
                    {/* <p className=" text-[14px] text-[#121212]">Channel </p> */}
                    <p className=" text-[14px] text-[#121212]">Status </p>
                    <p className=" text-[14px] text-[#121212]">Bill </p>
                    <p className=" text-[14px] text-[#121212]">Actions </p>
                  </div>
                  {isLoading ? (
                    <p className="px-8">Loading...</p>
                  ) : data.length === 0 ? (
                    <p className="px-8">No order available</p>
                  ) : (
                    data.map((item, index) => (
                      <div
                        className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-10 items-center  font-base text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                          }`}
                        key={index}
                      >
                        <p className=" " onClick={handleTicketMenu}>
                          {item.createdAt.slice(0, 10)}
                        </p>
                        <p className=" " onClick={handleTicketMenu}>
                          {item.createdAt.slice(11, 16)}
                        </p>
                        {/* <p onClick={handleTicketMenu}>
                          {item.table_number || "-"}
                        </p> */}
                        <p onClick={handleTicketMenu}>
                          {item.order_number || "-"}
                        </p>

                        {/* <p onClick={handleTicketMenu}>{item.date}</p> */}

                        <p onClick={handleTicketMenu}>
                          {item.customer_name
                            ? truncateText(
                              item.customer_name.charAt(0).toUpperCase() +
                              item.customer_name.slice(1),
                              10
                            )
                            : ""}
                        </p>
                        {/* <p>{item.waiter || "-"}</p> */}
                        {/* <p>{item.channel || ""}</p> */}
                        <div className="flex items-center justify-center gap-[10px]">
                          {item.status?.toLowerCase() === "cancelled" && (
                            <img
                              src={red}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Ordered" && (
                            <img
                              src={red}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Served" && (
                            <img
                              src={green}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Ready" && (
                            <img
                              src={orange}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Pending" && (
                            <img
                              src={orange}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          <p className="capitalize">{item.status}</p>
                        </div>
                        <p>&#x20A6;{item.total_price.toLocaleString()}</p>
                        <div className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                          <div
                            className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                            onClick={() => toggleMenu(index)}
                          >
                            <img
                              src={More}
                              alt="More Options"
                              className="w-[5px]"
                            />
                          </div>
                          {activeMenuIndex === index && (
                            <DropdownMenu
                              handleVoidOrderMenu={() => handleVoidOrderMenu()}
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeMenuIndex !== null ? (
                <VoidOrderMenu
                  voidOrderMenu={voidOrderMenu}
                  handleVoidOrderMenu={handleVoidOrderMenu}
                  setVoidOrderMenu={setVoidOrderMenu}
                  handleVoidOrder={handleVoidOrder}
                />
              ) : (
                <VoidOrderMenu
                  voidOrderMenu={voidOrderMenu}
                  handleVoidOrderMenu={handleVoidOrderMenu}
                  setVoidOrderMenu={setVoidOrderMenu}
                  handleVoidOrder={handleVoidOrder2}
                />
              )}

              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                  {userData?.onboarding_type !== "gogrub"
                    ? " Closed tickets"
                    : "Tickets"}
                </p>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-7 border-b">
                  <p className=" text-[14px] text-[#121212]">Date</p>
                  <p className=" text-[14px] text-[#121212]">Time</p>
                  {/* <p className=" text-[14px] text-[#121212]">Table No</p> */}
                  <p className=" text-[14px] text-[#121212]">Order No</p>
                  <p className=" text-[14px] text-[#121212]">Customer </p>
                  {/* <p className=" text-[14px] text-[#121212]">Waiter </p> */}
                  {/* <p className=" text-[14px] text-[#121212]">Channel </p> */}
                  <p className=" text-[14px] text-[#121212]">Status </p>
                  <p className=" text-[14px] text-[#121212]">Bill</p>
                  <p className=" text-[14px] text-[#121212]">Actions </p>
                </div>
                {isLoading ? (
                  <p className="px-8">Loading...</p>
                ) : closedData.length === 0 ? (
                  <p className="px-8">No order available</p>
                ) : (
                  closedData.map((item, index) => (
                    <div
                      className={`text-center py-[14px] px-[32px] grid grid-cols-7 items-center font-base text-normal text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                        }`}
                      key={index}
                    >
                      <p className=" " onClick={handleTicketMenu}>
                        {item.createdAt.slice(0, 10)}
                      </p>
                      <p className=" " onClick={handleTicketMenu}>
                        {item.createdAt.slice(11, 16)}
                      </p>
                      {/* <p onClick={handleTicketMenu}>
                        {item.table_number || "-"}
                      </p> */}
                      <p onClick={handleTicketMenu}>
                        {item.order_number || "-"}
                      </p>
                      <p
                        onClick={() => handleTicketMenu2(item)}
                        className="cursor-pointer"
                      >
                        {item.customer_name
                          ? truncateText(
                            item.customer_name.charAt(0).toUpperCase() +
                            item.customer_name.slice(1),
                            10
                          )
                          : ""}
                      </p>
                      {/* <p>{item.waiter || "-"}</p> */}
                      {/* <p>{item.channel || ""}</p> */}
                      <div className="flex items-center justify-center gap-[10px]">
                        {item.status?.toLowerCase() === "cancelled" ?
                          <div className="w-[12px] h-[12px] rounded-full bg-red-600" />
                          : item.status?.toLowerCase() === "completed" ?
                            <div className="w-[12px] h-[12px] rounded-full bg-green-600" />
                            :
                            <div className="w-[12px] h-[12px] rounded-full bg-orange-600" />
                        }
                        {/* <div className="w-[12px] h-[12px] rounded-full bg-orange-500" /> */}
                        <p>{item.status === "Ordered" ? "Pending" : item.status}</p>
                      </div>
                      <p>&#x20A6;{item.total_price.toLocaleString()}</p>
                      <p className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                        <div
                          className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                          onClick={() => toggleMenu2(index)}
                        >
                          <img src={More} alt="" className="w-[5px]" />
                        </div>
                        {activeMenuIndex2 === index && (
                          <DropdownMenuTicketStatusUpdate
                            getTickets={getTickets}
                            branchId={selectedBranch.id}
                            orderId={item._id}
                          />
                          // <DropdownMenuClosedTickets
                          //   handleVoidOrderMenu={() => handleVoidOrderMenu()}
                          //   handleVacateTableMenu={() => handleVacateTableMenu()}
                          //   handleRefundMenu={() => handleRefundMenu()}
                          // />
                        )}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <RefundMenu
                refundMenu={refundMenu}
                handleRefundMenu={handleRefundMenu}
                refundType={refundType}
                setRefundType={setRefundType}
                openInput={openInput}
                setOpenInput={setOpenInput}
                refundAmount={refundAmount}
                setRefundAmount={setRefundAmount}
                setRefundMenu={setRefundMenu}
              />

              <VacateTableModal
                vacateTableMenu={vacateTableMenu}
                handleVacateTableMenu={handleVacateTableMenu}
                setVacateTableMenu={setVacateTableMenu}
              />

              <OpenTicketModal
                openTicket={openTicket}
                handleTicketMenu={handleTicketMenu}
                setOpenTicket={setOpenTicket}
                data={data}
                openTicketData={openTicketData}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Tickets;
