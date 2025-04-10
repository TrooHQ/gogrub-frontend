import logo from "../assets/restaurant_menu.svg";
import Confirmation from "../assets/confirmation_numbe.svg";
import setting from "../assets/settings.svg";
import orderIcon from "../assets/order2.svg";
import { Link } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div className=" my-[10px] mx-[10px]">
      <div className=" flex items-center gap-[8px] py-[16px] border-b">
        <img src={logo} alt="" />
        <p className=" text-20px font-[400] text-grey500">Restaurant Name</p>
      </div>

      <div className=" mt-[16px] grid grid-cols-2 gap-[16px]">
        <Link to="/demo/ticket/gogrub-portal">
          <div className=" px-[28px] py-[47px] bg-[#C7ECE6] rounded-[5px]">
            <div className=" flex flex-col gap-[8px] items-center justify-center">
              <img src={Confirmation} alt="" />
              <p className=" text-[20px] font-[400] text-grey500 ">Tickets</p>
            </div>
          </div>
        </Link>

        <Link to="/demo/order/gogrub-portal">
          <div className=" px-[28px] py-[47px] bg-[#F7EFD0] rounded-[5px]">
            <div className=" flex flex-col gap-[8px] items-center justify-center">
              <img src={orderIcon} alt="" />
              <p className=" text-[20px] font-[400] text-grey500 ">Orders</p>
            </div>
          </div>
        </Link>

        <Link to="/demo/employee-settings/gogrub-portal">
          <div className=" px-[28px] py-[47px] bg-[#F8EAE3] rounded-[5px]">
            <div className=" flex flex-col gap-[8px] items-center justify-center">
              <img src={setting} alt="" />
              <p className=" text-[20px] font-[400] text-grey500">Settings</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
