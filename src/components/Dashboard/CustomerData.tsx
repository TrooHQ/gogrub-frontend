import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
// import TopMenuNav from "./TopMenuNav";
import DaysTab2 from "../overview-comps/DaysTab2";
import clsx from "clsx";
import styles from "../overview-comps/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  // fetchCustomerData,
  fetchCustomerTransaction,
} from "../../slices/overviewSlice";
import ArrowDown from "../../assets/ArrowDown.svg";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Papa from "papaparse";
// import { toast } from "react-toastify";

import chip from "../../assets/chip.svg";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { FiArrowDownRight, FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import DateFilterComp from "./components/DateFilterComp";
import PaginationComponent from "./PaginationComponent";
import { SearchRounded } from "@mui/icons-material";

const CustomerData = () => {

  useEffect(() => {
    document.title = "Access and Analyze Valuable Customer Data and Ordering Patterns"
  }, [])

  const dispatch = useDispatch<AppDispatch>();

  const userDetails = useSelector(
    (state: RootState) => state.business.businessDetails
  );

  const businessIdentifier = userDetails?._id;
  const { totalCustomerTransaction } =
    useSelector((state: RootState) => state.overview);

  console.log("totalCustomerTransaction", totalCustomerTransaction);

  const [filterValue, setFilterValue] = useState<string | number | undefined>("today")
  const [noOfDays, setNoOfDays] = useState<string | number | undefined>("today")
  const [start_date, setStartDate] = useState<string | undefined>();
  const [end_date, setEndDate] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [customerData, setCustomerData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalOrders: 0,
  });

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
  };


  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  console.log("businessIdentifier", businessIdentifier)
  useEffect(() => {
    // businessIdentifier &&
    // console.log("for here")

    dispatch(fetchCustomerTransaction({ date_filter: filterValue, number_of_days: noOfDays, startDate: start_date, endDate: end_date }));
  }, [dispatch, userDetails?._id, filterValue, noOfDays, start_date, end_date, page, searchValue]);



  const fetchCustomerData = async ({ businessIdentifier, date_filter, startDate, endDate, number_of_days, page, phone_number }: {
    businessIdentifier?: string;
    date_filter?: string | number;
    startDate?: string | number;
    endDate?: string | number;
    number_of_days?: string | number;
    page?: number;
    phone_number?: string;
  }) => {

    try {
      setLoading(true)
      const params: any = { businessIdentifier, date_filter };
      if (date_filter === "date_range") {
        params.date_filter = "date_range";
        params.startDate = startDate;
        params.endDate = endDate;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }

      const res = await axios.get(`${SERVER_DOMAIN}/order/getOrderCustomerData?businessIdentifier=${businessIdentifier}`,
        {
          params: { ...params, page, limit: 10, phoneNumber: phone_number },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("res", res);
      setCustomerData(res?.data?.data)
      setPagination({
        currentPage: res?.data?.pagination?.currentPage,
        totalPages: res?.data?.pagination?.totalPages,
        pageSize: res?.data?.pagination?.pageSize,
        totalOrders: res?.data?.pagination?.totalOrders
      })

    } catch (e) {
      console.error("Error fetching transaction count data:", e);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomerData({
      businessIdentifier: userDetails?._id?.toString(),
      date_filter: filterValue, number_of_days: noOfDays, startDate: start_date, endDate: end_date, page, phone_number: searchValue
    });
  }, [dispatch, userDetails?._id, filterValue, noOfDays, start_date, end_date, page, searchValue]);

  const [orderCount, setOrderCount] = useState<any>({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getTransactionCountData = async () => {

      try {
        setLoading(true)
        const res = await axios.get(`${SERVER_DOMAIN}/getCustomerTransaction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log("res", res);
        setOrderCount(res?.data);

      } catch (e) {
        console.error("Error fetching transaction count data:", e);
      } finally {
        setLoading(false)
      }
    }
    if (token) {
      getTransactionCountData();
    }
  }, [token]);

  console.log("orderCount", orderCount);

  // Function to handle date filter changes
  const handleDateFilterChange = (
    date_filter: string,
    startDate?: string,
    endDate?: string,
    number_of_days?: number
  ) => {
    if (!businessIdentifier) return;


    fetchCustomerData({
      businessIdentifier: businessIdentifier.toString(),
      date_filter,
      startDate,
      endDate,
      number_of_days,
      page,
      phone_number: searchValue
    });

    dispatch(
      fetchCustomerTransaction({
        date_filter,
        startDate,
        endDate,
        number_of_days,
      })
    );
  };

  const exportToExcel = () => {
    // Create an array with only the desired fields
    const selectedData = customerData?.map(
      (item: {
        customerName: any;
        email: any;
        phoneNumber: any;
        address: any;
      }) => ({
        "Customer Name": item.customerName,
        Email: item.email,
        "Phone Number": item.phoneNumber,
        Address: item.address,
      })
    );

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
    const selectedData = customerData?.map((item: any) => ({
      "Customer Name": item.customerName,
      Email: item.email,
      "Phone Number": item.phoneNumber,
      Address: item.address,
    }));

    const csv = Papa.unparse(selectedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "customer_data.csv");
  };

  const handleDownloadCSV = () => {
    setDropdownVisible(false);
    exportToCSV();
  };

  const handleDownloadExcel = () => {
    setDropdownVisible(false);
    exportToExcel();
  };

  const state = {
    salesActivities: [
      {
        icon: ArrowDown,
        title: "Total Transaction Counts",
        // time: "12:45 PM",
        amount: orderCount?.today?.totalOrders,
        // amount: totalCustomerTransaction?.totalOrders,
        statusIcon: ArrowDown,
        status: `${orderCount?.percentageChange}% from yesterday`,
        // status: "-25% from yesterday",
        percent: orderCount?.percentageChange,
      },
    ],
  };

  return (
    <div>
      {" "}
      <DashboardLayout title="Customers">
        {/* <TopMenuNav pathName="Customers" /> */}

        <div className="my-4">

          <DateFilterComp
            handleFilterChange={handleFilterChange}
            noOfDays={noOfDays}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            setNoOfDays={setNoOfDays}
          />
        </div>

        <div className="rounded-[10px] border border-[#f1f0f0] bg-white px-6 py-7 ">
          <div className="hidden ">
            <div className="flex items-center justify-between ">
              <h3 className="text-2xl font-normal text-[#121212]">
                Customer Transaction Counts
              </h3>
              <DaysTab2
                backgroundColor="initial"
                selectedBackgroundColor="#f38d41"
                selectedColor="white"
                nonSelectedColor="#606060"
                iconClassName={clsx("text-[#ADADB9]")}
                onDateFilterChange={handleDateFilterChange}
                border="1px solid var(--Kanta-Neutral-200, #C7C6CF)"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-5">
            {state.salesActivities.map((activity, index) => (
              <div
                key={index}
                className={clsx(
                  styles.activityDiv,
                  "flex flex-col items-start justify-center border border-[#C7C6CF] rounded-[10px] overflow-auto py-4 px-3 gap-3 relative"
                )}
              >
                <h5 className="text-base font-medium">{activity.title}</h5>
                <span>{activity.amount}</span>
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={activity.icon} alt="icon" /> */}
                  {activity.percent < 0 ? <div className="flex items-center justify-center p-0.5 bg-red-600 rounded-md w-fit h-fit"><FiArrowDownRight className="w-5 h-5 text-white" /></div> : activity.percent > 0 ? <div className="flex items-center justify-center p-0.5 bg-green-600 rounded-md w-fit h-fit"><FiArrowUpRight className="w-5 h-5 text-white" /></div> : <div className="flex items-center justify-center p-0.5 bg-blue-600 rounded-md w-fit h-fit"><FiArrowRight className="w-5 h-5 text-white" /></div>}
                  <p className={`${activity.percent < 0 ? "text-red-600" : activity.percent > 0 ? "text-green-600" : "text-blue-600"} font-semibold text-sm`}>{activity.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end w-full my-2 gap-[12px]">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212] flex items-center justify-start gap-2"
            >
              <img src={chip} alt="" className="" />
              Export Data
            </button>
            {dropdownVisible && (
              <div className="absolute mt-2 w-[150px] bg-white border border-[#B6B6B6] rounded-[5px] shadow-lg">
                <button
                  onClick={handleDownloadCSV}
                  className="block w-full text-left px-[16px] py-[8px] hover:bg-gray-200"
                >
                  Export in CSV
                </button>
                <button
                  onClick={handleDownloadExcel}
                  className="block w-full text-left px-[16px] py-[8px] hover:bg-gray-200"
                >
                  Export in Excel
                </button>
              </div>
            )}
          </div>
        </div>


        {/* Filter and table */}
        <div className="">
          <div className="mt-[40px]">
            <div className="">
              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <div className="flex items-center justify-between pr-8">
                  <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                    All Customers
                  </p>
                  {/* search button */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search by phone number"
                      className="border border-grey300 rounded-[5px] px-[16px] py-[10px] w-[300px]"
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="p-2 bg-black border border-black rounded" onClick={() => fetchCustomerData({
                      businessIdentifier: userDetails?._id?.toString(),
                      phone_number: searchValue
                    })}>
                      <SearchRounded className="text-white" />
                    </button>
                  </div>
                </div>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-4 border-b border-[#b6b6b6]">
                  <p className="text-start  text-[14px] text-[#121212]">Name</p>
                  <p className=" text-[14px] text-[#121212]">Email</p>
                  <p className=" text-[14px] text-[#121212]">Phone Number</p>
                  <p className=" text-[14px]  text-[#121212]">Address </p>
                </div>
                {loading ? (
                  <div className="px-8">Loading...</div>
                ) : customerData?.length === 0 ? (
                  <div className="px-8">No data during this period</div>
                ) : customerData ? (
                  customerData.map((data: any, index: any) => (
                    <>
                      {data?.customerName && <div
                        className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-4 items-center  font-base text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                          }`}
                        key={index}
                      >
                        <p className="text-start ">{data.customerName}</p>
                        <p className="">{data.email}</p>
                        <p className="">{data.phoneNumber}</p>
                        <p className="">{data.address}</p>
                      </div>}</>
                  ))
                ) : (
                  <div className="px-8">No data during this period</div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center w-full my-4">
              <PaginationComponent setPage={setPage} pagination={pagination} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default CustomerData;
