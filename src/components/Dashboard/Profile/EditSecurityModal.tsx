import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { SERVER_DOMAIN } from "../../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { clearUserData, fetchUserDetails } from "../../../slices/UserSlice";
import { clearSelectedBranch } from "../../../slices/branchSlice";
import { useNavigate } from "react-router-dom";

interface EditSecurityModalProps {
  credentialType: "email" | "pin";
  isOpen: boolean;
  onClose: () => void;
}

const EditSecurityModal: React.FC<EditSecurityModalProps> = ({
  credentialType,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });

  // Update form data on input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(clearSelectedBranch());

    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };
  // Submit new credentials
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      credential_type: credentialType, // either "email" or "pin"
      ...formData,
    };

    try {
      // Dispatch Redux action or call the endpoint here
      const token = localStorage.getItem("token");

      await axios.post(`${SERVER_DOMAIN}/resetPassword`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successful!");
      dispatch(fetchUserDetails());
      onClose();
      handleLogout();
    } catch (error) {
      console.error("Failed to update credentials:", error);
      toast.error("An error occured");
    }
  };

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-[80%] md:w-[50%] max-h-[80vh] overflow-y-scroll">
        <h2 className="mb-4 text-lg font-semibold">
          {credentialType === "email" ? "Edit Password" : "Edit PIN"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">
              Current {credentialType === "email" ? "Password" : "PIN"}
            </label>
            <input
              type={credentialType === "email" ? "password" : "text"}
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">New {credentialType === "email" ? "Password" : "PIN"}</label>
            <input
              type={credentialType === "email" ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm">
              Confirm New {credentialType === "email" ? "Password" : "PIN"}
            </label>
            <input
              type={credentialType === "email" ? "password" : "text"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 border rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-black rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSecurityModal;
