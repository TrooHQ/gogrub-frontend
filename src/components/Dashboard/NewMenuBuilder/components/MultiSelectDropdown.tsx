import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export interface OptionItem {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  label?: string;
  options: OptionItem[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  width?: number | string;
}

export default function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  width = "100%",
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  return (
    <div
      className="relative w-full"
      style={{ width }}
      ref={dropdownRef}
    >
      {/* Trigger */}
      <div
        className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white cursor-pointer flex justify-between items-center transition-colors ${isOpen ? "border-[#101010]" : "hover:border-gray-400"
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`text-[16px] truncate ${selectedValues.length > 0 ? "text-[#101010]" : "text-gray-400"
            }`}
        >
          {selectedValues.length > 0
            ? `${options.filter((option) => selectedValues.includes(option.value)).map((option) => option.label).join(", ")}`
            : placeholder}
        </span>
        {isOpen ? (
          <FaChevronUp className="text-gray-500 text-sm" />
        ) : (
          <FaChevronDown className="text-gray-500 text-sm" />
        )}
      </div>

      {label && (
        <label
          className={`absolute transition-all duration-300 cursor-pointer pointer-events-none ${isOpen || selectedValues.length > 0
            ? "text-[14px] -top-3 left-2 bg-white px-2 text-[#000000]"
            : "top-2.5 left-3 bg-white text-gray-400 opacity-0"
            }`}
        >

        </label>
      )}


      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
          <ul className="max-h-[240px] overflow-y-auto p-2 space-y-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleOption(option.value)}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedValues.includes(option.value)
                    ? "bg-[#101010] border-[#101010]"
                    : "border-gray-300 bg-white"
                    }`}
                >
                  {selectedValues.includes(option.value) && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[14px] font-[500] text-[#101010]">
                  {option.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Footer with Done button */}
          <div className="p-3 border-t border-gray-100 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="bg-[#0A0A0A] text-white text-[14px] font-[500] px-4 py-1.5 rounded hover:bg-black/90"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
