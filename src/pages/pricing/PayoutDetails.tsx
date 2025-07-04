import { Link, useNavigate } from "react-router-dom";
import GoGrubLogo from "../../assets/business_logo.svg";
import PayoutDetailsForm from "../../components/forms/PayoutDetailsForm";

const PayoutDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fff] h-screen flex flex-col items-center  ">
      <img src={GoGrubLogo} alt="Logo" className="mb-8" />
      <div className="bg-white py-10 px-8 w-full md:w-3/5 rounded shadow-md overflow-y-auto border-[1.5px] border-[#121212]">
        <p className="text-2xl font-medium text-gray-500 mb-2">
          Payout & Bank Details
        </p>
        <p className="text-gray-600 mb-8">
          Please enter your bank account information. You’ll receive a
          four-digit verification code via text message. Once you enter the code
          Troo will direct all payouts to the account.
        </p>
        <PayoutDetailsForm />
      </div>
      <div className=" flex items-center justify-end gap-[10px] mt-4  ">
        <button
          className="border-2 border-black rounded px-6 py-3 font-semibold text-gray-500 "
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <Link to="/overview">
          {" "}
          <button className=" border-2 border-black bg-black rounded px-6 py-3 font-semibold text-white">
            Save and continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PayoutDetails;
