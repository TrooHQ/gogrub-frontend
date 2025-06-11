import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert,
} from "@mui/icons-material";
import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import EditQRCodeForTables from "./EditQRCodeForTables";
import DeleteAlert from "../../assets/mdi_delete.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getTables } from "../../slices/TableSlice";

const TablesList = ({
  rooms,
  branchOptions,
  isLoading,
  handleConfirmDelete,
  selectedQRCode,
  setSelectedQRCode,
  openDeleteQR,
  setOpenDeleteQR,
}: {
  rooms: any[];
  branchOptions: any[];
  isLoading: boolean;
  handleConfirmDelete: () => void;
  selectedQRCode: any;
  setSelectedQRCode: (qrCodeData: any) => void;
  openDeleteQR: boolean;
  setOpenDeleteQR: (open: boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const groupedRooms: Record<string, any[]> = rooms.reduce((acc, room) => {
    if (!acc[room.group_name]) {
      acc[room.group_name] = [];
    }
    acc[room.group_name].push(room);
    return acc;
  }, {} as Record<string, any[]>);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEditQR, setOpenEditQR] = useState(false);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (qrCodeData: any) => {
    setSelectedQRCode(qrCodeData);
    setOpenDeleteQR(true);
    handleMenuClose();
  };

  const handleEditClick = (qrCodeData: any) => {
    console.log(qrCodeData, "qrCodeData");
    setSelectedQRCode(qrCodeData);
    setOpenEditQR(true);
    handleMenuClose();
  };

  const handleSave = () => {
    dispatch(getTables());
    setOpenEditQR(false);
    toast.success("Successful");
  };

  return (
    <ul>
      {Object.entries(groupedRooms).map(([groupName, groupItems]) => (
        <div key={groupName}>
          <li
            className="grid grid-cols-9 items-center px-5 py-[16px] bg-[#eeeef7] cursor-pointer mb-1 mt-3"
            onClick={() => toggleGroup(groupName)}
          >
            <p className="col-span-2 px-3 py-2 font-normal text-[#121212]">
              {groupName}
            </p>
            <p className="col-span-7 text-right font-normal px-3 py-2">
              {expandedGroups[groupName] ? (
                <KeyboardArrowUp className="text-[24px] w-6 h-6" />
              ) : (
                <KeyboardArrowDown className="text-[24px] w-6 h-6" />
              )}
            </p>
          </li>

          {expandedGroups[groupName] &&
            (groupItems as any[]).map((item: any, index: number) => (
              <li
                key={item._id}
                className={`grid grid-cols-10 items-center px-5 py-[16px] text-grey300 text-[16px] font-[400] ${index % 2 === 0 ? "bg-[#F8F8F8]" : ""
                  }`}
              >
                <p className="text-[#121212] col-span-2 px-3 py-2">
                  {item.group_name}
                </p>
                <p className="text-[#121212] col-span-2 px-3 py-2 text-center">
                  {item.number}
                </p>
                <p className="text-[#121212] col-span-2 px-3 py-2 text-center">
                  {item.total_guests}
                </p>
                <p className="px-3 py-2 col-span-2 text-center flex items-center justify-center">
                  {item.qrcode && <img src={item.qrcode} alt="QR Code" />}
                </p>
                <div className="flex items-center justify-end gap-[16px] relative col-span-2 px-3 py-2">
                  <IconButton onClick={handleMenuOpen}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    <MenuItem onClick={() => handleEditClick(item)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteClick(item)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </li>
            ))}
        </div>
      ))}

      <Modal open={openEditQR} onClose={() => setOpenEditQR(false)}>
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
            onClick={() => setOpenEditQR(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          {selectedQRCode && (
            <EditQRCodeForTables
              branchOptions={branchOptions}
              qrCodeData={selectedQRCode}
              onClose={() => setOpenEditQR(false)}
              onSave={handleSave}
            />
          )}
        </Box>
      </Modal>

      <Modal open={openDeleteQR} onClose={() => setOpenDeleteQR(false)}>
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
          <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[539px]">
            <div
              className="flex items-center justify-end cursor-pointer"
              onClick={() => setOpenDeleteQR(false)}
            >
              <IconButton
                aria-label="close"
                onClick={() => setOpenDeleteQR(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </div>
            <div className="flex flex-col justify-center items-center gap-6">
              <img
                src={DeleteAlert}
                alt="Close"
                className="w-[64px] h-[64px]"
              />
              <p className="text-[16px] font-[400] text-grey500">
                Are you sure you want to delete this?
              </p>
              <div className="flex items-center justify-center gap-4 mt-5">
                <button
                  className="border cursor-pointer border-[#090909] rounded px-[24px] py-[10px] font-[600] text-[#090909]"
                  onClick={() => setOpenDeleteQR(false)}
                >
                  No
                </button>
                <button
                  className="border border-[#090909] bg-[#090909] rounded px-[24px] py-[10px] font-[500] text-white"
                  onClick={handleConfirmDelete}
                >
                  {isLoading ? "Wait..." : "Yes"}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </ul>
  );
};

export default TablesList;
