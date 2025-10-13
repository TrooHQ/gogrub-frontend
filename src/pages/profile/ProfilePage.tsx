import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
// import TopMenuNav from "../../components/Dashboard/TopMenuNav";
import ProfileDetails from "./ProfileDetails";
import BranchDetails from "./BranchDetails";
import Security from "./Security";
import Sidebar from "../../components/Dashboard/Profile/Sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchUserDetails } from "../../slices/UserSlice";
import { fetchAllBusinessInfo } from "../../slices/businessPersonalAccountSlice";

const ProfilePage = () => {

  useEffect(() => {
    document.title = "Update Your Account Profile, Passwords, and Personal Preferences"
  }, [])

  const dispatch = useDispatch<AppDispatch>();
  // const { userDetails, loading, error } = useSelector((state: any) => state.user);

  useEffect(() => {
    // Fetch user details
    dispatch(fetchUserDetails());
    dispatch(fetchAllBusinessInfo());
  }, []);

  const [activeComponent, setActiveComponent] = useState("profile");

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <ProfileDetails />;
      case "branch":
        return <BranchDetails />;
      case "security":
        return <Security />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <DashboardLayout title="Profile Page">
      {/* <TopMenuNav pathName="Profile Page" /> */}
      <div className="mt-6">
        <hr />
        <div className="flex">
          <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <div className="w-full px-4 mt-4">{renderActiveComponent()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
