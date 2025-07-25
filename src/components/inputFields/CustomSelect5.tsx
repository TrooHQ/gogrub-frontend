import React, { useRef, useEffect, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string | number | undefined;
  error?: string;
  onChange: (value: string) => void;
  disabledOption?: string;
  readonly?: boolean; // Add readonly as an optional parameter
}

const CustomSelect5: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  error,
  onChange,
  disabledOption,
  readonly, // Destructure readonly
}) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    // Update isFocused based on the value to ensure the label position is correct
    setIsFocused(value !== "");
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(value !== "");
  };

  return (
    <div>
      <div className="relative">
        <select
          className={`border outline-grey200 text-grey500 border-gray-500 text-[16px] py-3 bg-white p-2 focus:outline-[#101010] w-full rounded ${error ? "border-red-500" : ""
            }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={selectRef}
          disabled={readonly}
        >
          {disabledOption && !value && (
            <option value="" disabled>
              {disabledOption}
            </option>
          )}
          <option value="" disabled>
            {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {label && (
          <label
            style={{ left: "14px" }}
            className={`absolute transition-all duration-300 cursor-text ${isFocused || value
                ? "text-[14px] -top-3 left-2 bg-white px-2 text-[#000000]"
                : "top-2 left-4 bg-white text-gray-400"
              } ${error ? "text-red-500" : ""}`}
            onClick={() => selectRef.current?.focus()}
          >
            {label}
          </label>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomSelect5;
