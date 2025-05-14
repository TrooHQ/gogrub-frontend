import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import NotificationIcon from "../../assets/notificationIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchUserDetails } from "../../slices/UserSlice";
import { useEffect, useState } from "react";
import {
  selectToggleState,
  toggle,
  setDoMoreToggle,
  selectIsDoMoreToggleState,
  setToggle,
  setSubscription,
} from "../../slices/setupSlice";
import { FaChevronRight } from "react-icons/fa6";
import SetupModal from "./components/SetupModal";
import DoMoreModal from "./components/DoMoreModal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";

interface TopMenuNavProps {
  pathName: string;
}

interface UserCheckState {
  hasMenu: boolean;
  businessPlan: boolean;
  hasPickUpLocation: boolean;
  hasDeliveryDetails: boolean;
}

const TopMenuNav: React.FC<TopMenuNavProps> = ({ pathName }) => {
  const [showSetupPrompt, setShowSetupPrompt] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSetupPrompt(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("doMore") === null) {
      sessionStorage.setItem("doMore", JSON.stringify(false));
    }
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const { userData, userDetails } = useSelector((state: any) => state.user);
  const location = useLocation();
  const [userCheck, setUserChecks] = useState<UserCheckState>({
    hasMenu: false,
    businessPlan: false,
    hasPickUpLocation: false,
    hasDeliveryDetails: false,
  });

  console.log(userDetails);
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");
  const isToggled = useSelector(selectToggleState);
  const isDoMoreToggled = useSelector(selectIsDoMoreToggleState);

  const hasShownDoMore = JSON.parse(
    sessionStorage.getItem("doMore") || "false"
  );
  const handleToggle = () => {
    if (!hasShownDoMore) {
      dispatch(setDoMoreToggle(true));
      sessionStorage.setItem("doMore", JSON.stringify(true));
    } else {
      dispatch(toggle());
    }
  };

  useEffect(() => {
    if (reference) {
      dispatch(setSubscription(true));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const token = localStorage.getItem("token");

  const getUserOnboardChecks = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/userOnboardChecks`,
        headers
      );
      setUserChecks(response.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    getUserOnboardChecks();
  }, []);

  console.log(userCheck);

  return (
    <div className="">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[28px] font-[500] Capitalize text-purple500">
              {pathName}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            {location.pathname === "/overview" &&
              userCheck &&
              showSetupPrompt &&
              (!userCheck.hasMenu ||
                !userCheck.businessPlan ||
                !userCheck.hasDeliveryDetails ||
                !userCheck.hasPickUpLocation) && (
                <div
                  className="cursor-pointer flex items-center space-x-[8px] text-white bg-[#FF4F00] rounded-[8px] border border-[#FF4F00] text-[16px] font-[600] text-center px-[24px] py-[16px] animate-pulse"
                  onClick={() => handleToggle()}
                  style={{
                    animation: "vibrate 0.3s infinite",
                  }}
                >
                  <p className="flex items-center">
                    {[
                      userCheck.hasMenu,
                      userCheck.businessPlan,
                      userCheck.hasDeliveryDetails &&
                        userCheck.hasPickUpLocation,
                    ].every((check) => !check) ? (
                      "Begin Setup"
                    ) : (
                      <>
                        Continue Setup{" "}
                        <span className=" rounded-[4px] ml-2 px-[4px] border-[0.4px] border-[#FFF5F0] text-white">
                          {
                            [
                              userCheck.hasMenu,
                              userCheck.businessPlan,
                              userCheck.hasDeliveryDetails &&
                                userCheck.hasPickUpLocation,
                            ].filter(Boolean).length
                          }
                          /3
                        </span>
                      </>
                    )}
                  </p>
                  <FaChevronRight />
                </div>
              )}

            <style>
              {`
              @keyframes vibrate {
                0% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                50% { transform: translateX(2px); }
                75% { transform: translateX(-2px); }
                100% { transform: translateX(0); }
              }
              `}
            </style>
            <div className=" ml-3 mr-5">
              <img src={NotificationIcon} alt="" />
            </div>
            <div>
              <p className="text-grey500 text-[16px] font-[500]">
                {userData && userData.personal_email}
              </p>
              <p className="capitalize text-right text-grey300 text-[12px]">
                {userData && userData.user_role}
              </p>
            </div>
            <div>
              <Avatar sx={{ width: 40, height: 40 }}>
                {userDetails ? (
                  <img
                    src={userDetails?.photo || userDetails?.business_logo || ""}
                    alt={`${userDetails?.first_name} ${userDetails?.last_name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <PersonIcon />
                )}
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <SetupModal
        isModalOpen={isToggled}
        setIsModalOpen={() => dispatch(setToggle(false))}
      />

      <DoMoreModal
        isModalOpen={isDoMoreToggled}
        setIsModalOpen={() => dispatch(setDoMoreToggle(false))}
      />
    </div>
  );
};

export default TopMenuNav;
