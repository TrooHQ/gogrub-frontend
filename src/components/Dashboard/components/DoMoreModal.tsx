import Modal from "../../Modal";
import Logo from "../../../assets/Union.svg";
import Icon1 from "../../../assets/icons.svg";
import Icon2 from "../../../assets/icons (1).svg";
import Icon3 from "../../../assets/icons (3).svg";
import Icon4 from "../../../assets/icons (2).svg";
import Description from "../../../assets/Description.svg";
import Description1 from "../../../assets/Description (1).svg";
import Description2 from "../../../assets/Description (2).svg";
import Description3 from "../../../assets/Description (3).svg";
import CancelIcon from "../../../assets/Cancel.svg";
import { useState } from "react";
import Pattern from "../../../assets/Pattern.png";

import { FaChevronRight } from "react-icons/fa6";

interface SetupModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
const DoMoreModal: React.FC<SetupModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabImages = [Description, Description1, Description2, Description3];
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className=" bg-white relative rounded-[20px] w-[890px] ">
          <div
            className="absolute top-0 right-0  cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <img src={CancelIcon} alt="" />
          </div>

          <div className=" flex items-center gap-[9px] justify-center">
            <p className="font-[500] text-[28px] text-[#000000]">
              What you can Do With
            </p>
            <img src={Logo} alt="Logo" />
          </div>

          <div
            className=""
            style={{
              backgroundImage: `url(${Pattern})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "full",
            }}
          >
            <div className="flex items-center justify-between my-[22px] pl-[56px]">
              <div className="max-w-[282px] w-full  ">
                <div className="flex flex-col gap-[16px]">
                  {[
                    { title: "Branded Online Store", icon: Icon1 },
                    { title: "Custom Menu Builder", icon: Icon2 },
                    { title: "Pickup & Delivery Scheduling", icon: Icon4 },
                    { title: "Unique GoGrub URL", icon: Icon3 },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-[16px] p-[24px] flex items-center gap-[12px] cursor-pointer transition-all duration-300 ${
                        activeTab === index
                          ? "border-[#FF4F00D6] bg-[#FFF4F0] scale-105"
                          : "border-[#E0E0E0] scale-100"
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      <img src={item.icon} alt={`${item.title} Icon`} />
                      <p className="font-[500] text-[16px] text-[#0D0D0D]">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-grow max-w-[488px] h-[480px] transition-opacity duration-300">
                <img
                  src={tabImages[activeTab]}
                  alt={`Tab ${activeTab}`}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-end">
            {" "}
            <div
              className=" cursor-pointer inline-flex items-center space-x-[8px] text-white bg-[#FF4F00] rounded-[8px] border border-[#FF4F00] text-[16px] font-[600] text-center px-[24px] py-[16px] "
              onClick={() => setIsModalOpen(false)}
            >
              <p className=" ">Next</p>
              <FaChevronRight />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoMoreModal;
