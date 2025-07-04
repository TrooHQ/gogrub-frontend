import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import {
  ArrowBack,
  CheckCircleOutline,
  Close,
  DeleteForeverOutlined,
  Edit,
  MoreVert,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import clsx from "clsx";
import ConfirmationDialog from "./ConfirmationDialog";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../slices/branchSlice";
import { AppDispatch } from "../../store/store";
import { fetchMenuItemsWithoutStatus } from "../../slices/menuSlice";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { toast } from "react-toastify";
import Modal from "../Modal";
// import CustomInput from "../inputFields/CustomInput";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MenuItemForm from "./MenuBuilderModals/NewAddMenuModal";

const CustomPagination = styled(Pagination)(() => ({
  "& .Mui-selected": {
    backgroundColor: "#000000", // Set the background color to black
    color: "#ffffff", // Set the text color to white for better contrast
    "&:hover": {
      backgroundColor: "#000000", // Ensure hover doesn't change the color
    },
  },
}));

interface Modifier {
  _id: string;
  created_by: string;
  branch: string;
  modifier_name: string;
  modifier_price: number;
  attached_to: string;
  modifier_group_name: string;
  modifier_group: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ModifierGroup {
  _id: string;
  created_by: string;
  branch: string;
  modifier_group_name: string;
  modifiers: Modifier[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  rule?: "single" | "multiple" | string; // rule is optional and typed if known
}

interface Branch {
  id: number;
  _id: string;
  name: string;
  manager: string;
  business: string;
}

interface ConfirmationDialogState {
  open: boolean;
  id: string | null;
}

const MenuList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const branches = useSelector((state: any) => state.branches.branches);
  const {
    menuItemsWithoutStatus: menuItems,
    totalPages,
    loading,
  } = useSelector((state: any) => state.menu);

  const [page, setPage] = useState<number>(1);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedModifiers, setSelectedModifiers] = useState<ModifierGroup[]>([]);
  const [viewingBranch, setViewingBranch] = useState<Branch | null>(null);

  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [toggleStates2, setToggleStates2] = useState<{
    [key: string]: boolean;
  }>({});
  // const [isFetching, setIsFetching] = useState(false);
  // const [fetchedModifiers, setFetchedModifiers] = useState<any>([]);
  const [confirmationDialog, setConfirmationDialog] =
    useState<ConfirmationDialogState>({
      open: false,
      id: null,
    });

  const [confirmationDialog2, setConfirmationDialog2] = useState({
    open: false,
    item: {},
  });

  const [confirmationDialog3, setConfirmationDialog3] =
    useState<ConfirmationDialogState>({
      open: false,
      id: null,
    });

  const [editModalOpen, setEditModalOpen] = useState(false);
  // const [editingItem, setEditingItem] = useState<{
  //   id: string;
  //   oldName: string;
  // } | null>(null);
  // const [newMenuName, setNewMenuName] = useState<string>("");
  const [editItemId, setEditItemId] = useState()
  // Fetch menu items whenever the page or branch changes
  useEffect(() => {
    if (viewingBranch) {
      dispatch(
        fetchMenuItemsWithoutStatus({
          branch_id: viewingBranch._id,
          page,
        })
      );
    }
  }, [dispatch, viewingBranch, page]);

  // Delete function
  const handleDeleteClick = (item: any) => {
    console.log(item);
    setConfirmationDialog2({ open: true, item: item });
  };

  const handleConfirmDelete = async () => {
    if (confirmationDialog2.item) {
      await handleDeleteMenu(confirmationDialog2.item);
      setConfirmationDialog2({ open: false, item: "" });
    }
  };

  // Edit function
  const handleEditClick = (item: any) => {
    setEditItemId(item._id)
    // setEditingItem({ id: item._id, oldName: item.menu_item_name });
    // setNewMenuName(item.menu_item_name); // Set initial value to the current name
    setEditModalOpen(true);
    setAnchorEl(null);
  };

  // Set toggleStates after menuItems are fetched
  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      const initialState: { [key: string]: boolean } = {};
      menuItems.forEach((item: any) => {
        initialState[item._id] = !item.is_frozen; // If is_frozen is false, item is enabled
      });
      setToggleStates(initialState);
    }
    if (menuItems && menuItems.length > 0) {
      const initialState: { [key: string]: boolean } = {};
      menuItems.forEach((item: any) => {
        initialState[item._id] = item.is_recommended; // If is_frozen is false, item is enabled
      });
      setToggleStates2(initialState);
    }
  }, [menuItems]);

  const handleToggleChange = (id: string) => {
    setConfirmationDialog({ open: true, id });
  };

  const handleToggleRecommendChange = (id: string) => {
    setConfirmationDialog3({ open: true, id });
  };

  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const handleConfirmToggleRecommendChange = async () => {
    const { id } = confirmationDialog3;
    console.log(id);
    if (id !== null) {
      const currentState = toggleStates2[id];
      const newState = !currentState;

      console.log(currentState, "aaaaaa");
      console.log(newState);
      try {
        setConfirmationLoading(true);
        await fetch(`${SERVER_DOMAIN}/menu/updateRecommendation`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            // branch_id: viewingBranch?._id,
            menu_item_id: id,
            is_recommended: newState ? "true" : "false",
          }),
        });

        setToggleStates2((prevStates) => ({
          ...prevStates,
          [id]: newState,
        }));
        setCurrentItem(null);
      } catch (error) {
        console.error("Failed to update menu item status:", error);
        toast.error(`An error occurred. ${error}`);
      } finally {
        setConfirmationLoading(false);
      }
    }
    setConfirmationDialog3({ open: false, id: null });
  };

  const handleConfirmToggleChange = async () => {
    const { id } = confirmationDialog;
    if (id !== null) {
      const currentState = toggleStates[id];
      const newState = !currentState;

      try {
        await fetch(`${SERVER_DOMAIN}/menu/freezeMenuWithId/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            branch_id: viewingBranch?._id,
            menu_item_id: id,
            freeze: newState ? "false" : "true",
          }),
        });

        setToggleStates((prevStates) => ({
          ...prevStates,
          [id]: newState,
        }));
        setCurrentItem(null);
      } catch (error) {
        console.error("Failed to update menu item status:", error);
        toast.error(`An error occurred. ${error}`);
      }
    }
    setConfirmationDialog({ open: false, id: null });
  };

  // const fetchModifiers = async ({ selectedMenuItem, selectedBranch }: any) => {
  //   setIsFetching(true);
  //   const headers = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   };
  //   try {
  //     const encodedName = encodeURIComponent(selectedMenuItem);

  //     const response = await axios.get(
  //       `${SERVER_DOMAIN}/menu/getMenuModifierGroupByItem/?attach_to=item&name=${encodedName}&branch_id=${selectedBranch}`,
  //       headers
  //     );

  //     setFetchedModifiers(response.data.data || []);
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error.response.data.message || "Failed to fetch modifiers.");
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const handleDeleteMenu = async (item: any) => {
    try {
      const authToken = localStorage.getItem("token"); // Retrieve the auth token from local storage

      const response = await axios.delete(`${SERVER_DOMAIN}/menu/removeMenu/`, {
        params: {
          menu_type: "item",
          name: item.menu_item_name,
          branch_id: viewingBranch?._id,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        // Optionally refresh the list of modifiers after deletion
        toast.success("Deleted successfully");
        dispatch(
          fetchMenuItemsWithoutStatus({
            branch_id: viewingBranch?._id as any,
            page,
          })
        );
      } else {
        alert("Failed to delete modifier");
      }
    } catch (error) {
      console.error("Error deleting modifier:", error);
      alert("An error occurred while deleting the modifier");
    }
  };

  const [menu_item_name, setMenu_item_name] = useState("");
  const handleOpenModal = (menuItem: any) => {
    console.log("menuItem", menuItem)
    setMenu_item_name(menuItem?.menu_item_name);
    // fetchModifiers({
    //   selectedMenuItem: modifiers.menu_item_name,
    //   selectedBranch: viewingBranch?._id,
    // });
    setSelectedModifiers(menuItem?.modifierGroups);
    setOpenModal(true);
  };

  console.log("menuItems", menuItems);
  console.log("selectedModifiers", selectedModifiers);

  const handleCloseModal = () => {
    setOpenModal(false);
    // setSelectedModifiers(null);
    // setFetchedModifiers([]);
  };

  const handleViewMore = (branch: Branch) => {
    setViewingBranch(branch);
    dispatch(fetchMenuItemsWithoutStatus({ branch_id: branch._id, page }));
  };

  const handleBackToBranches = () => {
    setViewingBranch(null);
  };

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Anchor

  // State for managing the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };

  return (
    <DashboardLayout>
      <TopMenuNav pathName="Menu" />
      <div className="">
        {viewingBranch === null ? (
          <div className="my-[40px]">
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#606060] text-white text-center text-base font-normal">
                    <th className="px-4 py-2 text-base font-normal text-start">
                      Business Name
                    </th>
                    <th className="px-4 py-2 text-base font-normal text-start">
                      Manager
                    </th>
                    <th className="px-4 py-2 text-base font-normal text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch: any) => (
                    <tr key={branch._id} className="bg-[#ffffff]">
                      <td className="px-4 py-2 text-base font-normal text-start">
                        {branch.branch_name}
                      </td>
                      <td className="px-4 py-2 text-base font-normal text-start">
                        {branch.branch_email}
                      </td>
                      <td className="px-4 py-2 text-base font-normal text-center">
                        <button
                          className="text-blue-500"
                          onClick={() => handleViewMore(branch)}
                        >
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="my-[40px]">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToBranches}
                className="border border-black text-gray-500 rounded-[6px] px-2 py-2 flex items-center"
              >
                {" "}
                <ArrowBack />
                Back
              </button>
              <div className="flex items-center justify-between"></div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#606060] text-white text-base font-normal">
                    <th className="px-4 py-2 text-base font-normal text-start">
                      Menu Group
                    </th>
                    <th className="px-4 py-2 text-base font-normal text-start">
                      Menu Item
                    </th>
                    {/* <th className="px-4 py-2 text-base font-normal">Quantity</th> */}
                    <th className="px-4 py-2 text-base font-normal">Price</th>
                    <th className="px-4 py-2 text-base font-normal">
                      Modifiers
                    </th>
                    <th className="px-4 py-2 text-base font-normal">Actions</th>
                  </tr>
                </thead>

                <hr className="mb-2 text-[#E7E7E7]" />
                {loading && (
                  <div className="min-w-full text-center">Loading...</div>
                )}

                {menuItems.length !== 0 ? (
                  <tbody>
                    {menuItems.map((item: any, index: number) => (
                      <tr
                        key={item.id}
                        className={`${!toggleStates[item._id]
                          ? "opacity-50"
                          : index % 2 === 1
                            ? "bg-[#ffffff]"
                            : "bg-[#F8F8F8]"
                          }`}
                      >
                        <td className="px-4 py-2 text-base font-normal text-center">
                          {item.menu_group_name}
                        </td>
                        <td className="px-4 py-2 text-base font-normal">
                          <div className="flex items-center justify-start gap-1">
                            {toggleStates2[item._id] && (
                              <Tooltip title="This item is recommended." arrow>
                                <IconButton
                                  style={{ padding: "0px" }}
                                  color="default"
                                >
                                  <CheckCircleOutline
                                    style={{ color: "#121212", padding: "0px" }}
                                  />{" "}
                                </IconButton>
                              </Tooltip>
                            )}
                            <span>{item.menu_item_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-base font-normal text-center break-words">
                          &#8358;
                          {parseFloat(item.menu_item_price).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-base font-normal text-center break-words">
                          <button
                            className="text-blue-500"
                            onClick={() => handleOpenModal(item)}
                          >
                            See modifiers
                          </button>
                        </td>

                        <td className="flex items-center justify-center w-full text-center">
                          <Tooltip title="More options" arrow>
                            <IconButton
                              onClick={(event) => handleOpenMenu(event, item)}
                              color="default"
                              style={{ width: "100%" }}
                            >
                              <MoreVert />
                            </IconButton>
                          </Tooltip>
                        </td>
                        {/* Menu for More options */}
                        {currentItem && currentItem._id === item._id && (
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                          >
                            <MenuItem
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "4px",
                                width: "250px",
                              }}
                              onClick={() => handleToggleChange(item._id)}
                            >
                              <Tooltip
                                title="Freezing this menu list will remove it from all your product channels"
                                arrow
                              >
                                <IconButton
                                  onClick={() => handleToggleChange(item._id)}
                                  color="default"
                                >
                                  {toggleStates[item._id] ? (
                                    <ToggleOffIcon
                                      style={{ fontSize: "40px" }}
                                    />
                                  ) : (
                                    <ToggleOnIcon
                                      style={{
                                        color: "#efefef",
                                        fontSize: "40px",
                                      }}
                                    />
                                  )}
                                </IconButton>
                              </Tooltip>
                              <span
                                className={clsx(
                                  toggleStates[item._id]
                                    ? "text-[#121212]"
                                    : "text-gray-500",
                                  "text-base font-medium",
                                  "w-full"
                                )}
                              >
                                {toggleStates[item._id] ? "Freeze" : "Unfreeze"}
                              </span>
                            </MenuItem>

                            {/* Edit */}
                            <MenuItem
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "12px",
                                width: "250px",
                              }}
                              onClick={() => handleEditClick(item)}
                            >
                              <div className="flex items-center justify-start w-full">
                                <Tooltip title="Edit menu item" arrow>
                                  <IconButton color="default">
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                                <span>Edit Menu</span>
                              </div>
                            </MenuItem>

                            {/* Delete */}
                            <MenuItem
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "12px",
                                width: "250px",
                              }}
                              onClick={() => handleDeleteClick(item)}
                            >
                              <div className="flex items-center justify-start w-full">
                                <Tooltip title="Delete menu item" arrow>
                                  <IconButton color="default">
                                    <DeleteForeverOutlined />
                                  </IconButton>
                                </Tooltip>

                                <span>Delete Menu</span>
                              </div>
                            </MenuItem>

                            {/* Recommend */}
                            <MenuItem
                              sx={{
                                paddingLeft: "4px",
                                paddingRight: "4px",
                                width: "250px",
                              }}
                              onClick={() =>
                                handleToggleRecommendChange(item._id)
                              }
                            >
                              <Tooltip
                                title="Recommending this menu list will display it on all your product channels"
                                arrow
                              >
                                <IconButton
                                  onClick={() =>
                                    handleToggleRecommendChange(item._id)
                                  }
                                  color="default"
                                >
                                  {toggleStates2[item._id] ? (
                                    <CheckCircleOutline
                                      style={{ color: "#5855B3" }}
                                    />
                                  ) : (
                                    <CheckCircleOutline />
                                  )}
                                </IconButton>
                              </Tooltip>
                              <span
                                className={clsx(
                                  toggleStates2[item._id]
                                    ? "text-[#121212]"
                                    : "text-gray-700",
                                  "text-[14px] font-medium",
                                  "w-full"
                                )}
                              >
                                {toggleStates2[item._id]
                                  ? "Unmark from recommended"
                                  : "Mark as recommended"}
                              </span>
                            </MenuItem>
                          </Menu>
                        )}
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <div>
                    <p className="min-w-full text-center">
                      No menu items found
                    </p>
                  </div>
                )}
              </table>
              {totalPages > 1 && !loading && (
                <Stack
                  spacing={2}
                  className="flex items-center justify-center mt-8"
                >
                  <CustomPagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Stack>
              )}
            </div>
          </div>
        )}

        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white min-w-[30%] p-6 rounded-lg z-10 relative">
              <h2 className="mb-4 text-lg font-semibold">
                {/* {selectedModifiers?.menu_item_name} */}
                {menu_item_name}
                {/* <span className="ml-5 text-sm font-normal">MODIFIERS</span> */}
              </h2>
              <hr className="h-[1px] bg-[#929292] my-3" />

              {selectedModifiers?.length === 0 ? (
                "No modifier available for this item"
              ) : (
                <>
                  <div>
                    {/* <h3 className="font-semibold text-sm mb-2 text-[#414141]">Add-Ons:</h3> */}
                    <ul>
                      {selectedModifiers?.map((group: any, groupIndex: any) => (
                        <li key={groupIndex} className="mb-4">
                          {/* Display the Modifier Group Name */}
                          <h3 className="text-xl font-bold text-[#414141]">
                            {group.modifier_group_name}
                          </h3>
                          <ul className="ml-4">
                            {/* Display the Modifiers under the group */}
                            {group.modifiers.map(
                              (modifier: any, modifierIndex: any) => (
                                <li
                                  key={modifierIndex}
                                  className="flex justify-between"
                                >
                                  <span className="text-lg font-normal text-[#414141]">
                                    {modifier.modifier_name}
                                  </span>
                                  <span className="text-lg font-medium text-[#414141]">
                                    &#8358;{" "}
                                    {parseFloat(
                                      modifier.modifier_price
                                    ).toLocaleString()}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="h-[1px] bg-[#929292] my-3" />
                </>
              )}
              <Close
                className="absolute cursor-pointer top-3 right-3"
                onClick={handleCloseModal}
              />
            </div>
          </div>
        )}

        {editModalOpen && (
          <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <MenuItemForm
              onCancel={() => setEditModalOpen(false)}
              editId={editItemId}
            />
            {/* <div className=" w-[539px] py-[32px] px-[52px]">
              <h2 className="text-[24px] mb-[11px] font-[500] text-gray-500">
                Edit Menu Item
              </h2>
              <CustomInput
                type="text"
                label=""
                value={newMenuName}
                error=""
                onChange={(newValue) => setNewMenuName(newValue)}
              />
              <hr className="border my-[24px] border-[#E7E7E7]" />
              <div className="flex items-center justify-end gap-4 mt-8">
                <button
                  onClick={handleEditConfirm}
                  className="bg-[#5855B3] text-white rounded-[6px] px-4 py-2"
                >
                  {editLoading ? "Loading..." : "Confirm"}
                </button>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="bg-[#F8F8F8] text-[#121212] rounded-[6px] px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div> */}
          </Modal>
        )}
      </div>

      {/* Modals */}
      <ConfirmationDialog
        open={confirmationDialog2.open}
        onClose={() => setConfirmationDialog2({ open: false, item: "" })}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete this item?`}
      />

      <ConfirmationDialog
        open={confirmationDialog.open}
        onClose={() => setConfirmationDialog({ open: false, id: null })}
        onConfirm={handleConfirmToggleChange}
        message={`Are you sure you want to ${confirmationDialog.id !== null &&
          toggleStates[confirmationDialog.id as any]
          ? "freeze"
          : "unfreeze"
          } this menu item? ${confirmationDialog.id !== null &&
            toggleStates[confirmationDialog.id as any]
            ? "Freezing it will remove it from all your product channels."
            : ""
          }`}
      />

      <ConfirmationDialog
        open={confirmationDialog3.open}
        onClose={() => setConfirmationDialog3({ open: false, id: null })}
        onConfirm={handleConfirmToggleRecommendChange}
        isLoading={confirmationLoading}
        message={`Are you sure you want to ${confirmationDialog3.id !== null &&
          toggleStates2[confirmationDialog3.id as any]
          ? "unrecommend"
          : "recommend"
          } this menu item?
        `}
      />
    </DashboardLayout>
  );
};

export default MenuList;
