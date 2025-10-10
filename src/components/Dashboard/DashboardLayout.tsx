import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import TopMenuNav from "./TopMenuNav";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  // clearSelectedBranch,
  fetchBranches,
  // userSelectedBranch,
} from "../../slices/branchSlice";
import { fetchAccountDetails } from "../../slices/businessSlice";
import { fetchAllBusinessInfo } from "../../slices/businessPersonalAccountSlice";
import { fetchUserDetails } from "../../slices/UserSlice";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, children }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // const { branches, selectedBranch } = useSelector(
  //   (state: RootState) => state.branches
  // );
  const { userDetails } = useSelector(
    (state: RootState) => state.user
  );

  // endpoint for sidebar

  useEffect(() => {
    if (userDetails?.email_verified === false) {
      navigate("/verify-account");
    }
  }, [userDetails?.email_verified, navigate]);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchUserDetails());
    dispatch(fetchAccountDetails());
    dispatch(fetchAllBusinessInfo());
  }, [dispatch]);


  return (
    <div className="bg-[#ebebeb]">
      <div className="flex ">
        <div className="hidden lg:block">
          <Sidebar userType="user" />
        </div>

        <div
          className={` flex-grow lg:m-5 w-full h-full overflow-y-auto`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className={`container mx-auto px-6 py-8 bg-[#f8f8f8] h-[100vh] overflow-y-scroll rounded-2xl`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowX: "hidden",
            }}
          >
            <div className="w-full">
              <TopMenuNav pathName={title ?? ""} />
            </div>
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
