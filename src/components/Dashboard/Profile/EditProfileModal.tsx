import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
// import { fetchUserDetails } from "../../../slices/UserSlice";
import { AppDispatch } from "../../../store/store";
import { toast } from "react-toastify";
import axios from "axios";
import { SERVER_DOMAIN } from "../../../Api/Api";
// import { fetchAccountDetails as fetchAccountDetailState } from "../../../slices/businessSlice";
import { fetchAllBusinessInfo } from "../../../slices/businessPersonalAccountSlice";

interface EditProfileModalProps {
  personalInfo: {
    first_name: string;
    last_name: string;
    personal_email: string;
    phone_number: string;
    country: string;
    state: string;
    city: string;
    business_email?: string;
    business_address?: string;
    business_logo?: any;
    photo?: string | null;
  }; // Allow null if no personal info is available
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  personalInfo,
  isOpen,
  onClose,
  loading,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Local state for form fields and photo
  const [formData, setFormData] = useState({
    first_name: personalInfo?.first_name || "",
    last_name: personalInfo?.last_name || "",
    personal_email: personalInfo?.personal_email || "",
    phone_number: personalInfo?.phone_number || "",
    country: personalInfo?.country || "",
    state: personalInfo?.state || "",
    city: personalInfo?.city || "",
    business_email: personalInfo?.business_email || "",
    business_address: personalInfo?.business_address || "",
    business_logo: personalInfo?.business_logo
      || null,
  });
  const [photo, setPhoto] = useState<string | null>(
    personalInfo?.photo || personalInfo?.photo || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo file change, convert to Base64
  // const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPhoto(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit updated details
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData: Partial<Record<keyof typeof formData, string | null>> = {};

    Object.entries(formData).forEach(([key, value]) => {
      const originalValue = personalInfo[key as keyof typeof personalInfo];

      if (key === "photo") {
        if (imageFile) {
          updatedData.business_logo
            = value;
        }
      } else if (value !== originalValue) {
        updatedData[key as keyof typeof formData] = value;
      }
    });

    const token = localStorage.getItem("token");

    if (Object.keys(updatedData).length === 0) {
      toast.info("No changes detected");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${SERVER_DOMAIN}/updateUserDetails`,
        updatedData,
        { headers }
      );
      console.log(response.data);
      toast.success("Details updated successfully");
      // fetchAccountDetailState();
      // fetchUserDetails();
      // dispatch(fetchUserDetails());
      dispatch(fetchAllBusinessInfo());
      onClose();
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("Update failed");
    }
  };

  if (!isOpen) return null; // Do not render modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-[80%] md:w-[50%] max-h-[80vh] overflow-y-scroll">
        <h2 className="mb-4 text-lg font-semibold">Edit Profile Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Preview and Upload */}
          <div className="flex items-center mb-4 space-x-4">
            {photo && (
              <img
                src={photo}
                alt="Profile Preview"
                className="object-cover w-16 h-16 rounded-full"
              />
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                name="personal_email"
                value={formData.personal_email}
                onChange={handleChange}
                readOnly
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            {/* <div>
              <label className="text-sm">Business Email</label>
              <input
                type="email"
                name="business_email"
                value={formData.business_email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div> */}
            {/* <div>
              <label className="text-sm">Business Address</label>
              <input
                type="text"
                name="business_address"
                value={formData.business_address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div> */}
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md bg-black"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
