"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PAYMENT_DOMAIN, SERVER_DOMAIN } from "../../Api/Api";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { fetchUserDetails } from "../../slices/UserSlice";

interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  discount?: string;
}

const UpgradeSubscription: React.FC = () => {
  const dispatchs = useDispatch<AppDispatch>();

  const { userData, userDetails } = useSelector(
    (state: RootState) => state.user
  );
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    _id: string;
    price: number;
  } | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [openFeatures, setOpenFeatures] = useState<string | null>(null);

  const currentPlanId = userDetails?.businessPlan?.plan._id ?? null;

  const features: Record<string, string[]> = {
    quarterly: [
      "Branded Online Store",
      "Custom Menu & Pricing",
      "Pickup & Delivery Scheduling",
      "Unique GoGrub URL",
    ],
    yearly: [
      "Branded Online Store",
      "Custom Menu & Pricing",
      "Pickup & Delivery Scheduling",
      "Unique GoGrub URL",
      "Real-Time Order Management",
      "Sales Report & Analysis",
      "Customer Insights & Data",
      "Automated Order Notifications",
      "Online Payment Processing (Low Transaction Fees)",
    ],
  };

  const updateLocalStorage = (key: string, value: string): void => {
    const storedData = JSON.parse(
      localStorage.getItem("businessInfo") || "{}"
    ) as Record<string, string>;
    storedData[key] = value;
    localStorage.setItem("businessInfo", JSON.stringify(storedData));
  };

  const handlePlanSelect = (plan: Plan): void => {
    setSelectedPlan(plan);
    updateLocalStorage("selectedPlan", JSON.stringify(plan));
  };

  const handleToggleFeatures = (planName: string): void => {
    setOpenFeatures((prev) => (prev === planName ? null : planName));
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/plan/getPlans?secretKey=trooAdminDev&planType=gogrub`
        );
        const plansData = response.data.data;
        setPlans(plansData);

        if (currentPlanId) {
          const plan = plansData.find(
            (plan: Plan) => plan._id === currentPlanId
          );
          if (plan) {
            setCurrentPlan(plan.name);
            setSelectedPlan(plan);
          }
        }
      } catch (error) {
        console.error("Error fetching plans data:", error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    dispatchs(fetchUserDetails());
  }, [dispatchs]);

  const IntiatePayment = async () => {
    setLoading(true);

    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      };
      const response = await axios.post(
        `${PAYMENT_DOMAIN}/v1/transaction/subscription_payment/`,
        {
          plan_id: selectedPlan?._id,
          business_email: userData?.business_email,
          amount: selectedPlan?.price,
          plan_description: selectedPlan?.name,
          callback_url: location.href.includes("admin.gogrub.co") ? "https://admin.gogrub.co/overview" : "https://gogrub-client.netlify.app/overview",
        },
        headers
      );

      toast.success(response.data.message || "Payment Initiated successfully!");

      window.location.href =
        response.data.data.paystack_data.data.authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex items-center justify-center h-screen">
    //   <p className="text-[24px] font-[500] text-[#414141]">Loading plans...</p>
    // </div>
    // ) : (
    <div className=" h-full transition-all duration-500 ease-in-out bg-[#EFEFEF] py-[5%]">
      <div className="max-w-[900px] min-h-[800px] mx-auto w-full bg-white border border-[#E7E7E7] py-[50px]">
        <div className="font-GeneralSans w-full transition-all duration-500 ease-in-out max-w-[700px] mx-auto">
          <div className="space-y-[28px] text-center">
            <p className="font-[500] text-[#0D0D0D] text-[20px] lg:text-[28px] transition-all duration-500 ease-in-out">
              Upgrade Subscription
            </p>
            <p className="font-[400] text-[18px] lg:text-[20px] text-[#121212] transition-all duration-500 ease-in-out">
              Select plan and proceed to make payment
            </p>
          </div>

          <div className="mt-[44px] space-y-[30px]">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`px-[30px] py-[22px] rounded-[10px] border ${selectedPlan?.name === plan.name
                  ? "border-[#FF4F00]"
                  : "border-[#929292]"
                  } text-[16px] font-[400] text-[#414141] w-full bg-white cursor-pointer transition-all duration-500 ease-in-out`}
                onClick={() => handlePlanSelect(plan)}
              >
                <div className="flex items-start gap-[24px] mb-[30px]">
                  <img
                    src={
                      selectedPlan?.name === plan.name
                        ? "/stateOn.svg"
                        : "/stateOff.svg"
                    }
                    className="w-[23px] h-[23px] mt-[15px] transition-all duration-500 ease-in-out"
                  />
                  <div className="w-full space-y-[13px]">
                    <div className="grid items-center w-full md:flex md:justify-between">
                      <p className="capitalize font-[700] text-[18px] md:text-[24px] text-[#414141] transition-all duration-500 ease-in-out">
                        {plan.name}
                      </p>
                      <p className="font-[700] text-[14px] lg:text-[18px] text-[#414141] transition-all duration-500 ease-in-out">
                        <span className="font-[400]">₦ </span>
                        {plan.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid items-center md:flex md:justify-between">
                      <p className="capitalize font-[400] text-[18px] md:text-[24px] text-[#414141] transition-all duration-500 ease-in-out">
                        Billed {plan.billingCycle}
                      </p>
                      <p className="font-[600] text-[#E10101] text-[14px] line-through transition-all duration-500 ease-in-out">
                        {plan.discount ||
                          (plan.name.includes("yearly") ||
                            plan.name.includes("biannually")
                            ? "30,000"
                            : "10,000")}
                      </p>
                    </div>
                    <div className=" pt-[40px] flex items-center justify-between">
                      <p
                        className="font-[600] text-[18px] text-[#FF4F00] cursor-pointer transition-all duration-500 ease-in-out"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFeatures(plan.name);
                        }}
                      >
                        {openFeatures === plan.name
                          ? "Hide Features"
                          : "View Features"}
                      </p>

                      {plan.name === currentPlan && (
                        <p className=" p-[10px] rounded-full bg-[#FF4F00] font-[700] text-[12px] text-[#FFFFFF]  transition-all duration-500 ease-in-out">
                          Current Plan
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {openFeatures === plan.name && (
                  <div className="transition-all duration-500 ease-in-out"></div>
                )}

                {openFeatures === plan.name &&
                  (plan.name.includes("yearly") ||
                    plan.name.includes("biannually")) && (
                    <div className="border-t border-[#E7E7E7] pt-[30px] font-GeneralSans transition-all duration-500 ease-in-out">
                      <h2 className="text-[20px] font-[400] text-[#0D0D0D] transition-all duration-500 ease-in-out">
                        Features
                      </h2>
                      <ul className="mt-[10px] space-y-[10px]">
                        {features.yearly?.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-[10px] transition-all duration-500 ease-in-out"
                          >
                            <div className="w-[17px] h-[17px] rounded-full bg-[#D9D9D9] transition-all duration-500 ease-in-out"></div>
                            <p className="font-[400] text-[20px] text-[#414141] transition-all duration-500 ease-in-out">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {openFeatures === plan.name &&
                  plan.name.includes("quarterly") && (
                    <div className="border-t border-[#E7E7E7] pt-[30px] font-GeneralSans transition-all duration-500 ease-in-out">
                      <h2 className="text-[20px] font-[400] text-[#0D0D0D] transition-all duration-500 ease-in-out">
                        Features
                      </h2>
                      <ul className="mt-[10px] space-y-[10px]">
                        {features.quarterly?.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-[10px] transition-all duration-500 ease-in-out"
                          >
                            <div className="w-[17px] h-[17px] rounded-full bg-[#D9D9D9] transition-all duration-500 ease-in-out"></div>
                            <p className="font-[400] text-[20px] text-[#414141] transition-all duration-500 ease-in-out">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            ))}
          </div>

          <button
            className="mt-[50px] w-full max-w-[500px] mx-auto flex items-center justify-center bg-[#0D0D0D] border border-[#0D0D0D] px-[10px] py-[13px] rounded-[5px] text-white text-[16px] font-[500] transition-all duration-500 ease-in-out"
            disabled={!selectedPlan}
            onClick={() => {
              if (!selectedPlan) {
                alert("Please select a plan before proceeding.");
              } else {
                setIsOpen(true);
              }
            }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[372px]">
          <div className="text-center ">
            <p className="text-[24px] font-[500] text-gray-500">Payment</p>
            <p className="text-[16px] font-[400] text-grey500">
              Make payment to selected plan
            </p>
            <div className="flex items-center justify-center gap-4 mt-[50px]">
              <div
                className="border cursor-pointer border-[#FF4F00] rounded px-[24px] py-[10px] font-[600] text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <p className="font-[500] text-[16px] text-[#FF4F00] cursor-pointer">
                  Cancel
                </p>
              </div>
              <button
                className="border border-black bg-black rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
                onClick={() => IntiatePayment()}
                disabled={loading}
              >
                <p className="text-[16px]">Proceed</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpgradeSubscription;
