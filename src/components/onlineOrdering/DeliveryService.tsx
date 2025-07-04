import { Switch, Modal, Box, Typography, IconButton } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
// import CustomSelect5 from "../inputFields/CustomSelect5";
// import CustomInput from "../inputFields/CustomInput";
import { Close, CheckCircle, ArrowBack } from "@mui/icons-material";
import { FaPlus } from "react-icons/fa6";
import DeliveryTable from "./DeliveryTable";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  // addDeliveryDetails,
  fetchDeliveryDetails,
} from "../../slices/assetSlice";
// import { stateOptions } from "../../utils/stateOptions";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import AddDeliveryService from "./AddDeliveryService";

const DeliveryService = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { businessInfo, } = useSelector((state: any) => state.allBusinessInfo);

  console.log("businessInfo", businessInfo);


  const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(businessInfo?.deliveryEnabled);
  console.log("isDeliveryEnabled", isDeliveryEnabled);
  const [open, setOpen] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  // useEffect(() => {
  //   const storedValue = localStorage.getItem("online_ordering_delivery_enabled");
  //   setIsDeliveryEnabled(storedValue ? JSON.parse(storedValue) : false);
  // }, []);

  useEffect(() => {
    dispatch(fetchDeliveryDetails());
  }, [dispatch]);

  const { deliveryDetails, loading } = useSelector(
    (state: RootState) => state.asset
  );

  console.log("deliveryDetails service", deliveryDetails);

  const handleToggleChange = async () => {
    setIsDeliveryEnabled((prev: boolean) => !prev);

    const token = localStorage.getItem("token");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // const response = 
      await axios.put(
        `${SERVER_DOMAIN}/updateBusinessDetails`,
        {
          deliveryEnabled: !isDeliveryEnabled,
        },
        { headers }
      );

      // console.log("res", response)
    } catch (e) {
      console.error("Error toggling delivery service:", e);
      toast.error("Error toggling delivery service. Please try again.");
    }
    // localStorage.setItem("online_ordering_delivery_enabled", JSON.stringify(!isDeliveryEnabled));
  };

  const handleClose = () => {
    setOpen(false);
    setShowAdd(!showAdd);
  };

  const handleCreateLocation = () => {
    setShowAdd(!showAdd);
  };



  return (
    <div className="h-full">
      {!showAdd && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center g-2.5">
            <span className="text-[#121212] text-base font-normal">
              Do you want to offer delivery service?
            </span>
            <Switch
              checked={isDeliveryEnabled}
              onChange={handleToggleChange}
              color="primary"
              style={{ color: isDeliveryEnabled ? "#5855B3" : "#929292" }}
            />
            <span
              className={clsx({
                "text-[#121212]": isDeliveryEnabled,
                "text-[#929292]": !isDeliveryEnabled,
                "text-base font-medium": true,
              })}
            >
              {isDeliveryEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <button
            className="border border-[#090909] bg-[#090909] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]"
            onClick={handleCreateLocation}
            disabled={!isDeliveryEnabled}
            style={{ opacity: isDeliveryEnabled ? 1 : 0.5, cursor: isDeliveryEnabled ? "pointer" : "not-allowed" }}
          >
            Add New address
          </button>
        </div>
      )}

      {!isDeliveryEnabled ? (
        <div className="flex items-center justify-center mt-10">
          <p className="text-xl font-semibold text-gray-500">You do not have delivery service enabled.</p>
        </div>
      ) :
        <>
          {!showAdd && !deliveryDetails && !loading ? (
            <div className="flex flex-col gap-6 items-center justify-center h-full w-full mt-[-100px]">
              <p>No location has been set yet</p>
              <div className="border border-purple500 bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-gray-500">
                <button
                  className="text-[16px] flex items-center gap-[8px]"
                  onClick={handleCreateLocation}
                >
                  <FaPlus className="w-5 h-5 text-gray-500" />
                  Add location
                </button>
              </div>
            </div>
          ) : !showAdd && deliveryDetails ? (
            <DeliveryTable deliveryDetails={deliveryDetails} />
          ) : showAdd ? (
            <div className="">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowAdd(!showAdd);
                }}
              >
                <ArrowBack />
                Back
              </div>

              {isDeliveryEnabled && (
                <div className="mt-[80px] w-[60%] m-auto">
                  <AddDeliveryService />
                </div>
              )}

              <Modal open={open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                  }}
                >
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <Close />
                  </IconButton>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <CheckCircle sx={{ fontSize: 60, color: "green" }} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Updated
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
                      Your delivery location has been set successfully.
                    </Typography>
                    <button
                      type="button"
                      className="border border-[#090909] text-[#090909] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] mt-6 bg-[#ffffff]"
                      onClick={handleClose}
                    >
                      View delivery
                    </button>
                  </Box>
                </Box>
              </Modal>
            </div>
          ) : null}</>}
    </div>
  );
};

export default DeliveryService;
