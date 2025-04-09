import Icon1 from "../assets/icon 1.svg";
import Icon2 from "../assets/icon 2.svg";
import Icon3 from "../assets/icon 3.svg";
import Icon4 from "../assets/icon 4.svg";
import Icon5 from "../assets/icon 5.svg";
import Icon6 from "../assets/icon 6.svg";

const Built = () => {
  return (
    <div className=" bg-white mt-[20px] md:mt-[80px]">
      <p className=" max-w-[287px] mx-auto md:max-w-full text-center text-[18px] md:text-[24px] font-[500] text-[#121212] md:text-[#414141]">
        Built To Help Your Business Succeed
      </p>

      <div className=" mx-[40px] mt-[20px] md:my-[59px] flex flex-col justify-center items-center md:items-start md:grid md:grid-cols-3 gap-[16px] 2xl:mx-[158px]">
        <div
          className="md:h-[243px]  border px-[10px] md:px-[30px] py-[20px] md:pt-[51px] md:pb-[59px]"
          data-aos="fade-up"
        >
          <div className=" flex flex-col md:flex-row items-center gap-[10px] md:gap-[24px] ">
            <img src={Icon1} alt="" />
            <p className=" text-[16px] md:text-[20px] font-[500] text-[#5855B3]">
              24/7 Support
            </p>
          </div>
          <p className=" text-center md:text-left md:mt-[35px] font-[400] text-[14px] md:text-[16px] text-[#414141]">
            Expert service support team to ensure you get the help you need when
            you need it.
          </p>
        </div>

        <div
          className=" md:h-[243px]  border px-[10px] md:px-[30px] py-[20px] md:pt-[51px] md:pb-[59px]"
          data-aos="fade-up"
        >
          <div className=" flex flex-col md:flex-row items-center gap-[10px] md:gap-[24px] ">
            <img src={Icon2} alt="" />
            <p className=" text-[16px] md:text-[20px] font-[500] text-[#5855B3]">
              Built-in Tools
            </p>
          </div>
          <p className=" text-center md:text-left md:mt-[35px] font-[400] text-[14px] md:text-[16px] text-[#414141]">
            Whatever your need or current set up, our team will configure troo
            and the right tools to set you up for success.
          </p>
        </div>
        <div
          className="md:h-[243px]  border  px-[10px] md:px-[30px] py-[20px] md:pt-[51px] md:pb-[59px]"
          data-aos="fade-up"
        >
          <div className=" flex flex-col md:flex-row items-center gap-[10px] md:gap-[24px] ">
            <img src={Icon3} alt="" />
            <p className=" text-[16px] md:text-[20px] font-[500] text-[#5855B3]">
              Analytics & Reporting
            </p>
          </div>
          <p className=" text-center md:text-left md:mt-[35px] font-[400] text-[14px] md:text-[16px] text-[#414141]">
            Login from your PC or phone from anywhere to track your business
            performance indicators like sales, orders, etc.
          </p>
        </div>
        <div
          className="md:h-[243px]  border  px-[10px] md:px-[30px] py-[20px] md:pt-[51px] md:pb-[59px]"
          data-aos="fade-up"
        >
          <div className=" flex flex-col md:flex-row items-center gap-[10px] md:gap-[24px] ">
            <img src={Icon4} alt="" />
            <p className=" text-[16px] md:text-[20px] font-[500] text-[#5855B3]">
              Team Friendly
            </p>
          </div>
          <p className=" text-center md:text-left md:mt-[35px] font-[400] text-[14px] md:text-[16px] text-[#414141]">
            Keep tabs on your team's performance, offer incentives, manage
            schedules and set user roles and privileges.
          </p>
        </div>
        <div
          className=" md:h-[243px] border px-[10px] md:px-[30px] py-[20px] md:pt-[51px] md:pb-[59px]"
          data-aos="fade-up"
        >
          <div className=" flex flex-col md:flex-row items-center gap-[10px] md:gap-[24px] ">
            <img src={Icon5} alt="" />
            <p className=" text-[16px] md:text-[20px] font-[500] text-[#5855B3]">
              Next Day Deposits
            </p>
          </div>
          <p className=" text-center md:text-left md:mt-[35px] font-[400] text-[14px] md:text-[16px] text-[#414141]">
            All processed payments get deposited into your business account
            without delays.
          </p>
        </div>
        <div
          className=" md:h-[243px] border  px-[10px] md:px-[30px] py-[20px] md:pt-[51px] md:pb-[59px]"
          data-aos="fade-up"
        >
          <div className=" flex flex-col md:flex-row items-center gap-[10px] md:gap-[24px] ">
            <img src={Icon6} alt="" />
            <p className=" text-[16px] md:text-[20px] font-[500] text-[#5855B3]">
              Troo Capital
            </p>
          </div>
          <p className=" text-center md:text-left md:mt-[35px] font-[400] text-[14px] md:text-[16px] text-[#414141]">
            Troo wallet helps you plan, save and get access to business
            operations loans for growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Built;
