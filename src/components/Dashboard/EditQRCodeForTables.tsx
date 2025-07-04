import React, { useState } from "react";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";

interface EditQRCodeProps {
  branchOptions: { label: string; value: string }[];
  qrCodeData: {
    _id: string;
    branch: string;
    number: string;
    location: string;
    group_name: string;
    total_guests: string;
  };
  onClose: () => void;
  onSave: () => void;
}

const EditQRCodeForTables: React.FC<EditQRCodeProps> = ({
  branchOptions,
  qrCodeData,
  onClose,
  onSave,
}) => {
  const [selectedBranch, setSelectedBranch] = useState(qrCodeData.branch);
  const [tableNumber, setTableNumber] = useState(qrCodeData.number);
  const [location, setLocation] = useState(qrCodeData.group_name);
  const [loading, setLoading] = useState(false);
  const [totalGuests, setTotalGuests] = useState(qrCodeData.total_guests);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.put(
        `${SERVER_DOMAIN}/asset/updateTableNumberOfGuests`,
        {
          tableId: qrCodeData._id,
          numberOfGuests: Number(totalGuests),
        },
        {
          headers,
        }
      );
      onSave();
    } catch (error) {
      console.error("Error saving QR code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%]">
      <div className="mt-3">
        <div>
          <p className="text-[24px] mb-[24px] font-[500] text-gray-500">
            Edit QR Code
          </p>
          <CustomSelect5
            options={branchOptions}
            label="Branch"
            value={selectedBranch}
            onChange={setSelectedBranch}
            readonly={true}
          />
        </div>
        <div className="mt-6 flex-grow">
          <CustomInput
            type="text"
            label="Table number"
            value={tableNumber}
            error=""
            onChange={setTableNumber}
            readOnly={true}
          />
        </div>
        <div className="mt-6 flex-grow">
          <CustomInput
            type="text"
            label="Location"
            value={location}
            error=""
            onChange={setLocation}
            readOnly={true}
          />
        </div>
        <div className="mt-6 flex-grow">
          <CustomInput
            type="text"
            label="Total Guests"
            value={totalGuests}
            error=""
            onChange={setTotalGuests}
          />
        </div>
        <div className="flex justify-end items-center gap-2 mt-7">
          <div
            className="border cursor-pointer border-black rounded px-[24px] py-[10px] font-[600] text-gray-500"
            onClick={onClose}
          >
            <p className="font-[500] text-[16px] text-gray-500 cursor-pointer">
              Cancel
            </p>
          </div>
          <div className="border border-black bg-black rounded px-[24px] py-[10px] font-[500] text-[#ffffff]">
            <button onClick={handleSave} className="text-[16px]">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQRCodeForTables;
