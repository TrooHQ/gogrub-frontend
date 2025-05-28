import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/troo-logo.png";
import LogoMini from "../../assets/logo-mini-icon.svg";
import OverviewIcon from "../../assets/OverviewIcon.svg";
import TicketIcon from "../../assets/Tickets.svg";
import MenuIcon from "../../assets/menuIcon.svg";
import RestaurantDetailsIcon from "../../assets/restaurantDetails.svg";
import ManageTablesIcon from "../../assets/manageTableIcon.svg";
import AccountCircleIcon from "../../assets/account_circle.svg";
import Upgrade from "../../assets/upgrade.svg";
import HomeIcon from "../../assets/troo-logo-white.png";
// import ManageUsersIcon from "../../assets/manageUsers.svg";
// import HubIcon from "../../assets/hub.svg";
import LogoutIcon from "../../assets/logout.svg";
import ArrowToggle from "../../assets/arrowToggle.svg";
import { TextField, Button, Popper, Paper } from "@mui/material";
import {
  ArrowCircleRightOutlined,
  ArrowDropDown,
  Search,
} from "@mui/icons-material";
import GoGrubLogo from "../../assets/business_logo.svg";

import { CustomAutocomplete } from "./Overview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  clearSelectedBranch,
  fetchBranches,
  userSelectedBranch,
} from "../../slices/branchSlice";
import { clearUserData, fetchUserDetails } from "../../slices/UserSlice";
import getPermittedMenuItems from "../../utils/getPermittedMenuItems";
// import BlinkerSubscribe from "../BlinkerSubscribe";
import { setSubscription } from "../../slices/setupSlice";
import { RiErrorWarningLine } from "react-icons/ri";
import { fetchAccountDetails } from "../../slices/businessSlice";
// import { fetchAccountDetails } from "@/src/slices/businessSlice";

interface MenuItem {
  subTitle?: string;
  title?: string;
  gap?: boolean;
  Subgap?: boolean;
  icon?: string;
  subMenu?: MenuItem[];
  link?: string;
}

interface SideBarProps {
  userType: "user" | "admin";
}

