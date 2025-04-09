import clsx from "clsx";
import styles from "./Header.module.css";
import Recharts from "./Recharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchSalesRevenueGraph } from "../../slices/overviewSlice";

const SalesRevenue = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { salesRevenueGraph, loading } = useSelector(
    (state: RootState) => state.overview
  );

  useEffect(() => {
    dispatch(fetchSalesRevenueGraph({ date_filter: "today" }));
  }, [dispatch]);
  return (
    <div className="border border-[#C7C6CF] bg-white p-6 rounded-2xl mb-12">
      {" "}
      <div className={clsx("flex justify-between items-center w-full mb-9")}>
        <h5 className={clsx(styles.salesRevenue)}>Sales Revenue</h5>
        {loading && <h5 className={clsx(styles.salesRevenue)}>Loading...</h5>}
        {salesRevenueGraph?.data?.length === 0 && (
          <h5 className={clsx(styles.salesRevenue)}>No data for this period</h5>
        )}
      </div>
      <Recharts />
    </div>
  );
};

export default SalesRevenue;
