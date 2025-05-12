import { Switch, Modal, Box, Typography, IconButton } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";
import { Close, CheckCircle, ArrowBack } from "@mui/icons-material";
import { FaPlus } from "react-icons/fa6";
import DeliveryTable from "./DeliveryTable";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addDeliveryDetails,
  fetchDeliveryDetails,
} from "../../slices/assetSlice";
import { stateOptions } from "../../utils/stateOptions";

const DeliveryService = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isPickupEnabled, setIsPickupEnabled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [supportLink, setSupportLink] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    createLocation: false,
    showLocation: true,
  });
  const [isSchedulingEnabled, setIsSchedulingEnabled] = useState(false);

  useEffect(() => {
    dispatch(fetchDeliveryDetails());
  }, [dispatch]);

  const { deliveryDetails, loading } = useSelector(
    (state: RootState) => state.asset
  );

  const handleToggleChange = () => {
    setIsPickupEnabled((prev) => !prev);
  };

  const handleScheduleToggleChange = () => {
    setIsSchedulingEnabled((prev) => !prev);
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  const handleOpen = () => {
    // Dispatch action to add new delivery details
    dispatch(
      addDeliveryDetails({
        state: selectedState,
        fixedPrice: parseFloat(fixedPrice),
        support_link: supportLink,
        canScheduleOrder: isSchedulingEnabled,
      })
    )
      .unwrap()
      .then(() => {
        // Reset form fields after adding
        setSelectedState("");
        setFixedPrice("");
        setSupportLink("");
        setOpen(true);
      })
      .catch((error: any) => {
        console.error("Error adding delivery service:", error);
        toast.error(error || "Error while submitting. Try again");
      })
      .finally(() => {
        dispatch(fetchDeliveryDetails());
      });
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      createLocation: false,
      showLocation: true,
    });
  };

  const handleCreateLocation = () => {
    setState({
      createLocation: true,
      showLocation: false,
    });
  };

  return (
    <div className="h-full">
      {state.showLocation && !deliveryDetails && (
        <div className="flex justify-end mb-4">
          <button
            className="border border-[#090909] bg-[#090909] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]"
            onClick={handleCreateLocation}
          >
            Add New address
          </button>
        </div>
      )}

      {state.showLocation && !deliveryDetails && !loading ? (
        <div className="flex flex-col gap-6 items-center justify-center h-full w-full mt-[-100px]">
          <p>No location has been set yet</p>
          <div className="border border-purple500 bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500">
            <button
              className="text-[16px] flex items-center gap-[8px]"
              onClick={handleCreateLocation}
            >
              <FaPlus className="w-5 h-5 text-purple500" />
              Add location
            </button>
          </div>
        </div>
      ) : state.showLocation && deliveryDetails ? (
        <DeliveryTable deliveryDetails={deliveryDetails} />
      ) : state.createLocation ? (
        <div className="">
          <div
            className="cursor-pointer"
            onClick={() => {
              setState((prev: any) => ({
                ...prev,
                createLocation: false,
                showLocation: true,
              }));
              setSelectedState("");
              setFixedPrice("");
              setSupportLink("");
            }}
          >
            <ArrowBack />
            Back
          </div>
          <div className="flex items-center g-2.5">
            <span className="text-[#121212] text-base font-normal">
              Do you want to offer delivery service?
            </span>
            <Switch
              checked={isPickupEnabled}
              onChange={handleToggleChange}
              color="primary"
              style={{ color: isPickupEnabled ? "#5855B3" : "#929292" }}
            />
            <span
              className={clsx({
                "text-[#5855B3]": isPickupEnabled,
                "text-[#929292]": !isPickupEnabled,
                "text-base font-medium": true,
              })}
            >
              {isPickupEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          {isPickupEnabled && (
            <div className="mt-[80px] w-[60%] m-auto">
              <form className="space-y-6">
                <CustomSelect5
                  label="Select a state"
                  options={stateOptions}
                  value={selectedState}
                  onChange={handleStateChange}
                />
                <CustomInput
                  type="text"
                  label="Enter your fixed price"
                  value={fixedPrice}
                  onChange={(newValue) => setFixedPrice(newValue)}
                  className="border-gray-500"
                />
                <CustomInput
                  type="text"
                  label="Add your support link to your profile, WhatsApp, Instagram)"
                  value={supportLink}
                  onChange={(newValue) => setSupportLink(newValue)}
                  className="border-gray-500"
                />

                <div className="flex items-center g-2.5">
                  <span className="text-[#121212] text-base font-normal">
                    Do you want to enable scheduling of delivery for your
                    customers?
                  </span>
                  <Switch
                    checked={isSchedulingEnabled}
                    onChange={handleScheduleToggleChange}
                    color="primary"
                    style={{
                      color: isSchedulingEnabled ? "#5855B3" : "#929292",
                    }}
                  />
                  <span
                    className={clsx({
                      "text-[#5855B3]": isSchedulingEnabled,
                      "text-[#929292]": !isSchedulingEnabled,
                      "text-base font-medium": true,
                    })}
                  >
                    {isSchedulingEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>

                <button
                  type="button"
                  className="bg-[#0d0d0d] text-center text-white py-3 px-4 rounded"
                  onClick={handleOpen}
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </form>
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
                  Your delivery location has been published successfully.
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
      ) : null}
    </div>
  );
};

export default DeliveryService;
