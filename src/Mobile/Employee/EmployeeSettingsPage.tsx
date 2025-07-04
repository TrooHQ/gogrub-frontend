import { useState } from "react";
import Arrow from "../assets/BackArrow.svg";
import AccountIcon from "../assets/AccountSettings.svg";
import MenuModal from "../Components/MenuModal";
import CheckCircle from "../assets/check_circle_.svg";

import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const EmployeeSettingsPage = () => {
  const [resetSuccessModal, setResetSuccessModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordResetModal = () => {
    setResetPasswordModal(true);
  };

  const userDetails = useSelector((state: RootState) => state.user);

  const token = userDetails?.userData?.token;

  const updatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!newPassword || !confirmPassword) {
      setError("All fields are Required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const tempPassword = sessionStorage.getItem("tempPassword");
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${SERVER_DOMAIN}/employee/updateEmployeePassword`,
        {
          password: newPassword,
          confirm_password: confirmPassword,
          temp_password: tempPassword,
        },
        headers
      );
      console.log("Employee Password Reset successfully:", response.data);
      setLoading(false);
      setError("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="my-[16px] mx-[24px]">
        <div
          onClick={() => navigate(-1)}
          className=" inline-flex items-center gap-[20px] cursor-pointer"
        >
          <img src={Arrow} alt="" />
          <p className=" font-[500] text-[20px] text-grey500 cursor-pointer">
            Settings
          </p>
        </div>

        <div className="mt-[24px]">
          <div className="bg-[#CFF5EE] p-[24px] rounded-[5px]">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={AccountIcon} alt="" />
                <p className="text-grey500 text-[20px]">Account</p>
              </div>
            </div>

            <div className="ml-[36px] grid gap-[24px] my-[24px]">
              <p
                className="  text-grey300 text-[16px] cursor-pointer"
                onClick={handlePasswordResetModal}
              >
                Reset Password
              </p>
            </div>
          </div>
        </div>
      </div>

      <MenuModal
        isOpen={resetPasswordModal}
        onClose={() => setResetPasswordModal(false)}
      >
        <form action="" onSubmit={updatePassword}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <p className="text-[20px] font-[400] text-grey500">
                Reset password
              </p>
              <div className=" mt-[24px] grid gap-[16px]">
                <p className="text-red-500 text-sm mt-1">{error}</p>
                <input
                  type="password"
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create new password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full`}
                />
                <input
                  type="password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />

                <button
                  disabled={loading}
                  type="submit"
                  className="bg-black w-full text-center text-white py-3 rounded mt-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal
        isOpen={resetSuccessModal}
        onClose={() => setResetSuccessModal(false)}
      >
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[380px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={CheckCircle}
              alt=""
              onClick={() => setResetSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500">
              Your password has been reset successfully
            </p>
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default EmployeeSettingsPage;
