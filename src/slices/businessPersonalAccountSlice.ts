import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";

const initialState: any = {
  businessInfo: {},
  personalInfo: {},
  AccountInfo: {},
  loading: true,
  error: null,
};

export const fetchAllBusinessInfo = createAsyncThunk(
  "allBusinessInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}/getAccountDetails`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("all business info", response);
      // return response.data.data.business_information;
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const businessInfoSlice = createSlice({
  name: "allBusinessInfoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBusinessInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBusinessInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.businessInfo = action.payload.business_information;
        state.personalInfo = action.payload.personal_information;
        state.AccountInfo = action.payload.account_details;
      })
      .addCase(fetchAllBusinessInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default businessInfoSlice.reducer;
