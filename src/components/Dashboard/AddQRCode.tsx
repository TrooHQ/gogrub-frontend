import React from "react";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";

interface AddQRCodeProps {
  branchOptions: { label: string; value: string }[];
  handleCreateAsset: () => void;
  loading: boolean;
  selectedType: string;
  selectedBranch: string;
  handleBranchSelect: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  tableNumber: string;
  setTableNumber: (value: string) => void;
  onClose: any;
}

const AddQRCode: React.FC<AddQRCodeProps> = ({
  branchOptions,
  handleCreateAsset,
  loading,
  selectedBranch,
  handleBranchSelect,
  location,
  setLocation,
  tableNumber,
  setTableNumber,
  onClose,
}) => {
  return (
    <div className="w-[100%]">
      <div className="mt-3">
        <div>
          <p className="text-[24px] mb-[24px] font-[500] text-gray-500">
            Asset Arrangement
          </p>
          <CustomSelect5
            options={branchOptions}
            label="Branch"
            value={selectedBranch}
            onChange={handleBranchSelect}
          />
        </div>
        <div className="mt-6 flex-grow">
          <CustomInput
            type="text"
            label="Enter number of rooms"
            value={tableNumber}
            error=""
            onChange={(newValue) => setTableNumber(newValue)}
          />
        </div>
        <div className="mt-6 flex-grow">
          <CustomInput
            type="text"
            label="Location"
            value={location}
            error=""
            onChange={(newValue) => setLocation(newValue)}
          />
        </div>
        <div className="flex justify-end items-center gap-2 mt-7">
          <div
            className="border cursor-pointer border-purple500 rounded px-[24px] py-[10px] font-[600] text-gray-500"
            onClick={onClose}
          >
            <p className="font-[500] text-[16px] text-gray-500 cursor-pointer">
              Cancel
            </p>
          </div>
          <div className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff]">
            <button onClick={handleCreateAsset} className="text-[16px]">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQRCode;
