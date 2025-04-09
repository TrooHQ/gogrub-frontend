import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import NotificationIcon from "../../assets/notificationIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchUserDetails } from "../../slices/UserSlice";
import { useEffect } from "react";
interface TopMenuNavProps {
  pathName: string;
}

const TopMenuNav: React.FC<TopMenuNavProps> = ({ pathName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, userDetails } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

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
            {/* <div className="relative">
              <input
                type="text"
                className="bg-[#F8F8F8] rounded p-2 pl-14"
                placeholder="Search"
              />
              <img
                src={SearchIcon}
                alt=""
                className="absolute left-6 top-3 pointer-events-none"
              />
            </div> */}

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
    </div>
  );
};

export default TopMenuNav;
