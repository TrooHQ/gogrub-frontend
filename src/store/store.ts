import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../slices/authSlice";
import setupReducer from "../slices/setupSlice";
import inviteUserReducer from "../slices/InviteUserSlice";
import faqSettingReducer from "../slices/FaqSettingSlice";
import userReducer from "../slices/UserSlice";
import businessReducer from "../slices/businessSlice";
import registerReducer from "../slices/registerSlice";
import bankRegisterReducer from "../slices/bankRegisterSlice";
import basketReducer from "../slices/BasketSlice";
import branchReducer from "../slices/branchSlice";
import rolesReducer from "../slices/rolesSlice";
import menuReducer from "../slices/menuSlice";
import assetReducer from "../slices/assetSlice";
import tableReducer from "../slices/TableSlice";
import outletReducer from "../slices/OutletSlice";
import overviewReducer from "../slices/overviewSlice";
import TicketReducer from "../slices/ticketsSlice";
import OpenCloseTicketReducer from "../slices/OpenCloseTicketSlice";
import allBusinessInfoReducer from "../slices/businessPersonalAccountSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  setup: setupReducer,
  inviteUser: inviteUserReducer,
  faqSetting: faqSettingReducer,
  user: userReducer,
  business: businessReducer,
  register: registerReducer,
  bankRegister: bankRegisterReducer,
  basket: basketReducer,
  branches: branchReducer,
  roles: rolesReducer,
  menu: menuReducer,
  asset: assetReducer,
  tables: tableReducer,
  outlet: outletReducer,
  overview: overviewReducer,
  tickets: TicketReducer,
  openCloseTickets: OpenCloseTicketReducer,
  allBusinessInfo: allBusinessInfoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "setup",
    "inviteUser",
    "faqSetting",
    "user",
    "business",
    "basket",
    "branches",
    "roles",
    "menu",
    "asset",
    "tables",
    "outlet",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
