import Modal from "../../Modal";
import ArrowLeft from "../../../assets/arrowLeftSmall.svg";
import { RestartAlt } from "@mui/icons-material";

const OpenTicketModal = ({
  openTicket,
  handleTicketMenu,
  setOpenTicket,
  // data,
  openTicketData,
}: any) => {
  return (
    <div>
      <Modal isOpen={openTicket} onClose={handleTicketMenu}>
        <div className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[80vw] ">
          <div
            className="flex items-center justify-start gap-2 cursor-pointer"
            onClick={() => setOpenTicket(false)}
          >
            <img src={ArrowLeft} alt="" className="" />
            <span className="text-base font-normal text-[#606060]">
              Back to ticket
            </span>
          </div>
          <div className="flex flex-col gap-8 mt-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[#121212] text-[32px] font-medium">
                  {`Order No: ${openTicketData?.order_number}`}
                </h2>
                <p className="text-[#606060] text-[16px] font-normal">
                  {`Tracking Number ${openTicketData?.tracking_number
                    }, ${openTicketData?.createdAt.slice(
                      0,
                      10
                    )}, ${openTicketData?.createdAt.slice(11, 16)}`}
                </p>
              </div>
              <div className="flex items-center justify-end gap-10">
                <div>
                  <h2 className="text-[#dc3232] text-[32px] font-medium">#0</h2>
                  <p className="text-[#dc3232] text-[16px] font-normal">
                    Left to pay
                  </p>
                </div>
                <div>
                  <h2 className="text-[#121212] text-[32px] font-medium">
                    {`#${openTicketData?.total_price}`}
                  </h2>
                  <p className="text-[#606060] text-[16px] font-normal">
                    Total order
                  </p>
                </div>
              </div>
            </div>
            {/* Tables */}
            <div className="pb-[16px] pt-0 border rounded-[10px] border-grey100 mt-[24px]">
              {" "}
              <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-5 border-b">
                <p className=" text-[14px] text-[#121212]">Time</p>
                <p className=" text-[14px] text-[#121212]">Tip</p>
                <p className="text-start text-[14px] text-[#121212]">Method</p>
                <p className=" text-[14px] text-[#121212]">Status </p>
                <p className=" text-[14px] text-[#121212]">Total </p>
              </div>
              <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-5 border-b">
                <p className=" text-[14px] text-[#121212]">{`${openTicketData?.createdAt.slice(
                  0,
                  10
                )}, ${openTicketData?.createdAt.slice(11, 16)}`}</p>
                <p className=" text-[14px] text-[#121212]">-</p>
                <p className="text-start text-[14px] text-[#121212]">
                  {openTicketData?.channel}
                </p>
                <p className=" text-[14px] text-[#121212]">
                  {openTicketData?.status}
                </p>
                <p className=" text-[14px] text-[#121212]">
                  {openTicketData?.total_price}{" "}
                </p>
                <p className=" text-[14px] text-[#121212]"></p>
              </div>
            </div>

            <div>
              <h4 className="text-[22px] font-medium text-[#121212]">
                Order details
              </h4>
              <div className="pb-[16px] pt-0 border rounded-[10px] border-grey100 mt-[12px]">
                {" "}
                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-3 border-b">
                  <p className="text-start text-[14px] text-[#121212]">Item</p>
                  <p className="text-end text-[14px] text-[#121212]">Price</p>
                  <p className=" text-[14px] text-[#121212]"></p>
                </div>
                {openTicketData &&
                  openTicketData?.menu_items?.map((item: any, index: any) => (
                    <div
                      className={`text-center py-[14px] px-[32px] grid grid-cols-3 items-center font-[500] text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                        }`}
                      key={index}
                    >
                      <p className="text-start">{item.name}</p>
                      <p className="text-end">&#x20A6;{item.totalPrice}</p>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={handleTicketMenu}
                          className="flex items-center justify-center py-[6px] px-[10px] bg-[#e27da2] text-[12px] font-[500] text-white rounded-[5px] w-[32%]"
                        >
                          <RestartAlt className="w-[20px] h-[20px]" />
                          Refund
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OpenTicketModal;
