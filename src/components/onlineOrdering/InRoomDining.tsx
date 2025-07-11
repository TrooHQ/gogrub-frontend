import { AppDispatch, RootState } from "../../store/store";
import { getRooms } from "../../slices/TableSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../slices/branchSlice";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Add, Close } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import AddQRCode from "../Dashboard/AddQRCode";
import RoomList from "../Dashboard/RoomList";

const InRoomDining = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableNumber, setTableNumber] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState<{
    _id: string;
    group_name: string;
    number: string;
    qrcode?: string;
    branch?: string;
    location?: string;
  } | null>(null);
  const [openDeleteQR, setOpenDeleteQR] = useState(false);

  const tableArr = [{ table_number: 1, guests: 1 }];
  const [state, setState] = useState({
    qrEmpty: true,
    addNewQR: false,
    qrSavedSuccess: false,
    collapseBranchQR: true,
    editBranchQR: false,
    deleteBranchQR: false,
  });
  const [openAddQR, setOpenAddQR] = useState(false);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(fetchBranches());
  }, [dispatch]);

  const { rooms } = useSelector((state: RootState) => state.tables);
  const branches = useSelector((state: any) => state.branches.branches);

  useEffect(() => {
    if (rooms?.length > 0) {
      setState((prevState) => ({
        ...prevState,
        qrEmpty: false,
      }));
    }
  }, []);

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);

    const selectedBranchObj = branches.find(
      (branch: any) => branch._id === branchId
    );
    if (selectedBranchObj) {
      setSelectedBranchId(selectedBranchObj._id);
    }
  };

  const branchOptions = branches.map((branch: any) => ({
    label: branch.branch_name,
    value: branch._id,
  }));

  const handleCreateAsset = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const payload = {
      branch_id: selectedBranchId,
      type: "room",
      group_name: location,
      number: Number(tableNumber),
      table_arr: tableArr,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/asset/generateBusinessAsset/`,
        payload,
        headers
      );
      dispatch(getRooms());
      // resetModalState();
      toast.success(response.data.message || "Created successfully");
      handleCloseAddQR();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewQRCode = () => {
    setState((prevState) => ({ ...prevState, addNewQR: true }));
    setOpenAddQR(true);
  };

  const handleCloseAddQR = () => {
    setOpenAddQR(false);
    setState((prevState) => ({ ...prevState, addNewQR: false }));
  };

  console.log(rooms, "branches");

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    const authToken = localStorage.getItem("token");

    try {
      if (!selectedQRCode) {
        toast.error("No QR code selected.");
        return;
      }

      await axios.delete(
        `${SERVER_DOMAIN}/asset/removeBusinessAsset/?group_name=${selectedQRCode?.group_name ?? ""
        }&branch_id=${selectedQRCode?.branch ?? ""}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Successful");
      setOpenDeleteQR(false);
      dispatch(getRooms());
    } catch (error) {
      console.error("Error saving QR code:", error);
      toast.error(
        `Error saving QR code: ${error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="border border-black bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#0D0D0D] absolute -top-[115px] -right-6"
        onClick={handleAddNewQRCode}
      >
        <button className="text-[16px] flex items-center gap-[8px]">
          <Add className="w-5 h-5 text-[#0D0D0D]" />
          Add new QR Code
        </button>
      </div>
      <div
        className={clsx(
          "mt-[24px] grid grid-cols-9 items-center border-b px-0 text-[16px] font-[400]",
          state.qrEmpty
            ? "border-b-[#929292] text-[#929292] "
            : "border-b-[#121212] text-[#121212] "
        )}
      >
        <p className="col-span-3 px-3 py-2 text-start">Location/Group Name</p>
        <p className="col-span-2 px-3 py-2 text-center">No. of Rooms</p>
        <p className="col-span-2 px-3 py-2 text-center">QR Code</p>
        <p className="col-span-2 px-3 py-2 text-end">Actions</p>
      </div>
      {state.qrEmpty ? (
        <div>
          <div className="flex flex-col gap-6 items-center justify-center h-full w-full mt-[100px]">
            <p className="text-xl font-normal text-[#929292]">
              No QR Code has been added yet
            </p>
            <div
              className="border border-black bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#0D0D0D]"
              onClick={handleAddNewQRCode}
            >
              <button className="text-[16px] flex items-center gap-[8px]">
                <Add className="w-5 h-5 text-[#0D0D0D]" />
                Add new QR Code
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <RoomList
            rooms={rooms}
            branchOptions={branchOptions}
            handleConfirmDelete={handleConfirmDelete}
            isLoading={isLoading}
            selectedQRCode={selectedQRCode}
            setSelectedQRCode={setSelectedQRCode}
            openDeleteQR={openDeleteQR}
            setOpenDeleteQR={setOpenDeleteQR}
          />
        </div>
      )}
      <Modal open={openAddQR} onClose={handleCloseAddQR}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40vw",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseAddQR}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <AddQRCode
            branchOptions={branchOptions}
            handleCreateAsset={handleCreateAsset}
            loading={loading}
            selectedType="room"
            selectedBranch={selectedBranch}
            handleBranchSelect={handleBranchSelect}
            location={location}
            setLocation={setLocation}
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
            onClose={handleCloseAddQR}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default InRoomDining;
