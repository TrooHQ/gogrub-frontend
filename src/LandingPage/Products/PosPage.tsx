import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import PosMockup from "../../assets/pos mockup screen 1.png";
import Integration from "../../assets/integration.png";
import Online from "../../assets/online icon.png";
import RestaurantGuest from "../../assets/restaurant guest.png";
import RestaurantHardware from "../../assets/restaurant hardware.png";
import RestaurantTable from "../../assets/restaurant table.png";
import Trending from "../../assets/trending_up.png";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";
import Overlay from "../../assets/GreyOverlay.svg";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const PosPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className=" relative">
      <Navbar />
      <div className="">
        <img
          src={Circle}
          alt=""
          className="hidden md:block fixed top-0 left-0 w-[100%] -z-50"
        />
        <img
          src={Overlay}
          alt=""
          className=" md:hidden fixed top-0 left-0 w-[100%] -z-50"
        />
      </div>

      <div className="">
        <div
          className=" max-w-[271px] md:max-w-[607px] mx-auto text-center md:mt-[100px]"
          data-aos="fade-up"
        >
          <p className=" text-[14px] font-[400] text-[#5855B3] hidden md:block">
            PRODUCTS/POS
          </p>
          <p className=" text-[24px] md:text-[44px] font-[500]  leading-[31px] md:leading-[66px]">
            Restaurant-grade ePos Register
          </p>
          <p className=" text-[14px] md:text-[18px] font-[400] text-[#414141] leading-[28px] mt-[16px] md:mt-0">
            Our point of sale system enables you to take customer orders whether
            its on a till, or a handheld device. This enables your business not
            to miss an order, thereby collecting every penny.
          </p>
          <p className=" text-[14px] md:text-[18px] font-[400] text-[#414141] my-[16px] md:my-[32px]">
            Book a demo TODAY to learn how this works for your business.
          </p>
          <Link to="/request-demo">
            <p className="  inline text-[14px] font-[500]  py-[10px] px-[24px] bg-[#121212] rounded-[5px] text-white">
              Schedule A Demo
            </p>
          </Link>
        </div>

        <div
          className=" max-w-[298px] md:max-w-[835px] mx-auto mt-[56px]"
          data-aos="fade-up"
        >
          <img src={PosMockup} alt="" />
        </div>

        <div className="">
          <div className=" mt-[50px] md:mt-[20px] md:my-[59px] mx-[38px] gap-[16px] md:gap-0 flex flex-col justify-center items-center md:items-start md:grid md:grid-cols-3 md:mx-[40px] 2xl:mx-[158px]">
            <div
              className="w-full max-h-[243px] border md:border-l-0 md:border-t-0  md:border-b md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Online} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Online & Offline Mode
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Troo ePOS offers a cloud-based cash register that helps you take
                and manage orders, record sales, receive payment etc
              </p>
            </div>

            <div
              className=" w-full max-h-[243px] border md:border-l-0 md:border-t-0 md:border-b md:border-r  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Trending} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Increase Check Sizes
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Create menu hierarchy that include category, menu and menu items
                to help waiters accurately place orders and increase bill sizes.
              </p>
            </div>
            <div
              className=" w-full max-h-[243px] md:h-[243px] border md:border-l-0 md:border-t-0  md:border-b  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={RestaurantHardware} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Restaurant-grade Hardware
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Complete with durable hardware to with-stand the rigours of your
                operations.
              </p>
            </div>
            <div
              className="  w-full max-h-[243px] border md:border-l-0 md:border-b-0 md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={RestaurantTable} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Map Tables
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Organize your floor plan and tables to manage tickets and
                orders.
              </p>
            </div>
            <div
              className="  w-full max-h-[243px] border md:border-l-0 md:border-b-0 md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={RestaurantGuest} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Built for Guests
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Customize orders by modifying menus, special requests like "less
                spicy", "extra
              </p>
            </div>

            <div
              className="  w-full max-h-[243px] border md:border-l-0 md:border-b-0  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Integration} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Seamless Integration
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                API integration capabilities with delivery apps like uber eats,
                glovo, etc.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LandingPageFAQ />
      <Blog />
      <Footer />
    </div>
  );
};

export default PosPage;
