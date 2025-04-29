import Modal from "../../Modal";
import Logo from "../../../assets/Union.svg";

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
          <div className="absolute top-0 right-0  cursor-pointer">
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
        </div>
      </Modal>
    </div>
  );
};

export default SetupModal;
