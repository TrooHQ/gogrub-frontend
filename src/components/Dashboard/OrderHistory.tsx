import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { SetStateAction, useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import ChangeBranchForTicket from "./ChangeBranchForTicket";
// import { CalendarMonth } from "@mui/icons-material";
import * as XLSX from "xlsx"; // For Excel export
import { saveAs } from "file-saver"; // To save files locally
import Papa from "papaparse"; // For CSV export
import { truncateText } from "../../utils/truncateText";
import ViewOrderModal from "./OrderModal";
import DateFilterComp from "./components/DateFilterComp";

// export interface filterProps {

// }

const OrderHistory = () => {
  const { selectedBranch } = useSelector((state: any) => state.branches);
  console.log(selectedBranch);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const [filterValue, setFilterValue] = useState<string | number | undefined>("today")
  const [noOfDays, setNoOfDays] = useState<string | number | undefined>("today")
  const [start_date, setStartDate] = useState<string | undefined>();
  const [end_date, setEndDate] = useState<string | undefined>();

  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>();

  const userDetails = useSelector((state: any) => state.user);

  const token = userDetails?.userData?.token;

  const handleTicketMenu = () => {
    setShowCustomerDetail(true);
  };

  const handleCustomerShow = (item: SetStateAction<undefined>) => {
    setSelectedCustomer(item);
    setShowCustomerDetail(true);
  };

  const handleCustomerMenu = () => {
    setShowCustomerDetail(true);
  };

  useEffect(() => {
    getTickets({ date_filter: filterValue, number_of_days: noOfDays, startDate: start_date, endDate: end_date })
  }, [filterValue, noOfDays, start_date, end_date]);

  const handleFilterChange = (
    filter?: string | number,
    number_of_days?: string | number,
    startDate?: string,
    endDate?: string
  ) => {

    setFilterValue(filter);
    setNoOfDays(number_of_days);
    setStartDate(startDate);
    setEndDate(endDate);

    // setSelectedFilter(number_of_days as any);
    // setSelectedFilter2(filter);
    // getTickets({ date_filter: filter, number_of_days, startDate, endDate });
  };


  console.log(noOfDays, "noOfDays");
  const getTickets = async ({
    date_filter,
    startDate,
    endDate,
    number_of_days,
  }: {
    date_filter?: string | number;
    startDate?: string;
    endDate?: string;
    number_of_days?: string | number;
  }) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const params: any = { date_filter };

    if (date_filter === "date_range") {
      params.startDate = startDate;
      params.endDate = endDate;
    } else if (date_filter !== "today") {
      params.number_of_days = number_of_days;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrderbyType/?branch_id=${selectedBranch.id}&queryType=history&status=${statusFilter}`,
        {
          ...headers,
          params
          // params: { branch_id: selectedBranch.id, ...params },
          // paramsSerializer: (params) => new URLSearchParams(params).toString(),
        }
      );
      console.log("res data", response.data);
      setData(response.data?.data);
      // toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
    } finally {
      setIsLoading(false);
    }
  };

  const [statusFilter, setStatusFilter] = useState<string>("");
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    console.log('Selected:', e.target.value);
  };

  useEffect(() => {
    getTickets({ date_filter: noOfDays });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBranch, statusFilter]);

  // const handleRefresh = () => {
  //   getTickets({ date_filter: "today" });
  // };

  // Function to export data as Excel
  // Function to export selected data as Excel
  const exportToExcel = () => {
    // Create an array with only the desired fields
    const selectedData = data?.map((item) => ({
      order_number: item.order_number,
      date: item.createdAt.slice(0, 10),
      time: item.createdAt.slice(11, 16),
      customer_name: item.customer_name,
      channel: item.channel,
      total_price: item.total_price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "order_history.xlsx");
  };

  // Function to export selected data as CSV
  const exportToCSV = () => {
    // Create an array with only the desired fields
    const selectedData = data?.map((item) => ({
      order_number: item.order_number,
      date: item.createdAt.slice(0, 10),
      time: item.createdAt.slice(11, 16),
      customer_name: item.customer_name,
      channel: item.channel,
      total_price: item.total_price,
    }));

    const csv = Papa.unparse(selectedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "order_history.csv");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDownloadCSV = () => {
    setDropdownVisible(false);
    exportToCSV();
  };

  const handleDownloadExcel = () => {
    setDropdownVisible(false);
    exportToExcel();
  };

  const handleBack = () => {
    setShowCustomerDetail(false);
  };

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderModal, setOrderModal] = useState<boolean>(true);
  const [SingleOrderItem, setSingleOrderItem] = useState({});

  useEffect(() => {
    if (orderId) {

      const order = data?.find((order: any) => order._id === orderId);
      console.log("Order:", order);
      setSingleOrderItem(order)

      setOrderModal(true);
    } else {
      setOrderModal(false);
    }
  }, [orderId, data])

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Order History" />
        {showCustomerDetail ? (
          <div className="mt-8">
            <button
              className="border border-black rounded px-[24px] py-[10px] font-[600] text-gray-500"
              onClick={handleBack}
            >
              Back
            </button>
            <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
              <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                Customer Details
              </p>

              <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-4 border-b">
                <p className="text-center text-[14px] text-[#121212]">
                  Customer Name
                </p>
                <p className=" text-[14px] text-[#121212]">Email</p>
                <p className=" text-[14px] text-[#121212]">Phone Number</p>
                <p className=" text-[14px] text-[#121212]">Address</p>
              </div>
              {isLoading ? (
                <div className="px-8">Loading...</div>
              ) : data.length === 0 ? (
                <div className="px-8">No data during this period</div>
              ) : selectedCustomer ? (
                <div
                  className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-4 items-center  font-base text-[14px] text-[#414141] bg-white`}
                >
                  <p className="items-start">
                    {selectedCustomer.customer_name
                      ? truncateText(
                        selectedCustomer.customer_name
                          .charAt(0)
                          .toUpperCase() +
                        selectedCustomer.customer_name.slice(1),
                        12
                      )
                      : ""}
                  </p>
                  <p className="" onClick={handleCustomerMenu}>
                    {selectedCustomer.customerData.email || "-"}
                  </p>
                  <p className="" onClick={handleCustomerMenu}>
                    {selectedCustomer.customerData.phoneNumber || "-"}
                  </p>
                  <p className="" onClick={handleCustomerMenu}>
                    {selectedCustomer.customerData.address || "-"}
                  </p>
                </div>
              ) : (
                <div className="px-8">No data during this period</div>
              )}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="mt-[40px]">
              {/* <ChangeBranchForTicket handleRefresh={handleRefresh} /> */}
              <div className="flex items-center justify-between">
                <DateFilterComp
                  handleFilterChange={handleFilterChange}
                  noOfDays={noOfDays}
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setNoOfDays={setNoOfDays}
                />
                {/* Export buttons */}
                <div className="flex items-center gap-[12px]">
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]"
                    >
                      Download
                    </button>
                    {dropdownVisible && (
                      <div className="absolute mt-2 right-0 w-[150px] bg-white border border-[#B6B6B6] rounded-[5px] shadow-lg">
                        <button
                          onClick={handleDownloadCSV}
                          className="block w-full text-left px-[16px] py-[8px] hover:bg-gray-200"
                        >
                          Download CSV
                        </button>
                        <button
                          onClick={handleDownloadExcel}
                          className="block w-full text-left px-[16px] py-[8px] hover:bg-gray-200"
                        >
                          Download Excel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                  <div className="px-[32px] flex items-center justify-between">

                    <p className="   font-[400] text-[24px] text-[#121212]">
                      Orders
                    </p>

                    <select className="border border-[#B6B6B6] bg-transparent  px-[16px] py-[8px] font-[400] text-[#121212] rounded-lg"
                      value={statusFilter} // Controlled input
                      onChange={handleStatusChange}>
                      <option value="">All</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                  </div>
                  <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-6 border-b">
                    <p className="text-start text-[14px] text-[#121212]">
                      Order No
                    </p>
                    <p className=" text-[14px] text-[#121212]">Date/Time</p>
                    <p className=" text-[14px] text-[#121212]">Customer </p>
                    <p className=" text-[14px] text-[#121212]">Status </p>
                    <p className=" text-[14px] text-[#121212]">Bill </p>
                    <p className=" text-[14px] text-[#121212]">Actions </p>
                  </div>
                  {isLoading ? (
                    <div className="px-8">Loading...</div>
                  ) : data.length === 0 ? (
                    <div className="px-8">No data during this period</div>
                  ) : (
                    Array.isArray(data) &&
                    data?.map((item, index) => (
                      <div
                        className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-6 items-center  font-base text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                          }`}
                        key={index}
                      >
                        <p className="text-start" onClick={handleCustomerMenu}>
                          {item.order_number || "-"}
                        </p>
                        <p className="" onClick={handleTicketMenu}>
                          {item.createdAt.slice(0, 10)} {item.createdAt.slice(11, 16)}
                        </p>

                        <p onClick={() => handleCustomerShow(item)}>
                          {item.customer_name
                            ? truncateText(
                              item.customer_name.charAt(0).toUpperCase() +
                              item.customer_name.slice(1),
                              12
                            )
                            : ""}
                        </p>

                        {
                          (item.status?.toLowerCase() === "cancelled" || item.status?.toLowerCase() === "canceled") ? (
                            <div className=" w-fit flex mx-auto items-center gap-[10px] bg-red-500 text-red-100 px-4 py-1.5 rounded-full text-sm">
                              <p>{item.status}</p>
                            </div>
                          ) : item.status?.toLowerCase() === "completed" ? (
                            <div className="w-fit mx-auto flex items-center gap-[10px] bg-green-500 text-green-100 px-4 py-1.5 rounded-full text-sm">
                              <p>{item.status}</p>
                            </div>
                          ) : (
                            // Default status
                            <div className="flex items-center gap-[10px] bg-yellow-500 text-yellow-100 px-4 py-1.5 rounded-full text-sm">
                              <p>{item.status}</p>
                            </div>
                          )
                        }


                        <p>&#x20A6;{item.total_price.toLocaleString()}</p>
                        <p className="px-3 py-1 mx-auto text-sm text-gray-800 border border-gray-800 rounded-full cursor-pointer w-fit"
                          onClick={() => item?._id && setOrderId(item?._id)}>
                          View Order
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {orderModal && <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/40">
                  <ViewOrderModal
                    setOrderId={setOrderId}
                    SingleOrderItem={SingleOrderItem}
                  />
                </div>}
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default OrderHistory;
