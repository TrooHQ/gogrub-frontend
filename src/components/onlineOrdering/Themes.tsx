import { useState, useEffect } from "react";
import { CheckCircle } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountDetails } from "../../slices/businessSlice";
import { RootState } from "../../store/store";
import { SERVER_DOMAIN } from "../../Api/Api";

const Themes = () => {
  const dispatch = useDispatch();
  const businessColor = useSelector(
    (state: RootState) => state.business.colour_scheme
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    businessColor
  );

  const colors = ["#3450B0", "#000000", "#097F7C", "#121212", "#FF0000"];

  useEffect(() => {
    dispatch(fetchAccountDetails() as any);
  }, [dispatch]);

  useEffect(() => {
    if (colors.includes(businessColor)) {
      setSelectedColor(businessColor);
    }
  }, [businessColor, colors]);

  const handleColorClick = async (color: string) => {
    setSelectedColor(color);
    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/updateBusinessColourScheme`,
        { colour_scheme: color },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(fetchAccountDetails() as any);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to update color scheme");
    }
  };

  return (
    <div className="p-4 flex gap-12">
      <div>
        <h2 className="text-2xl font-medium text-[#121212] mb-4">
          Brand colors
        </h2>
        <p className="mb-2 text-base text-[#121212] font-normal">
          Select or customize your brand color
        </p>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-6 mb-4">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-20 h-20 flex items-center justify-center cursor-pointer transition-all duration-300 
              ${color === selectedColor
                  ? "rounded-lg border-4 rounded-tl-[30px] rounded-tr-[30px] border-blue-500"
                  : "rounded-full border-2 border-gray-300"
                } hover:scale-110 bg-[#F8F8F8] shadow-md`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            >
              {color === selectedColor && (
                <CheckCircle className="text-white" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-10">
          <span className="text-[#606060] font-medium text-base">
            Custom color
          </span>
          <input
            type="text"
            value={selectedColor}
            readOnly
            className="border px-3 py-2 rounded bg-[#EEEEF7]"
          />
          <div
            className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
            style={{ borderColor: selectedColor }}
          >
            <div
              className="w-14 h-14 rounded-full"
              style={{ backgroundColor: selectedColor }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
