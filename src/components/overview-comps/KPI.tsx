import clsx from "clsx";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Key, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { fetchTopMenuItems } from "../../slices/overviewSlice";
import PieCharts from "./PieChart";

// Predefined color palette
const colors = [
  "#3E53F4", // Black
  "#5B65FF",
  "#8F99FF",
  "#1E35E5", // Dark Gray
  "#8792E7",
  "#555555",
  "#666666", // Medium Gray
  "#777777",
  "#888888",
  "#999999", // Lightest Gray in this list
];

const KPI = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loadingDashData,
    topItems,
  } = useSelector((state: any) => state.dashboardData);

  const { selectedBranch } = useSelector((state: any) => state.branches);

  useEffect(() => {
    dispatch(
      fetchTopMenuItems({ date_filter: "today", branch_id: selectedBranch?.id })
    );
  }, [dispatch, selectedBranch]);

  return (
    <div className="border border-[#C7C6CF] p-6 rounded-2xl mb-12">
      {" "}
      <div className={clsx("flex justify-between items-center w-full mb-9")}>
        <h5 className={clsx(styles.salesRevenue)}>Highest Selling Product</h5>
      </div>
      {loadingDashData ? (
        <div className="flex items-center justify-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <div className="overflow-auto whitespace-nowrap scrollbar-hide">
          {topItems?.map(
            (product: any, index: Key | null | undefined) => (
              <div
                key={index}
                className="border border-[#C7C6CF] rounded-[10px] overflow-auto inline-block mr-4"
              >
                <div className="flex flex-col items-center gap-4 min-w-[200px] py-7 px-8">
                  <img
                    src={product?.image}
                    alt="product"
                    className="w-[80px] h-[60px]"
                  />
                  <h6 className="text-[#201F44] font-medium">
                    {product.name}
                  </h6>
                  <p className="text-[#B2B1DC] text-sm">
                    {product.count} quantities sold
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {/* Pie chart component */}
      <div className="flex gap-2.5 mt-6">
        <div className="bg-white rounded-[10px] px-5 py-[48px]">
          <PieCharts topMenuItems={topItems || []} />
        </div>

        <div className="bg-white rounded-[10px] px-5 py-[48px] flex-grow flex flex-col gap-[22px]">
          {topItems?.map((product: any, index: any) => {
            const indicator = colors[index % colors.length];
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: indicator }}
                  ></div>
                  <div>
                    <h6 className="text-[#201F44] text-[16px] font-medium">
                      {product.name}
                    </h6>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[#858497] text-base font-normal">
                    ₦ {product?.revenue?.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KPI;
