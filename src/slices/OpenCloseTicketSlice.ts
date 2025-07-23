import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import { toast } from "react-toastify";

export const fetchOpenClosedTickets = createAsyncThunk(
  "fetchOpenClosedTickets",
  async (
    {
      date_filter,
      startDate,
      endDate,
      number_of_days,
      branch_id,
    }: {
      date_filter: string;
      startDate?: string;
      endDate?: string;
      number_of_days?: number;
      branch_id?: string;
    },
    { rejectWithValue }
  ) => {
    console.log("Fetching open and closed tickets with params:");

    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("filters", {
        branch_id,
        date_filter,
        startDate,
        endDate,
        number_of_days,
      });
      // https://troox-backend-new.vercel.app/api/getOpenAndClosedTickets?date_filter=days&number_of_days=90
      const response = await axios.get(
        `${SERVER_DOMAIN}/getGoGrubOpenAndClosedTickets/?branch_id=${branch_id}&date_filter=${date_filter}&startDate=${startDate}&endDate=${endDate}&number_of_days=${number_of_days}`,
        headers
      );
      console.log("call made", response.data);
      return response.data;
    } catch (error: any) {
      toast.error("Error retrieving open tickets");
      return rejectWithValue(
        error.response?.data?.message || "Error retrieving open tickets"
      );
    }
  }
);

export const OpenCloseTicketSlice = createSlice({
  name: "openCloseTicket",
  initialState: {
    openAndClosedTickets: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenClosedTickets.fulfilled, (state, action) => {
        // console.log("Received open and closed tickets:", action?.payload?.data);
        state.openAndClosedTickets = action.payload;
      })
      .addCase(fetchOpenClosedTickets.rejected, (state) => {
        state.openAndClosedTickets = [];
      })
      .addCase(fetchOpenClosedTickets.pending, (state) => {
        state.openAndClosedTickets = [];
      });
  },
});

export default OpenCloseTicketSlice.reducer;
