import POS from "../assets/pointOfSalesImg.png";
import Payment from "../assets/paymentProcessingImg.png";
import KDS from "../assets/kdsImg.png";
import DigitalOrdering from "../assets/digitalOrderingImg.png";
import TableOrdering from "../assets/tableOrderingImg.png";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Organize = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className=" bg-white mt-[10px] md:mt-[80px] hidden md:block">
      <p className=" text-center text-[20px] md:text-[24px] font-[500]">
        Organize All Your Tech in One Place
      </p>

      <div className=" md:my-[59px] flex flex-col justify-center items-center md:items-start md:grid md:grid-cols-5 gap-[16px] md:mx-[40px] 2xl:mx-[158px]">
        <Link to="/pos" data-aos="fade-up">
          <div className=" w-[224px]  max-h-[416px] bg-[#EEEEF7] rounded-[5px] overflow-hidden hover:bg-purple500 group duration-300">
            <img
              src={POS}
              alt=""
              className=" w-full object-cover rounded-t-[5px] transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
              <p className=" text-[16px] font-[500] text-[#121212]  group-hover:text-white">
                Point of Sale
              </p>
              <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]  group-hover:text-white">
                Fully integrated cash registers & ePOS hardware to withstand the
                rigours of your operations
              </p>
            </div>
          </div>
        </Link>
        <Link to="/kds" data-aos="fade-up">
          <div className=" w-[224px] max-h-[416px] bg-[#EEEEF7] rounded-[5px] overflow-hidden hover:bg-purple500 group duration-300">
            <img
              src={KDS}
              alt=""
              className=" w-full object-cover rounded-t-[5px] transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
              <p className=" text-[16px] font-[500] text-[#121212]  group-hover:text-white">
                KDS
              </p>
              <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]  group-hover:text-white">
                Seamlessly connect your front-of-house with the kitchen to
                ensure order accuracy.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/table-ordering" data-aos="fade-up">
          <div className=" w-[224px] max-h-[416px] bg-[#EEEEF7] rounded-[5px] overflow-hidden hover:bg-purple500 group duration-300">
            <img
              src={TableOrdering}
              alt=""
              className=" w-full object-cover rounded-t-[5px] transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
              <p className=" text-[16px] font-[500] text-[#121212]  group-hover:text-white">
                Table Ordering
              </p>
              <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]  group-hover:text-white">
                Empower your wait staff to deliver faster table side ordering
                with troo handhelds.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/digital-ordering" data-aos="fade-up">
          <div className=" w-[224px] max-h-[416px] bg-[#EEEEF7] rounded-[5px] overflow-hidden hover:bg-purple500 group duration-300">
            <img
              src={DigitalOrdering}
              alt=""
              className=" w-full object-cover rounded-t-[5px] transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
              <p className=" text-[16px] font-[500] text-[#121212]  group-hover:text-white">
                Digital Ordering
              </p>
              <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]  group-hover:text-white">
                Leverage several digital ordering workflows to accept to
                in-store and online orders.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/payment" data-aos="fade-up">
          <div className=" w-[224px] max-h-[416px] bg-[#EEEEF7] rounded-[5px] overflow-hidden hover:bg-purple500 group duration-300">
            <img
              src={Payment}
              alt=""
              className=" w-full object-cover rounded-t-[5px] transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
              <p className=" text-[16px] font-[500] text-[#121212]  group-hover:text-white">
                Payment Processing
              </p>
              <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]  group-hover:text-white">
                Payments integrated with your cash register and other touch
                points to ensure no loose ends.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Organize;
