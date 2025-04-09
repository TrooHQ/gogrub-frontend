import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const formatChartData = (data: any[]) => {
  if (!data || data.length === 0) return [];

  // Extract unique dates from the data
  const uniqueDates = new Set(
    data.map(
      (item: { _id: { day: any; month: any; year: any } }) =>
        `${item._id.day}-${item._id.month}-${item._id.year}`
    )
  );

  // If all data belongs to the same day, format it per hour
  if (uniqueDates.size === 1) {
    return Array.from({ length: 24 }, (_, hour) => {
      const entry = data.find(
        (item: { _id: { hour: number } }) => item._id.hour === hour
      );
      return {
        name:
          hour < 12 ? `${hour || 12}AM` : `${hour === 12 ? 12 : hour - 12}PM`,
        "Sales Revenue": entry ? entry.totalSales : 0,
      };
    });
  }

  // If data spans multiple days, aggregate by day-month
  const aggregatedData: Record<string, number> = {};
  data.forEach((item: { _id: { day: any; month: any }; totalSales: any }) => {
    const key = `${item._id.day} ${getMonthName(item._id.month)}`;
    aggregatedData[key] = (aggregatedData[key] || 0) + item.totalSales;
  });

  return Object.entries(aggregatedData).map(([key, totalSales]) => ({
    name: key,
    "Sales Revenue": totalSales,
  }));
};

const getMonthName = (month: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
};

const Recharts = () => {
  const { salesRevenueGraph } = useSelector(
    (state: RootState) => state.overview
  );
  const chartData = formatChartData(salesRevenueGraph.data);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" stroke="#494953" />
          <YAxis stroke="#121212" />
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Bar dataKey="Sales Revenue" fill="#0252F2" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Recharts;
