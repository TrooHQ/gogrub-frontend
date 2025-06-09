// ticketSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import { toast } from "react-toastify";

interface TicketState {
  orderData: any[];
  loadingOrder: boolean;
  orderError: string | null;

  openOrderData: any[];
  loadingOpenOrder: boolean;
  openOrderError: string | null;

  closedOrderData: any[];
  loadingCloseOrder: boolean;
  closeOrdererror: string | null;
}

const initialState: TicketState = {
  orderData: [],
  loadingOrder: false,
  orderError: null,

  openOrderData: [],
  loadingOpenOrder: false,
  openOrderError: null,

  closedOrderData: [],
  loadingCloseOrder: false,
  closeOrdererror: null,
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// Async thunk for getting tickets
export const fetchTickets = createAsyncThunk<
  [],
  { selectedBranch: { id: string } },
  { rejectValue: string }
>("tickets/fetchTickets", async ({ selectedBranch }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${SERVER_DOMAIN}/order/getOrderbyType/?branch_id=${selectedBranch.id}&queryType=ticket`,
      getAuthHeaders()
    );
    return response.data.data;
  } catch (error: any) {
    toast.error("Error retrieving tickets");
    return rejectWithValue(
      error.response?.data?.message || "Error retrieving tickets"
    );
  }
});

// Async thunk for getting open tickets
export const fetchOpenTickets = createAsyncThunk<
  [],
  { selectedBranch: { id: string } },
  { rejectValue: string }
>(
  "tickets/fetchOpenTickets",
  async ({ selectedBranch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getGogrubOpenTickets/?branch_id=${selectedBranch.id}`,
        getAuthHeaders()
      );
      return response.data.data;
    } catch (error: any) {
      toast.error("Error retrieving open tickets");
      return rejectWithValue(
        error.response?.data?.message || "Error retrieving open tickets"
      );
    }
  }
);

// Async thunk for getting closed tickets
export const fetchClosedTickets = createAsyncThunk<
  [],
  { selectedBranch: { id: string } },
  { rejectValue: string }
>(
  "tickets/fetchClosedTickets",
  async ({ selectedBranch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getGogrubClosedTicket/?branch_id=${selectedBranch.id}`,
        getAuthHeaders()
      );
      return response.data.data;
    } catch (error: any) {
      toast.error("Error retrieving closed tickets");
      return rejectWithValue(
        error.response?.data?.message || "Error retrieving closed tickets"
      );
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    // You can add any synchronous reducers here if needed
    clearTickets: (state) => {
      state.orderData = [];
      state.openOrderData = [];
      state.closedOrderData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTickets cases
      .addCase(fetchTickets.pending, (state) => {
        state.loadingOrder = true;
        state.orderError = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<[]>) => {
        state.loadingOrder = false;
        state.orderData = action.payload;
      })
      .addCase(
        fetchTickets.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loadingOrder = false;
          state.orderError = action.payload || "Failed to fetch tickets";
        }
      )

      // fetchOpenTickets cases
      .addCase(fetchOpenTickets.pending, (state) => {
        state.loadingOpenOrder = true;
        state.openOrderError = null;
      })
      .addCase(
        fetchOpenTickets.fulfilled,
        (state, action: PayloadAction<[]>) => {
          state.loadingOpenOrder = false;
          state.openOrderData = action.payload;
        }
      )
      .addCase(
        fetchOpenTickets.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loadingOpenOrder = false;
          state.openOrderError =
            action.payload || "Failed to fetch open tickets";
        }
      )

      // fetchClosedTickets cases
      .addCase(fetchClosedTickets.pending, (state) => {
        state.loadingCloseOrder = true;
        state.closeOrdererror = null;
      })
      .addCase(
        fetchClosedTickets.fulfilled,
        (state, action: PayloadAction<[]>) => {
          state.loadingCloseOrder = false;
          state.closedOrderData = action.payload;
        }
      )
      .addCase(
        fetchClosedTickets.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loadingCloseOrder = false;
          state.closeOrdererror =
            action.payload || "Failed to fetch closed tickets";
        }
      );
  },
});

export const { clearTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
