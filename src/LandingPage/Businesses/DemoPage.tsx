import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState } from "react";
import Overlay from "../../assets/GreyOverlay.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  NameOfCompany: string;
  howDidYouFindUs: string;
  NoOfEstablishment: string;
};

const DemoPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [smallScreen, setSmallScreen] = useState(false);

  const handleResize = () => {
    setSmallScreen(window.innerWidth < 640);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log(data);
    setLoading(true);
    try {
      const payload = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Phone: data.phone,
        Email: data.email,
        NameOfCompany: data.NameOfCompany,
        City: data.city,
        HowDidYouFindUs: data.howDidYouFindUs,
        NumberOfEstablishments: data.NoOfEstablishment,
      };
      const response = await axios.post(
        "https://sheet.best/api/sheets/d539e015-10e3-4403-b38f-590a8d055aec",
        payload
      );

      // console.log("Form submitted successfully:", response.data);
      toast.success("Form Submitted Succesfully");

      reset();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

      <div className="max-w-[1440px] mx-[10px] md:mx-[40px] lg:mx-[158px] md:py-[62px] mb-[100px]">
        <div className=" grid gap-[10px] md:flex items-center justify-between  ">
          <div
            className=" max-w-[296px] mx-[30px] md:mx-0 md:max-w-[491px] text-start grid gap-[16px] md:gap-[32px]"
            data-aos="fade-up"
          >
            <p className=" text-[24px] md:text-[44px] font-[500] leading-[31px] md:leading-[66px]">
              A single smart platform that supports all your technoloy needs
            </p>
            <div className="">
              <p className=" text-[16px] font-[500]">
                Benefits of the demo include:
              </p>
              <div className=" text-[14px] md:text-[16px] font-[400] text-[#000000] leading-[24px]">
                <ul className=" list-disc md:px-[20px] ">
                  <li> A call to fully understand your business.</li>
                  <li>A personalized demonstration of our product.</li>
                  <li>
                    Information on how to help you earn more and work better.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="w-full md:max-w-[652px] px-4 mt-[32px] md:mt-0"
            data-aos="fade-up"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 md:gap-6"
            >
              <div className="flex  md:flex-row gap-4 md:gap-6">
                <input
                  type="text"
                  placeholder="First name"
                  {...register("firstName", { required: true })}
                  className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full md:w-[48%]"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  {...register("lastName", { required: true })}
                  className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full md:w-[48%]"
                />
              </div>

              <div className="flex md:flex-row gap-4 md:gap-6">
                <input
                  type="text"
                  placeholder="Nigeria"
                  disabled
                  className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-[100px] md:w-[150px]"
                />
                <input
                  type="text"
                  placeholder="+234"
                  {...register("phone", { required: true })}
                  className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] flex-grow w-full"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full"
              />

              <input
                type="text"
                placeholder="Name of Company"
                {...register("NameOfCompany", { required: true })}
                className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-full"
              />

              <div className="flex  md:flex-row gap-4 md:gap-6">
                <input
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true })}
                  className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400] w-[100px] sm:w-full"
                />
                <input
                  type="text"
                  placeholder="How did you find us?"
                  {...register("howDidYouFindUs", { required: true })}
                  className="border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[16px] font-[400]  flex-grow w-full"
                />
              </div>

              <input
                type="text"
                placeholder={
                  !smallScreen
                    ? "Number of establishments (How many hospitality businesses do you manage?)"
                    : "Number of establishments"
                }
                {...register("NoOfEstablishment", { required: true })}
                className=" border border-[#B6B6B6] rounded-[5px] py-[13px] px-[20px] text-[#606060] text-[13px] font-[400] w-full"
              />

              <button
                disabled={loading}
                type="submit"
                className="text-[16px] font-[500] py-[10px] rounded-[5px] bg-[#121212] text-white w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <LandingPageFAQ />
      <Blog />
      <Footer />
    </div>
  );
};

export default DemoPage;
