import { useState, useEffect } from "react";
import Logo from "../../assets/TrooGrey.svg";
import GoGrubLogo from "../../assets/business_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BusinessInfoForm from "../forms/BusinessInfoForm";
import PersonalInfoForm from "../forms/PersonalInfoForm";
import { selectTransformedRegisterState } from "../../slices/registerSlice";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";

const BusinessProfiles: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isFromGoGrub, setIsFromGoGrub] = useState(true);
  const [customPayload, setCustomPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const transformedState = useSelector(selectTransformedRegisterState);

  const handleNext = async () => {
    currentStep === 0 && setCurrentStep((prevStep) => prevStep + 1);
    if (currentStep === 1) {
      setLoading(true);
      // console.log(customPayload);

      // Send request to sample endpoint
      try {
        const endpoint = isFromGoGrub
          ? `${SERVER_DOMAIN}/onboardGoGrubBusiness/`
          : `${SERVER_DOMAIN}/onboardBusiness/`;
        const sampleResponse = await axios.post(endpoint, customPayload);

        if (sampleResponse.status === 200) {
          localStorage.setItem("businessId", sampleResponse.data.business_id);
          localStorage.setItem(
            "registeredUserEmail",
            sampleResponse.data.business_email
          );
          localStorage.setItem("userId", sampleResponse.data.user_id);
          toast.success(
            `Business information saved successfully.`
            // `Business information saved successfully. Token: ${sampleResponse.data.email_verification_token}`
          );

          // Navigate to verify-account with the query parameter if coming from GoGrub
          if (isFromGoGrub) {
            navigate("/verify-account?coming-from=gogrub");
          } else {
            navigate("/verify-account");
          }
        } else {
          toast.error("Error submitting business information");
        }
      } catch (error: any) {
        console.error("Error submitting sample data:", error);
        if (error.response.data.message === "Business with email already exists") {
          toast.error(error.response.data.message);
          navigate("/verify-account");
        }
        toast.error(
          error.response.data.message || "Error submitting business information"
        );
      } finally {
        setLoading(false);
      }
    }
  };
  const handleBack = () => setCurrentStep((prevStep) => prevStep - 1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // if (params.get("coming-from") === "gogrub") {
    const monthlyAverageSales = params.get("monthlySales") || 20000;
    const planName = params.get("selectedPlan") || "Quarterly";

    setCustomPayload({
      ...transformedState,
      onboarding_type: "gogrub",
      monthlyAverageSales,
      planName,
    });
    setIsFromGoGrub(true);
    // }
  }, [transformedState]);

  const stepTitles = ["Business Information", "Personal Information"];
  const stepDescriptions = [
    "This information is required in order to verify your business. It will show up on your payout report, invoices and receipts.",
    "Please make sure that your personal details remain up-to-date. Because this information is used to verify your identity. You will need to send our Support Team a message if you need to change it.",
    "Please enter your bank account information. You’ll receive a four-digit verification code via text message. Once you enter the code Troo will direct all payouts to the account.",
  ];

  const [isStepValid, setIsStepValid] = useState(false);
  const renderStepContent = () => {

    switch (currentStep) {
      case 0:
        return <BusinessInfoForm onValidityChange={setIsStepValid} />;
      case 1:
        return <PersonalInfoForm />;
      default:
        return <BusinessInfoForm onValidityChange={setIsStepValid} />;
    }
  };

  const renderStepProgress = () => {
    return (
      <div className="flex justify-center mb-8 gap-[8px]">
        {stepTitles.map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= index
                ? "bg-purple500 text-white"
                : "bg-gray-300 text-gray-600"
                }`}
            >
              {index + 1}
            </div>
            {index < stepTitles.length - 1 && (
              <div
                className={`flex-1 h-1 ${currentStep > index ? "bg-purple500" : "bg-gray-300"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#fff] h-screen flex flex-col items-center justify-center">
      {!isFromGoGrub ? (
        <img src={Logo} alt="Logo" className="mb-8" />
      ) : (
        <img src={GoGrubLogo} alt="Logo" className="mb-8" />
      )}
      <div className="bg-white py-10 px-8 w-full md:w-3/5 rounded shadow-md h-[85vh] overflow-y-auto border-[1.5px] border-[#121212]">
        {renderStepProgress()}
        <p className="mb-2 text-2xl font-medium text-purple500">
          {stepTitles[currentStep]}
        </p>
        <p className="mb-8 text-gray-600">{stepDescriptions[currentStep]}</p>
        {renderStepContent()}
      </div>
      <div className="flex justify-end w-full mt-4 md:w-3/5">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="px-6 py-3 font-semibold border-2 rounded border-purple500 text-purple500"
            disabled={loading}
          >
            Back
          </button>
        ) : (
          <Link to="/">
            <button
              className="px-6 py-3 font-semibold border-2 rounded border-purple500 text-purple500"
              disabled={loading}
            >
              Back
            </button>
          </Link>
        )}
        {currentStep < stepTitles.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 ml-auto font-semibold text-white border-2 rounded border-purple500 bg-purple500"
            disabled={!isStepValid || loading}
          >
            {loading
              ? "Loading..."
              : currentStep === 0
                ? "Next"
                : "Save and continue"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 ml-auto font-semibold text-white border-2 rounded border-purple500 bg-purple500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Save and continue"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BusinessProfiles;
