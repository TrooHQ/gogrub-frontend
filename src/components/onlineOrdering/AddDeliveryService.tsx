import { useEffect, useState } from 'react'
import CustomSelect5 from '../inputFields/CustomSelect5'
import CustomInput from '../inputFields/CustomInput'
import { Switch } from '@mui/material'
import { stateOptions } from "../../utils/stateOptions";
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDeliveryDetails,
  fetchDeliveryDetails,
  updateDeliveryDetails,
} from "../../slices/assetSlice";
import { AppDispatch, RootState } from '@/src/store/store';
import { toast } from 'react-toastify';


export default function AddDeliveryService({ editId, onClose, setOpen }: { editId?: string | null, onClose?: () => void, setOpen: (open: boolean) => void }) {

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchDeliveryDetails());
  }, [dispatch]);



  const { deliveryDetails, loading } = useSelector(
    (state: RootState) => state.asset
  );

  const [selectedState, setSelectedState] = useState(editId ? deliveryDetails?.state : "");

  const [fixedPrice, setFixedPrice] = useState(editId ? deliveryDetails?.fixedPrice : "");
  const [supportLink, setSupportLink] = useState(editId ? deliveryDetails?.support_link : "");
  const [isSchedulingEnabled, setIsSchedulingEnabled] = useState(editId ? deliveryDetails?.canScheduleOrder : false);
  // const [open, setOpen] = useState(false);

  // open && console.log("open")
  console.log("editIs", editId)



  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  const handleScheduleToggleChange = () => {
    setIsSchedulingEnabled((prev) => !prev);
  };

  const handleSubmit = () => {
    // Dispatch action to add new delivery details
    dispatch(
      addDeliveryDetails({
        state: selectedState,
        fixedPrice,
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

  // const [formData, setFormData] = useState(
  //   deliveryDetails || {
  //     state: "",
  //     fixedPrice: 0,
  //     support_link: "",
  //     canScheduleOrder: false,
  //   }
  // );

  console.log(deliveryDetails, "deliveryDetails");

  const handleSaveChanges = async () => {
    // setIsLoading(true);

    const payload = {
      state: selectedState,
      fixedPrice,
      support_link: supportLink,
      canScheduleOrder: isSchedulingEnabled,
    }
    try {
      await dispatch(updateDeliveryDetails(payload)).unwrap();
      dispatch(fetchDeliveryDetails());
      onClose && onClose()
      // setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update delivery details. Please try again.");
      console.error("Error updating delivery details:", error);
    } finally {
      // setIsLoading(false);
    }
  };



  return (
    <div className="px-4">
      {editId && <div className="flex items-center justify-between my-4">
        <h3>Edit Delivery Service</h3>
      </div>}

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
              "text-[#121212]": isSchedulingEnabled,
              "text-[#929292]": !isSchedulingEnabled,
              "text-base font-medium": true,
            })}
          >
            {isSchedulingEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className='flex items-center justify-between gap-2 '>

          <button
            type="button"
            className="bg-[#0d0d0d] text-center text-white py-3 px-4 rounded"
            onClick={editId ? handleSaveChanges : handleSubmit}
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
          {editId && <button
            type="button"
            className="bg-[#0d0d0d] text-center text-white py-3 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>}
        </div>
      </form>
    </div>
  )
}
