import Modal from "../../Modal";
import Logo from "../../../assets/Union.svg";
import ActivateIcon from "../../../assets/activateIcon.svg";
import MenuSetupIcon from "../../../assets/menuSetupIcon.svg";
import PickupIcon from "../../../assets/pickupIcon.svg";

interface SetupModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SetupModal: React.FC<SetupModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className=" bg-white relative rounded-[20px] w-[890px]">
          <div
            className="absolute top-0 right-0  cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <img src={Logo} alt="Logo" />
          </div>

          <div className=" max-w-[486px] mx-auto text-center">
            <p className="font-[500] text-[28px] text-[#000000]">
              Let’s launch your store — just{" "}
            </p>
            <p className=" font-[500] text-[28px] text-[#FF4F00]">
              complete these 3 quick steps
            </p>
          </div>

          <div className=" max-w-[600px] mx-auto mt-[50px] space-y-[44px]">
            <div className=" flex items-center justify-between gap-[20px]">
              <div className=" flex items-center gap-[16px]">
                <p className=" text-[44px] font-[400] text-[#000000]">1.</p>
                <div className=" bg-[#FFFFFF] shadow shadow-[#0000001F] p-[24px] rounded-[8px] max-w-[248px] w-full text-start">
                  <div className=" flex items-center gap-[4px]">
                    <img src={MenuSetupIcon} alt="Menu Icon" />
                    <p className=" font-[500] text-[16px] text-[#000000]">
                      Set your menu
                    </p>
                  </div>
                </div>
              </div>

              <div className=" flex items-center gap-[16px]">
                <p className=" text-[44px] font-[400] text-[#000000]">2.</p>
                <div className=" bg-[#FFFFFF] shadow shadow-[#0000001F] p-[24px] rounded-[8px] max-w-[248px] w-full text-start">
                  <div className=" flex items-center gap-[4px]">
                    <img src={PickupIcon} alt="Menu Icon" />
                    <p className=" font-[500] text-[16px] text-[#000000]">
                      Set Pickup & Delivery Rules
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex items-center gap-[16px]">
              <p className=" text-[44px] font-[400] text-[#000000]">3.</p>
              <div className=" bg-[#FFFFFF] shadow shadow-[#0000001F] p-[24px] rounded-[8px] max-w-[441px] mx-auto w-full text-start">
                <div className=" flex items-center gap-[4px]">
                  <img src={ActivateIcon} alt="Menu Icon" />
                  <p className=" font-[500] text-[16px] text-[#000000]">
                    Activate Your Unique GoGrub URL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SetupModal;
