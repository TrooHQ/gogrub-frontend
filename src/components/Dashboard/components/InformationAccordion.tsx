import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Button,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { SERVER_DOMAIN } from "../../../Api/Api";
import imageIcon from "../../../assets/image60.png";
import { convertToBase64 } from "../../../utils/imageToBase64";
import { toast } from "react-toastify";
import { setUserData } from "../../../slices/UserSlice";
import { AppDispatch, RootState } from "../../../store/store";

type PersonalInfo = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

type BusinessInfo = {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  phoneNumber: string;
  businessType: string;
  cacNumber: string;
  businessLogo: any;
};

type BankInfo = {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bvn: string;
  bankCountry: string;
};

type FormData = {
  businessInfo: BusinessInfo;
  personalInfo: PersonalInfo;
  payoutBankDetails: BankInfo;
};

export default function InformationAccordion() {
  const dispatch = useDispatch<AppDispatch>();

  const userData = useSelector((state: any) => state.user.userData);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(
    null
  );
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
    businessName: false,
    ownerName: false,
    address: false,
    businessEmail: false,
    phoneNumber: false,
    businessType: false,
    cacNumber: false,
    firstName: false,
    lastName: false,
    city: false,
    state: false,
    country: false,
  });

  const [isSubmittingBankDetails, setIsSubmittingBankDetails] = useState(false);
  const [selectedBank, setSelectedBank] = useState<{
    name: string;
    code: string;
  } | null>(null);
  const [banks, setBanks] = useState<any[]>([]);

  const { userData: DataInfo, userDetails: userInfo } = useSelector(
    (state: RootState) => state.user
  );
  console.log("DataInfo", DataInfo);
  console.log("userInfo", userInfo);

  const [formData, setFormData] = useState<FormData>({
    businessInfo: {
      businessName:
        userInfo && userInfo?.business_name ? userInfo.business_name : "",
      businessAddress:
        userInfo && userInfo?.business_address ? userInfo.business_address : "",
      businessEmail:
        userInfo && userInfo?.business_email ? userInfo.business_email : "",
      phoneNumber:
        userInfo && userInfo?.phone_number ? userInfo.phone_number : "",
      businessType:
        userInfo && userInfo?.business_type ? userInfo.business_type : "",
      cacNumber: userInfo && userInfo?.cac_number ? userInfo?.cac_number : "",
      businessLogo:
        userInfo && userInfo?.business_logo
          ? userInfo?.business_logo
          : imageIcon,
    },
    personalInfo: {
      firstName: userInfo && userInfo?.first_name ? userInfo?.first_name : "",
      lastName: userInfo && userInfo?.last_name ? userInfo?.last_name : "",
      address:
        userInfo && userInfo?.personal_address
          ? userInfo?.personal_address
          : "",
      city: userInfo && userInfo?.city ? userInfo?.city : "",
      state: userInfo && userInfo?.state ? userInfo?.state : "",
      country: userInfo && userInfo?.country ? userInfo?.country : "Nigeria",
    },
    payoutBankDetails: {
      accountNumber: "",
      accountName: "",
      bankName: "",
      bvn: "",
      bankCountry: "Nigeria",
    },
  });

  const userDetails = useSelector((state: any) => state.user);
  const token = userDetails?.userData?.token;

  const getBanks = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${SERVER_DOMAIN}/getBanks`, headers);
      const { data } = response.data;

      setBanks(data);
      console.log(data);
    } catch (error: any) {
      console.error("Error fetching Banks:", error);
      toast.error(error?.response?.data?.message || "Error fetching Banks");
    }
  };

  const fetchAccountDetails = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/getAccountDetails`,
        headers
      );
      const { data } = response.data;

      setFormData({
        personalInfo: {
          firstName: data.personal_information.first_name,
          lastName: data.personal_information.last_name,
          address: data.personal_information.personal_address,
          city: data.personal_information.city,
          state: data.personal_information.state,
          country: data.personal_information.country,
        },
        businessInfo: {
          businessName: data.business_information.business_name,
          businessAddress: data.business_information.business_address,
          businessEmail: data.business_information.business_email,
          phoneNumber: data.business_information.business_phone_number,
          businessType: data.business_information.business_type,
          cacNumber: data.business_information.cac_number,
          businessLogo: data.business_information.business_logo,
        },
        payoutBankDetails: {
          accountNumber: data.account_details.account_number || "",
          accountName: data.account_details.account_name || "",
          bankName: data.account_details.bank_name || "",
          bvn: data.account_details.bank_verification_number || "",
          bankCountry: data.account_details.country || "Nigeria",
        },
      });

      if (data.account_details.bank_name) {
        const foundBank = banks.find(
          (bank) => bank.name === data.account_details.bank_name
        );
        if (foundBank) {
          setSelectedBank({ name: foundBank.name, code: foundBank.code });
        }
      }
    } catch (error: any) {
      console.error("Error fetching account details:", error);
      toast.error(
        error?.response?.data?.message || "Error fetching information"
      );
    }
  };

  useEffect(() => {
    getBanks();
    fetchAccountDetails();
  }, [token]);

  useEffect(() => {
    if (banks.length > 0 && formData.payoutBankDetails.bankName) {
      const foundBank = banks.find(
        (bank) => bank.name === formData.payoutBankDetails.bankName
      );
      if (foundBank) {
        setSelectedBank({ name: foundBank.name, code: foundBank.code });
      }
    }
  }, [banks, formData.payoutBankDetails.bankName]);

  useEffect(() => {
    const shouldVerify =
      formData.payoutBankDetails.accountNumber &&
      formData.payoutBankDetails.accountNumber.length >= 10 &&
      selectedBank?.code;

    if (shouldVerify) {
      const timeoutId = setTimeout(() => {
        VerifyAccountNumber();
      }, 1000); // I used Debounce for 1 second to avoid too many API calls

      return () => clearTimeout(timeoutId);
    }
  }, [formData.payoutBankDetails.accountNumber, selectedBank?.code]);

  const handleChange = (panel: string) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  // Update handleFileChange to handle logo upload
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // this  Stores the selected file temporarily

      //This Converts the file to base64 and store it for preview
      const base64 = await convertToBase64(file);
      setSelectedFileBase64(base64 as string);
    }
  };

  const handleClearLogo = () => {
    setSelectedFile(null); //this Clears the selected file
    setSelectedFileBase64(null); //this also Clears the base64 preview
  };

  const handleEditClick = async (
    field: keyof FormData["businessInfo"] | keyof FormData["personalInfo"],
    section: "businessInfo" | "personalInfo"
  ) => {
    const isCurrentlyInEditMode = editMode[field];
    // This Checks if the field is in edit mode, and if yes, send the update request
    if (isCurrentlyInEditMode) {
      const payload = {
        [toSnakeCase(field)]: (formData[section] as any)[field],
      };

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // this Determines the endpoint based on the section
        let endpoint = "";
        if (section === "businessInfo") {
          endpoint = `${SERVER_DOMAIN}/updateBusinessDetails`; //this is  Used for business info
        } else if (section === "personalInfo") {
          endpoint = `${SERVER_DOMAIN}/updatePersonalInformation`; // While this is Used for personal info
        }

        const response = await axios.put(endpoint, payload, { headers });
        fetchAccountDetails();
        console.log(`${section} field updated successfully:`, response.data);

        dispatch(
          setUserData({
            ...userData,
            [toSnakeCase(field)]: response.data.data[toSnakeCase(field)],
          })
        );
      } catch (error) {
        console.error(`Error updating ${section} field:`, error);
      }
    }

    //This Toggles the edit mode
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field],
    }));
  };

  // This Handles bank selection
  // const handleBankChange = (event: any, newValue: any) => {
  const handleBankChange = (newValue: any) => {
    if (newValue) {
      setSelectedBank({ name: newValue.name, code: newValue.code });
      setFormData((prevFormData) => ({
        ...prevFormData,
        payoutBankDetails: {
          ...prevFormData.payoutBankDetails,
          bankName: newValue.name,
        },
      }));
    } else {
      setSelectedBank(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        payoutBankDetails: {
          ...prevFormData.payoutBankDetails,
          bankName: "",
        },
      }));
    }
  };

  //This is the Function to verify account number
  const VerifyAccountNumber = async () => {
    try {
      const payload = {
        account_number: formData.payoutBankDetails.accountNumber,
        account_code: selectedBank?.code || "",
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${SERVER_DOMAIN}/verifyUserAccountNumber/`,
        payload,
        { headers }
      );

      console.log("Account verification response:", response.data);

      //this Updates account name if verification is successful and returns account name
      if (response.data?.data?.account_name) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          payoutBankDetails: {
            ...prevFormData.payoutBankDetails,
            accountName: response.data.data.account_name,
          },
        }));
        toast.success("Account verified successfully!");
      }
    } catch (error: any) {
      console.error("Error verifying account:", error);
      toast.error(error?.response?.data?.message || "Error verifying account");
    }
  };

  // this is a new function to handle bank details submission
  const handleBankDetailsSubmit = async () => {
    try {
      setIsSubmittingBankDetails(true);

      const payload = {
        user_id: DataInfo?.id,
        business_id: DataInfo?.business_identifier,
        account_number: formData.payoutBankDetails.accountNumber,
        account_name: formData.payoutBankDetails.accountName,
        bank_name: formData.payoutBankDetails.bankName,
        bank_verification_number: formData.payoutBankDetails.bvn,
        country: formData.payoutBankDetails.bankCountry,
        bank_code: selectedBank?.code || "", // this Includes bank code from selectedBank
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${SERVER_DOMAIN}/createAccountDetails`,
        payload,
        { headers }
      );

      console.log("Bank details added successfully:", response.data);
      toast.success("Bank details saved successfully!");

      //this  Optionally refresh the account details
      fetchAccountDetails();

      dispatch(
        setUserData({
          ...userData,
          ...response.data.data,
        })
      );
    } catch (error: any) {
      console.error("Error saving bank details:", error);
      toast.error(
        error?.response?.data?.message || "Error saving bank details"
      );
    } finally {
      setIsSubmittingBankDetails(false);
    }
  };

  const [isSavingLogo, setIsSavingLogo] = useState(false);
  const handleSaveLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    try {
      setIsSavingLogo(true);
      const base64Image = await convertToBase64(selectedFile);

      const payload = {
        business_logo: base64Image,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${SERVER_DOMAIN}/updateBusinessDetails`,
        payload,
        {
          headers,
        }
      );

      console.log("Logo updated successfully:", response.data);

      setFormData((prevFormData) => ({
        ...prevFormData,
        businessInfo: {
          ...prevFormData.businessInfo,
          business_logo: base64Image,
        },
      }));
      setSelectedFileBase64(null);
      toast.success("Logo updated successfully");
      fetchAccountDetails();

      dispatch(
        setUserData({
          ...userData,
          business_logo: response.data.data.business_logo, // this Updates only the changed field
        })
      );
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Error uploading logo");
    } finally {
      setIsSavingLogo(false);
    }
  };

  const handleInputChange =
    (
      section: "personalInfo" | "businessInfo" | "payoutBankDetails",
      subField: keyof PersonalInfo | keyof BusinessInfo | keyof BankInfo
    ) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (section === "payoutBankDetails" && subField === "bvn") {
          if (value.length > 0 && value.length < 11) {
            toast.error("BVN must be 11 digits");
          }
          if (value.length > 11) return;
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          [section]: {
            ...prevFormData[section],
            [subField]: value,
          },
        }));
      };

  const renderFields = (
    section: "personalInfo" | "businessInfo",
    fields: {
      label: string;
      field: keyof FormData["businessInfo"] | keyof FormData["personalInfo"];
    }[]
  ) =>
    fields.map((item) => (
      <div key={item.field} className="flex items-center gap-2">
        <TextField
          fullWidth
          value={(formData[section] as any)[item.field]}
          onChange={handleInputChange(section, item.field)}
          disabled={!editMode[item.field]}
          variant="outlined"
          label={item.label}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
          }}
        />
        <IconButton onClick={() => handleEditClick(item.field, section)}>
          {editMode[item.field] ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </div>
    ));

  const { payoutBankDetails } = formData;
  const isBankFormComplete =
    !!payoutBankDetails.accountNumber?.trim() &&
    !!payoutBankDetails.bankName?.trim() &&
    payoutBankDetails.bvn.trim().length >= 11 &&
    !!payoutBankDetails.bankCountry?.trim();

  console.log(isBankFormComplete);

  const renderBankFields = (
    fields: {
      label: string;
      field: keyof FormData["payoutBankDetails"];
    }[]
  ) =>
    fields.map((item) => {
      if (item.field === "bankName") {
        return (
          <div key={item.field} className="flex items-center gap-2">
            <Autocomplete
              fullWidth
              options={banks}
              getOptionLabel={(option) => option.name}
              value={selectedBank}
              onChange={handleBankChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={item.label}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "black" },
                      "&:hover fieldset": { borderColor: "black" },
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.code === value.code
              }
            />
          </div>
        );
      }

      if (item.field === "accountName") {
        return (
          <div key={item.field} className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.payoutBankDetails[item.field]}
              onChange={handleInputChange("payoutBankDetails", item.field)}
              variant="outlined"
              label={item.label}
              disabled={true}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
              }}
            />
          </div>
        );
      }

      return (
        <div key={item.field} className="flex items-center gap-2">
          <TextField
            fullWidth
            value={formData.payoutBankDetails[item.field]}
            onChange={handleInputChange("payoutBankDetails", item.field)}
            variant="outlined"
            label={item.label}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
            }}
          />
        </div>
      );
    });

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex gap-3 font-base text-normal text-blackish">
            Business Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-4">
          {renderFields("businessInfo", [
            { label: "Business Name", field: "businessName" },
            { label: "Business Address", field: "businessAddress" },
            { label: "Email", field: "businessEmail" },
            { label: "Phone Number", field: "phoneNumber" },
            { label: "Business Type", field: "businessType" },
            { label: "CAC Number", field: "cacNumber" },
          ])}

          <label
            htmlFor="logo"
            className="text-base font-medium text-[#121212] p-4"
          >
            Add Business Logo
          </label>
          <div className="flex items-center px-4 py-1 gap-[16px]">
            <label
              htmlFor="fileInput"
              className="w-[120px] border border-dashed p-[20px] border-[#5855B3] cursor-pointer"
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              {selectedFileBase64 ? (
                <img
                  src={selectedFileBase64}
                  alt="Selected Logo Preview"
                  className="w-[200px] object-cover"
                />
              ) : formData.businessInfo.businessLogo ? (
                <img
                  src={formData.businessInfo.businessLogo}
                  alt="Business Logo"
                  className="w-[200px] object-cover"
                />
              ) : (
                <img src={imageIcon} alt="Upload Icon" className="w-[200px]" />
              )}
            </label>
            <div>
              <label
                htmlFor="fileInput"
                className="text-[#121212] font-[500] text-[16px] mb-[8px] cursor-pointer"
              >
                Click to upload image
              </label>
              <p className="text-[14px] font-[400] text-grey300">
                Max. file size: 2MB
              </p>
            </div>
          </div>

          {selectedFileBase64 && (
            <div className="flex gap-2 px-4 py-2">
              <button
                className="bg-white text-[#5855B3] border border-[#5855B3] font-semibold py-2 px-4 rounded"
                onClick={(e: any) => handleSaveLogo(e)}
              >
                {isSavingLogo ? "Saving..." : "Save Logo"}
              </button>
              <button
                className="px-4 py-2 font-semibold text-red-500 bg-white border border-red-500 rounded"
                onClick={handleClearLogo}
              >
                Clear
              </button>
            </div>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="flex gap-3 font-base text-normal text-blackish">
            Personal Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-4">
          {renderFields("personalInfo", [
            { label: "First Name", field: "firstName" },
            { label: "Last Name", field: "lastName" },
            { label: "Address", field: "address" },
            { label: "City", field: "city" },
            { label: "State", field: "state" },
            { label: "Country", field: "country" },
          ])}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div className="flex gap-3 font-base text-normal text-blackish">
            Bank Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-4">
          {renderBankFields([
            { label: "Account Number", field: "accountNumber" },
            { label: "Account Name", field: "accountName" },
            { label: "Bank Name", field: "bankName" },
            { label: "BVN", field: "bvn" },
            { label: "Bank Country", field: "bankCountry" },
          ])}

          <div className="flex justify-end mt-4">
            <Button
              variant="contained"
              onClick={handleBankDetailsSubmit}
              disabled={isSubmittingBankDetails || !isBankFormComplete}
              sx={{
                backgroundColor: "#5855B3",
                "&:hover": {
                  backgroundColor: "#4A47A3",
                },
                textTransform: "none",
                fontWeight: "600",
                padding: "12px 24px",
              }}
            >
              {isSubmittingBankDetails ? "Saving..." : "Save Bank Details"}
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
