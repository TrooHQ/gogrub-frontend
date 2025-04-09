import React, { useState } from "react";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";

interface AddQRCodeProps {
  branchOptions: { label: string; value: string }[];
  handleCreateAsset: () => void;
  loading: boolean;
  selectedBranch: string;
  handleBranchSelect: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  onClose: any;
  tableArr: any;
  setTableArr: any;
}

const AddQRCodeForTable: React.FC<AddQRCodeProps> = ({
  branchOptions,
  handleCreateAsset,
  loading,
  selectedBranch,
  handleBranchSelect,
  location,
  setLocation,
  onClose,
  tableArr,
  setTableArr,
}) => {
  const [step, setStep] = useState(1);
  const [tableCount, setTableCount] = useState(0);

  const handleNext = () => {
    if (!selectedBranch || !location) {
      alert("Please fill all fields before proceeding.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleTableCountChange = (value: string) => {
    const count = Number(value);
    setTableCount(count);
    setTableArr(
      Array.from({ length: count }, (_, index) => ({
        table_number: index + 1,
        guests: 0,
      }))
    );
  };

  return (
    <div className="w-[100%]">
      <div className="mt-3">
        <p className="text-[24px] mb-[24px] font-[500] text-purple500">
          Asset Arrangement
        </p>

        {/* Step 1: Branch & Location */}
        {step === 1 && (
          <>
            <CustomSelect5
              options={branchOptions}
              label="Branch"
              value={selectedBranch}
              onChange={handleBranchSelect}
            />

            <div className="mt-6 flex-grow">
              <CustomInput
                type="text"
                label="Location"
                value={location}
                error=""
                onChange={setLocation}
              />
            </div>

            <div className="flex justify-end items-center gap-2 mt-7">
              <button
                className="border border-purple500 rounded px-[24px] py-[10px] font-[600] text-purple500"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-white"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2: Table Inputs */}
        {step === 2 && (
          <>
            <div className="mt-6">
              <CustomInput
                type="number"
                label="How many tables do you have?"
                value={tableCount.toString()}
                error=""
                onChange={handleTableCountChange}
              />
            </div>

            <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">
                Number of Seats by Table
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {tableArr.map(
                  (
                    table: {
                      table_number: any;
                      guests: { toString: () => string | number };
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <div key={index}>
                      <CustomInput
                        type="number"
                        label={`Seats at Table ${table.table_number}`}
                        value={table.guests.toString()}
                        onChange={(newValue) => {
                          setTableArr((prevArr: any[]) =>
                            prevArr.map((t) =>
                              t.table_number === table.table_number
                                ? { ...t, guests: Number(newValue) }
                                : t
                            )
                          );
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-end items-center gap-2 mt-7">
              <button
                className="border border-purple500 rounded px-[24px] py-[10px] font-[600] text-purple500"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-white"
                onClick={handleCreateAsset}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddQRCodeForTable;
