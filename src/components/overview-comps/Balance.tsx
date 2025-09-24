import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Header.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import confirmation_number from "../../assets/confirmation_number.svg";
import restaurant_menu from "../../assets/restaurant_menu.svg";
import DaysTab2 from "./DaysTab2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, } from "../../store/store";
import {

  fetchTotalSales,
  // fetchOpenAndClosedTickets,
  fetchAverageOrderValue,
  fetchSalesRevenueGraph,
  fetchTopMenuItems,
  fetchCustomerTransaction,
} from "../../slices/overviewSlice";
import { fetchOpenClosedTickets } from "../../slices/OpenCloseTicketSlice";
import { fetchDashboardInformation } from "../../slices/Dashboard";

const BalanceComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showBalance, setShowBalance] = useState(true);
  const { selectedBranch } = useSelector((state: any) => state.branches);


  const {
    loadingDashData,
    // dashboardDataError,
    // totalOrders,
    totalRevenue,
    // averageOrderValue,
    // topItems,
    // uniqueCustomers,
    openTickets,
    closedTickets,
    // growthRate,
  } = useSelector((state: any) => state.dashboardData);


  const [dateFilter, setDateFilter] = useState("today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    dispatch(fetchDashboardInformation({
      date_filter: dateFilter,
      startDate,
      endDate,
      number_of_days: numberOfDays
    }))
  }, [dateFilter, startDate, endDate, numberOfDays, dispatch])


  // useEffect(() => {
  //   dispatch(fetchTotalSales({ date_filter: "today" }));
  //   dispatch(fetchAverageOrderValue({ date_filter: "today" }));
  //   dispatch(fetchSalesRevenueGraph({ date_filter: "today" }));
  //   dispatch(
  //     fetchTopMenuItems({ branch_id: selectedBranch?.id, date_filter: "today" })
  //   );
  //   dispatch(fetchCustomerTransaction({ date_filter: "today" }));
  //   dispatch(fetchOpenClosedTickets({
  //     date_filter: dateFilter,
  //     startDate,
  //     endDate,
  //     number_of_days: numberOfDays,
  //     branch_id: selectedBranch?.id,
  //   }))
  // }, []);

  const changeVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleDateFilterChange = (
    date_filter: string,
    startDate?: string,
    endDate?: string,
    number_of_days?: number
  ) => {

    setDateFilter(date_filter);
    setStartDate(startDate || "");
    setEndDate(endDate || "");
    setNumberOfDays(number_of_days || 0);

    // dispatch(
    //   fetchOpenAndClosedTickets({
    //     date_filter,
    //     startDate,
    //     endDate,
    //     number_of_days,
    //   })
    // );
    dispatch(fetchOpenClosedTickets({
      date_filter,
      startDate,
      endDate,
      number_of_days,
      branch_id: selectedBranch.id,
    }));
    dispatch(
      fetchTotalSales({ date_filter, startDate, endDate, number_of_days })
    );
    dispatch(
      fetchAverageOrderValue({
        date_filter,
        start_date: startDate,
        end_date: endDate,
        number_of_days,
      })
    );
    dispatch(
      fetchSalesRevenueGraph({
        date_filter,
        startDate,
        endDate,
        number_of_days,
      })
    );
    dispatch(
      fetchCustomerTransaction({
        date_filter,
        startDate,
        endDate,
        number_of_days,
      })
    );
    dispatch(
      fetchTopMenuItems({
        branch_id: selectedBranch.id,
        date_filter,
        startDate,
        endDate,
        number_of_days,
      })
    );

  };

  return (
    <div>
      <div className="rounded-[16px] bg-[#3e3e43] px-8 py-6">
        <div className="flex items-start justify-between">
          <h5 className="text-[#EEEEF7] text-lg font-light">Total Sales</h5>
          <DaysTab2
            backgroundColor="#606060"
            selectedBackgroundColor="#f38d41"
            selectedColor="white"
            nonSelectedColor="#C7C6CF"
            iconClassName={clsx("text-white")}
            onDateFilterChange={handleDateFilterChange}
          />
        </div>
        <div className="flex justify-start gap-10 items-center w-full mb-[55px]">
          <h2 className={clsx(styles.figure)}>
            {loadingDashData
              ? "..."
              : showBalance && totalRevenue !== undefined
                ? `₦ ${totalRevenue?.toLocaleString("en-US")}`
                : showBalance && totalRevenue === undefined
                  ? "Loading..."
                  : "****"}
          </h2>
          {!showBalance ? (
            <Visibility
              className="cursor-pointer w-[32px] h-[32px] text-white"
              onClick={changeVisibility}
            />
          ) : (
            <VisibilityOff
              className="cursor-pointer w-[32px] h-[32px] text-white"
              onClick={changeVisibility}
            />
          )}
        </div>
        <div className="text-[#B2B1DC] flex items-center justify-start gap-5">
          <div className="flex items-center justify-start gap-1">
            <img src={restaurant_menu} alt="confirmation_number" />
            <h6 className={clsx(styles.manage)}>
              {" "}
              {loadingDashData ? "Loading..." : `${openTickets || 0} Open Orders`}
            </h6>
          </div>
          <div className="flex items-center justify-start gap-1">
            <img src={confirmation_number} alt="confirmation_number" />
            <h6 className={clsx(styles.manage)}>
              {" "}
              {loadingDashData ? "Loading..." : `${closedTickets || 0} Closed Tickets`}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceComp;
