import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
// import TopMenuNav from "./TopMenuNav";
import Print from "../../assets/print.svg";
import edit from "../../assets/edit.png";
import { fetchMenuItems2 } from "../../slices/menuSlice";
// import Publish from "../../assets/publish.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../../store/store";
import { SERVER_DOMAIN } from "../../Api/Api";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const CustomPagination = styled(Pagination)(() => ({
  "& .Mui-selected": {
    backgroundColor: "#000000", // Set the background color to black
    color: "#ffffff", // Set the text color to white for better contrast
    "&:hover": {
      backgroundColor: "#000000", // Ensure hover doesn't change the color
    },
  },
}));

const PriceList = () => {

  useEffect(() => {
    document.title = "Set and Adjust Prices for Each Menu Item with Flexibility"
  }, [])

  const dispatch = useDispatch<AppDispatch>();
  const {
    menuItems2: menuItems,
    loading,
    totalPages,
  } = useSelector((state: any) => state.menu);
  const { selectedBranch } = useSelector((state: any) => state.branches);

  const [page, setPage] = useState<number>(1);

  // New states for handling price edits
  const [editMode, setEditMode] = useState<string | null>(null); // Track which item is being edited
  const [newPrice, setNewPrice] = useState<number | null>(null); // Store the new price input
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const userDetails = useSelector((state: any) => state.user);
  const token = userDetails?.userData?.token;

  useEffect(() => {
    dispatch(fetchMenuItems2({ branch_id: selectedBranch?.id, page }));
  }, [dispatch, selectedBranch, page]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Handle the edit button click
  const handleEditClick = (item: any) => {
    setEditMode(item._id); // Set the current item in edit mode
    setNewPrice(item.menu_item_price); // Prepopulate the price with the current item's price
  };

  // Handle the cancel button click
  const handleCancelEdit = () => {
    setEditMode(null); // Exit edit mode without saving
    setNewPrice(null); // Reset the new price value
  };

  // Handle the price input change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(parseFloat(e.target.value)); // Update the new price
  };

  const handleSave = async (item: any) => {
    if (newPrice === null) return;

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      menu_item_id: item._id,
      name: item.menu_item_name,
      price: newPrice,
      description: item.description || "",
      is_recommended: item.is_recommended,
      is_frozen: item.is_frozen,
    };

    setIsSubmitting(true);
    try {
      await axios.put(`${SERVER_DOMAIN}/menu/editMenuItem`, payload, headers);
      dispatch(fetchMenuItems2({ branch_id: selectedBranch?.id })); // Refetch menu items after editing
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error("Error editing price:", error);
      toast.error("Error editing price");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <DashboardLayout title="Price List">
        {/* <TopMenuNav pathName="Price List" /> */}
        <div className="">
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className="border border-black bg-black w-[196px] rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <button className="text-[16px] flex items-center gap-[8px]">
                  <img src={Print} alt="" /> Print price list
                </button>
              </div>
              {/* <div className="rounded-[5px] px-[24px] py-[10px] font-[500] text-gray-500">
                <button className="text-[14px] flex items-center gap-[8px]">
                  <img src={Publish} alt="" /> Publish changes
                </button>
              </div> */}
            </div>

            <div className="my-[40px]">
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#606060] text-white text-center text-base font-normal">
                      <th className="px-4 py-2 text-base font-normal">
                        Menu Group
                      </th>
                      <th className="px-4 py-2 text-base font-normal text-start">
                        Menu Name
                      </th>
                      <th className="px-4 py-2 text-base font-normal">Price</th>
                      <th className="px-4 py-2 text-base font-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <hr className="mb-2 text-[#E7E7E7]" />

                  {loading ? (
                    <div className="min-w-full text-center">Loading...</div>
                  ) : menuItems.length !== 0 ? (
                    <tbody>
                      {menuItems.map((item: any, index: number) => (
                        <tr
                          key={item._id}
                          className={`${index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                            }`}
                        >
                          <td className="px-4 py-2 text-base font-normal">
                            {item.menu_group_name}
                          </td>
                          <td className="px-4 py-2 text-base font-normal">
                            {item.menu_item_name}
                          </td>

                          {/* Conditional rendering for editing price */}
                          <td className="px-4 py-2 text-base font-normal text-center break-words">
                            {editMode === item._id ? (
                              <input
                                type="number"
                                value={newPrice ?? item.menu_item_price}
                                onChange={handlePriceChange}
                                className="p-1 border border-gray-300 rounded"
                              />
                            ) : (
                              `₦${parseFloat(
                                item.menu_item_price
                              ).toLocaleString()}`
                            )}
                          </td>

                          <td className="flex items-center justify-center gap-4 text-center">
                            {editMode === item._id ? (
                              <div className="flex items-center gap-2 mt-2.5">
                                <button
                                  className="text-gray-500"
                                  onClick={() => handleSave(item)}
                                >
                                  {isSubmitting ? "Saving..." : "Save"}
                                </button>
                                <button
                                  className="text-red-500"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                className="flex items-center gap-2 mt-2.5"
                                onClick={() => handleEditClick(item)}
                              >
                                <img src={edit} alt="" />
                                Edit
                              </button>
                            )}
                          </td>
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
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default PriceList;
