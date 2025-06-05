import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import DaysTab2 from "../overview-comps/DaysTab2";
import clsx from "clsx";
import styles from "../overview-comps/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchCustomerData,
  fetchCustomerTransaction,
} from "../../slices/overviewSlice";
import ArrowDown from "../../assets/ArrowDown.svg";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { toast } from "react-toastify";

import chip from "../../assets/chip.svg";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { FiArrowDownRight, FiArrowUpRight, FiArrowRight } from "react-icons/fi";

const CustomerData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userDetails = useSelector(
    (state: RootState) => state.business.businessDetails
  );
  const businessIdentifier = userDetails?._id;

  const { customerData, customerDataLoading, totalCustomerTransaction } =
    useSelector((state: RootState) => state.overview);

  console.log("totalCustomerTransaction", totalCustomerTransaction);
  console.log("customerData", customerData);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    businessIdentifier &&
      dispatch(
        fetchCustomerData({
          businessIdentifier: businessIdentifier.toString(),
          date_filter: "today",
        })
      );
    dispatch(fetchCustomerTransaction({ date_filter: "today" }));
  }, [businessIdentifier, dispatch]);

  const [orderCount, setOrderCount] = useState<any>({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getTransactionCountData = async () => {

      try {
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

    dispatch(
      fetchCustomerData({
        businessIdentifier: businessIdentifier.toString(),
        date_filter,
        startDate,
        endDate,
        number_of_days,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Successful");
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
    const selectedData = customerData.map(
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
    const selectedData = customerData.map((item: any) => ({
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
      <DashboardLayout>
        <TopMenuNav pathName="Customer Data" />

        <div className="rounded-[10px] border border-[#f1f0f0] bg-white px-6 py-7 mt-10">
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

        {/* Filter and table */}
        <div className="">
          <div className="mt-[40px]">
            <div className="">
              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <div className="flex items-center justify-between pr-8">
                  <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                    All Customers Data
                  </p>
                  {/* Export buttons */}
                  <div className="flex items-center gap-[12px]">
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
                </div>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-4 border-b border-[#b6b6b6]">
                  <p className="text-start  text-[14px] text-[#121212]">Name</p>
                  <p className=" text-[14px] text-[#121212]">Email</p>
                  <p className=" text-[14px] text-[#121212]">Phone Number</p>
                  <p className=" text-[14px]  text-[#121212]">Address </p>
                </div>
                {customerDataLoading ? (
                  <div className="px-8">Loading...</div>
                ) : customerData?.length === 0 ? (
                  <div className="px-8">No data during this period</div>
                ) : customerData ? (
                  customerData.map((data: any, index: any) => (
                    <div
                      className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-4 items-center  font-base text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                        }`}
                      key={index}
                    >
                      <p className="text-start ">{data.customerName}</p>
                      <p className="">{data.email}</p>
                      <p className="">{data.phoneNumber}</p>
                      <p className="">{data.address}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-8">No data during this period</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default CustomerData;
