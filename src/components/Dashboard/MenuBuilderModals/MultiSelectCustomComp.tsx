import { useState } from 'react'
import { RxCaretDown } from 'react-icons/rx';




interface MultiSelectCustomCompProps {
  menuItemList: any[];
  isFetchingItemList?: boolean;
  setSelectedItems: (items: string[]) => void;
  label: string;
  description?: string;
  placeholder?: string;
  selectedItems: string[];
}


export default function MultiSelectCustomComp({ menuItemList, isFetchingItemList, setSelectedItems, label, description, placeholder, selectedItems }: MultiSelectCustomCompProps) {

  const [showMod, setShowMod] = useState(false);
  // const [selectedItems, setSelectedMod] = useState<string[]>([]);


  // const [selectedItems, setSelectedMod] = useState<string[]>([]);

  const handleSelectedMod = (value: string) => {
    if (selectedItems.includes(value)) {
      // setSelectedMod(selectedItems.filter((item) => item !== value));
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      // setSelectedMod([...selectedItems, value]);
      setSelectedItems([...selectedItems, value]);
    }
  };


  return (
    <div>
      <label className="block mb-1 text-sm font-semibold">{label} <span className='text-xs italic font-medium text-gray-400'>({description})</span></label>

      <div
        className="flex items-center justify-between w-full px-4 py-2 mb-2 border rounded"
        onClick={() => setShowMod(!showMod)}
      >
        {/* {selectedItems.length > 0 ? <p className="text-sm">{selectedItems}</p> : <p>Select modifier</p>} */}
        {selectedItems.length > 0 ? <p className="text-sm">{selectedItems.join(", ")}</p> : <p className="text-xs">{placeholder}</p>}
        <RxCaretDown className={`${showMod ? "rotate-180" : ""} w-6 h-6`} />
      </div>
      {showMod &&
        <div className={`duration-500 ease-in-out ${showMod ? "duration-500 ease-in-out h-[100%] block" : "duration-500 ease-in-out h-0 hidden"}`}>
          <div className={`flex flex-wrap gap-2 `}>
            {menuItemList.length === 0 && !isFetchingItemList && <p className="text-sm">No modifier groups found</p>}
            {menuItemList.map((mod) => (
              <span
                // onClick={() => handleSingleSelectmod(mod?.modifier_group_name)}
                onClick={() => handleSelectedMod(mod?.modifier_group_name)}
                key={mod?.id}
                className={`px-3 py-1 text-sm  rounded-full cursor-pointer hover:bg-gray-200 ${selectedItems.includes(mod?.modifier_group_name) ? "bg-gray-900 text-white" : "bg-gray-100"}`}
              >
                {mod?.modifier_group_name}
              </span>
            ))}
          </div>
        </div>
      }
    </div>
  )
}
