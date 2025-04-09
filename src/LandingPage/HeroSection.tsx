import { Link } from "react-router-dom";
import Mockup from "../assets/Mockups.svg";
import PosMockup from "../assets/posmockup.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const HeroSection = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className=" flex flex-col items-center justify-center gap-[40px] md:gap-0 md:flex md:flex-row md:items-center md:justify-between md:mt-[83px] md:ml-[40px] lg:ml-[230px] max-w-[1440px]">
      <div className=" max-w-[271px] lg:max-w-[409px]" data-aos="fade-up">
        <p className=" text-[#121212] text-[24px] lg:text-[44px] font-[500] text-center md:text-start">
          Operating system built for your hospitality business
        </p>
        <p className=" mt-[16px] mb-[12px] md:mt-0 md:mb-0 md:my-[32px] text-[14px] lg:text-[18px] font-[400] text-[#414141] text-center md:text-start">
          Delight your customers and boost your bottom line with our intuitive
          software.
        </p>
        <Link to="/request-demo">
          <div className=" flex items-center justify-center md:justify-start md:mt-[10px]">
            <p className="  px-[24px] py-[10px] bg-[#121212] text-white rounded-[5px] inline cursor-pointer z-50">
              Learn More
            </p>
          </div>
        </Link>
      </div>

      <div className="" data-aos="fade-up">
        <img src={Mockup} alt="" className=" hidden md:block" />
        <img src={PosMockup} alt="" className=" block md:hidden w-[298px]" />
      </div>
    </div>
  );
};

export default HeroSection;
