"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PAYMENT_DOMAIN, SERVER_DOMAIN } from "../../Api/Api";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { fetchUserDetails, setPlanDetails } from "../../slices/UserSlice";
import CancelIcon from "../../assets/Cancel.svg";
import Logo from "../../assets/Union.svg";
import CheckCirle from "../../assets/check_circle1.svg";
import Pattern from "../../assets/ChhosePlan.svg";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { setSubscription } from "../../slices/setupSlice";

interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  discount?: string;
  prevPrice: number;
  billingFrequencyAmount: number;
  billingCycleInMonths: number;
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

  // console.log("User Data:", userData);

  // const currentPlanName = userDetails?.businessPlan?.plan?.name ?? null;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [currentPlan, setCurrentPlan] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    _id: string;
    billingFrequencyAmount: number;
  } | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [agreed, setAgreed] = useState(false);

  const currentPlanId = userDetails?.businessPlan?.plan._id ?? null;

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
        console.log("response", plansData)

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
        // console.error("Error fetching plans data:", error);
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
      const response = await axios.post(`${PAYMENT_DOMAIN}/v1/transaction/subscription_payment/`,
        {
          plan_id: selectedPlan?._id,
          business_email: userData?.business_email,
          amount: selectedPlan?.billingFrequencyAmount,
          plan_description: selectedPlan?.name,
          callback_url: "https://gogrub-client.netlify.app/overview",
        },
        headers
      );

      toast.success(response.data.message || "Payment Initiated successfully!");

      window.location.href =
        response.data.data.paystack_data.data.authorization_url;
    } catch (error) {
      // console.error("Error initiating payment:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  // const trxref = queryParams.get("trxref");
  const reference = queryParams.get("reference");
  // const reference = "PLANSUB202504248DE350CA2699";

  // console.log("reference:", reference);
  const dispatch = useDispatch();

  const businessPlan = JSON.parse(localStorage.getItem("businessInfo") || "{}");
  const selectedPlans = businessPlan.selectedPlan
    ? JSON.parse(businessPlan.selectedPlan)
    : null;
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
          planId: selectedPlans?._id,
        },
        headers
      );
      dispatch(setPlanDetails(response.data.data));
      // dispatch(setSubscription(false));
      toast.success(response.data.message || "Plan subscribed successfully!");
      // navigate("/overview");
    } catch (error) {
      // console.error("Error adding employee:", error);
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
      // wait 3 seconds then route to online ordering
      setTimeout(() => {
        // dispatch(setSubscription(false));
        // window.location.href = "/online-ordering";
      }, 3000);

      SubcribePlan();
    } catch (error) {
      // console.error("Error verifing payment:", error);
    } finally {
      //
    }
  };

  const [isNewUser, setIsNewUser] = useState<any>(null);
  // using this to check if the user has subscribed
  useEffect(() => {
    const getUserOnboardChecks = async () => {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/userOnboardChecks`,
          headers
        );
        const createdDate = dayjs(response?.data?.businessPlan?.createdAt);
        const updatedDate = dayjs(response?.data?.businessPlan?.updatedAt);

        // isSame = 
        // console.log("resp", response?.data?.businessPlan?.createdAt, response?.data?.businessPlan?.updatedAt);
        setIsNewUser(createdDate?.format("YYYY-MM-DD") === updatedDate?.format("YYYY-MM-DD"));
        // setUserChecks(response.data);
      } catch (error) {
        // console.error("Error getting Business Details:", error);
      }
    };

    getUserOnboardChecks();

  }, [token])

  // console.log("isNewUser:", isNewUser);

  useEffect(() => {
    if (reference) {
      VerifyPayment();
      console.log(reference);
    }
  }, [reference]);

  return (
    //   <div className="flex items-center justify-center h-screen">
    //     <p className="text-[24px] font-[500] text-[#414141]">Loading plans...</p>
    //   </div>
    // ) : (
    <div className="">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-[900px] max-h-[900px] h-auto mx-auto bg-white  relative overflow-auto">
          <div className="w-full transition-all duration-500 ease-in-out font-GeneralSans ">
            <div className=" flex items-center gap-[9px] justify-center py-[20px]">
              <p className="font-[500] text-[28px] text-[#000000]">
                Choose Your Plan With
              </p>
              <img src={Logo} alt="Logo" />
            </div>

            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <img src={CancelIcon} alt="" />
            </div>

            <div
              className="  py-[30px]"
              style={{
                backgroundImage: `url(${Pattern})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "full",
              }}
            >
              {!reference ? (
                <div className="space-y-[14px]">
                  <div className="space-y-[30px] max-w-[500px] mx-auto ">
                    {plans.map((plan, index) => (
                      <div
                        key={index}
                        className={`px-[30px] py-[22px] rounded-[10px] border ${selectedPlan?.name === plan.name
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
                            <div className="grid items-center w-full md:flex md:justify-between">
                              <p className="capitalize font-[600] text-[14px] md:text-[18px] text-[#414141] transition-all duration-500 ease-in-out">
                                {plan.name}
                              </p>
                              <p className="font-[700] text-[18px] lg:text-[24px] text-[#FF4F00] transition-all duration-500 ease-in-out">
                                <span className="font-[400]">₦ </span>
                                {plan.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="grid items-center md:flex md:justify-between">
                              <p className="capitalize font-[400] text-[14px] md:text-[18px] text-[#414141] transition-all duration-500 ease-in-out">
                                Pay <span className="font-[400]">₦ </span>
                                {plan.billingFrequencyAmount.toLocaleString()}{" "}
                                every {plan.billingCycleInMonths} months
                              </p>
                              {plan.name !== "quarterly plan" && (
                                <p className="font-[600] text-[#303030] text-[14px] line-through transition-all duration-500 ease-in-out">
                                  {plan.prevPrice.toLocaleString()}
                                </p>
                              )}
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
                    className={`max-w-[500px] mx-auto w-full flex items-center justify-center  px-[10px] py-[13px] rounded-[5px]  text-[16px] font-[500] transition-all duration-500 ease-in-out ${selectedPlan && agreed
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
              ) : (
                <div className=" flex flex-col items-center justify-center max-w-[421px] mx-auto w-full h-[404px] bg-[#FF4F00] rounded-[8px]">
                  <div className="font-GeneralSans space-y-[40px]  flex flex-col items-center justify-center">
                    <img
                      src={CheckCirle}
                      alt="Check"
                      className=" w-[100px] h-[100px] "
                    />
                    <div className="space-y-[28px] text-center w-[316px]">
                      <p className="font-[700] text-[#FFFFFF] text-[20px] lg:text-[32px] transition-all duration-500 ease-in-out">
                        Payment Successful
                      </p>
                      {isNewUser && <p className="font-[500] text-[14px] lg:text-[16px] text-[#FFFFFF] transition-all duration-500 ease-in-out">
                        You can get your link <Link to={'/online-ordering?pg=link'}>now</Link>.
                      </p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isNewUser && <Link
              to="/online-ordering?pg=link"
              onClick={() => dispatch(setSubscription(false))}
            >
              <button
                className={`mt-[50px] w-full max-w-[148px] ml-auto flex items-center justify-center  px-[10px] py-[13px] rounded-[5px] text-[16px] font-[500] transition-all duration-500 ease-in-out ${reference
                  ? "text-white  bg-[#FF4F00] border border-[#FF4F00]"
                  : " bg-[#FF4F001F] text-[#FFFFFF] cursor-none"
                  }`}
                disabled={!reference}
              >
                Get Your URL
              </button>
            </Link>}
          </div>
        </div>
      </Modal>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[372px]">
          <div className="text-center ">
            <p className="text-[24px] font-[500] text-gray-500">Payment</p>
            <p className="text-[16px] font-[400] text-grey500">
              Make payment to selected plan
            </p>

            <div className="flex items-center justify-center gap-4 mt-[50px] ">
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

export default UpgradeSubscriptionModal;
