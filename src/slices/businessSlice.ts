import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";

interface BusinessDetails {
  name: string;
  id: number;
  business_name?: string;
  _id: number;
  business_logo: string;
  tableNumber: string;
  URL: string;
  colour_scheme: string;
}

interface BusinessState {
  _id: string | null;
  branchID: string | null;
  businessIdentifier: string | null;
  groupName: string;
  tableNo: string;
  URL: string;
  colour_scheme: string;
  businessDetails: BusinessDetails | null;
  accountDetails?: any;
  loading: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  _id: null,
  branchID: null,
  businessIdentifier: null,
  groupName: "default_group_name",
  tableNo: "",
  URL: "",
  businessDetails: null,
  colour_scheme: "",
  loading: false,
  error: null,
};

// Async thunk to fetch account details
export const fetchAccountDetails = createAsyncThunk(
  "business/fetchAccountDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}/getAccountDetails`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // return response.data.data.business_information;
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessIdentifier(state, action: PayloadAction<string>) {
      state.businessIdentifier = action.payload;
    },
    setBranchID(state, action: PayloadAction<string>) {
      state.branchID = action.payload;
    },
    setGroupName(state, action: PayloadAction<string>) {
      state.groupName = action.payload;
    },
    setTableNo(state, action: PayloadAction<string>) {
      state.tableNo = action.payload;
    },
    setURL(state, action: PayloadAction<string>) {
      state.URL = action.payload;
    },
    setBusinessDetails(state, action: PayloadAction<BusinessDetails>) {
      state.businessDetails = action.payload;
    },
    resetBusinessDetails(state) {
      state.businessIdentifier = initialState.businessIdentifier;
      state.branchID = initialState.branchID;
      state.groupName = initialState.groupName;
      state.tableNo = initialState.tableNo;
      state.businessDetails = initialState.businessDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(fetchAccountDetails.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.businessDetails = action.payload;
      //   state.colour_scheme = action.payload.colour_scheme;
      // })
      .addCase(fetchAccountDetails.fulfilled, (state, action) => {
        state.loading = false;

        const { business_information, account_details } = action.payload;

        state.businessDetails = business_information;
        state.accountDetails = account_details;
        state.colour_scheme = business_information.colour_scheme;
      })
      .addCase(fetchAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setBusinessIdentifier,
  setGroupName,
  setTableNo,
  setURL,
  setBranchID,
  setBusinessDetails,
  resetBusinessDetails,
} = businessSlice.actions;

export default businessSlice.reducer;
