import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Modal, Box, Typography, IconButton } from "@mui/material";
import clsx from "clsx";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";
import { Close, CheckCircle, Clear, ArrowBack } from "@mui/icons-material";
import LocationTable from "./LocationTable";
import { FaPlus } from "react-icons/fa6";
import {
  fetchPickupLocations,
  addPickupLocation,
} from "../../slices/assetSlice";
import { AppDispatch, RootState } from "../../store/store";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { stateOptions } from "../../utils/stateOptions";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";

const PickupLocation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pickupLocations: locations, loading } = useSelector((state: RootState) => state.asset);

  const { businessInfo, } = useSelector((state: any) => state.allBusinessInfo);

  const [isPickupEnabled, setIsPickupEnabled] = useState(businessInfo?.picklocationEnabled);
  const [isSchedulingEnabled, setIsSchedulingEnabled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [addresses, setAddresses] = useState([""]);
  const [supportLink, setSupportLink] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    createLocation: false,
    showLocation: true,
  });

  useEffect(() => {
    dispatch(fetchPickupLocations());
  }, [dispatch]);


  const handleToggleChange = async () => {
    setIsPickupEnabled((isPickupEnabled: boolean) => !isPickupEnabled);
    // localStorage.setItem("online_ordering_pickup_enabled", JSON.stringify(!isPickupEnabled));

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
          picklocationEnabled: !isPickupEnabled,
        },
        { headers }
      );

      // console.log("res", response)
    } catch (e) {
      console.error("Error toggling delivery service:", e);
      toast.error("Error toggling delivery service. Please try again.");
    }
  };

  const handleScheduleToggleChange = () => {
    setIsSchedulingEnabled((prev) => !prev);
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  const handleOpen = () => {
    setOpen(true);
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

  const addAddressField = () => {
    setAddresses([...addresses, ""]);
  };

  const removeAddressField = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleSubmit = () => {
    if (!selectedState.trim()) {
      toast.error("State is required");
      return;
    }

    if (addresses.some((address) => !address.trim())) {
      toast.error("All pickup addresses are required");
      return;
    }

    if (!supportLink.trim()) {
      toast.error("Support link is required");
      return;
    }

    dispatch(
      addPickupLocation({
        state: selectedState,
        pickup_addresses: addresses,
        support_link: supportLink,
        canScheduleOrder: isSchedulingEnabled,
      })
    )
      .unwrap()
      .then(() => {
        handleOpen();
        setSelectedState("");
        setAddresses([""]);
        setSupportLink("");
      })
      .catch((error: any) => {
        console.error("Error adding pickup location:", error);
        toast.error("Error while submitting. Try again");
      })
      .finally(() => {
        dispatch(fetchPickupLocations());
      });
  };

  return (
    <div className="h-full">
      {state.showLocation && (
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center g-2.5">
            <span className="text-[#121212] text-base font-normal">
              Do you want to offer pickup service?
            </span>
            <Switch
              checked={isPickupEnabled}
              onChange={handleToggleChange}
              color="default"
              style={{ color: isPickupEnabled ? "black" : "#929292" }}
            />
            <span
              className={clsx({
                "text-[#121212]": isPickupEnabled,
                "text-[#929292]": !isPickupEnabled,
                "text-base font-medium": true,
              })}
            >
              {isPickupEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <button
            className="border border-[#0d0d0d] bg-[#0d0d0d] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]"
            onClick={handleCreateLocation}
            disabled={!isPickupEnabled}
            style={{ cursor: isPickupEnabled ? "pointer" : "not-allowed", opacity: isPickupEnabled ? 1 : 0.5 }}          >
            Add New Location
          </button>
        </div>
      )}

      {!isPickupEnabled ? (<div className="flex items-center justify-center mt-10">
        <p className="text-xl font-semibold text-gray-500">You have not enabled pickup service</p>
      </div>) : <>


        {state.showLocation && loading && locations.length === 0 ? (
          <Loader />
        ) : state.showLocation && locations.length === 0 ? (
          <div className="flex flex-col gap-6 items-center justify-center h-full w-full mt-[-100px]">
            <p>No location has been set yet</p>
            <div className="border border-black bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-gray-500">

              <button
                className="text-[16px] flex items-center gap-[8px]"
                onClick={handleCreateLocation}
              >
                <FaPlus className="w-5 h-5 text-gray-500" />
                Add new location
              </button>
            </div>
          </div>
        ) : state.showLocation && locations.length > 0 ? (
          <LocationTable branches={locations} />
        ) : state.createLocation ? (
          <div className="">
            <div
              className="cursor-pointer"
              onClick={() =>
                setState((prev: any) => ({
                  ...prev,
                  createLocation: false,
                  showLocation: true,
                }))
              }
            >
              <ArrowBack />
              Back
            </div>
            {/* <div className="flex items-center g-2.5">
            <span className="text-[#121212] text-base font-normal">
              Do you want to offer pickup service?
            </span>
            <Switch
              checked={isPickupEnabled}
              onChange={handleToggleChange}
              color="primary"
              style={{ color: isPickupEnabled ? "#5855B3" : "#929292" }}
            />
            <span
              className={clsx({
                "text-[#121212]": isPickupEnabled,
                "text-[#929292]": !isPickupEnabled,
                "text-base font-medium": true,
              })}
            >
              {isPickupEnabled ? "Enabled" : "Disabled"}
            </span>
          </div> */}
            {isPickupEnabled && (
              <div className="mt-[80px] w-[60%] m-auto">
                <form className="space-y-6">
                  <CustomSelect5
                    label="Select a state"
                    options={stateOptions}
                    value={selectedState}
                    onChange={handleStateChange}
                  />
                  {addresses.map((address, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CustomInput
                        type="text"
                        label="What is your pickup address?"
                        value={address}
                        onChange={(newValue) =>
                          handleAddressChange(index, newValue)
                        }
                        className="border-gray-500"
                        fullWidth
                      />
                      {index > 0 && (
                        <IconButton
                          onClick={() => removeAddressField(index)}
                          className="w-[5%] min-w-[24px] h-[24px]"
                        >
                          <Clear className="text-[#f03f3f]" fontSize="small" />
                        </IconButton>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="border border-[#0d0d0d] text-[#0d0d0d] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] bg-[#ffffff]"
                    onClick={addAddressField}
                  >
                    Add more addresses
                  </button>

                  <CustomInput
                    type="text"
                    label="Add your support link to your profile, WhatsApp, Instagram)"
                    value={supportLink}
                    onChange={(newValue) => setSupportLink(newValue)}
                    className="border-gray-500"
                  />

                  <div className="flex items-center g-2.5">
                    <span className="text-[#121212] text-base font-normal">
                      Do you want to enable scheduling of pickup for your
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
                        "text-[#121212]": isSchedulingEnabled,
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
                    onClick={handleSubmit}
                  >
                    {loading ? "Adding..." : "Add Location"}
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
                    Added
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
                    Your pickup location has been set successfully.
                  </Typography>
                  <button
                    type="button"
                    className="border border-[#0d0d0d] text-[#0d0d0d] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] mt-6 bg-[#ffffff]"
                    onClick={handleClose}
                  >
                    View pickup location
                  </button>
                </Box>
              </Box>
            </Modal>
          </div>
        ) : null}</>
      }
    </div>
  );
};

export default PickupLocation;
