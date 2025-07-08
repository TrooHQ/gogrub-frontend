import { convertToBase64 } from "../../../utils/imageToBase64";
import React, { useEffect, useState } from "react";
import imageIcon from "../../../assets/image.svg";
import CustomInput from "../../inputFields/CustomInput";
// import { RxCaretDown } from "react-icons/rx";
import axios from "axios";
import { SERVER_DOMAIN } from "../../../Api/Api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItemsWithoutStatus } from "../../../slices/menuSlice";
import { AppDispatch } from "@/src/store/store";
import MultiSelectCustomComp from "./MultiSelectCustomComp";

type Props = {
  onCancel: () => void;
  activeCategory?: any;
  activeGroup?: any;
  editId?: string;
  // onSave?: (data: any) => void;
};

const MenuItemForm: React.FC<Props> = ({ onCancel, activeCategory, activeGroup, editId }) => {

  const { menuItemsWithoutStatus: menuItems } = useSelector((state: any) => state.menu);


  const [editData, setEditData] = useState<any>({})

  useEffect(() => {
    if (editId) {
      const data = menuItems.find((item: any) => item._id === editId)
      setEditData(data)
    }
  }, [editId, menuItems])

  console.log("editData", editData)

  const { selectedBranch } = useSelector((state: any) => state.branches);

  const [imageName, setImageName] = useState<string>("");
  const [image, setImage] = useState<string>(editData ? editData?.menu_item_image : "");
  const [hasUploadedImage, setHasUploadedImage] = useState<boolean>(false);

  // console.log("oamge", image)
  // const handleFileChange = async (e: any) => {
  //   const file = e.target.files[0];
  //   setImageName(file.name);
  //   try {
  //     const base64 = await convertToBase64(file);
  //     setImage(base64 as string);
  //   } catch (error) {
  //     console.error("Error converting file to base64:", error);
  //   }
  // };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageName(file.name);
    try {
      const base64 = await convertToBase64(file);
      setImage(base64 as string);
      setHasUploadedImage(true);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const [fetchedModifierGroups, setFetchedModifierGroups] = useState<any[]>([]);
  const [isGroupFetching, setIsGroupFetching] = useState(false);

  // const [selectedMod, setSelectedMod] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [complimentary, setComplimentary] = useState<string[]>([]);


  // const handleSingleSelectmod = (value: string) => {
  //   setSelectedMod(value);
  // };

  // console.log("selectedMod", selectedMod);
  console.log("extras", extras);
  console.log("complimentary", complimentary);

  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuPrice, setMenuPrice] = useState("");


  // useEffect(() => {
  //   if (editData) {
  //     setMenuName(editData?.menu_item_name || "");
  //     setMenuDescription(editData?.description || "");
  //     setMenuPrice(editData?.menu_item_price || "");
  //     // setImage(editData?.image || "");
  //     // setSelectedMod(editData?.modifiers || []); 
  //   }
  // }, [editData]);

  useEffect(() => {
    if (editData) {
      setMenuName(editData?.menu_item_name || "");
      setMenuDescription(editData?.description || "");
      setMenuPrice(editData?.menu_item_price || "");
      setImageName("Existing Image"); // optional fallback label

      console.log("editData?.modifierGroups", editData?.modifierGroups)

      if (editData?.modifierGroups) {
        const mod = editData?.modifierGroups.map((item: any) => item.modifier_group_name);
        const com = editData?.complimentary.map((item: any) => item.modifier_group_name);
        console.log(mod)
        setExtras(mod);
        setComplimentary(com);
      }

    }
  }, [editData]);
  const displayImage = hasUploadedImage ? image : editData?.menu_item_image;




  const handleMenuName = (value: string) => {
    setMenuName(value);
  };
  const handleMenuDescription = (value: any) => {
    setMenuDescription(value);
  };
  const handleMenuPrice = (value: string) => {
    setMenuPrice(value);
  };



  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  const handleSaveMenuItem = async () => {
    setLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    // /menu/editGogrubMenuItem
    // const endpoint = editId ? `${SERVER_DOMAIN}/menu/editGogrubMenuItem/` : `${SERVER_DOMAIN}/menu/addMenuItem`;

    try {
      const response = await axios.post(`${SERVER_DOMAIN}/menu/addMenuItem`,
        {
          menu_category_name: activeCategory?.name,
          branch_id: selectedBranch.id,
          menu_group_name: activeGroup?.name,
          menu_item_name: menuName,
          description: menuDescription,
          price: Number(menuPrice),
          modifier_groups: extras,
          complimentary,
          image
        },
        headers
      );
      dispatch(
        fetchMenuItemsWithoutStatus({
          branch_id: selectedBranch.id, page: 1, menu_group_name: activeGroup?.name,
        })
        // fetchMenuItemsByMenuGroup({
        //   branch_id: selectedBranch.id,
        //   menu_group_name: activeGroup?.name,
        //   page: currentPage || 1,
        // })
      );
      toast.success(response.data.message || "Menu group added successfully.");
      setMenuName("");
      setMenuDescription("");
      setMenuPrice("");
      setImage("");
      // setAddMenuItem(false);
      if (onCancel) onCancel();
      setLoading(false);
    } catch (error: any) {
      toast.error(
        error.response.data.message || "An error occurred. Please try again."
      );
      setLoading(false);
    } finally {
      if (onCancel) onCancel();
      setLoading(false);
      // setMenuGroupLoading(false);
      // setAddMenuGroup(false);
    }
  };



  const handleUpdateMenuItem = async () => {
    // if (editingItem) {
    setLoading(true)
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      menu_category_name: activeCategory?.name,
      branch_id: selectedBranch.id,
      menu_group_name: activeGroup?.name,
      name: menuName,
      description: menuDescription,
      price: Number(menuPrice),
      modifier_groups: extras,
      complimentary,
      image
    }

    try {
      // setEditLoading(true);
      const response = await axios.put(`${SERVER_DOMAIN}/menu/editGogrubMenuItem`, { ...payload, menu_item_id: editId }, headers);

      // console.log("response", response);
      setLoading(false)
      toast.success(response?.data?.message || "Menu item updated successfully.");
      if (onCancel) onCancel();
      dispatch(fetchMenuItemsWithoutStatus({ branch_id: selectedBranch.id, page: 1 }));



    } catch (error) {
      // console.error("Error editing menu item:", error);
      toast.error("Failed to edit menu item.");
      setLoading(false)
    } finally {
      setLoading(false)
      // setEditModalOpen(false);
      // setEditingItem(null);
      // setNewMenuName("");
      // setEditLoading(false);
    }
    // }
  };


  useEffect(() => {
    const fetchModifierGroups = async () => {
      setIsGroupFetching(true);
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };



      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/menu/getAllModifierGroups/?branch_id=${selectedBranch?.id}`,
          headers
        );
        console.log("resp", response);
        setFetchedModifierGroups(response.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch modifiers.");
      } finally {
        setIsGroupFetching(false);
      }
    };

    fetchModifierGroups()
  }, [selectedBranch?.id]);

  // console.log("fetchedModifierGroups", fetchedModifierGroups);



  return (
    <div className=" p-6 space-y-6 bg-white rounded shadow w-[539px]">
      <h2 className="text-lg font-semibold">{editId ? "Edit Menu Item" : "Add Menu Item"}</h2>

      <div className="space-y-3">
        <CustomInput
          type="text"
          label="Enter menu item name"
          value={menuName}
          error=""
          onChange={(newValue) => handleMenuName(newValue)}
        />
        <textarea
          className=" w-full h-[153px] border text-[16px] font-[400] text-[#929292] border-gray-300 rounded-md p-2 outline-none"
          value={menuDescription}
          placeholder="Enter description of the menu item"
          onChange={(e) => handleMenuDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-4 font-medium">Pricing</label>
        <CustomInput
          type="text"
          label="Enter price"
          value={menuPrice}
          error=""
          onChange={(newValue) => handleMenuPrice(newValue)}
        />
      </div>

      <h3 className="text-base py-2 mt-8 mb-2 font-[500] Capitalize text-black border-b-gray-300 border-b">{editId ? "Edit Menu Item Modifiers" : "Select Menu Item Modifiers"}</h3>

      <MultiSelectCustomComp
        label="Select Complimentary"
        description="These items will not be charged"
        placeholder="Select complimentary items..."
        menuItemList={fetchedModifierGroups}
        isFetchingItemList={isGroupFetching}
        setSelectedItems={setComplimentary}
        selectedItems={complimentary}
      />

      <MultiSelectCustomComp
        label="Select Extras"
        description="These items will be charged"
        placeholder="Select extras..."
        menuItemList={fetchedModifierGroups}
        isFetchingItemList={isGroupFetching}
        setSelectedItems={setExtras}
        selectedItems={extras}
      />

      <div className="">
        <p className=" text-[18px] mb-[8px] font-[500] text-grey500">
          Add image
        </p>

        <div className="flex items-center gap-[16px]">
          <label
            htmlFor="fileInput"
            className="w-[72px] border border-dashed p-[20px] border-[#121212] cursor-pointer"
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <img src={imageIcon} alt="Upload Icon" />
          </label>
          <div className="">
            <label
              htmlFor="fileInput"
              className="text-[#121212] font-[500] text-[16px] mb-[8px] cursor-pointer"
            >
              Click to upload{" "}
              <span className=" font-[400] text-grey300">
                or drag and drop
              </span>
            </label>
            <p className=" text-[14px] font-[400] text-grey300">
              Max. file size: 2MB
            </p>
          </div>
        </div>
        {/* {(image || editData?.menu_item_image) && (
          <div className="mt-4">
            <p className="text-[14px] text-grey500">Image: {imageName}</p>
            <img
              src={image}
              alt={editData?.menu_item_image ? editData?.menu_item_image : "Uploaded Preview"}
              className="w-full h-auto mt-2"
            />
          </div>
        )} */}

        {displayImage && (
          <div className="mt-4">
            <p className="text-[14px] text-grey500">Image: {imageName}</p>
            <img
              src={displayImage}
              alt="Preview"
              className="w-full h-auto mt-2"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 border rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-black rounded"
          // onClick={handleSaveMenuItem}
          onClick={(editId && editData) ? handleUpdateMenuItem : handleSaveMenuItem}
        >
          {loading ? editId ? "Updating..." : "Saving..." : editId ? "Update Menu Item" : "Save Menu Item"}
        </button>
      </div>
    </div>
  );
};

export default MenuItemForm;



//  <div>
//         <label className="block mb-1 font-medium">Add modifier</label>

//         <div
//           className="flex items-center justify-between w-full px-4 py-2 mb-2 border rounded"
//           onClick={() => setShowMod(!showMod)}
//         >
//           {/* {selectedMod.length > 0 ? <p className="text-sm">{selectedMod}</p> : <p>Select modifier</p>} */}
//           {selectedMod.length > 0 ? <p className="text-sm">{selectedMod.join(", ")}</p> : <p>Select modifier</p>}
//           <RxCaretDown className={`${showMod ? "rotate-180" : ""} w-6 h-6`} />
//         </div>
//         {showMod &&
//           <div className={`duration-500 ease-in-out ${showMod ? "duration-500 ease-in-out h-[100%] block" : "duration-500 ease-in-out h-0 hidden"}`}>
//             <div className={`flex flex-wrap gap-2 `}>
//               {fetchedModifierGroups.length === 0 && !isGroupFetching && <p className="text-sm">No modifier groups found</p>}
//               {fetchedModifierGroups.map((mod) => (
//                 <span
//                   // onClick={() => handleSingleSelectmod(mod?.modifier_group_name)}
//                   onClick={() => handleSelectedMod(mod?.modifier_group_name)}
//                   key={mod?.id}
//                   className={`px-3 py-1 text-sm  rounded-full cursor-pointer hover:bg-gray-200 ${selectedMod.includes(mod?.modifier_group_name) ? "bg-gray-900 text-white" : "bg-gray-100"}`}
//                 >
//                   {mod?.modifier_group_name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         }
//       </div>