import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import KDSMockup from "../../assets/kdsScreen.png";
import Cloud from "../../assets/cloud integration.svg";
import integration from "../../assets/integration_instructions.svg";
import NoPaper from "../../assets/no paper.svg";
import Order from "../../assets/order.svg";
import printer from "../../assets/printer.svg";
import Synchronize from "../../assets/synchronize.svg";
import SOT from "../../assets/source of truth.svg";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";
import Overlay from "../../assets/GreyOverlay.svg";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const KDSPage = () => {
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
            PRODUCTS/KDS
          </p>
          <p className=" text-[24px] md:text-[44px] font-[500]  leading-[31px] md:leading-[66px]">
            Keep Your Front And Bank House in Sync
          </p>
          <p className=" text-[14px] md:text-[18px] font-[400] text-[#414141] leading-[28px] mt-[16px] md:mt-0">
            Keep your kitchen staff in the loop for every customer order that
            you take. Have them receive orders and prepare those orders. Keep
            your customers happy and have them well attended to without the long
            trips to the kitchen.
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
          <img src={KDSMockup} alt="" />
        </div>

        <div className="">
          <div className=" mt-[50px] md:mt-[20px] md:my-[59px]  md:mx-[40px] 2xl:mx-[158px]">
            <div className=" mx-[38px] md:mx-0 mb-[16px] md:mb-0 flex flex-col gap-[16px] md:gap-0 items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3">
              <div
                className="w-full max-h-[243px] border md:border-t-0 md:border-l-0  md:border-b md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
                data-aos="fade-up"
              >
                <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                  <img src={NoPaper} alt="" />
                  <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                    No Papers, No Clutters
                  </p>
                </div>
                <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                  Eradicate paper tickets in your kitchen. Connect orders on any
                  device on-premise and online and have them fired straight to
                  the KDS.
                </p>
              </div>

              <div
                className="w-full max-h-[243px] border md:border-t-0 md:border-b md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
                data-aos="fade-up"
              >
                <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                  <img src={Synchronize} alt="" />
                  <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                    Synchronized Operations
                  </p>
                </div>
                <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                  Bridge the gap between your front-of-house and back-of-house
                  operations by delivering the right order to the right guests.
                </p>
              </div>
              <div
                className="w-full max-h-[243px] border md:border-t-0 md:border-r-0 md:border-b  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
                data-aos="fade-up"
              >
                <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                  <img src={SOT} alt="" />
                  <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                    One source of truth for fulfilment
                  </p>
                </div>
                <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                  Troo KDS organizes all your tickets real-time, from all
                  sources providing kitchen staff with full visibility to
                  deliver excellent fulfillment.
                </p>
              </div>
            </div>
            <div className="  flex flex-col mx-[38px] md:mx-0 gap-[16px] md:gap-0 items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4">
              <div
                className=" w-full max-h-[243px] border md:border-l-0 md:border-b-0 md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
                data-aos="fade-up"
              >
                <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                  <img src={printer} alt="" />
                  <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                    Bulk Print
                  </p>
                </div>
                <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                  Bulk print end-of-day and runner tickets on any network
                  connected printer directly from KDS.
                </p>
              </div>
              <div
                className=" w-full max-h-[243px] border md:border-b-0 md:border-r px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
                data-aos="fade-up"
              >
                <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                  <img src={Order} alt="" />
                  <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                    Process More Orders
                  </p>
                </div>
                <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                  Process more order volumes and increase revenues without
                  losing accuracy.
                </p>
              </div>
              <div
                className=" w-full max-h-[243px] border md:border-0  px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
                data-aos="fade-up"
              >
                <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                  <img src={Cloud} alt="" />
                  <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                    Fulfilment Status
                  </p>
                </div>
                <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                  Help your waiters manage expectations by tracking order status
                  with fulfilment reporting.
                </p>
              </div>
              <div
                className=" w-full max-h-[243px] border md:border-b-0 md:border-r-0 px-[16px] text-center md:text-left md:px-[30px] pt-[24px] md:pt-[51px] pb-[24px] md:pb-[59px]"
                data-aos="fade-up"
              >
                <div className=" flex flex-col md:flex-row items-center gap-[8px] md:gap-[24px] ">
                  <img src={integration} alt="" />
                  <p className=" text-[18px] md:text-[20px] font-[500] text-[#5855B3]">
                    Integration
                  </p>
                </div>
                <p className=" mt-[8px] lg:mt-[35px] font-[400] text-[16px] text-[#414141]">
                  Troo KDS automatically integrates with Troo ePOS and Online
                  Ordering for synchronized communication between front and back
                  of house.
                </p>
              </div>
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

export default KDSPage;
