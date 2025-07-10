import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface CustomInputProps {
  label: string;
  type: string;
  value: string | number | undefined;
  error?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  className?: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  required?: string | boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  value,
  error,
  maxLength,
  onChange,
  className,
  fullWidth = false,
  readOnly = false,
  placeholder,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <input
        type={type}
        className={`border outline-grey200 p-2 text-grey500 border-gray-500 text-[16px] py-3 focus:outline-[#101010] focus:border-none w-full rounded ${error ? "border-red-500" : ""
          } ${className}`} // Apply className prop
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        ref={inputRef}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      <label
        className={`absolute transition-all duration-300 cursor-text ${isFocused
          ? "text-[14px] -top-3 left-2 bg-white px-2 text-[#000000]"
          : "top-2 left-4 bg-white text-grey200"
          } ${error ? "text-red-500" : ""}`}
        onClick={handleLabelClick}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    </div>
  );
};

export default CustomInput;
