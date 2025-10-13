import { useEffect, useState } from "react";
import linkImage from "../../assets/link-outline.svg";
import uploadImage from "../../assets/upload.svg";
import UploadedLogoDisplay from "./UploadedLogoDisplay";
import { ExpandLessOutlined, TaskOutlined } from "@mui/icons-material";
import { truncateText } from "../../utils/truncateText";
import brandLogo from "../../assets/yourlink.png";
import FileUploadComponent from "./FileUploadComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchAccountDetails } from "../../slices/businessSlice";
import { SERVER_DOMAIN } from "../../Api/Api";


const YourLinkWithNoLogo = ({
  // generateOnlineOrderingLink,
  businessLogo,
  onlineOrderingLink,
  // loading,
}: {
  // generateOnlineOrderingLink: any;
  businessLogo: any;
  onlineOrderingLink: any;
  loading: any;
}) => {
  const { userData } = useSelector((state: RootState) => state.user);
  // const { selectedBranch } = useSelector((state: RootState) => state.branches);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   if (selectedBranch?.id) {
  //     generateOnlineOrderingLink();
  //   }
  // }, [selectedBranch?.id, generateOnlineOrderingLink]);


  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customLink, setCustomLink] = useState("");
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [selectedLogo, setSelectedLogo] = useState(true);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [businessFullName, setBusinessFullName] = useState("");
  const [simpleDescription, setSimpleDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  // const [showForm, setShowForm] = useState(true);

  const handleUploadLogo = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUploadedLogo(null);
    setSelectedLogo(false);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const backFromSelection = () => {
    setSelectedLogo(false);
    setUploadedLogo(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleCancelClick = () => {
    setIsCustomizing(false);
    setCustomLink("");
  };

  const handleGenerateClick = () => {
    setIsCustomizing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedLogo(true);
      setShowUploadProgress(false);
      setUploadedLogo(event.target.files[0]);
      setUploadProgress(0);
    }
  };

  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const handleFileUpload = () => {
    if (uploadedLogo) {
      setShowUploadProgress(true);
      // simulateUploadProgress();
    }
  };

  useEffect(() => {
    if (uploadedLogo) {
      setSelectedLogo(true);
    }
  }, [uploadedLogo]);

  const getYourLink = () => {
    setIsUploadSuccessful(true);
    setIsModalOpen(false);
    setShowUploadProgress(false);
  };

  const getYourLinkNow = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      setAddLoading(true);
      // Make the API call to add ordering details
      const response = await axios.post(
        `${SERVER_DOMAIN}/asset/addOrderingDetails`,
        {
          businessFullName: businessFullName,
          orderingDescription: simpleDescription,
          orderingInstruction: instruction,
        },
        headers
      );

      if (response.status === 200) {
        toast.success("Ordering details added successfully");

        // Call generateOnlineOrderingLink() if the API call is successful
        // setShowForm(false);
        dispatch(fetchAccountDetails() as any)
        // generateOnlineOrderingLink();
      } else {
        console.error("Failed to add ordering details:", response.data);
      }
    } catch (error) {
      console.error("Error adding ordering details:", error);
      toast.error("Error adding ordering details");
    } finally {
      setAddLoading(false);
    }
  };
  return (
    <div>
      {!businessLogo && !isUploadSuccessful ? (
        <div className="flex flex-col gap-4 items-center justify-center h-full pt-[100px] w-full lg:w-[45%] mx-auto ">
          <img src={linkImage} alt="link" className="w-[200px] h-[200px]" />
          <h3 className="text-[#929292] text-center font-sans text-[20px] not-italic font-medium leading-[26px] tracking-[0.15px]">
            To Get Your Generated{" "}
            <span className="text-[#0D0D0D] text-center font-sans text-[20px] not-italic font-medium leading-[26px] tracking-[0.15px]">
              {" "}
              Online Ordering Link
            </span>
            , Upload Your Business Logo
          </h3>
          <div className="border border-[#0D0D0D] bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#0D0D0D] mt-8">
            <button
              className="text-[16px] flex items-center gap-[8px]"
              onClick={handleUploadLogo}
            >
              Upload Business LOGO
            </button>
          </div>

          {isCustomizing && (
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
                  className="px-4 py-2 text-gray-500 bg-white border border-gray-500 rounded"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <UploadedLogoDisplay
          logo={businessLogo || userData?.business_logo}
          handleUploadLogo={handleUploadLogo}
          onlineOrderingLink={onlineOrderingLink}
          loading={addLoading}
          handleGenerateClick={getYourLinkNow}
          businessFullName={businessFullName}
          setBusinessFullName={setBusinessFullName}
          simpleDescription={simpleDescription}
          setSimpleDescription={setSimpleDescription}
          instruction={instruction}
          setInstruction={setInstruction}
        // showForm={showForm}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[60%] shadow-lg flex gap-7">
            <div className="w-[50%]">
              <img
                src={brandLogo}
                alt="brand logo"
                className="w-[100%] h-[100%] rounded-lg"
              />
            </div>
            {!selectedLogo || !showUploadProgress ? (
              <div className="w-[50%] flex flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-[#3E3C7F] text-center">
                    Upload Your Business LOGO
                  </h2>
                  <button
                    onClick={handleModalClose}
                    className="-mt-8 text-gray-500 hover:text-gray-700 text-20"
                  >
                    &times;
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Upload your business logo that is to be displayed via your
                  online ordering link page.
                </p>
                <div className="flex flex-col items-center flex-grow p-4 mt-6 border-2 border-gray-300 border-dashed rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center flex-grow cursor-pointer"
                  >
                    <img
                      src={uploadImage}
                      alt="upload image"
                      className="w-[70px] h-[70px]"
                    />
                    {!uploadedLogo && (
                      <p className="mt-2 text-sm text-center text-gray-500">
                        Select a file or drag and drop here
                      </p>
                    )}
                    {!uploadedLogo && (
                      <p className="text-xs italic text-center text-gray-400">
                        (JPG, PNG, file size no more than 10MB)
                      </p>
                    )}
                  </label>

                  {uploadedLogo && (
                    <>
                      {isUploading ? (
                        <div className="mt-0 p-6 flex justify-between items-center gap-10 bg-[#2c2c2c]">
                          <TaskOutlined className="text-white" />
                          <p className="text-white">
                            {truncateText(uploadedLogo.name, 16)}
                          </p>
                          <div className="flex gap-4">
                            <p className="text-gray-500">Uploading...</p>
                            <p className="text-gray-500">{uploadProgress}%</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="mt-4 p-6 flex justify-between items-center gap-5 bg-[#2c2c2c]">
                            {uploadedLogo ? (
                              <img
                                src={URL.createObjectURL(uploadedLogo)}
                                alt="Uploaded Logo"
                                className="w-[30px] h-auto"
                              />
                            ) : (
                              ""
                            )}
                            <p className="text-white">
                              {truncateText(uploadedLogo.name, 16)}
                            </p>
                            <ExpandLessOutlined
                              className="text-white cursor-pointer"
                              onClick={handleModalClose}
                            />
                          </div>
                          <div className="flex items-center justify-center gap-4">
                            <button
                              className="px-4 py-2 mt-6 text-gray-500 bg-white border border-black rounded"
                              onClick={handleFileUpload}
                              disabled={isUploading}
                            >
                              {"Select image"}
                            </button>
                          </div>
                        </div>
                      )}
                      {isUploading ? (
                        <p className="text-gray-500">
                          Uploading... {uploadProgress}%
                        </p>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-[50%] flex flex-col">
                <FileUploadComponent
                  backFromSelection={backFromSelection}
                  uploadedLogo={uploadedLogo}
                  getYourLink={getYourLink}
                  logo={uploadedLogo}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default YourLinkWithNoLogo;
