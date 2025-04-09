import React, { useState } from "react";
import Arrow from "../assets/keyboard_arrow_down.svg";

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "Is Troo only for restaurants?",
    answer:
      "Restaurants are one of the many businesses that use Troo. Cafes, bars, hotels, lounges, and every business in the hospitality industry has a tailored solution built for them by Troo.",
  },
  {
    question: "Can I have all my employees on Troo?",
    answer:
      "With Troo, all your employees can be added to the workspace, while you create roles for them. These roles ensures that your employees have access to software and hardware to enable them work effectively.",
  },
  {
    question: "How does the QR code system work on Troo?",
    answer:
      "The QR code contains your menu and a checkout flow that makes it possible for your customers to place an order on your menu, and make payment for the product. This item is sent to the kitchen through the KDS for the customer’s order to be processed.",
  },
  {
    question:
      "Do I have to Purchase Every Product in the Troo Ecosystem to Onboard on Troo?",
    answer:
      "Every Troo product is built for you, but you can choose which one best fits your business at every moment. Be it the KDS, POS system etc.",
  },
];

const LandingPageFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-[#F8F8F8] py-[72px] mt-[80px] md:mt-0">
      <div className=" mx-[10px] md:mx-[40px] 2xl:mx-[158px] text-center md:text-left">
        <div className="">
          <p className=" text-[18px] font-[400] text-[#414141] mb-[16px]">
            Frequently Asked Questions
          </p>
          <p className=" max-w-[451px] font-[500] text-[18px] md:text-[32px] text-[#414141] md:leading-[48px] mb-[24px]">
            No beer without its owner, <br /> no question without an answer
          </p>
        </div>
        <div className=" mx-[10px]">
          {faqList.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className={`cursor-pointer py-[24px] border-t border-[#B6B6B6]`}
                onClick={() => handleToggle(index)}
              >
                <div className="flex items-center justify-between text-left">
                  <p className=" font-[500] text-[14px] md:text-[18px] text-[#414141]">
                    {faq.question}
                  </p>
                  <img
                    src={Arrow}
                    alt=""
                    className={`transition-all ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {openIndex === index && (
                <div className=" py-[16px]">
                  <p className=" text-[14px] md:text-[16px] text-left">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPageFAQ;
