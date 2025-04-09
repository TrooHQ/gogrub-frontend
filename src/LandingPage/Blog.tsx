import cafeShop from "../assets/cafe shop.png";
import Hotel from "../assets/hotel room.png";
import foodGuy from "../assets/food delivery guy.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Blog = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className=" bg-white py-[72px] hidden md:block">
      <div className="mx-[10px] md:mx-[40px] 2xl:mx-[158px]">
        <div className="">
          <p className=" text-[18px] font-[400] text-[#414141] mb-[16px]">
            Blog
          </p>
          <p className=" text-[32px] font-[500] text-[#414141] leading-[48px] mb-[40px]">
            Featured
          </p>
        </div>

        <div className=" grid md:grid-cols-3 gap-[24px]" data-aos="fade-up">
          <div className=" h-[440px] max-w-[358px] ">
            <div className=" relative">
              <img
                src={foodGuy}
                alt=""
                className=" object-fill rounded-[5px]"
              />
              <div className=" bg-opacity-[80%] w-full rounded-b-[5px] bg-[#414141] absolute bottom-0">
                <p className=" py-[34px] text-center text-white font-[600] text-[24px]">
                  Click to Cuisines
                </p>
              </div>
            </div>

            <div className="">
              <p className=" font-[400] text-[16px] text-[#606060] mt-[24px] mb-[16px]">
                5 min read
              </p>
              <p className=" font-[500] text-[22px]">
                Optimizing Your Online Food Ordering Platform for Peak
                Performance
              </p>
            </div>
          </div>

          <div className=" h-[440px] max-w-[358px] ">
            <div className=" relative">
              <img src={Hotel} alt="" className=" object-fill rounded-[5px]" />
              <div className=" bg-opacity-[80%] w-full rounded-b-[5px] bg-[#414141] absolute bottom-0">
                <p className=" py-[34px] text-center text-white font-[600] text-[24px]">
                  Room Service Revolution
                </p>
              </div>
            </div>

            <div className="">
              <p className=" font-[400] text-[16px] text-[#606060] mt-[24px] mb-[16px]">
                8 min read
              </p>
              <p className=" font-[500] text-[22px]">
                Leveraging Technology to Upsell and Personalize Guest
                Experiences
              </p>
            </div>
          </div>

          <div className=" h-[440px] max-w-[358px] ">
            <div className=" relative">
              <img
                src={cafeShop}
                alt=""
                className=" object-fill rounded-[5px]"
              />
              <div className=" bg-opacity-[80%] w-full rounded-b-[5px] bg-[#414141] absolute bottom-0">
                <p className=" py-[34px] text-center text-white font-[600] text-[24px]">
                  Caffeine & Calm
                </p>
              </div>
            </div>

            <div className="">
              <p className=" font-[400] text-[16px] text-[#606060] mt-[24px] mb-[16px]">
                12 min read
              </p>
              <p className=" font-[500] text-[22px]">
                Automating Cafe Tasks for a Serene Customer Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