const SideBar: React.FC<SideBarProps> = ({ userType }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { branches, selectedBranch } = useSelector(
    (state: RootState) => state.branches
  );
  const { userData, userDetails } = useSelector(
    (state: RootState) => state.user
  );
  console.log("userData", userData)
  console.log("userDetails", userDetails)
  useEffect(() => {
    if (userDetails?.email_verified === false) {
      navigate("/verify-account");
    }
  }, [userDetails?.email_verified, navigate]);

  const [open, setOpen] = useState(true);
  const [isAutoOpen, setIsAutoOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOutlet, setSelectedOutlet] = useState(
    selectedBranch
      ? selectedBranch
      : {
        label: "All outlets",
        id: "",
      }
  );

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchUserDetails());
    dispatch(fetchAccountDetails());
  }, [dispatch]);

  const {
    accountDetails
  } = useSelector((state: RootState) => state.business);



  const transformedBranches = branches.map((branch: any) => ({
    label: branch.branch_name,
    id: branch._id,
  }));
  useEffect(() => {
    if (userData?.user_role === "admin") {
      const defaultBranch = transformedBranches[0];
      (selectedBranch === null || selectedBranch === undefined) &&
        dispatch(userSelectedBranch(defaultBranch as any));
    } else if (userData?.user_role === "employee") {
      dispatch(userSelectedBranch(userData?.branch_id));
    }
  }, [dispatch, transformedBranches, selectedBranch]);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsAutoOpen((prev) => !prev);
  };

  const handleSelect = (event: any, value: any) => {
    event.preventDefault();
    setSelectedOutlet(value ?? { label: "All outlets" });
    dispatch(userSelectedBranch(value));
    setIsAutoOpen(false);
  };

  useEffect(() => {
    // Open the submenu if the current location is within its links
    selectedMenu.forEach((menu, index) => {
      if (
        menu.subMenu &&
        menu.subMenu.some(
          (subMenuItem) => subMenuItem.link === location.pathname
        )
      ) {
        setOpenSubmenuIndex(index);
      }
    });
  }, [location.pathname]);

  const currentPlanName = userDetails?.businessPlan?.plan?.name ?? null;

  const commonMenu: MenuItem[] = [
    {
      subTitle: "RESTAURANT",
      Subgap: true,
    },
    {
      title: "Overview",
      gap: false,
      icon: OverviewIcon,
      link: "/overview",
    },
    {
      title: "Tickets",
      icon: TicketIcon,
      link: "/tickets",
      subMenu: [
        {
          title: "Tickets",
          link: "/tickets",
        },
        {
          title: "Order history",
          link: "/order-history",
        },
        {
          title: "Customer Data",
          link: "/customer-data",
        },
      ],
    },
    {
      title: "Menu",
      icon: MenuIcon,
      link: "/menu-list",
      subMenu: [
        {
          title: "Menu List",
          link: "/menu-list",
        },
        {
          title: "Menu Builder",
          link: "/menu-builder",
        },
        {
          title: "Price List",
          link: "/price-list",
        },
      ],
    },

    {
      subTitle: "SETTINGS",
      Subgap: true,
    },
    {
      title: "Restaurant Details",
      icon: RestaurantDetailsIcon,
      link: "/business-information",
      subMenu: [
        {
          title: "Business Information",
          link: "/business-information",
        },
        {
          title: "Manage Branches",
          link: "/manage-branches",
        },
      ],
    },
    {
      title: "Manage Assets",
      icon: ManageTablesIcon,
      link: "/online-ordering",
      subMenu: [
        {
          title: "Online Ordering",
          link: "/online-ordering",
        },
      ],
    },

    {
      title: "Profile",
      gap: false,
      icon: AccountCircleIcon,
      link: "/profile-page",
    },
    // ...(currentPlanName
    //   ? [
    //       {
    //         title: "Change Plan",
    //         gap: false,
    //         icon: Upgrade,
    //         link: "/upgrade-subscription",
    //       },
    //     ]
    //   : []),
  ];

  const adminMenu: MenuItem[] = [
    { title: "AdminHome", gap: false, icon: HomeIcon },
  ];
  const userPermissions = userData?.permissions || [];
  const permittedMenu =
    userData?.user_role === "admin"
      ? commonMenu
      : getPermittedMenuItems(commonMenu, userPermissions);

  const selectedMenu = userType === "admin" ? adminMenu : permittedMenu;

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const isMenuItemActive = (
    menuLink: string,
    subMenu?: MenuItem[]
  ): boolean => {
    if (location.pathname === menuLink) {
      return true;
    }
    if (subMenu) {
      return subMenu.some((subMenuItem) =>
        isMenuItemActive(subMenuItem.link || "", subMenuItem.subMenu)
      );
    }
    return false;
  };

  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(clearSelectedBranch());

    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };

  return (
    <div
      className={`p-2 ${open ? "w-[230px]" : "w-20"
        }  h-screen relative overflow-y-auto left-0 top-0 duration-300 bg-[#f8f8f8]`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="grid items-center gap-3">
        <div className="flex items-center justify-center mt-4 gap-x-4">
          {userData?.onboarding_type === "gogrub" ? (
            <img src={GoGrubLogo} alt="Logo" className="mb-8" />
          ) : (
            <>
              <img
                src={userData?.business_logo ? userData.business_logo : Logo}
                alt="logo"
                className={`cursor-pointer duration-500 w-[100px] h-[100px] object-contain border-2 border-gray-300 rounded-lg shadow-lg p-2 bg-white ${!open ? "hidden" : "block"
                  } `}
                onClick={() => setOpen(!open)}
              />
              <img
                alt="logo-mini"
                src={LogoMini}
                className={`cursor-pointer duration-500 w-[100px] h-[100px] object-contain border-2 border-gray-300 rounded-lg shadow-lg p-2 bg-white ${!open ? "block" : "hidden"
                  } `}
                onClick={() => setOpen(!open)}
              />
            </>
          )}
        </div>

        <div
          className={`cursor-pointer duration-500 ${!open ? "hidden" : "block"
            } `}
        >
          <hr className="h-[2px] bg-[#929292] my-3" />
          <div className="ml-[5px] flex flex-col items-start justify-center gap-2">
            <h4 className="mb-0 text-base font-medium">
              {userData?.business_name}
            </h4>

            {/* Insert Button and Popper components here */}
            {userData?.user_role === "admin" ? (
              <div>
                <Button
                  onClick={handleButtonClick}
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#121212",
                    fontSize: "14px",
                    fontWeight: 500,
                    ml: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#121212",
                      fontSize: "14px",
                      fontWeight: 500,
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  {selectedBranch?.label} <ArrowDropDown />
                </Button>
                <Popper
                  open={isAutoOpen}
                  anchorEl={anchorEl}
                  placement="bottom-start"
                  sx={{ zIndex: 10, boxShadow: 3 }}
                >
                  <Paper sx={{ boxShadow: 3 }}>
                    <CustomAutocomplete
                      disablePortal
                      options={transformedBranches}
                      value={
                        selectedBranch
                          ? selectedBranch.label
                          : selectedOutlet.label
                      }
                      onChange={handleSelect}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search outlet"
                          variant="outlined"
                          style={{ width: "220px", marginLeft: "0px" }}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <Search
                                  style={{ color: "gray", marginRight: "4px" }}
                                />
                                {params.InputProps.startAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Paper>
                </Popper>
              </div>
            ) : (
              <div>
                <Button
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#121212",
                    fontSize: "14px",
                    fontWeight: 500,
                    ml: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#121212",
                      fontSize: "14px",
                      fontWeight: 500,
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  {userData?.branch_name}
                </Button>
              </div>
            )}
          </div>
          <hr className="h-[2px] bg-[#929292] my-3" />
        </div>
      </div>

      {/* Subscribe */}
      {/* <Link to="/subscription-plan">
        <div className="flex items-center justify-start gap-3">
          <span className="text-[16px] font-medium ml-3.5">Subscribe</span>
          <BlinkerSubscribe />
        </div>
      </Link> */}
      <ul className="pt-2 pl-[1px] grid gap-[10px]">
        {selectedMenu.map((menu, index) => (
          <div key={index}>
            <li>
              <div
                className={`flex relative ${menu.title && "px-[4px] cursor-pointer py-[8px]"
                  }  ${menu.subTitle && "text-[12px] font-normal text-[#121212]"
                  } text-purple200  items-center gap-x-2
            ${menu.gap ? " mt-28" : ""} ${menu.Subgap && "my-5"} ${isMenuItemActive(menu.link || "", menu.subMenu)
                    ? "  bg-[#d3d3d3] font-semibold text-[16px] text-[#606060] "
                    : !isMenuItemActive(menu.link || "", menu.subMenu) &&
                      !menu.subTitle
                      ? " "
                      : ""
                  }`}
                onClick={() => menu.subMenu && handleSubmenuToggle(index)}
              >
                {menu.title && (
                  (menu.link === "/business-information" && (!accountDetails?.account_name && !accountDetails.account_number)) ?
                    <div className="text-white bg-red-500 rounded-full animate-ping size-4">
                      <RiErrorWarningLine className="w-full h-full" />
                    </div>
                    : (
                      <img
                        src={menu.icon}
                        alt={menu.title}
                        style={{
                          width: "24px",
                          marginRight: "8px",
                          fontWeight: isMenuItemActive(menu.link || "", menu.subMenu)
                            ? "bold"
                            : "normal",
                          color: isMenuItemActive(menu.link || "", menu.subMenu)
                            ? ""
                            : "initial",
                        }}
                      />
                    )
                )}
                {/* {menu.title && (
                  
                  <img
                    src={menu.icon}
                    alt={menu.title}
                    style={{
                      width: "24px",
                      marginRight: "8px",
                      fontWeight: isMenuItemActive(
                        menu.link || "",
                        menu.subMenu
                      )
                        ? "bold"
                        : "normal",
                      color: isMenuItemActive(menu.link || "", menu.subMenu)
                        ? ""
                        : "initial",
                    }}
                  />
                )} */}
                <NavLink to={menu.link || "#"} className="flex-grow">
                  <span
                    className={`${!open && "hidden"
                      } origin-left duration-200 text-[#606060]`}
                  >
                    {menu.title}
                    {menu.subTitle}
                  </span>
                </NavLink>
                {menu.subMenu && (
                  <img
                    src={ArrowToggle}
                    alt=""
                    className={`text-[#606060] absolute right-[10px]  transition-transform ${openSubmenuIndex === index ? "rotate-180" : ""
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmenuToggle(index);
                    }}
                  />
                )}
              </div>
              <div className="">
                {menu.subMenu && openSubmenuIndex === index && (
                  <ul className="pl-8">
                    {" "}
                    {menu.subMenu.map((subMenuItem, subIndex) => (
                      <NavLink to={subMenuItem.link || "#"} key={subIndex}>
                        <li
                          className={`flex p-2 cursor-pointer py-2  text-sm items-center gap-x-4 ${isMenuItemActive(subMenuItem.link || "")
                            ? "text-[#000] font-bold"
                            : "text-purple200"
                            }`}
                        >
                          {subMenuItem.title}
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          </div>
        ))}
      </ul>
      {currentPlanName && (
        <button
          className=" flex items-center gap-[16px] px-[4px] py-[6px]  font-[400] text-[16px] text-[#606060] mt-[10px]"
          type="button"
          onClick={() => dispatch(setSubscription(true))}
        >
          <img src={Upgrade} alt="arrow-up" className="w-[24px]" />
          Change Plan
        </button>
      )}
      <div className="mb-10">
        <hr className="h-[2px] bg-[#929292] mt-5 mb-3" />
        <p className="text-[10px] font-medium ml-3.5"></p>

        <div className="flex items-start justify-start gap-0">
          <div>
            <button
              className="ml-4 mr-4 px-5 py-[6px] bg-[#DB7F3B] rounded-[4px] mt-1 text-center"
              type="button"
              onClick={
                !currentPlanName
                  ? () => dispatch(setSubscription(true))
                  : undefined
              }
            >
              <span className="mr-2 text-base font-semibold text-white capitalize">
                {userData?.onboarding_type === "gogrub" && currentPlanName
                  ? currentPlanName
                    .replace(`${userData.onboarding_type} `, "")
                    .replace("plan", "")
                    .trim()
                  : userData?.onboarding_type === "troo" && currentPlanName
                    ? currentPlanName
                      .replace(`${userData.onboarding_type} `, "")
                      .replace("plan", "")
                      .trim()
                    : "Subscribe"}
              </span>
              <ArrowCircleRightOutlined sx={{ color: "var(--white, #FFF)" }} />{" "}
            </button>
          </div>
          {/* {!currentPlanName && (
            <div className="-ml-[8px] mt-0">
              <BlinkerSubscribe />
            </div>
          )} */}
        </div>
        <hr className="h-[2px] bg-[#929292] mt-5 mb-3" />
      </div>
      {/* Add the Logout item separately at the bottom */}
      {/* <div
        className="absolute bottom-0 w-full p-2 mt-6"
        style={{
          backgroundColor: isMenuItemActive("/logout") ? "#d3d3d3" : "transparent",
        }}
      > */}
      <div
        className="w-full p-2 mt-6"
        style={{
          backgroundColor: isMenuItemActive("/logout")
            ? "#d3d3d3"
            : "transparent",
        }}
      >
        <div
          onClick={handleLogout}
          className="flex items-center py-2 cursor-pointer gap-x-2"
        >
          <img
            src={LogoutIcon}
            alt="Logout"
            style={{
              width: "20px",
              marginRight: "8px",
              fontWeight: isMenuItemActive("/logout") ? "bold" : "normal",
              color: isMenuItemActive("/logout") ? "black" : "initial",
            }}
          />
          <span className="text-[#000] font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
