import DashboardLayout from "./DashboardLayout";
// import TopMenuNav from "./TopMenuNav";
// import { SetStateAction, useEffect, useState } from "react";
import { useEffect, useState } from "react";
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
import PaginationComponent from "./PaginationComponent";
import { SearchRounded } from "@mui/icons-material";
import RefundModal from "./RefundModal";
import { DropdownMenuHistorStatusUpdate } from "./DropDownTicketStatusUpdate";
import { HiOutlineDotsVertical } from "react-icons/hi";
// import { DropdownMenuHistorStatusUpdate, DropdownMenuTicketStatusUpdate } from "./DropDownTicketStatusUpdate";

// export interface filterProps {

// }

const OrderHistory = () => {

  useEffect(() => {
    document.title = "Track Your Past Orders, Sales Trends, and Transaction History"
  }, [])


  const { selectedBranch } = useSelector((state: any) => state.branches);


  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const [filterValue, setFilterValue] = useState<string | number | undefined>("today")
  const [noOfDays, setNoOfDays] = useState<string | number | undefined>("today")
  const [start_date, setStartDate] = useState<string | undefined>();
  const [end_date, setEndDate] = useState<string | undefined>();

  // const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ totalOrders: number; totalPages: number; currentPage: number; pageSize: number }>({
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState<string>("");

  const userDetails = useSelector((state: any) => state.user);

  const token = userDetails?.userData?.token;

  // const handleTicketMenu = () => {
  //   setShowCustomerDetail(true);
  // };

  // const handleCustomerShow = (item: SetStateAction<undefined>) => {
  //   setSelectedCustomer(item);
  //   setShowCustomerDetail(true);
  // };

  // const handleCustomerMenu = () => {
  //   setShowCustomerDetail(true);
  // };

  useEffect(() => {
    getTickets({ date_filter: filterValue, number_of_days: noOfDays, startDate: start_date, endDate: end_date, page, order_number: searchValue })
  }, [filterValue, noOfDays, start_date, end_date, page]);

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


  const getTickets = async ({
    date_filter,
    startDate,
    endDate,
    number_of_days,
    page,
    order_number
  }: {
    date_filter?: string | number;
    startDate?: string;
    endDate?: string;
    number_of_days?: string | number;
    page?: number;
    order_number?: string
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
        `${SERVER_DOMAIN}/order/getOrderbyType/?branch_id=${selectedBranch.id}&queryType=history&status=${statusFilter}&page=${page}&limit=10&order_number=${order_number}`,
        {
          ...headers,
          params
          // params: { branch_id: selectedBranch.id, ...params },
          // paramsSerializer: (params) => new URLSearchParams(params).toString(),
        }
      );

      setData(response.data?.data);
      setPagination({
        totalOrders: response.data?.totalOrders || 0,
        totalPages: response.data?.totalPages || 0,
        currentPage: response.data?.currentPage || 1,
        pageSize: response.data?.pageSize || 10,
      });
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
  };

  useEffect(() => {
    getTickets({ date_filter: noOfDays, order_number: searchValue });
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

  // const handleBack = () => {
  //   setShowCustomerDetail(false);
  // };

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderModal, setOrderModal] = useState<boolean>(true);
  const [SingleOrderItem, setSingleOrderItem] = useState({});

  useEffect(() => {
    if (orderId) {

      const order = data?.find((order: any) => order._id === orderId);
      setSingleOrderItem(order)
      setOrderModal(true);
    } else {
      setOrderModal(false);
    }
  }, [orderId, data])


  // refund order process
  const [showMenuOptions, setShowMenuOptions] = useState<number | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const [refundOrder, setRefundOrder] = useState<any | null>(null);

  const handleShowMenu = (index: number) => {
    setShowMenuOptions((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleRefundData = (id: any) => {
    const rd = data?.find((item: any) => item._id === id);
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
      <DashboardLayout title="Order History">
        <div className="">
          <div className="mt-[40px]">
            {/* <ChangeBranchForTicket handleRefresh={handleRefresh} /> */}
            <div className="flex flex-wrap items-center justify-between">
              <DateFilterComp
                handleFilterChange={handleFilterChange}
                noOfDays={noOfDays}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                setNoOfDays={setNoOfDays}
              />
              {/* Export buttons */}
              <div className="flex items-center gap-[12px] flex-wrap">
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
                <div className="w-[90%] mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between">

                  <p className="   font-[400] text-[24px] text-[#121212]">
                    Orders
                  </p>
                  <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
                    <select className="border border-[#B6B6B6] bg-transparent  px-[16px] py-[8px] font-[400] text-[#121212] rounded-lg"
                      value={statusFilter} // Controlled input
                      onChange={handleStatusChange}>
                      <option value="">All</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    {/* search  */}
                    <div className="flex items-center w-full gap-2">
                      <input
                        type="text"
                        placeholder="Search by order number"
                        className="border border-grey300 rounded-[5px] px-[16px] py-[10px] w-full"
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <button className="p-2 bg-black border border-black rounded" onClick={() => getTickets({ order_number: searchValue })}>
                        <SearchRounded className="text-white" />
                      </button>
                    </div>
                  </div>

                </div>
                <div className="w-full overflow-x-auto">
                  <table className="min-w-[700px] w-full mt-[24px] table-auto">
                    <thead>
                      <tr>
                        <th className="py-2 border-b border-b-grey100">Order No</th>
                        <th className="py-2 border-b border-b-grey100">Date/Time</th>
                        <th className="py-2 border-b border-b-grey100">Customer</th>
                        <th className="py-2 border-b border-b-grey100">Status</th>
                        <th className="py-2 border-b border-b-grey100">Bill</th>
                        <th className="py-2 border-b border-b-grey100">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center">Loading...</td>
                        </tr>) : data.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center">No order available</td>
                          </tr>
                        ) : (
                        Array.isArray(data) &&
                        data?.map((item, index) => (
                          <tr
                            className={`relative text-center py-[14px] px-[32px] items-center font-base text-normal text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                              }`}
                            key={index}
                          >
                            <td className="py-4">{item.order_number || "-"}</td>
                            <td className="py-4">{item.createdAt.slice(0, 10)} {item.createdAt.slice(11, 16)}</td>
                            <td className="py-4">{item.customer_name
                              ? truncateText(
                                item.customer_name.charAt(0).toUpperCase() +
                                item.customer_name.slice(1),
                                12
                              )
                              : ""}</td>
                            <td className="py-4">{item.customer_name || "-"}</td>

                            {
                              (item.status?.toLowerCase() === "cancelled" || item.status?.toLowerCase() === "canceled") ? (
                                <td className=" w-fit flex mx-auto items-center gap-[10px] bg-red-500 text-red-100 px-4 py-1.5 rounded-full text-sm">
                                  {item.status}
                                </td>
                              ) : item.status?.toLowerCase() === "completed" ? (
                                <td className="w-fit mx-auto flex items-center gap-[10px] bg-green-500 text-green-100 px-4 py-1.5 rounded-full text-sm">
                                  {item.status}
                                </td>
                              ) : (
                                // Default status
                                <td className="flex items-center gap-[10px] bg-yellow-500 text-yellow-100 px-4 py-1.5 rounded-full text-sm">
                                  {item.status}
                                </td>
                              )
                            }
                            <td className="relative py-4">
                              <HiOutlineDotsVertical
                                onClick={() => handleShowMenu(index)}
                                className="mx-auto text-2xl"
                              />
                              {showMenuOptions === index && <DropdownMenuHistorStatusUpdate
                                orderId={item._id}
                                setOrderId={setOrderId}
                                toggleOff={() => setShowMenuOptions(null)}
                                handleRefundData={handleRefundData}
                                hasRefunded={item?.isRefunded}
                              />}
                            </td>
                          </tr>))
                      )}
                    </tbody>
                  </table>
                </div>




              </div>
              {orderModal && <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/40">
                <ViewOrderModal
                  setOrderId={setOrderId}
                  SingleOrderItem={SingleOrderItem}
                />
              </div>}

              {refundOrder && <RefundModal
                cancelVoidOrder={handleCancelRefundData}
                voidOrderItem={refundOrder}
                getTickets={() => getTickets({ date_filter: filterValue, number_of_days: noOfDays, startDate: start_date, endDate: end_date, page, order_number: searchValue })}
              />}

            </div>
            <div className="fixed bottom-0 left-0 flex items-center justify-center w-full my-4">
              <PaginationComponent setPage={setPage} pagination={pagination} />
            </div>
          </div>
        </div>
        {/* )} */}
      </DashboardLayout>
    </div>
  );
};

export default OrderHistory;
