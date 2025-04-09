import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import { toast } from "react-toastify";

// Define TypeScript interfaces for the data structure
interface PickupLocation {
  _id: string;
  created_by: string;
  state: string;
  address: string;
  support_link: string;
  canScheduleOrder?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DeliveryDetails {
  _id: string;
  created_by: string;
  fixedPrice: number;
  support_link: string;
  canScheduleOrder?: boolean;
  state: string;
  createdAt: string;
  updatedAt: string;
}

interface OnlineOrderingLink {
  url: string;
  qrCode: string;
}

interface PickupLocationResponse {
  message: string;
  data: PickupLocation[];
}

interface DeliveryDetailsResponse {
  message: string;
  data: DeliveryDetails;
}

interface OnlineOrderingLinkResponse {
  message: string;
  data: OnlineOrderingLink;
}

interface AddPickupLocationPayload {
  state: string;
  pickup_addresses: string[];
  support_link: string;
  canScheduleOrder: boolean;
}

interface DeliveryDetailsPayload {
  fixedPrice: number;
  support_link: string;
  state: string;
  canScheduleOrder: boolean;
}

interface AssetState {
  pickupLocations: PickupLocation[];
  deliveryDetails: DeliveryDetails | null;
  onlineOrderingLink: OnlineOrderingLink | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AssetState = {
  pickupLocations: [],
  deliveryDetails: null,
  onlineOrderingLink: null,
  loading: false,
  error: null,
};

// Async thunk for fetching pickup locations
export const fetchPickupLocations = createAsyncThunk<
  PickupLocation[],
  void,
  { rejectValue: string }
>("asset/fetchPickupLocations", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<PickupLocationResponse>(
      `${SERVER_DOMAIN}/asset/getPickUpLocation/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch pickup locations"
    );
  }
});

// Async thunk for adding a new pickup location
export const addPickupLocation = createAsyncThunk<
  PickupLocation,
  AddPickupLocationPayload,
  { rejectValue: string }
>("asset/addPickupLocation", async (pickupData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post<PickupLocation>(
      `${SERVER_DOMAIN}/asset/addPickUpLocation/`,
      pickupData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add pickup location"
    );
  }
});

export const fetchDeliveryDetails = createAsyncThunk<
  DeliveryDetails,
  void,
  { rejectValue: string }
>("asset/fetchDeliveryDetails", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<DeliveryDetailsResponse>(
      `${SERVER_DOMAIN}/asset/getDeliveryDetails/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch delivery details"
    );
  }
});

export const addDeliveryDetails = createAsyncThunk<
  DeliveryDetails,
  DeliveryDetailsPayload,
  { rejectValue: string }
>("asset/addDeliveryDetails", async (deliveryData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post<DeliveryDetails>(
      `${SERVER_DOMAIN}/asset/addDeliveryDetails/`,
      deliveryData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add delivery details"
    );
  }
});

export const updateDeliveryDetails = createAsyncThunk<
  DeliveryDetails,
  DeliveryDetailsPayload,
  { rejectValue: string }
>("asset/updateDeliveryDetails", async (deliveryData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put<DeliveryDetails>(
      `${SERVER_DOMAIN}/asset/editDeliveryDetails/`,
      deliveryData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update delivery details"
    );
  }
});

export const fetchOnlineOrderingLink = createAsyncThunk<
  OnlineOrderingLink,
  void,
  { rejectValue: string }
>("asset/fetchOnlineOrderingLink", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<OnlineOrderingLinkResponse>(
      `${SERVER_DOMAIN}/asset/generateOnlineOrderingLink/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  } catch (error: any) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Failed to fetch delivery details"
    );
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch delivery details"
    );
  }
});

// Create the asset slice
const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPickupLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPickupLocations.fulfilled,
        (state, action: PayloadAction<PickupLocation[]>) => {
          state.loading = false;
          state.pickupLocations = action.payload;
        }
      )
      .addCase(fetchPickupLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(addPickupLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addPickupLocation.fulfilled,
        (state, action: PayloadAction<PickupLocation>) => {
          state.loading = false;
          state.pickupLocations.push(action.payload);
        }
      )
      .addCase(addPickupLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(fetchDeliveryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDeliveryDetails.fulfilled,
        (state, action: PayloadAction<DeliveryDetails>) => {
          state.loading = false;
          state.deliveryDetails = action.payload;
        }
      )
      .addCase(fetchDeliveryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        state.deliveryDetails = null;
      })
      .addCase(fetchOnlineOrderingLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOnlineOrderingLink.fulfilled,
        (state, action: PayloadAction<OnlineOrderingLink>) => {
          state.loading = false;
          state.onlineOrderingLink = action.payload;
        }
      )
      .addCase(fetchOnlineOrderingLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(addDeliveryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addDeliveryDetails.fulfilled,
        (state, action: PayloadAction<DeliveryDetails>) => {
          state.loading = false;
          state.deliveryDetails = action.payload;
        }
      )
      .addCase(addDeliveryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(updateDeliveryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDeliveryDetails.fulfilled,
        (state, action: PayloadAction<DeliveryDetails>) => {
          state.loading = false;
          state.deliveryDetails = action.payload;
        }
      )
      .addCase(updateDeliveryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default assetSlice.reducer;
