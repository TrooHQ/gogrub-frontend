import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import Phones from "../../assets/phones.jpg";
import QRCode from "../../assets/QR code.svg";
import Star from "../../assets/star_outline.svg";
import Synchronize from "../../assets/synchronize 2.svg";
import optimize from "../../assets/optimize.svg";
import Order from "../../assets/order 2.svg";
import Trending from "../../assets/trending_up.svg";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";
import Overlay from "../../assets/GreyOverlay.svg";
import TableOrderingMobile from "../../assets/tableOrderingMobile.png";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const TableOrderingPage = () => {
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
            PRODUCTS/TABLE ORDERING
          </p>
          <p className=" text-[24px] md:text-[44px] font-[500]  leading-[31px] md:leading-[66px]">
            Order From Anywhere In-Store
          </p>
          <p className=" text-[14px] md:text-[18px] font-[400] text-[#414141] leading-[28px] mt-[16px] md:mt-0">
            Avoid the long queues at the counter. Get your customers to place an
            order from anywhere in your building by simply scanning the QR code
            at the table. Works for restaurants, works for hotels, and works for
            your business.
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
          <img src={Phones} alt="" className=" hidden md:block" />
          <img src={TableOrderingMobile} alt="" className=" md:hidden" />
        </div>

        <div className="">
          <div className="  mx-[38px] mt-[50px] md:mt-[20px] md:my-[59px] flex flex-col gap-[16px] md:gap-0 justify-center items-start md:items-start md:grid md:grid-cols-3 md:mx-[40px] 2xl:mx-[158px]">
            <div
              className="w-full max-h-[243px] md:h-[243px] border md:border-l-0 md:border-t-0  md:border-b md:border-r  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={QRCode} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Order via QR Code
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                The customer scans the QR and directly sees the menu associated
                with their table.
              </p>
            </div>

            <div
              className="w-full max-h-[243px] border md:border-t-0  md:border-b md:border-r  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Order} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Order From the Menu
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                The customer navigates through your digital menu and chooses the
                products they want to order, without waiting.
              </p>
            </div>
            <div
              className="w-full max-h-[243px] md:h-[243px]  border  md:border-t-0 md:border-b  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Synchronize} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Synchronized with your System
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Orders automatically arrive at printers, POS and order takers.
              </p>
            </div>
            <div
              className=" w-full max-h-[243px] border md:border-l-0 md:border-b-0 md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Trending} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  Increase Turnover
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Ramp up orders
              </p>
            </div>
            <div
              className="w-full max-h-[243px] border md:border-b-0  md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Star} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                  The Best Experience
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Don’t leave the customer with their hand raised.
              </p>
            </div>

            <div
              className=" w-full max-h-[243px] border md:border-b-0  md:border-r-0   px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={optimize} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Optimize your Business
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Get the most performance and profitability
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

export default TableOrderingPage;
