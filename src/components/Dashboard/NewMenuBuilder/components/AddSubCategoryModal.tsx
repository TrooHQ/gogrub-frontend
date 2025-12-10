import CustomInput from "../../../inputFields/CustomInput";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface SubCategory {
  name: string;
  description: string;
  isActive: boolean;
}

interface AddSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subCategory: SubCategory) => void;
  parentCategoryName?: string;
}

const AddSubCategoryModal = ({
  isOpen,
  onClose,
  onAdd,
  parentCategoryName = "[Category_name]",
}: AddSubCategoryModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleAdd = () => {
    if (!name) return; // Add validation logic/error message
    onAdd({ name, description, isActive });
    setName("");
    setDescription("");
    setIsActive(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-[500px] bg-white rounded-[16px] p-[24px] relative">
        <div className="flex justify-between items-center mb-[8px]">
          <h2 className="text-[20px] font-[600] text-[#101010]">
            Add sub-category
          </h2>
          <button onClick={onClose}>
            <FaXmark className="text-[20px] text-grey500" />
          </button>
        </div>
        <p className="text-[14px] text-grey300 mb-[24px]">
          Add a new subcategory under "{parentCategoryName}"
        </p>

        <div className="space-y-[24px]">
          <div>
            <p className="text-[14px] font-[500] text-[#344054] mb-[6px]">
              Sub-category name
            </p>
            {/* The design has a chevron, implying dropdown, but we are using input based on previous context. 
                If a dropdown is required later, we can swap. */}
            <CustomInput
              type="text"
              label="e.g Toppings"
              value={name}
              onChange={setName}
              error=""
            />
          </div>

          <div>
            <p className="text-[14px] font-[500] text-[#344054] mb-[6px]">
              Description
            </p>
            <textarea
              className="w-full h-[80px] border border-grey200 rounded-[8px] p-[12px] text-[16px] text-[#101010] outline-none resize-none focus:border-[#101010]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[14px] font-[600] text-[#101010]">Show as active</p>
              <p className="text-[12px] text-grey300">This category will be visible on the menu.</p>
            </div>

            {/* Simple Toggle Switch */}
            <div
              className={`w-[44px] h-[24px] rounded-full p-[2px] cursor-pointer transition-colors ${isActive ? 'bg-[#101010]' : 'bg-gray-200'}`}
              onClick={() => setIsActive(!isActive)}
            >
              <div className={`w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-[20px]' : 'translate-x-[0px]'}`} />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-[12px] mt-[32px]">
          <button
            onClick={onClose}
            className="px-[16px] py-[8px] rounded border border-grey200 text-[#101010] font-[600] text-[14px] hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-[16px] py-[8px] rounded bg-[#0A0A0A] text-white font-[500] text-[14px] hover:bg-black/90"
          >
            Add sub-category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
