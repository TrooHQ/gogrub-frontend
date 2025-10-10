import { CalendarMonth } from '@mui/icons-material'
import { DatePicker, Space } from "antd";
import { Dispatch, useState } from 'react'
const { RangePicker } = DatePicker;


interface DateFilterProps {
  handleFilterChange: (
    filter?: string | number,
    noOfDays?: string | number,
    startDate?: string,
    endDate?: string
  ) => void;
  filterValue?: string | number,
  setFilterValue?: Dispatch<React.SetStateAction<string | number | undefined>>;
  noOfDays?: string | number,
  setNoOfDays?: Dispatch<React.SetStateAction<string | number | undefined>>;
}

export default function DateFilterComp({ handleFilterChange, noOfDays, filterValue }: DateFilterProps) {

  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      handleFilterChange(
        "date_range",
        noOfDays,
        dateStrings[0],
        dateStrings[1]
      );
    }
    setShowDatePicker(false);
  };



  return (
    <div className="flex items-center gap-[32px] flex-wrap lg:flex-nowrap">
      <div className="">
        <p className="font-[500] text-[16px] text-[#121212]">
          Filter by:
        </p>
      </div>
      <div className="flex items-center gap-[8px] flex-wrap lg:flex-nowrap">
        <button
          className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${filterValue === "today"
            ? "bg-black text-white"
            : "border-gray-400 text-black"
            }`}
          onClick={() => handleFilterChange("today")}
        >
          Today
        </button>
        <button
          className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${noOfDays === 7
            ? "bg-black text-white"
            : "border-gray-400 text-black"
            }`}
          onClick={() => handleFilterChange("days", 7)}
        >
          7 Days
        </button>
        <button
          className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${noOfDays === 30
            ? "bg-black text-white"
            : "border-gray-400 text-black"
            }`}
          onClick={() => handleFilterChange("days", 30)}
        >
          1 Month
        </button>
        <button
          className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${noOfDays === 90
            ? "bg-black text-white"
            : "border-gray-400 text-black"
            }`}
          onClick={() => handleFilterChange("days", 90)}
        >
          3 Months
        </button>

        <button
          className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${noOfDays === 180
            ? "bg-black text-white"
            : "border-gray-400 text-black"
            }`}
          onClick={() => handleFilterChange("days", 180)}
        >
          6 Months
        </button>

        <button
          className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${noOfDays === 365
            ? "bg-black text-white"
            : "border-gray-400 text-black"
            }`}
          onClick={() => handleFilterChange("days", 365)}
        >
          1 Year
        </button>

        {/* Custom Date Picker */}
        <div
          className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212] cursor-pointer"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <span className="text-[12px] flex items-center gap-1">
            <CalendarMonth className="w-4 h-4" />
            <span>Custom</span>
          </span>
        </div>

        {showDatePicker && (
          <Space direction="vertical">
            <RangePicker onChange={handleDateChange} />
          </Space>
        )}
      </div>
    </div>
  )
}
