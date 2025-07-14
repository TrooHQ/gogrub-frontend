import { useEffect, useState } from "react";
import YourLinkWithNoLogo from "./YourLinkWithNoLogo";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountDetails } from "../../slices/businessSlice";
import { RootState } from "../../store/store";
import { fetchOnlineOrderingLink } from "../../slices/assetSlice";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { SERVER_DOMAIN } from "../../Api/Api";
// import { toast } from "react-toastify";

const YourLink = () => {
  const dispatch = useDispatch();

  const [businessLogo, setBusinessLogo] = useState("");
  const { selectedBranch } = useSelector((state: RootState) => state.branches);
  const { userDetails } = useSelector((state: RootState) => state.user);

  const { accountDetails } = useSelector((state: RootState) => state.business);

  const { onlineOrderingLink, loading } = useSelector(
    (state: RootState) => state.asset
  );

  useEffect(() => {
    dispatch(fetchAccountDetails() as any);

  }, [dispatch]);


  useEffect(() => {
    if (selectedBranch?.id) {
      dispatch(fetchOnlineOrderingLink(selectedBranch?.id || "") as any);
    }
  }, [selectedBranch?.id, dispatch]);



  useEffect(() => {
    if (userDetails) {
      setBusinessLogo(userDetails?.business_logo);
    }
  }, [userDetails]);

  return (
    <div>
      {!(accountDetails?.account_name && accountDetails?.account_number) ?
        <div>
          <div className="flex flex-col items-center justify-center h-full pt-[100px]">
            <h3 className="text-[#121212] text-center font-sans text-[20px] not-italic font-medium leading-[26px] tracking-[0.15px]">
              Fill in your bank information for your payment remittance
            </h3>
            <p className="mt-4 text-center text-gray-500">
            </p>
            <Link to="/business-information" className="px-4 py-2 mt-4 text-white bg-black rounded">
              Complete Account Details
            </Link>
          </div>
        </div> :
        <>
          {businessLogo !== "" ? (
            <div>
              <YourLinkWithNoLogo
                // generateOnlineOrderingLink={generateOnlineOrderingLink}
                businessLogo={businessLogo}
                onlineOrderingLink={onlineOrderingLink}
                loading={loading}
              />
              {/* <div className="flex flex-col gap-4 items-center justify-center h-full pt-[100px]">
            <h3 className="text-[#121212] text-center font-sans text-[20px] not-italic font-medium leading-[26px] tracking-[0.15px]">
              Your Generated Link
            </h3>
            <div className="flex items-center gap-1">
              <span>{generatedLink}</span>
              <ContentCopy
                className="w-5 h-5 text-[#929292] cursor-pointer"
                onClick={handleCopyClick}
              />
            </div>
          </div> */}

              {/* {!isCustomizing && (
            <div className="text-center mt-11">
              <button
                className="text-[#3E3C7F] bg-white py-3 px-6 rounded mt-5 border border-black w-fit"
                onClick={handleCustomizeClick}
              >
                Customize Link
              </button>
            </div>
          )} */}

              {/* {isCustomizing && (
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="flex gap-2 items-center border border-gray-300 rounded-md overflow-hidden shadow-sm w-[60%]">
                <span className="px-3 py-2 text-gray-500 bg-gray-100">
                  https://gogrub.com/
                </span>
                <input
                  type="text"
                  placeholder="Please enter your preferred URL"
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                  className="w-full px-2 py-2 text-gray-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 text-white bg-black rounded"
                  onClick={handleGenerateClick}
                >
                  Generate link
                </button>
                <button
                  className="px-4 py-2 text-gray-500 bg-white border border-purple-500 rounded"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          )} */}
            </div>
          ) : (
            <YourLinkWithNoLogo
              // generateOnlineOrderingLink={generateOnlineOrderingLink}
              businessLogo={businessLogo}
              onlineOrderingLink={onlineOrderingLink}
              loading={loading}
            />
          )}
        </>}
    </div>
  );
};

export default YourLink;
