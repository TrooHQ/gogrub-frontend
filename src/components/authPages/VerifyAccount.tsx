import { SERVER_DOMAIN } from "../../Api/Api";
import { RootState } from "../../store/store";
import axios from "axios";
import Logo from "../../assets/TrooGrey.svg";
import GoGrubLogo from "../../assets/business_logo.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import DigitInput from "./DigitInput";
import { MuiOtpInput } from "mui-one-time-password-input";
import CustomInput from "../inputFields/CustomInput";

const VerifyAccount = () => {
  const OTPInput = MuiOtpInput as React.ElementType;

  const [isFromGoGrub, setIsFromGoGrub] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const history = useNavigate();
  const navigate = useNavigate();

  // const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const { userDetails } = useSelector((state: RootState) => state.user);
  console.log(userDetails, "userDetails:");

  const searchParams = new URLSearchParams(window.location.search);

  const [userEmail, setUserEmail] = useState<string | null>(searchParams.get("verify-account") || null);
  const [emailInput, setEmailInput] = useState<string>("");


  console.log("userEmail:", userEmail);
  console.log("emailInput:", emailInput);
  setUserEmail(searchParams.get("verify-account"));

  // useEffect(() => {
  //   // const email = localStorage.getItem("registeredUserEmail");
  // }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("coming-from") === "gogrub") {
      setIsFromGoGrub(true);
    }
  }, []);



  const resendOTP = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${SERVER_DOMAIN}/resendOTP`, {
        email: userEmail ?? emailInput,
      });
      setLoading(false);
      toast.success(response.data.message || "Check your email for the OTP");
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  const [otp, setOtp] = useState("");

  useEffect(() => {
    // if (userDetails) {
    //   if (userDetails?.email_verified === true) {
    //     navigate("/overview");
    //   } else if (userDetails?.email_verified === false) {
    //     resendOTP()
    //   }
    // }
  }, [userDetails, navigate]);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };



  const verify = async () => {
    console.log("OTP:", otp);
    try {
      setLoading(true);
      const token = otp;
      // const response = await axios.post(`${SERVER_DOMAIN}/emailVerification`, {
      // https://troox-backend-new.vercel.app/api/gogrub/goGrubEmailVerification
      const response = await axios.post(`${SERVER_DOMAIN}/gogrub/goGrubEmailVerification`, {
        token,
      });
      setLoading(false);
      toast.success(response.data.message || "User verified successfully");
      history("/login");
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const allInputsFilled = () => {
    return otp.length === 6;
  };

  useEffect(() => {
    setError(allInputsFilled() ? "" : "Please fill all input fields");
  }, [otp]);

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        {!isFromGoGrub ? (
          <img src={Logo} alt="Logo" className="mb-0" />
        ) : (
          <img src={GoGrubLogo} alt="Logo" className="mb-0" />
        )}
        <div className="bg-white grid  p-[40px] mt-[32px] mb-[40px] w-full md:w-[530px] rounded shadow-md">
          <p className="text-red-500 ">{error}</p>
          <div className=" flex flex-col text-center justify-center items-center gap-[24px] mt-[28px] mb-[40px]">
            <p className=" font-[500] text-[20px] text-[#121212]">
              Verify Account
            </p>
            <p className=" text-[16px] font-[400] text-[#121212]">
              {" "}
              A verification code has been sent to your email. Please enter the
              six-digit OTP that was sent to your email
            </p>
          </div>
          {userEmail ? (
            <>
              <OTPInput value={otp} onChange={handleChange} length={6} />


              <div
                className=" mt-[24px] flex items-center justify-start cursor-pointer"
                onClick={resendOTP}
              >
                <button
                  className=" font-[400] text-xs text-blue-500 underline hover:rounded-full hover:bg-blue-500 hover:text-white px-2 py-1 hover:no-underline text-semibold"
                  disabled={loading}
                >
                  Resend Code
                </button>
              </div>
              {allInputsFilled() ? (
                <div className=" mt-[16px]" onClick={verify}>
                  <button
                    className="w-full py-3 text-center text-white bg-black rounded"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Activate Account"}
                  </button>
                </div>
              ) : (
                <div className=" mt-[16px]">
                  <button
                    // onClick={verify}
                    className="bg-[#E7E7E7] text-[#B6B6B6] w-full text-center  py-3 rounded"
                    disabled
                  >
                    Activate account
                  </button>
                </div>
              )}

            </>
          ) : (
            <>
              <CustomInput
                type="email"
                label="Business email"
                value={userEmail || emailInput || ""}
                error={error}
                onChange={(newValue) => setEmailInput(newValue)}
              />

              <div className=" mt-[16px]" onClick={() => { setUserEmail(emailInput); resendOTP() }}>
                <button
                  className="w-full py-3 text-center text-white bg-black rounded"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Activate Account"}
                </button>
              </div>
            </>
          )

          }
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
