import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface BankRegisterState {
  userId: string;
  businessId: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bank: string;
  bankVerificationNumber: string;
  country: string;
  bankCode: string;
}

const initialState: BankRegisterState = {
  userId: "",
  businessId: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bank: "",
  bankVerificationNumber: "",
  country: "",
  bankCode: "",
};

const bankRegisterSlice = createSlice({
  name: "bankRegister",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ field: keyof BankRegisterState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    setFormData: (state, action: PayloadAction<Partial<BankRegisterState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setField, setFormData } = bankRegisterSlice.actions;

export const selectTransformedBankRegisterState = (state: RootState) => {
  return {
    user_id: state.bankRegister.userId,
    business_id: state.bankRegister.businessId,
    account_name: state.bankRegister.bankAccountName,
    account_number: state.bankRegister.bankAccountNumber,
    bank_name: state.bankRegister.bank,
    bank_verification_number: state.bankRegister.bankVerificationNumber,
    country: state.bankRegister.country,
    bank_code: state.bankRegister.bankCode,
  };
};

export default bankRegisterSlice.reducer;
