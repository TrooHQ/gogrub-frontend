import Modal from "../../Modal";
import Logo from "../../../assets/Union.svg";
import Pattern from "../../../assets/Pattern.png";
import CheckIcon from "../../../assets/lets-icons_check-fill (1).svg";
import ActivateIcon from "../../../assets/activateIcon.svg";
import MenuSetupIcon from "../../../assets/menuSetupIcon.svg";
import PickupIcon from "../../../assets/pickupIcon.svg";
import CancelIcon from "../../../assets/Cancel.svg";
import { useNavigate } from "react-router-dom";
import UpgradeSubscriptionModal from "../../../pages/pricing/UpgradeSubscriptionModal";
import {
  setSubscription,
  selectSubscriptionToggleState,
} from "../../../slices/setupSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { SERVER_DOMAIN } from "../../../Api/Api";
import axios from "axios";
import { useEffect, useState } from "react";
interface SetupModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

interface UserCheckState {
  hasMenu: boolean;
  businessPlan: boolean;
  hasPickUpLocation: boolean;
  hasDeliveryDetails: boolean;
}

const SetupModal: React.FC<SetupModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  // const { userDetails } = useSelector((state: any) => state.user);

  const [userCheck, setUserChecks] = useState<UserCheckState>({
    hasMenu: false,
    businessPlan: false,
    hasPickUpLocation: false,
    hasDeliveryDetails: false,
  });
  const token = localStorage.getItem("token");

  // const paid = true;
  const router = useNavigate();
  const isSubscription = useSelector(selectSubscriptionToggleState);

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
      setUserChecks(response.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    getUserOnboardChecks();
  }, []);

  console.log(userCheck);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className=" bg-white relative rounded-[20px] w-[890px] h-[620px]">
          <div
            className="absolute top-0 right-0  cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <img src={CancelIcon} alt="" />
          </div>
          <div
            className="absolute top-0 right-10  "
            // onClick={() => setIsModalOpen(false)}
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

          <div
            className=""
            style={{
              backgroundImage: `url(${Pattern})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "full",
            }}
          >
            <div className=" max-w-[700px] mx-auto py-[100px] space-y-[44px]">
              <div className=" flex items-center justify-between ">
                <div className=" flex items-center gap-[16px]">
                  {userCheck.hasMenu && (
                    <img
                      src={CheckIcon}
                      alt="check icon"
                      className=" w-[40px] h-[40px] object-contain]"
                    />
                  )}
                  <p className=" text-[44px] font-[400] text-[#000000]">1.</p>
                  <div
                    className=" bg-[#FFFFFF] shadow shadow-[#0000001F] p-[24px] rounded-[8px] max-w-[248px] w-full text-start cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(false);
                      router("/menu-builder");
                    }}
                  >
                    <div className=" flex items-center gap-[4px]">
                      <img
                        src={MenuSetupIcon}
                        alt="Menu Icon"
                        className=" w-[50px] h-[50px]"
                      />
                      <p className=" font-[500] text-[16px] text-[#000000]">
                        Set your menu
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center gap-[16px]">
                  {userCheck.hasPickUpLocation &&
                    userCheck.hasDeliveryDetails && (
                      <img
                        src={CheckIcon}
                        alt="check icon"
                        className=" w-[40px] h-[40px] object-contain]"
                      />
                    )}
                  <p className=" text-[44px] font-[400] text-[#000000]">2.</p>
                  <div
                    className="cursor-pointer bg-[#FFFFFF] shadow shadow-[#0000001F] p-[24px] rounded-[8px] max-w-[248px] w-full text-start"
                    onClick={() => {
                      setIsModalOpen(false);
                      router("/online-ordering");
                    }}
                  >
                    <div className=" flex items-center gap-[4px]">
                      <img
                        src={PickupIcon}
                        alt="Menu Icon"
                        className=" w-[50px] h-[50px]"
                      />
                      <p className=" font-[500] text-[16px] text-[#000000]">
                        Set Pickup & Delivery Rules
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex items-center gap-[16px]">
                {userCheck.businessPlan && (
                  <img
                    src={CheckIcon}
                    alt="check icon"
                    className=" w-[40px] h-[40px] object-contain]"
                  />
                )}
                <p className=" text-[44px] font-[400] text-[#000000]">3.</p>
                <div
                  className="cursor-pointer bg-[#FFFFFF] shadow shadow-[#0000001F] p-[24px] rounded-[8px] max-w-[441px] mx-auto w-full text-start"
                  onClick={() => {
                    setIsModalOpen(false);
                    dispatch(setSubscription(true));
                  }}
                >
                  <div className=" flex items-center gap-[4px]">
                    <img
                      src={ActivateIcon}
                      alt="Menu Icon"
                      className=" w-[50px] h-[50px]"
                    />
                    <p className=" font-[500] text-[16px] text-[#000000]">
                      Activate Your Unique GoGrub URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <UpgradeSubscriptionModal
        isModalOpen={isSubscription}
        setIsModalOpen={() => dispatch(setSubscription(false))}
      />
    </div>
  );
};

export default SetupModal;
