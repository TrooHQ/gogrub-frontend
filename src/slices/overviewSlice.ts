import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";

interface OverviewState {
  openAndClosedTickets: any;
  customerData: any;
  topMenuItems: any;
  totalSales: any;
  totalCustomerTransaction: any;
  averageOrderValue: any;
  salesRevenueGraph: any;
  salesGrowthRate: any;
  customerDataLoading: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OverviewState = {
  openAndClosedTickets: [],
  customerData: [],
  topMenuItems: [],
  salesGrowthRate: "",
  totalSales: 0,
  totalCustomerTransaction: 0,
  averageOrderValue: "",
  salesRevenueGraph: "",
  customerDataLoading: false,
  loading: false,
  error: null,
};

// Create async thunk for fetching open and closed tickets
export const fetchOpenAndClosedTickets = createAsyncThunk(
  "overview/fetchOpenAndClosedTickets",
  async (
    {
      date_filter,
      startDate,
      endDate,
      number_of_days,
    }: {
      date_filter: string;
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

      const response = await axios.get(
        `${SERVER_DOMAIN}/getOpenAndClosedTickets`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Create async thunk for fetching open and closed tickets
export const fetchCustomerData = createAsyncThunk(
  "overview/fetchCustomerData",
  async (
    {
      businessIdentifier,
      date_filter,
      startDate,
      endDate,
      number_of_days,
    }: {
      businessIdentifier?: string;
      date_filter?: string | number;
      startDate?: string | number;
      endDate?: string | number;
      number_of_days?: string | number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      // console.log("funtion call");
      const params: any = { businessIdentifier, date_filter };
      if (date_filter === "date_range") {
        params.date_filter = "date_range";
        params.startDate = startDate;
        params.endDate = endDate;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }

      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrderCustomerData?businessIdentifier=${businessIdentifier}`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("post call");
      // console.log("response", response);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Create async thunk for fetching open and closed tickets
export const fetchTopMenuItems = createAsyncThunk(
  "overview/fetchTopMenuItems",
  async (
    {
      branch_id,
      date_filter,
      startDate,
      endDate,
      number_of_days,
    }: {
      branch_id: any;
      date_filter: string;
      startDate?: string;
      endDate?: string;
      number_of_days?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      // console.log("branch", branch_id);
      const params: any = { branch_id, date_filter };
      if (date_filter === "date_range") {
        params.date_filter = "date_range";
        params.startDate = startDate;
        params.endDate = endDate;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }

      // console.log("params", params);

      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getTopMenuItems/`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Create async thunk for fetching total sales
export const fetchTotalSales = createAsyncThunk(
  "overview/fetchTotalSales",
  async (
    {
      date_filter,
      startDate,
      endDate,
      number_of_days,
    }: {
      date_filter: string;
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
        params.startDate = startDate;
        params.endDate = endDate;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }

      // const response = await axios.get(`${SERVER_DOMAIN}/getTotalSales`, {
      const response = await axios.get(`${SERVER_DOMAIN}/getGoGrubTotalSales`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Create async thunk for fetching customer transaction
export const fetchCustomerTransaction = createAsyncThunk(
  "overview/fetchCustomerTransaction",
  async (
    {
      date_filter,
      startDate,
      endDate,
      number_of_days,
    }: {
      date_filter?: string | number;
      startDate?: string | number;
      endDate?: string | number;
      number_of_days?: string | number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const params: any = { date_filter };
      if (date_filter === "date_range") {
        params.startDate = startDate;
        params.endDate = endDate;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }

      // const response = await axios.get(`${SERVER_DOMAIN}/customerTransaction`, {
      const response = await axios.get(
        `${SERVER_DOMAIN}/goGrubGetCustomerTransaction`,
        {
          // params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Create async thunk for fetching average order value
export const fetchAverageOrderValue = createAsyncThunk(
  "overview/fetchAverageOrderValue",
  async (
    {
      date_filter,
      start_date,
      end_date,
      number_of_days,
    }: {
      date_filter: string;
      start_date?: string;
      end_date?: string;
      number_of_days?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const params: any = { date_filter };
      if (date_filter === "date_range") {
        params.start_date = start_date;
        params.end_date = end_date;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }
      // /averageOrderValue?date_filter=days&number_of_days=90
      const response = await axios.get(`${SERVER_DOMAIN}/averageOrderValue`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Create async thunk for fetching sales revenue graph data
export const fetchSalesRevenueGraph = createAsyncThunk(
  "overview/fetchSalesRevenueGraph",
  async (
    {
      date_filter,
      startDate,
      endDate,
      number_of_days,
    }: {
      date_filter: string;
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
        params.startDate = startDate;
        params.endDate = endDate;
      } else if (date_filter !== "today") {
        params.number_of_days = number_of_days;
      }

      // const response = await axios.get(`${SERVER_DOMAIN}/salesRevenueGraph`, {
      const response = await axios.get(
        `${SERVER_DOMAIN}/goGrubSalesRevenueGraph`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response data", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchSalesGrowthRate = createAsyncThunk(
  "overview/fetchSalesGrowthRate",
  async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${SERVER_DOMAIN}/goGrubSalesGrowthRate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        return "An unknown error occurred";
      }
    }
  }
);

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenAndClosedTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOpenAndClosedTickets.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.openAndClosedTickets = action.payload;
        }
      )
      .addCase(fetchOpenAndClosedTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCustomerData.pending, (state) => {
        state.customerDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerData.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.customerDataLoading = false;
          state.customerData = action.payload;
        }
      )
      .addCase(fetchCustomerData.rejected, (state, action) => {
        state.customerDataLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopMenuItems.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.topMenuItems = action.payload;
        }
      )
      .addCase(fetchTopMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTotalSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTotalSales.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.totalSales = action.payload;
        }
      )
      .addCase(fetchTotalSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCustomerTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.totalCustomerTransaction = action.payload;
        }
      )
      .addCase(fetchCustomerTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSalesGrowthRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSalesGrowthRate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.salesGrowthRate = action.payload;
        }
      )
      .addCase(fetchSalesGrowthRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAverageOrderValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAverageOrderValue.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.averageOrderValue = action.payload;
        }
      )
      .addCase(fetchAverageOrderValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSalesRevenueGraph.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSalesRevenueGraph.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.salesRevenueGraph = action.payload;
        }
      )
      .addCase(fetchSalesRevenueGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default overviewSlice.reducer;
