import React from "react";
import { Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";

interface SidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeComponent,
  setActiveComponent,
}) => {
  const { userDetails } = useSelector((state: any) => state.user);

  const BusinessPlan = userDetails?.businessPlan?.plan?.name;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setActiveComponent(newValue);
  };

  const tabStyle = {
    textTransform: "none",
    color: "#929292",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.5px",
    padding: "12px 8px",
    borderRadius: "8px",
    "&.Mui-selected": {
      color: "#fff !important",
      backgroundColor: "#0d0d0d",
    },
  };

  const tabs = [
    { label: "PICKUP LOCATION", value: "pickup location" },
    { label: "DELIVERY", value: "delivery service" },
    ...(BusinessPlan ? [{ label: "GET YOUR LINK", value: "Your Link" }] : []),
    { label: "THEMES", value: "themes" },
  ];

  return (
    <div className="w-full px-0 py-2 bg-white">
      <Tabs
        value={activeComponent}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            sx={{
              ...(activeComponent === tab.value && {
                backgroundColor: "#0d0d0d",
                color: "#fff !important",
              }),
              ...tabStyle,
              maxWidth: "150px",
            }}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default Sidebar;
