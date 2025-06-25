import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import Phones from "../../assets/PaymentProcessImage.png";
import Consistent from "../../assets/consistent rate.svg";
import Instore from "../../assets/instore.svg";
import OnTheGo from "../../assets/on the go.svg";
import online from "../../assets/online.svg";
import PaymentOption from "../../assets/payment option.svg";
import PhoneOrdering from "../../assets/phone ordering.svg";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";
import Overlay from "../../assets/GreyOverlay.svg";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const PaymentPage = () => {
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
          <p className=" text-[14px] font-[400] text-[#121212] hidden md:block">
            PRODUCTS/PAYMENT PROCESSING
          </p>
          <p className=" text-[24px] md:text-[44px] font-[500]  leading-[31px] md:leading-[66px]">
            Receive Payments Faster & Smarter
          </p>
          <p className=" text-[14px] md:text-[18px] font-[400] text-[#414141] leading-[28px] mt-[16px] md:mt-0">
            Get money into your account from every customer and every order.
            Through our payment processing system, your customers can pay
            through a simple checkout flow.
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
          className=" max-w-[295px] md:max-w-[835px] mx-auto mt-[56px]"
          data-aos="fade-up"
        >
          <img src={Phones} alt="" />
        </div>

        <div className="">
          <div className="  mx-[38px] mt-[50px] md:mt-[20px] md:my-[59px] flex flex-col gap-[16px] md:gap-0 justify-center items-start md:items-start md:grid md:grid-cols-3 md:mx-[40px] 2xl:mx-[158px]">
            <div
              className="w-full max-h-[243px] md:h-[243px] border md:border-l-0 md:border-t-0  md:border-b md:border-r  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={PaymentOption} alt="" />
                <p className=" text-[18px] md:text-[20px] font-[500] text-[#121212]">
                  Flexible Payment Options
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Give your customers many ways to pay via cash, terminals,
                contactless NFC, transfer, online, etc.
              </p>
            </div>

            <div
              className="w-full max-h-[243px] md:h-[243px] border md:border-t-0  md:border-b md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Instore} alt="" />
                <p className=" text-[20px] font-[500] text-[#121212]">
                  In-Store
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Troo in-store smart payment terminals offers more control and
                convenience over payment, tipping, and receipt op- tions so your
                waiters can focus more on service delivery.
              </p>
            </div>
            <div
              className="w-full max-h-[243px] md:h-[243px] border md:border-t-0 md:border-r-0 md:border-b  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={OnTheGo} alt="" />
                <p className=" text-[20px] font-[500] text-[#121212]">
                  On the Go
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Troo Go terminals offer payment process- ing options whether you
                are on the shop floor or on delivery runs.
              </p>
            </div>
            <div
              className=" w-full max-h-[243px] md:h-[243px] border md:border-b-0 md:border-l-0 md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={online} alt="" />
                <p className=" text-[20px] font-[500] text-[#121212]">Online</p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Seamless online payment options for your business’ online
                ordering flows.
              </p>
            </div>
            <div
              className=" w-full max-h-[243px] md:h-[243px] border md:border-b-0 md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={PhoneOrdering} alt="" />
                <p className=" text-[20px] font-[500] text-[#121212]">
                  Phone Ordering
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                Troo virtual terminals lets you take orders and card payments on
                your computer, tablet, or device via a web browser.
              </p>
            </div>

            <div
              className=" w-full max-h-[243px] md:h-[243px] border md:border-b-0 md:border-r-0   px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
              data-aos="fade-up"
            >
              <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                <img src={Consistent} alt="" />
                <p className=" text-[20px] font-[500] text-[#121212]">
                  Consistent Rates
                </p>
              </div>
              <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                We offer consistent rates across all cards that won't hurt your
                business.
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

export default PaymentPage;
