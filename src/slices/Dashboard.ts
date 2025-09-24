import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";

export const fetchDashboardInformation = createAsyncThunk(
  "fetchDashboardInformation",
  async (
    {
      date_filter,
      startDate,
      endDate,
      number_of_days,
    }: {
      date_filter?: string;
      startDate?: string;
      endDate?: string;
      number_of_days?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const params: any = { date_filter };
      if (date_filter === "date_range") {
        params.date_filter = "date_range";
        params.startDate = startDate;
        params.endDate = endDate;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }

      const response = await axios.get(`${SERVER_DOMAIN}/dashboard`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("dashboard data", response?.data?.data);
      const totalOrders = response?.data?.data?.totalOrders;
      const totalRevenue = response?.data?.data?.totalRevenue;
      const averageOrderValue = response?.data?.data?.averageOrderValue;
      const topItems = response?.data?.data?.topItems;
      const uniqueCustomers = response?.data?.data?.uniqueCustomers;
      const openTickets = response?.data?.data?.openTickets;
      const closedTickets = response?.data?.data?.closedTickets;
      const growthRate = response?.data?.data?.growthRate;

      return {
        totalOrders,
        totalRevenue,
        averageOrderValue,
        topItems,
        uniqueCustomers,
        openTickets,
        closedTickets,
        growthRate,
      };
      // return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// {
//     "topItems": [
//         {
//             "name": "Penne pasta",
//             "count": 9,
//             "revenue": 0
//         },
//         {
//             "name": "Burger platter",
//             "count": 7,
//             "revenue": 0
//         }
//     ],
//     "uniqueCustomers": 7,
//     "openTickets": 1,
//     "closedTickets": 13,
//     "growthRate": 0,
//     "period": {
//         "filter": "days",
//         "days": "30",
//         "startDate": null,
//         "endDate": null
//     }
// }

interface DashboardState {
  loadingDashData: boolean;
  dashboardDataError: null | unknown;
  dashboardData: any;

  totalOrders: number | string;
  totalRevenue: number | string;
  averageOrderValue: number | string;
  topItems?: [];
  uniqueCustomers: number;
  openTickets: number;
  closedTickets: number;
  growthRate: number;
}

const initialState: DashboardState = {
  loadingDashData: false,
  dashboardDataError: null,
  dashboardData: {},
  totalOrders: 0,
  totalRevenue: 0,
  averageOrderValue: 0,
  topItems: [],
  uniqueCustomers: 0,
  openTickets: 0,
  closedTickets: 0,
  growthRate: 0,
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardInformation.pending, (state) => {
      state.loadingDashData = true;
      state.dashboardDataError = null;
    });
    builder.addCase(fetchDashboardInformation.fulfilled, (state, action) => {
      state.loadingDashData = false;
      state.dashboardDataError = null;
      state.dashboardData = action.payload;

      state.totalOrders = action.payload.totalOrders;
      state.totalRevenue = action.payload.totalRevenue;
      state.averageOrderValue = action.payload.averageOrderValue;
      state.topItems = action.payload.topItems ?? [];
      state.uniqueCustomers = action.payload.uniqueCustomers;
      state.openTickets = action.payload.openTickets;
      state.closedTickets = action.payload.closedTickets;
      state.growthRate = action.payload.growthRate;
    });
    builder.addCase(fetchDashboardInformation.rejected, (state, action) => {
      state.loadingDashData = false;
      state.dashboardDataError = action.payload;
      state.dashboardData = {};
      // individual states
      state.totalOrders = 0;
      state.totalRevenue = 0;
      state.averageOrderValue = 0;
      state.topItems = [];
      state.uniqueCustomers = 0;
      state.openTickets = 0;
      state.closedTickets = 0;
      state.growthRate = 0;
    });
  },
});

export default DashboardSlice.reducer;
