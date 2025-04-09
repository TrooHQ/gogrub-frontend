import { useState } from "react";
import Restaurant from "../assets/restaurant.png";
import FoodTrucks from "../assets/foodTrucks.png";
import Cafe from "../assets/cafe.png";
import Agile from "../assets/agile.png";
import Bar from "../assets/bar.png";
import Hotel from "../assets/hotel.png";
import { Link } from "react-router-dom";
import LocalHotel from "../assets/local_hotel.svg";
import LocalCafe from "../assets/local_cafe.svg";
import FoodTruck from "../assets/foodtruck.svg";
import Nightlife from "../assets/nightlife.svg";
import LocalRestaurant from "../assets/restaurant_FILL0_wght300_GRAD0_opsz24.svg";
import FastFood from "../assets/Vector.svg";
import Arrow from "../assets/arrow_forward_FILL0_wght300_GRAD0_opsz24 1.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const BusinessTabs = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const tabs = [
    "Restaurants",
    "Food Trucks",
    "Cafes & Bakeries",
    "Fast Foods",
    "Clubs & Lounges",
    "Hotels",
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    console.log("Changing tab to:", index);
    setActiveTab(index);
    console.log("Active tab now:", activeTab);
  };

  return (
    <div className="bg-[#F8F8F8] pb-[40px]">
      <div className="  max-w-[1050px] mx-auto">
        <div className="" data-aos="fade-up">
          <p className=" max-w-[287px] mx-auto md:max-w-full text-[18px] md:text-[22px] font-[500] text-[#121212] md:text-[#414141] py-[32px] text-center">
            See How We Work For Businesses Like Yours
          </p>
        </div>

        <div className=" grid grid-cols-2 gap-[32px] md:hidden">
          <Link to="/restaurant">
            <div className=" flex flex-col gap-[16px] items-center">
              <img src={LocalRestaurant} alt="" />
              <div className=" flex items-center gap-[8px]">
                <p className=" font-[500] text-[16px] text-[#5855B3]">
                  Restaurants
                </p>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </Link>
          <Link to="/food-truck">
            <div className=" flex flex-col gap-[16px] items-center">
              <img src={FoodTruck} alt="" />
              <div className=" flex items-center gap-[8px]">
                <p className=" font-[500] text-[16px] text-[#5855B3]">
                  Food Trucks
                </p>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </Link>

          <Link to="/hotel">
            <div className=" flex flex-col gap-[16px] items-center">
              <img src={LocalHotel} alt="" />
              <div className=" flex items-center gap-[8px]">
                <p className=" font-[500] text-[16px] text-[#5855B3]">Hotels</p>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </Link>
          <Link to="/fast-food">
            {" "}
            <div className=" flex flex-col gap-[16px] items-center">
              <img src={FastFood} alt="" />
              <div className=" flex items-center gap-[8px]">
                <p className=" font-[500] text-[16px] text-[#5855B3]">
                  Fast Foods
                </p>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </Link>
          <Link to="/lounges">
            <div className=" flex flex-col gap-[16px] items-center">
              <img src={Nightlife} alt="" />
              <div className=" flex items-center gap-[8px]">
                <p className=" font-[500] text-[16px] text-[#5855B3]">
                  Clubs/Lounges
                </p>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </Link>

          <Link to="/cafe">
            <div className=" flex flex-col gap-[16px] items-center">
              <img src={LocalCafe} alt="" />
              <div className=" flex items-center gap-[8px]">
                <p className=" font-[500] text-[16px] text-[#5855B3]">
                  Cafes/Bakeries
                </p>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <div className="hidden  gap-[10px] text-center md:flex items-center justify-between md:gap-6 py-[9px] px-[22px]  bg-[#E7E7E7] md:max-w-[1045px] mx-auto rounded-[50px]">
          {tabs.map((tab, index) => (
            <p
              key={index}
              className={` text-[14px] md:text-[16px] font-[500]  cursor-pointer ${
                index === activeTab
                  ? "text-white px-[28px] py-[12px] bg-[#5855B3] rounded-[25px] cursor-pointer"
                  : "text-[#606060] cursor-pointer"
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab}
            </p>
          ))}
        </div>
        <div className="pt-[40px] pb-[84px] hidden md:block">
          {activeTab === 0 && (
            <div className=" grid md:flex items-center justify-center gap-[56px]">
              <img src={Restaurant} alt="" data-aos="fade-up" />
              <div className=" max-w-[386px]" data-aos="fade-up">
                <p className=" font-[500] text-[22px] text-[#000000] mb-[24px]">
                  Never leave money on the table
                </p>
                <p className=" text-[16px] font-[400] mb-[40px]">
                  Easy to use and intuitive software, designed to enhance
                  efficiency, improve customer experience, and increase
                  profitability in your business.
                </p>
                <Link to="/restaurant">
                  <p className=" px-[24px] py-[10px] font-[500] text-[16px] rounded-[5px] bg-[#504DA3] inline text-white">
                    Learn More
                  </p>
                </Link>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className=" grid md:flex items-center justify-center gap-[56px] ">
              <img src={FoodTrucks} alt="" data-aos="fade-up" />
              <div className=" max-w-[386px]" data-aos="fade-up">
                <p className=" font-[500] text-[22px] text-[#000000] mb-[24px]">
                  Scale your business with Troo
                </p>
                <p className=" text-[16px] font-[400] mb-[40px]">
                  Easy to use and intuitive software, designed to enhance
                  efficiency, improve customer experience, and increase
                  profitability in your business. Improve customer attention and
                  service speed by letting the customer order directly.
                </p>
                <Link to="/food-truck">
                  <p className=" px-[24px] py-[10px] font-[500] text-[16px] rounded-[5px] bg-[#504DA3] inline text-white">
                    Learn More
                  </p>
                </Link>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className=" grid md:flex items-center justify-center gap-[56px] ">
              <img src={Cafe} alt="" data-aos="fade-up" />
              <div className=" max-w-[386px]" data-aos="fade-up">
                <p className=" font-[500] text-[22px] text-[#000000] mb-[24px]">
                  Boost profit for your cafe
                </p>
                <p className=" text-[16px] font-[400] mb-[40px]">
                  Easy to use and intuitive software, designed to enhance
                  efficiency, improve customer experience, and increase
                  profitability in your business.
                </p>
                <Link to="/cafe">
                  {" "}
                  <p className=" px-[24px] py-[10px] font-[500] text-[16px] rounded-[5px] bg-[#504DA3] inline text-white">
                    Learn More
                  </p>
                </Link>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className=" grid md:flex items-center justify-center gap-[56px] ">
              <img src={Agile} alt="" data-aos="fade-up" />
              <div className=" max-w-[386px]" data-aos="fade-up">
                <p className=" font-[500] text-[22px] text-[#000000] mb-[24px]">
                  Agile, fast & efficient
                </p>
                <p className=" text-[16px] font-[400] mb-[40px]">
                  Easy to use and intuitive software, designed to enhance
                  efficiency, improve customer experience, and increase
                  profitability in your business.
                </p>
                <Link to="/fast-food">
                  <p className=" px-[24px] py-[10px] font-[500] text-[16px] rounded-[5px] bg-[#504DA3] inline text-white">
                    Learn More
                  </p>
                </Link>
              </div>
            </div>
          )}
          {activeTab === 4 && (
            <div className=" grid md:flex items-center justify-center gap-[56px] ">
              <img src={Bar} alt="" data-aos="fade-up" />
              <div className=" max-w-[386px]" data-aos="fade-up">
                <p className=" font-[500] text-[22px] text-[#000000] mb-[24px]">
                  Boost the profit of your bar
                </p>
                <p className=" text-[16px] font-[400] mb-[40px]">
                  User-friendly and intuitive software, designed to enhance
                  efficiency, improve customer experience, and increase
                  profitability in your business.
                </p>
                <Link to="/lounges">
                  <p className=" px-[24px] py-[10px] font-[500] text-[16px] rounded-[5px] bg-[#504DA3] inline text-white">
                    Learn More
                  </p>
                </Link>
              </div>
            </div>
          )}
          {activeTab === 5 && (
            <div className=" grid md:flex items-center justify-center gap-[56px] ">
              <img src={Hotel} alt="" data-aos="fade-up" />
              <div className=" max-w-[386px]" data-aos="fade-up">
                <p className=" font-[500] text-[22px] text-[#000000] mb-[24px]">
                  Optimize revenue at your hotel
                </p>
                <p className=" text-[16px] font-[400] mb-[40px]">
                  Enhance customer service and speed up service by allowing your
                  customers to place orders directly from anywhere.
                </p>
                <Link to="/hotel">
                  <p className=" px-[24px] py-[10px] font-[500] text-[16px] rounded-[5px] bg-[#504DA3] inline text-white">
                    Learn More
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessTabs;
