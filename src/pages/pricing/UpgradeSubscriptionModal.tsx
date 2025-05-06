"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { fetchUserDetails } from "../../slices/UserSlice";
import CancelIcon from "../../assets/Cancel.svg";
import Logo from "../../assets/Union.svg";
import Pattern from "../../assets/ChhosePlan.svg";

interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  discount?: string;
}

interface SetupModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const UpgradeSubscriptionModal: React.FC<SetupModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatchs = useDispatch<AppDispatch>();

  const { userData, userDetails } = useSelector(
    (state: RootState) => state.user
  );

  const currentPlanName = userDetails?.businessPlan?.plan?.name ?? null;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [currentPlan, setCurrentPlan] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    _id: string;
    price: number;
  } | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [agreed, setAgreed] = useState(false);

  const currentPlanId = userDetails?.businessPlan?.plan._id ?? null;

  // const features: Record<string, string[]> = {
  //   quarterly: [
  //     "Branded Online Store",
  //     "Custom Menu & Pricing",
  //     "Pickup & Delivery Scheduling",
  //     "Unique GoGrub URL",
  //   ],
  //   yearly: [
  //     "Branded Online Store",
  //     "Custom Menu & Pricing",
  //     "Pickup & Delivery Scheduling",
  //     "Unique GoGrub URL",
  //     "Real-Time Order Management",
  //     "Sales Report & Analysis",
  //     "Customer Insights & Data",
  //     "Automated Order Notifications",
  //     "Online Payment Processing (Low Transaction Fees)",
  //   ],
  // };

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

  // const handleToggleFeatures = (planName: string): void => {
  //   setOpenFeatures((prev) => (prev === planName ? null : planName));
  // };

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
            // setCurrentPlan(plan.name);
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
        `https://payment.trootab.com/api/v1/transaction/subscription_payment/`,
        {
          plan_id: selectedPlan?._id,
          business_email: userData?.business_email,
          amount: selectedPlan?.price,
          plan_description: selectedPlan?.name,
          callback_url: "https://gogrub-client.netlify.app/verified-payment",
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

  return plans.length === 0 ? (
    <div className="flex justify-center items-center h-screen">
      <p className="text-[24px] font-[500] text-[#414141]">Loading plans...</p>
    </div>
  ) : (
    <div className=" ">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-[900px] max-h-[900px] h-auto mx-auto bg-white  relative overflow-auto">
          <div className="font-GeneralSans w-full transition-all duration-500 ease-in-out ">
            <div className=" flex items-center gap-[9px] justify-center py-[20px]">
              <p className="font-[500] text-[28px] text-[#000000]">
                Choose Your Plan With
              </p>
              <img src={Logo} alt="Logo" />
            </div>

            <div
              className="absolute top-0 right-0  cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <img src={CancelIcon} alt="" />
            </div>

            <div
              className=" space-y-[14px]"
              style={{
                backgroundImage: `url(${Pattern})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "full",
              }}
            >
              <div className="space-y-[30px] max-w-[500px] mx-auto py-[30px]">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`px-[30px] py-[22px] rounded-[10px] border ${
                      selectedPlan?.name === plan.name
                        ? "border-[#FF4F00]"
                        : " border-none"
                    } text-[16px] font-[400] text-[#414141] w-full shadow-sm bg-white cursor-pointer transition-all duration-500 ease-in-out`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <div className="flex items-start gap-[24px] ">
                      <img
                        src={
                          selectedPlan?.name === plan.name
                            ? "/stateOn.svg"
                            : "/stateOff.svg"
                        }
                        className="w-[23px] h-[23px] mt-[15px] transition-all duration-500 ease-in-out"
                      />
                      <div className="w-full space-y-[13px]">
                        <div className="w-full grid md:flex items-center md:justify-between">
                          <p className="capitalize font-[600] text-[14px] md:text-[18px] text-[#414141] transition-all duration-500 ease-in-out">
                            {plan.name}
                          </p>
                          <p className="font-[700] text-[18px] lg:text-[24px] text-[#FF4F00] transition-all duration-500 ease-in-out">
                            <span className="font-[400]">₦ </span>
                            {plan.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="grid md:flex items-center md:justify-between">
                          <p className="capitalize font-[400] text-[14px] md:text-[18px] text-[#414141] transition-all duration-500 ease-in-out">
                            Billed {plan.billingCycle}
                          </p>
                          <p className="font-[600] text-[#303030] text-[14px] line-through transition-all duration-500 ease-in-out">
                            {plan.discount ||
                              (plan.name.includes("yearly") ||
                              plan.name.includes("biannually")
                                ? "30,000"
                                : "10,000")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="  max-w-[500px] mx-auto w-full flex items-center gap-[10px] transition-all duration-500 ease-in-out">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-[20px] h-[20px] border border-[#929292] rounded transition-all duration-500 ease-in-out"
                />
                <label
                  htmlFor="terms"
                  className="text-[18px] font-[400] text-[#414141] transition-all duration-500 ease-in-out"
                >
                  I have read and agree to the{" "}
                  <span className="text-[#FF4F00] transition-all duration-500 ease-in-out">
                    terms of service
                  </span>
                </label>
              </div>
              <button
                className={`max-w-[500px] mx-auto w-full flex items-center justify-center  px-[10px] py-[13px] rounded-[5px]  text-[16px] font-[500] transition-all duration-500 ease-in-out ${
                  selectedPlan && agreed
                    ? "bg-[#FF4F00] border border-[#FF4F00] text-white"
                    : " bg-[#FF4F001F] text-[#FFFFFF]"
                }`}
                disabled={!selectedPlan || !agreed}
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

            <button
              className={`mt-[50px] w-full max-w-[148px] ml-auto flex items-center justify-center  px-[10px] py-[13px] rounded-[5px] text-[16px] font-[500] transition-all duration-500 ease-in-out ${
                !currentPlanName
                  ? "text-white  bg-[#FF4F00] border border-[#FF4F00]"
                  : " bg-[#FF4F001F] text-[#FFFFFF] cursor-none"
              }`}
              disabled={!selectedPlan}
            >
              Get Your URL
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[372px]">
          <div className=" text-center">
            <p className="text-[24px] font-[500] text-purple500">Payment</p>
            <p className="text-[16px] font-[400] text-grey500">
              Make payment to selected plan
            </p>

            <div className="flex items-center justify-center gap-4 mt-[50px] ">
              <div
                className="border cursor-pointer border-[#FF4F00] rounded px-[24px] py-[10px] font-[600] text-purple500"
                onClick={() => setIsOpen(false)}
              >
                <p className="font-[500] text-[16px] text-[#FF4F00] cursor-pointer">
                  Cancel
                </p>
              </div>
              <button
                className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
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

export default UpgradeSubscriptionModal;
