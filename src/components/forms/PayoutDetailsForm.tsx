import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setField } from "../../slices/bankRegisterSlice";
import { SERVER_DOMAIN } from "../../Api/Api";
import CustomInput from "../inputFields/CustomInput";
import axios from "axios";
import CustomSelect from "../inputFields/CustomSelect";

interface Bank {
  name: string;
  code: string;
}

const PayoutDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const [banks, setBanks] = useState<Bank[]>([]);
  const {
    bankAccountName,
    bankAccountNumber,
    bank,
    bankVerificationNumber,
    country,
  } = useSelector((state: RootState) => state.bankRegister);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const businessId = localStorage.getItem("businessId");

    if (userId) {
      dispatch(setField({ field: "userId", value: userId }));
    }
    if (businessId) {
      dispatch(setField({ field: "businessId", value: businessId }));
    }

    axios
      .get(`${SERVER_DOMAIN}/getBanks`)
      .then((response) => {
        // Extract the bank names from the response
        const bankDetails = response.data.data.map((bank: Bank) => ({
          name: bank.name,
          code: bank.code,
        }));
        setBanks(bankDetails);
      })
      .catch((error) => console.error("Error fetching banks:", error));
  }, [dispatch]);

  const handleInputChange = (
    field: keyof RootState["bankRegister"],
    value: string
  ) => {
    dispatch(setField({ field, value }));
  };

  const handleBankChange = (selectedBankName: any) => {
    const selectedBank = banks.find((bank) => bank.name === selectedBankName);
    if (selectedBank) {
      handleInputChange("bank", selectedBank.name);
      handleInputChange("bankCode", selectedBank.code);
    }
  };

  return (
    <div className="grid gap-5">
      <CustomInput
        type="text"
        label="Bank account name"
        value={bankAccountName}
        onChange={(newValue) => handleInputChange("bankAccountName", newValue)}
      />
      <CustomInput
        type="text"
        label="Bank account number"
        value={bankAccountNumber}
        onChange={(newValue) =>
          handleInputChange("bankAccountNumber", newValue)
        }
      />
      <CustomSelect
        label="Bank"
        value={bank}
        options={banks.map((bank) => bank.name)}
        onChange={handleBankChange}
      />
      <CustomInput
        type="text"
        label="Bank verification number"
        value={bankVerificationNumber}
        onChange={(newValue) =>
          handleInputChange("bankVerificationNumber", newValue)
        }
      />

      <CustomInput
        type="text"
        label="Country"
        value={country}
        onChange={(newValue) => handleInputChange("country", newValue)}
      />
    </div>
  );
};

export default PayoutDetailsForm;
