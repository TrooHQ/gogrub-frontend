import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
// import NotificationIcon from "../../assets/notificationIcon.png";
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
import { fetchAllBusinessInfo } from "../../slices/businessPersonalAccountSlice";
import { FiLoader } from "react-icons/fi";
import SideBar from "./Sidebar";
import { Menu } from 'lucide-react';

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
  // const { userDetails } = useSelector((state: any) => state.user);
  const { personalInfo, businessInfo, loading } = useSelector((state: any) => state.allBusinessInfo);

  const location = useLocation();
  const [userCheck, setUserChecks] = useState<UserCheckState>({
    hasMenu: true,
    businessPlan: true,
    hasPickUpLocation: true,
    hasDeliveryDetails: true,
  });

  // console.log(userDetails);
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
    dispatch(fetchAllBusinessInfo());
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
      // console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    getUserOnboardChecks();
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm lg:text-2xl font-[500] Capitalize text-gray-500">
              {pathName}
            </p>


          </div>
          {/* begin setup prompt */}
          <div className="flex items-center gap-5">
            {location.pathname === "/overview" &&
              userCheck &&
              showSetupPrompt &&
              (!userCheck.hasMenu ||
                !userCheck.businessPlan ||
                // !userCheck.hasDeliveryDetails ||
                !userCheck.hasPickUpLocation) && (
                <div
                  className="cursor-pointer flex items-center space-x-[8px] text-white bg-[#FF4F00] rounded-[8px] border border-[#FF4F00] text-xs lg:text-base font-[600] text-center px-[24px] py-[16px] animate-pulse"
                  onClick={() => handleToggle()}
                  style={{
                    animation: "vibrate 0.3s infinite",
                  }}
                >
                  <p className="flex items-center">
                    {[
                      userCheck.hasMenu,
                      userCheck.businessPlan,
                      // userCheck.hasDeliveryDetails &&
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
                              // userCheck.hasDeliveryDetails &&
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

          </div>

          {loading ? <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full animate-pulse"> <FiLoader /></div> : <div className="flex items-center gap-4">
            {/* <div className="ml-3 mr-5 ">
              <img src={NotificationIcon} alt="" />
            </div> */}
            <Menu className="block cursor-pointer lg:hidden" onClick={toggleSidebar} />

            <div className={`absolute top-0 left-0 z-50 h-screen px-4 overflow-y-scroll bg-white pt-14 lg:pt-0 lg:overflow-y-auto lg:h-auto lg:bg-transparent lg:static lg:px-0 transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-3/4 lg:w-auto`}>
              <div className="flex items-center justify-center gap-3">
                <div>
                  <p className="text-grey500 text-[16px] font-[500]">
                    {personalInfo && personalInfo.personal_email}
                  </p>
                  <p className="capitalize text-right text-grey300 text-[12px]">
                    {personalInfo && personalInfo.user_role}
                  </p>
                </div>
                <div>
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {(personalInfo && businessInfo) ? (
                      <img
                        // use personInfo.photo if you want to render the user's profile picture
                        src={businessInfo?.business_logo}
                        // src={userDetails?.business_logo}
                        // src={userDetails?.photo || userDetails?.business_logo || ""}
                        alt={`${personalInfo?.first_name} ${personalInfo?.last_name}`}
                        className="object-cover w-10 h-10 rounded-full"
                      />
                    ) : (
                      <PersonIcon />
                    )}
                  </Avatar>
                </div>
              </div>

              {/* sidenav on mobile */}
              <div className="mt-5 lg:hidden">
                <SideBar userType="user" />
              </div>

            </div>
          </div>}
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
