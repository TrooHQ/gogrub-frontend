"use client";
import React, { useEffect } from "react";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import GoGrubLogo from "../../assets/business_logo.svg";
import CheckCirle from "../../assets/check_circle.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/troo-logo.png";
import { setPlanDetails } from "../../slices/UserSlice";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";

const VerifiedPayment: React.FC = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  // const trxref = queryParams.get("trxref");
  const reference = queryParams.get("reference");

  const dispatch = useDispatch();

  const businessPlan = JSON.parse(localStorage.getItem("businessInfo") || "{}");
  const selectedPlan = JSON.parse(businessPlan.selectedPlan);
  const { userData } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const token = userData?.token;

  const SubcribePlan = async () => {
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${SERVER_DOMAIN}/plan/subcribeBusinessPlan?secretKey=trooAdminDev`,
        {
          planId: selectedPlan?._id,
        },
        headers
      );
      dispatch(setPlanDetails(response.data.data));

      toast.success(response.data.message || "Plan subscribed successfully!");
      navigate("/overview");
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      //
    }
  };

  const VerifyPayment = async () => {
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `https://payment.trootab.com/api/v1/transaction/verify_subscription_payment/`,
        {
          reference: reference,
        },
        headers
      );

      toast.success(response.data.message || "Payment Verified successfully!");

      SubcribePlan();
    } catch (error) {
      console.error("Error verifing payment:", error);
    } finally {
      //
    }
  };

  useEffect(() => {
    VerifyPayment();
  }, []);

  return (
    <div className=" h-full transition-all duration-500 ease-in-out bg-[#EFEFEF] py-[5%]">
      <div className="max-w-[536px] min-h-[541px] mx-auto w-full py-[50px] ">
        <div className="flex items-center justify-center">
          {userData?.onboarding_type === "gogrub" ? (
            <img
              src={GoGrubLogo}
              alt="GoGrubLogo"
              className="mb-[100px] flex items-center justify-center"
            />
          ) : (
            <img
              src={userData?.business_logo ? userData.business_logo : Logo}
              alt="Logo"
              className="mb-[100px] flex items-center justify-center"
            />
          )}
        </div>
        <div className="font-GeneralSans space-y-[40px] flex flex-col items-center justify-center">
          <img src={CheckCirle} alt="Check" className=" w-[100px] h-[100px] " />
          <div className="space-y-[28px] text-center">
            <p className="font-[500] text-[#0D0D0D] text-[20px] lg:text-[24px] transition-all duration-500 ease-in-out">
              Payment Successful
            </p>
            <p className="font-[400] text-[14px] lg:text-[16px] text-[#121212] transition-all duration-500 ease-in-out">
              You have successfuly subscribed to{" "}
              <span className=" font-bold capitalize">{selectedPlan.name}</span>{" "}
            </p>
          </div>

          <p className=" text-center font-[500] text-[16px] text-[#FFFFFF] bg-[#0D0D0D] py-[13px] w-full rounded-[5px]">
            <Link to="/overview">Re-direct to Dashboard</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifiedPayment;
