import { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { Link, useLocation } from "react-router-dom";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import {
  updateCustomerName,
  updateCustomerTableNumber,
} from "../../slices/BasketSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setBusinessIdentifier,
  setBusinessDetails,
  setGroupName,
  // setTableNo,
  setURL,
  setBranchID,
} from "../../slices/businessSlice";
import { RootState } from "../../store/store";
import NotFound from "../NotFound";

const InRoomStartOrder = () => {
  const location = useLocation();

  const userDetails = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const token = userDetails?.userData?.token;

  const queryParams = new URLSearchParams(location.search);
  const fullUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;
  sessionStorage.setItem("url", fullUrl);

  const business_identifier = queryParams.get("business_identifier");
  // const roomNo = queryParams.get("room");
  const branch = queryParams.get("branch");
  const group_name = queryParams.get("group_name") ?? "default_group_name";

  useEffect(() => {
    if (business_identifier && branch) {
      dispatch(setBusinessIdentifier(business_identifier));
      dispatch(setGroupName(group_name));
      // dispatch(setTableNo(roomNo));
      dispatch(setBranchID(branch));
      dispatch(setURL(fullUrl));
    }

    getBusinessDetails();
  }, [business_identifier, group_name]);

  const getBusinessDetails = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/business/getBusinessDetails/?business_identifier=${business_identifier}`,
        headers
      );

      dispatch(setBusinessDetails(response.data.data));
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isRoomOpen, setRoomIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );
  const color = businessDetails?.colour_scheme;

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserName(name);
    dispatch(updateCustomerName(name));
  };

  const handleTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roomNumber = event.target.value;
    setRoom(roomNumber);
    dispatch(updateCustomerTableNumber(roomNumber));
  };

  const handleNext = () => {
    setIsOpen(false);
    setRoomIsOpen(true);
  };

  if (!business_identifier) {
    return <NotFound />;
  }

  return (
    <div className="mx-[22px]" style={{ color: color || "#606060" }}>
      <div className="flex flex-col items-center justify-center mt-[64px]">
        <div className="mb-[10px] max-w-[200px] h-[200px]">
          <img
            src={businessDetails?.business_logo}
            alt=""
            className=" w-full object-cover h-full"
          />
        </div>
        <p>
          Welcome to{" "}
          <span className="font-bold">{businessDetails?.business_name}</span>{" "}
          Page
        </p>
        <p className="mt-[24px] text-[16px] font-[400] text-center">
          Food ready in <span className="font-bold">8-13 minutes</span> after
          placing order
        </p>

        <div className="mt-[40px] flex flex-col items-center justify-center">
          <p
            className="cursor-pointer text-[#ffffff] px-[40px] py-[10px] bg-[#FF0000] rounded-[5px] font-[500] inline"
            onClick={() => setIsOpen(true)}
            style={{ backgroundColor: color || "#606060" }}
          >
            Start Your Order
          </p>
          <a href="">
            <p className="text-center text-[#FF0000] underline text-[16px] mt-[24px]">
              Click here for menu and nutrition information
            </p>
          </a>

          <p className="italic text-center text-[16px] mt-[32px]">
            By clicking “Start Your Order” you agree to our{" "}
            <a href="">
              <span className="text-[#FF0000] underline">
                Terms & Conditions
              </span>
            </a>
          </p>
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <div className="w-[330px] h-[228px] flex flex-col items-center justify-center">
          <input
            className="border-b border-grey500 outline-none focus:border-grey500 w-full pb-[36px] text-center"
            type="text"
            placeholder="Enter your first name"
            value={userName}
            onChange={handleUserNameChange}
          />
          <div className="mt-[25px]">
            <p
              className="px-[24px] py-[10px] bg-none inline rounded-[5px] text-[#FF0000] text-[16px] font-[500] cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </p>
            <p
              className={`px-[24px] py-[10px] ${!userName ? "bg-[#F8C9C9]" : "bg-[#FF0000] cursor-pointer"
                } inline rounded-[5px] text-[#ffffff] text-[16px] font-[500]`}
              onClick={userName ? handleNext : undefined}
              style={{
                backgroundColor: userName ? color : "#f2f2f2",
              }}
            >
              Next
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isRoomOpen}>
        <div className="w-[330px] h-[228px] flex flex-col items-center justify-center">
          <input
            className="border-b border-grey500 outline-none focus:border-grey500 w-full pb-[36px] text-center"
            type="text"
            placeholder="Enter your room number"
            value={room}
            onChange={handleTableChange}
          />
          <div className="mt-[25px]">
            <p
              className="px-[24px] py-[10px] bg-none inline rounded-[5px] text-[#FF0000] text-[16px] font-[500] cursor-pointer"
              onClick={() => setRoomIsOpen(false)}
            >
              Cancel
            </p>
            <Link to={`/demo/category-details/in_room_dining`}>
              <p
                className={`px-[24px] py-[10px] ${!room ? "bg-[#F8C9C9]" : "bg-[#FF0000] cursor-pointer"
                  } inline rounded-[5px] text-[#ffffff] text-[16px] font-[500]`}
                style={{
                  backgroundColor: room ? color : "#f2f2f2",
                }}
              >
                Submit
              </p>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InRoomStartOrder;
