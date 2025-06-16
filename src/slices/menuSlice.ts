import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";

interface MenuCategory {
  _id: string;
  created_by: string;
  branch: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
}

interface MenuCategoryResponse {
  data: MenuCategory[];
}

interface MenuGroup {
  _id: string;
  created_by: string;
  branch: string;
  menu_category_name: string;
  name: string;
  price_to_all_items: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MenuGroupResponse {
  data: MenuGroup[];
}

interface MenuItem {
  _id: string;
  created_by: string;
  branch: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_price: number;
  menu_item_image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MenuItemResponse {
  data: MenuItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

interface MenuItemsByGroupResponse {
  data: MenuItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

interface MenuState {
  categories: MenuCategory[];
  menuGroups: MenuGroup[];
  menuItems: MenuItem[];
  menuItems2: MenuItem[];
  menuItemsWithoutStatus: MenuItem[];
  menuItemsByGroup: MenuItem[];
  loading: boolean;
  mgLoading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: MenuState = {
  categories: [],
  menuGroups: [],
  menuItems: [],
  menuItems2: [],
  menuItemsWithoutStatus: [],
  menuItemsByGroup: [],
  loading: false,
  mgLoading: false,
  error: null,
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 10,
};

export const fetchMenuCategories = createAsyncThunk<
  MenuCategory[],
  string,
  { rejectValue: string }
>(
  "menu/fetchMenuCategories",
  async (branch_id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get<MenuCategoryResponse>(
        `${SERVER_DOMAIN}/menu/getAllMenuCategory/?branch_id=${branch_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
    }
  }
);

export const fetchMenuGroups = createAsyncThunk<
  MenuGroup[],
  { branch_id: string; menu_category_name: any },
  { rejectValue: string }
>(
  "menu/fetchMenuGroups",
  async ({ branch_id, menu_category_name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<MenuGroupResponse>(
        `${SERVER_DOMAIN}/menu/getAllMenuGroup/?branch_id=${branch_id}&menu_category_name=${menu_category_name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
    }
  }
);

export const fetchMenuItems = createAsyncThunk<
  MenuItem[],
  { branch_id: string; menu_group_name?: any },
  { rejectValue: string }
>(
  "menu/fetchMenuItems",
  async ({ branch_id, menu_group_name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Construct the query string
      let queryString = `branch_id=${branch_id}`;
      if (menu_group_name !== undefined && menu_group_name !== null) {
        queryString += `&menu_group_name=${menu_group_name}`;
      }

      const response = await axios.get<MenuItemResponse>(
        `${SERVER_DOMAIN}/menu/filterMenuItems/?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
    }
  }
);

export const fetchMenuItems2 = createAsyncThunk<
  {
    data: MenuItem[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  },
  { branch_id: string; menu_group_name?: any; page?: number },
  { rejectValue: string }
>(
  "menu/fetchMenuItems2",
  async ({ branch_id, menu_group_name, page = 1 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Construct the query string with pagination
      let queryString = `branch_id=${branch_id}&page=${page}`;
      if (menu_group_name !== undefined && menu_group_name !== null) {
        queryString += `&menu_group_name=${menu_group_name}`;
      }

      const response = await axios.get<MenuItemResponse>(
        `${SERVER_DOMAIN}/menu/filterMenuItems/?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        data: response.data.data,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        itemsPerPage: response.data.itemsPerPage,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
    }
  }
);

export const fetchMenuItemsWithoutStatus = createAsyncThunk<
  MenuItemsByGroupResponse,
  { branch_id: string; menu_group_name?: string; page?: number },
  { rejectValue: string }
>(
  "menu/fetchMenuItemsWithoutStatus",
  async ({ branch_id, menu_group_name, page }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Construct the query string
      let queryString = `branch_id=${branch_id}`;
      if (menu_group_name !== undefined && menu_group_name !== null) {
        queryString += `&menu_group_name=${menu_group_name}`;
      }
      if (page !== undefined && page !== null) {
        queryString += `&page=${page}`;
      }

      const response = await axios.get<MenuItemsByGroupResponse>(
        `${SERVER_DOMAIN}/menu/filterMenuItemsWithoutStatus/?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
    }
  }
);

export const fetchMenuItemsByMenuGroup = createAsyncThunk<
  MenuItemsByGroupResponse,
  { branch_id: string; menu_group_name?: string; page: number },
  { rejectValue: string }
>(
  "menu/fetchMenuItemsByMenuGroup",
  async ({ branch_id, menu_group_name, page }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Construct the query string
      let queryString = `branch_id=${branch_id}`;
      if (menu_group_name !== undefined && menu_group_name !== null) {
        queryString += `&menu_group_name=${menu_group_name}`;
      }

      if (page !== undefined && page !== null) {
        queryString += `&page=${page}`;
      }

      const response = await axios.get<MenuItemsByGroupResponse>(
        `${SERVER_DOMAIN}/menu/filterMenuItems/?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMenuCategories.fulfilled,
        (state, action: PayloadAction<MenuCategory[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        fetchMenuCategories.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.mgLoading = false;
          state.error = action.payload || "Failed to fetch menu categories";
        }
      )
      .addCase(fetchMenuGroups.pending, (state) => {
        state.mgLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMenuGroups.fulfilled,
        (state, action: PayloadAction<MenuGroup[]>) => {
          state.mgLoading = false;
          state.menuGroups = action.payload;
        }
      )
      .addCase(
        fetchMenuGroups.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch menu categories";
        }
      )
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMenuItems.fulfilled,
        (state, action: PayloadAction<MenuItem[]>) => {
          state.loading = false;
          state.menuItems = action.payload;
        }
      )
      .addCase(
        fetchMenuItems.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch menu categories";
        }
      )
      .addCase(fetchMenuItems2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMenuItems2.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: MenuItem[];
            totalItems: number;
            totalPages: number;
            currentPage: number;
            itemsPerPage: number;
          }>
        ) => {
          state.loading = false;
          state.menuItems2 = action.payload.data;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
          state.itemsPerPage = action.payload.itemsPerPage;
        }
      )
      .addCase(
        fetchMenuItems2.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch menu items";
        }
      )
      .addCase(fetchMenuItemsWithoutStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMenuItemsWithoutStatus.fulfilled,
        (state, action: PayloadAction<MenuItemsByGroupResponse>) => {
          state.loading = false;
          state.menuItemsWithoutStatus = action.payload.data;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(
        fetchMenuItemsWithoutStatus.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch menu categories";
        }
      )
      .addCase(fetchMenuItemsByMenuGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMenuItemsByMenuGroup.fulfilled,
        (state, action: PayloadAction<MenuItemsByGroupResponse>) => {
          state.loading = false;
          state.menuItemsByGroup = action.payload.data;
        }
      )
      .addCase(
        fetchMenuItemsByMenuGroup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch menu categories";
        }
      );
  },
});

export default menuSlice.reducer;
