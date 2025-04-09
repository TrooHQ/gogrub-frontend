import { Link } from "react-router-dom";
import Logo from "../assets/trooLogoGrey.svg";
// import Logo from "../assets/trooFooterLogo.svg";
const Footer = () => {
  return (
    <div className=" bg-footer py-[10px]">
      <div className="mx-[10px] md:mx-[40px] 2xl:mx-[158px] mt-[83px] mb-[55px]  md:border-r md:border-l border-[#606060] ">
        <div className=" md:border-b border-[#606060] pb-[32px] px-[16px]">
          <img src={Logo} alt="" className=" " />
          <p className=" text-white font-[400] text-[16px] md:hidden py-[4px]">
            &copy; 2024 Troo Inc. All Rights Reserved.
          </p>
        </div>
        <div className="  md:border-b border-[#606060] grid sm:grid-cols-3 md:grid-cols-5 items-start justify-between">
          <div className=" py-[16px] px-[16px] flex flex-col gap-[16px] h-full ">
            <p className=" text-[16px] font-[500] text-white">Business Type</p>
            <Link to="/restaurant">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Restaurants
              </p>
            </Link>
            <Link to="/food-truck">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Food Trucks
              </p>
            </Link>
            <Link to="/cafe">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Cafes & Bakeries
              </p>
            </Link>
            <Link to="/fast-food">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Fast Foods
              </p>
            </Link>
            <Link to="/lounges">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Clubs & Lounges
              </p>
            </Link>
            <Link to="/hotel">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">Hotels</p>
            </Link>
          </div>

          <div className="  flex flex-col gap-[16px]  md:border-l border-[#606060] py-[16px] px-[16px] h-full">
            <p className=" text-[16px] font-[500] text-white">Products</p>
            <Link to="/pos">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">POS</p>
            </Link>
            <Link to="/kds">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">KDS</p>
            </Link>
            <Link to="/table-ordering">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Table Ordering
              </p>
            </Link>
            <Link to="/digital-ordering">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Digital Ordering
              </p>
            </Link>
            <Link to="/payment">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Payment Process
              </p>
            </Link>
          </div>
          <div className=" flex flex-col gap-[16px] md:border-l border-[#606060] py-[16px] px-[16px] h-full">
            <p className=" text-[16px] font-[500] text-white">
              I want to know more
            </p>
            <Link to="/request-demo">
              <p className=" font-[500] text-[14px] text-[#B6B6B6]">
                Schedule a demo
              </p>
            </Link>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">
              Whatsapp Sales
            </p>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">
              Whatsapp Support
            </p>
          </div>
          <div className=" md:border-l border-[#606060] py-[16px] px-[16px] flex flex-col gap-[16px] h-full">
            <p className=" text-[16px] font-[500] text-white">Company</p>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">About us</p>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">
              Work with us
            </p>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">Contact us</p>
          </div>
          <div className=" hidden md:border-l px-[16px]  md:flex flex-col gap-[16px] h-full py-[16px] border-[#606060]">
            <p className=" text-[16px] font-[500] text-white">Legal</p>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">Privacy</p>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">
              Terms and conditions
            </p>
            <p className=" font-[500] text-[14px] text-[#B6B6B6]">Cookies</p>
          </div>
        </div>
        <div className="px-[16px] py-[29px] hidden md:block">
          <p className=" text-white font-[400] text-[16px]">
            &copy; 2023 Troo Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
