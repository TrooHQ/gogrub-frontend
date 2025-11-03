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

  console.log("onlineOrderingLink", onlineOrderingLink)

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
