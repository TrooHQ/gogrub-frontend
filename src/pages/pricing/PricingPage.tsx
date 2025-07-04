import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  ArrowCircleRightOutlined,
  CheckCircleOutline,
  Close,
  AddCircleOutline,
  ArrowBack,
} from "@mui/icons-material";
import { setPlanDetails, fetchUserDetails } from "../../slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/src/store/store";
import Modal from "../../components/Modal";
import { RootState } from "../../store/store";

import TopMenuNav from "../../components/Dashboard/TopMenuNav";

interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  discount?: string;
}

const PricingPage = () => {
  const dispatch = useDispatch();
  const dispatchs = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Quarterly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    _id: string;
  } | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [combinedPlans, setCombinedPlans] = useState<any>();
  const [areyousure, setAreYouSure] = useState(false);

  const { userData, userDetails } = useSelector(
    (state: RootState) => state.user
  );

  const currentPlanId = userDetails?.businessPlan?.plan._id ?? null;

  const pricingPlans = [
    {
      name: "Basic",
      description: "Ideal for businesses with smaller requirements",
      price: "9,000",
      info: "Billed quaterly (N3,000 per month)",
      note: "Save up to N6000 with yearly commitment",
      buttonText: "Select Plan",
      isEnterprise: false,
    },
    {
      name: "Essential",
      description: "Designed for growing businesses that need more control",
      price: "15,000",
      info: "Billed quaterly (N5,000 per month)",
      note: "Save up to N6000 with yearly commitment",
      buttonText: "Select Plan",
      isEnterprise: false,
    },
    {
      name: "Premium",
      description:
        "Best for established businesses looking for deeper automation",
      price: "45,000",
      info: "Billed quaterly (N15,000 per month)",
      note: "Save up to N3000 with yearly commitment",
      buttonText: "Select Plan",
      isEnterprise: false,
    },
    {
      name: "Enterprise",
      description:
        "Custom solutions for multi-location and high-volume businesses.",
      price: "",
      info: "",
      note: "Best option for those needing scalability, deep integrations, full-customization, dedicated support, API access",
      buttonText: "Contact Us",
      isEnterprise: true,
    },
  ];

  // const updateLocalStorage = (key: string, value: string): void => {
  //   const storedData = JSON.parse(
  //     localStorage.getItem("businessInfo") || "{}"
  //   ) as Record<string, string>;
  //   storedData[key] = value;
  //   localStorage.setItem("businessInfo", JSON.stringify(storedData));
  // };

  console.log(currentPlan, "currentPlan");

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const tableData = [
    {
      category: "Solution",
      rows: [
        ["Additional License Fee", "₦2,500", "₦2,500", "₦2,500"],
        [
          "Charge",
          "<1.5% per transaction",
          "<1.5% per transaction",
          "<1.5% per transaction",
        ],
        ["Ideal for", "1-2 locations", "1-5 locations", "6+ locations"],
      ],
    },
    {
      category: "Hardware Upfront Costs",
      rows: [
        [
          "Hardware Costs",
          "depending on package",
          "depending on package",
          "depending on package",
        ],
        [
          "Installation Packages",
          "depending on package",
          "depending on package",
          "depending on package",
        ],
      ],
    },
    {
      category: "Troo Cloud Portal",
      rows: [
        [
          "Menu Management",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Real Time Analytics",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Order, Room & Table Management",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "QR Code Offering",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Tickets",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
      ],
    },
    {
      category: "Reporting",
      rows: [
        [
          "Sales Reports",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Menu Analysis",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Real time reporting",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Customer insights",
          <AddCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
      ],
    },
    {
      category: "Integrations",
      rows: [
        [
          "Basic API Access",
          <AddCircleOutline />,
          <AddCircleOutline />,
          <CheckCircleOutline />,
        ],
      ],
    },
    {
      category: "Customer Care",
      rows: [
        [
          "24/7/365 Availability",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Features and Software Upgrades",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Installation & Network Configuration",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
      ],
    },
    {
      category: "Troo Operation Apps",
      rows: [
        [
          "Tably - Desktop Till",
          <CheckCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "KDS",
          <AddCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Flex - Mobile Till",
          <AddCircleOutline />,
          <CheckCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Online Ordering - Gogrub",
          <AddCircleOutline />,
          <AddCircleOutline />,
          <CheckCircleOutline />,
        ],
        [
          "Kiosk -  Self Checkout",
          <AddCircleOutline />,
          <AddCircleOutline />,
          <AddCircleOutline />,
        ],
        [
          "Menu Boards",
          <AddCircleOutline />,
          <AddCircleOutline />,
          <AddCircleOutline />,
        ],
        [
          "Delivery - Godeliver",
          <AddCircleOutline />,
          <AddCircleOutline />,
          <AddCircleOutline />,
        ],
      ],
    },
    {
      category: " Partner Integrations",
      rows: [
        [
          "Built in integrations",
          <AddCircleOutline />,
          <AddCircleOutline />,
          <AddCircleOutline />,
        ],
      ],
    },
  ];

  useEffect(() => {
    dispatchs(fetchUserDetails());
  }, [dispatchs]);
  const token = userData?.token;

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/plan/getPlans?secretKey=trooAdminDev&planType=troo`
      );
      const fetchedPlans = response.data.data;
      setPlans(fetchedPlans);

      // Combine fetched plans with pricingPlans
      const combined = fetchedPlans.map((plan: any) => {
        // Extract the base name (e.g., "Basic", "Essential") from the backend name
        const baseName = plan.name
          .replace(" quarterly plan", "")
          .replace(" yearly plan", "")
          .replace(" plan", "")
          .trim();

        // Find the matching plan in pricingPlans
        const matchingPlan = pricingPlans.find(
          (p) => p.name.toLowerCase() === baseName.toLowerCase()
        );

        return {
          ...matchingPlan, // Use existing data from pricingPlans if available
          ...plan, // Override with data from the fetched plan
          price: `${plan.price}`, // Format price
          info: `Billed ${plan.billingCycle}`, // Add billing cycle info
          buttonText: matchingPlan?.buttonText || "Select Plan", // Default button text
        };
      });

      // Categorize plans into Quarterly and Yearly
      const quarterlyPlans = combined.filter(
        (plan: any) => plan.billingCycle.toLowerCase() === "quarterly"
      );
      const yearlyPlans = combined.filter(
        (plan: any) =>
          plan.billingCycle.toLowerCase() === "yearly" ||
          plan.billingCycle.toLowerCase() === "biannually" ||
          plan.billingCycle.toLowerCase() === "on request"
      );

      setCombinedPlans({
        quarterly: quarterlyPlans,
        yearly: yearlyPlans,
      });

      if (currentPlanId) {
        const plan = fetchedPlans.find(
          (plan: Plan) => plan._id === currentPlanId
        );
        if (plan) {
          setCurrentPlan(plan.name);
          setSelectedPlan(plan);
        }
      }
    } catch (error) {
      console.error("Error fetching plans data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  console.log(combinedPlans, "the whole plans");
  console.log(plans, "the plans");
  const SubcribePlan = async () => {
    setLoading(true);
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

      sessionStorage.setItem("currentPlanName", selectedPlan?.name || "");
      toast.success(response.data.message || "Plan subscribed successfully!");
      setIsOpen(false);
      setLoading(false);
      navigate("/verified-payment");
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-[92vw] 2xl:max-w-7xl md:mx-auto mx-[20px] px-3 mt-8">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="flex items-center gap-2 text-[#121212] text-base font-semibold"
          >
            <ArrowBack className="w-[20px] h-[20px]" />
            Back
          </button>
        </div>{" "}
        <TopMenuNav pathName="Pricing Page" />
      </div>
      <div className="relative text-[#121212] bg-[#FFFFFF]">
        <div className="max-w-6xl 2xl:max-w-7xl md:mx-auto mx-[20px] px-3 mt-8">
          <div
            className="w-full mx-auto text-center md:mt-[0px]"
            data-aos="fade-up"
          >
            <p className="text-[24px] lg:text-[44px] font-[500]">
              Subscription Plan
            </p>
            <p className="text-[10px] lg:text-[14px] font-[400] text-[#121212]">
              Choose your Subscription Plan
            </p>
          </div>

          <div className="my-[20px] flex gap-[5px] items-start py-[5px] px-[6px] border border-[#CBCAE7] rounded-[5px] w-fit">
            {["Quarterly", "Yearly"].map((tab) => (
              <p
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[16px] font-[500] max-w-[148px] w-full text-center py-[13px] px-[16px] text-[#0D0D0D] cursor-pointer transition-all min-w-[200px] ${activeTab === tab
                  ? "border rounded-[5px] border-[#CBCAE7] bg-[#121212] text-white"
                  : "border-none"
                  }`}
              >
                {tab}
              </p>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center h-[50vh]">
              <p className="text-[16px] font-[500] text-[#121212]">
                Loading plans...
              </p>
            </div>
          )}

          <div className="grid items-start place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[21px] my-[50px]">
            {combinedPlans &&
              (activeTab === "Quarterly"
                ? combinedPlans.quarterly
                : combinedPlans.yearly
              )?.map((plan: any) => (
                <div
                  key={plan._id}
                  className="border border-[#B6B6B6] px-[20px] rounded-[10px] py-[15px] md:width[270px] md:h-[350px] relative"
                >
                  <div className="space-y-[20px]">
                    <div className="space-y-[12px]">
                      <p className="text-[#121212] capitalize text-[28px] font-[500]">
                        {plan.name
                          .replace(" quarterly plan", "")
                          .replace(" yearly plan", "")
                          .replace(" plan", "")
                          .trim()}
                      </p>
                      <p className="text-[#606060] text-[14px] font-[400]">
                        {plan.description}
                      </p>
                    </div>
                    <div>
                      <div className="pb-[4px]">
                        {plan.isEnterprise ? (
                          ""
                        ) : (
                          <p className="text-[#121212] text-[28px] font-[500]">
                            {plan.price
                              ? `₦${Number(plan.price).toLocaleString()}`
                              : ""}
                          </p>
                        )}
                      </div>
                      <p className="pt-[0px] font-[400] text-[14px] text-[#121212]">
                        {plan.info}
                      </p>
                      <p
                        className={clsx(
                          "pt-[0px] mt-2.5 font-[400] text-[#606060]",
                          plan.isEnterprise ? "text-[14px]" : "text-[10px]"
                        )}
                      >
                        {plan.note}
                      </p>
                    </div>
                  </div>

                  <button
                    className="mt-[60px] border border-[#000000] bg-[#0d0d0d] py-[10px] rounded-[5px] font-[400] text-[14px] text-[#ffffff] text-center absolute bottom-10 w-[225px]"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setAreYouSure(true);
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
          </div>

          <div className="flex items-center justify-center mb-[50px]">
            <button
              className="flex items-center justify-center mb-[50px] rounded-lg border border-black py-3 w-fit px-8 gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="text-[#121212] text-base font-semibold">
                Compare Plans
              </p>
              <ArrowCircleRightOutlined className="w-[20px] h-[20px] text-[#000000]" />
            </button>

            {isModalOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="bg-white rounded-lg p-6 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="max-w-screen-lg mx-auto p-6 rounded-md">
                    {/* Close Button */}
                    {/* <button
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <span className="material-icons">close</span>
                    </button> */}

                    <h2 className="text-2xl font-[500] mb-2 text-center text-[#121212]">
                      Compare Features by Category
                    </h2>
                    <p className="text-sm font-normal text-[#121212] mb-4 text-center">
                      This table provides the feature list for each of the
                      pricing tiers.
                    </p>
                    <table className="w-full border-collapse">
                      <thead className="border border-gray-300">
                        <tr className="border-b-1 border-gray-300">
                          <th className="py-2 px-4 text-left font-[500] text-[20px] text-[#606060]  border-r border-[#606060] bg-white">
                            Comparing
                          </th>
                          <th className="py-2 px-4 text-left font-[500] text-[14px] text-[#606060] bg-[#eeeef7] border-r border-[#606060]">
                            Features
                          </th>
                          <th className="py-2 px-4 text-center font-[500] text-[14px] text-[#606060] bg-[#eeeef7] border-r border-[#606060]">
                            Basic
                          </th>
                          <th className="py-2 px-4 text-center font-[500] text-[14px] text-[#606060] bg-[#eeeef7] border-r border-[#606060]">
                            Essential
                          </th>
                          <th className="py-2 px-4 text-center font-[500] text-[14px] text-[#606060] bg-[#eeeef7]">
                            Premium
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map(({ category, rows }) => (
                          <React.Fragment key={category}>
                            {rows.map((row, rowIndex) => (
                              <tr
                                className="border-b border-gray-200"
                                key={rowIndex}
                              >
                                {rowIndex === 0 && (
                                  <th
                                    rowSpan={rows.length}
                                    className="py-3 px-4 text-left font-[500] text-[#606060] align-top text-[20px] border border-gray-300"
                                  >
                                    {category}
                                  </th>
                                )}
                                {row.map((cell, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className={`py-3 px-4 text-gray-600 border border-gray-300 text-[13px] font-[500] ${cellIndex > 0 ? "text-center" : ""
                                      }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[372px]">
          <div className=" text-center">
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
                onClick={() => SubcribePlan()}
                disabled={loading}
              >
                <p className="text-[16px]">Proceed</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={areyousure} onClose={() => setAreYouSure(false)}>
        <div className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[539px]">
          <div
            className="flex items-center justify-end cursor-pointer"
            onClick={() => setAreYouSure(false)}
          >
            <Close />
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <p className="text-[24px] font-[500] text-gray-500">Subscribe</p>

            <div>
              <p className="text-[16px] font-[400] text-grey500">
                Are you sure you want to subscribe?
              </p>
              <div className="flex items-center justify-center gap-4 mt-5">
                <div
                  className="border cursor-pointer border-black rounded px-[24px]  py-[10px] font-[600] text-gray-500"
                  onClick={() => setAreYouSure(false)}
                >
                  <p className="font-[500] text-[16px] text-gray-500 cursor-pointer">
                    No
                  </p>
                </div>

                <div className="border border-black bg-black rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                  <button
                    onClick={() => SubcribePlan()}
                    className=" text-[16px]"
                  >
                    {loading ? "Loading..." : "Yes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PricingPage;
