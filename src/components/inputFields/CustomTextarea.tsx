import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface CustomTextareaProps {
  label: string;
  value: string;
  error?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  className?: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  rows?: number;
  placeholder?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  value,
  error,
  maxLength,
  onChange,
  className,
  fullWidth = false,
  readOnly = false,
  rows = 3,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setIsFocused(value !== "");
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(value !== "");
  };

  const handleLabelClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <textarea
        className={`border outline-grey200 p-2 text-grey500 border-gray-500 text-[16px] py-3 focus:outline-[#101010] focus:border-none w-full rounded resize-none ${
          error ? "border-red-500" : ""
        } ${className}`}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        ref={textareaRef}
        readOnly={readOnly}
        rows={rows}
        placeholder={placeholder}
      />
      {(!placeholder || isFocused || value) && (
        <label
          className={`absolute transition-all duration-300 cursor-text ${
            isFocused
              ? "text-[14px] -top-3 left-2 bg-white px-2 text-[#000000]"
              : "top-2 left-4 bg-white text-grey200"
          } ${error ? "text-red-500" : ""}`}
          onClick={handleLabelClick}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomTextarea;
