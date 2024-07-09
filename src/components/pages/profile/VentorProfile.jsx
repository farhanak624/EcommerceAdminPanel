import { useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Countryselector from "../../countrySelector/Countryselector";
import { toast } from "react-toastify";
import { addProfile } from "../../../Api/ApiCall";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadImageV2 } from "../../imageUpload";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import GoogleMapReact from "google-map-react";
// import { Pin } from "react-postal-code";
import "react-country-state-city/dist/react-country-state-city.css";
import Idaddmodal from "./Idaddmodal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/NavbarSlice";
import SpinningLoader from "../../LodingDiv/SpinningLoader";
import CompanyDetails from "./CompanyDetails";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function VentorProfile() {
  // const [input, setInput] = useState < string > "";
  const dispatch = useDispatch();
  const location = useLocation();
  const email = location.state.email;
  const [loading, setLoading] = useState(false);
  const [Location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [postCode, setPostCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [countryId, setCountryId] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [profileId, setProfileId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [other, setOther] = useState(false);
  const [showModal, setModal] = useState(false);
  const [frontPageImage, setFrontPageImage] = useState("");
  const [backPageImage, setBackPageImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [returnPolicyError, setReturnPolicyError] = useState("");
  const [postCodeError, setPostCodeError] = useState("");
  const [dobError, setDobError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [profileIdError, setProfileIdError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [accountNumError, setAccountNumError] = useState("");
  const [ibanError, setIbanError] = useState("");
  const [ifscError, setIfscError] = useState("");
  const [profileImgError, setProfileImgError] = useState("");
  const [frontImgError, setFrontImgError] = useState("");
  const [backImgError, setBackImgError] = useState("");
  const apikey = "AIzaSyBOHuJ-4CqJBjmSi_RugeonwPU5cBVqbeA";
  const fileInputRef = useRef(null);
  const [locationError, setLocationError] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const [companyType, setCompanyType] = useState("");
  const [fields, setFields] = useState([""]);
  const [companyDatas, setCompanyDatas] = useState({
    companyType: "",
    gstNumber: "",
    tradeLicense: "",
    dinNumber: "",
    roc: "",
  });
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleMapClick = async ({ lat, lng }) => {
    setSelectedCoordinates({ lat, lng });
    const resp = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`
    );
    const locationAdresss = resp.data.results[0].formatted_address;
    setLocation(locationAdresss);
    setIsModalOpen(false);
  };
  const selectid = (id) => {
    setModal(true);
    if (id === "other") {
      setOther(true);
    } else {
      setOther(false);
    }
  };

  const today = new Date();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file: ", file);
    if (file) {
      setProfileImage(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email });
    setAddressError("");
    setReturnPolicyError("");
    setPostCodeError("");
    setDobError("");
    setCountryError("");
    setStateError("");
    setProfileIdError("");
    setBankNameError("");
    setAccountNameError("");
    setAccountNumError("");
    setIbanError("");
    setIfscError("");
    setProfileImgError("");
    setFrontImgError("");
    setBackImgError("");
    setLocationError("");
    setReturnPolicyError("");
    const onlyLetters = /^[A-Za-z\s]+$/;
    if (!address.trim()) {
      toast.error("Address is required");
      setAddressError("Address is required");
    }
    if (!returnPolicy.trim()) {
      toast.error("ReturnPolicy is required");
      setReturnPolicyError("ReturnPolicy is required");
    }
    if (!postCode.trim()) {
      toast.error("Postal code is required");
      setPostCodeError("Postal code is required");
    }
    if (!country.trim()) {
      toast.error("Country is required");
      setCountryError("Country is required");
    }
    if (!dateOfBirth) {
      toast.error("Date of birth is required");
      setDobError("Date of birth is required");
    }
    if (!state.trim()) {
      toast.error("State is required");
      setStateError("State is required");
    }
    if (!profileId.trim()) {
      toast.error("Profile ID is required");
      setProfileIdError("Profile ID is required");
    }
    if (!bankName.trim()) {
      toast.error("Bank Name is required");
      setBankNameError("Bank Name is required");
    } else if (!onlyLetters.test(bankName)) {
      setBankNameError("Bank Name should contain only letters");
    }
    if (!accountName.trim()) {
      toast.error("Account Name is required");
      setAccountNameError("Account Name is required");
    }
    if (!accountNumber.trim()) {
      toast.error("Account Number is required");
      setAccountNumError("Account Number is Required is required");
    }
    if (!iban.trim()) {
      toast.error("Iban is required");
      setIbanError("Iban  is required");
    }
    if (!ifsc.trim()) {
      toast.error("IFSC code is required");
      setIfscError("IFSC code is required");
    }
    if (!profileImage) {
      toast.error("Profile Image is required");
      setProfileImgError("Profile Image is required");
    }
    if (!frontPageImage) {
      toast.error("Front Image is required");
      setFrontImgError("Front Image is required");
    }
    if (!backPageImage) {
      toast.error("Back Image is required");
      setBackImgError("Back Image is required");
    }
    if (!Location) {
      toast.error("Location is required");
      setLocationError("Location is required");
    }
    if (!returnPolicy.trim()) {
      toast.error("Return Policy is required");
      setReturnPolicyError("Return Policy is required");
    }
    console.log("submitting");
    console.log("submitting", bankName, accountName, accountNumber, ifsc, iban);
    if (
      !addressError &&
      !returnPolicyError &&
      !countryError &&
      !postCodeError &&
      !dobError &&
      !stateError &&
      !profileIdError &&
      !bankNameError &&
      !accountNameError &&
      !accountNumError &&
      !ibanError &&
      !ifscError &&
      !profileImgError &&
      !frontImgError &&
      !backImgError &&
      !locationError &&
      !returnPolicyError
    ) {
      dispatch(loadSpinner());
      try {
        const docResponse = await uploadImageV2(companyDatas.roc);
        const profileImageResponse = await uploadImageV2(profileImage);
        const frontPageImageResponse = await uploadImageV2(frontPageImage);
        const backPageImageResponse = await uploadImageV2(backPageImage);
        const wholeData = {
          email,
          address,
          profileImage: profileImageResponse.images[0].imageUrl,
          state,
          country,
          postCode,
          dateOfBirth,
          profileId,
          frontPageImage: frontPageImageResponse.images[0].imageUrl,
          backPageImage: backPageImageResponse.images[0].imageUrl,
          bankName,
          accountName,
          accountNumber,
          ifsc,
          iban,
          ltd: selectedCoordinates.lat.toString(),
          lng: selectedCoordinates.lng.toString(),
          returnPolicy,
          companyDetails: {
            ...companyDatas,
            companyType:companyType,
            roc: docResponse.images[0].imageUrl,
          },
          persons: [...fields],
        };
        console.log("wholeData:", wholeData);
        const res = await addProfile(wholeData);
        console.log("responseAddProfile:", res);
        dispatch(loadSpinner());
        if (res.data.message) {
          navigate("/processing");
        } else {
          console.log("error");
          toast.error("error in adding profile");
        }
      } catch (err) {
        console.log(err);
        dispatch(loadSpinner());
        toast.error(err);
      }
    }
  };

  const handleCancel = () => {
    setAddress("");
    setReturnPolicy("");
    setPostCode("");
    setDateOfBirth("");
    setCountryId(0);
    setCountry("");
    setState("");
    setProfileId("");
    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setIban("");
    setIfsc("");
    setProfileImage("");
    setOther("");
    setModal(false);
    setFrontPageImage("");
    setBackPageImage("");
    setReturnPolicy("");
    setAddressError("");
    setReturnPolicyError("");
    setPostCodeError("");
    setDobError("");
    setCountryError("");
    setStateError("");
    setProfileIdError("");
    setBankNameError("");
    setAccountNameError("");
    setAccountNumError("");
    setIbanError("");
    setIfscError("");
    setProfileImgError("");
    setFrontImgError("");
    setBackImgError("");
  };

  return (
    <div className="relative h-full">
      {showModal && (
        <Idaddmodal
          modalHide={setModal}
          backPageImage={backPageImage}
          setBackPageImage={setBackPageImage}
          frontPageImage={frontPageImage}
          setFrontPageImage={setFrontPageImage}
        />
      )}
      <div className="flex justify-center mt-4">
        <div className="p-4 rounded-lg bg-containerWhite w-full md:w-[80%]">
          <h1 className="text-start font-bold">Profile information</h1>
          <div className="flex items-center justify-center ">
            <div>
              <div className="w-28 h-28 rounded-full overflow-hidden">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    className="w-full h-full rounded-full object-cover"
                    alt=""
                  />
                ) : (
                  <img
                    src="/propic.png"
                    className="w-full h-full rounded-full object-cover"
                    alt=""
                  />
                )}
              </div>
              <div className="flex justify-center">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }} // Hide the file input visually
                    ref={fileInputRef}
                    onChange={(e) => {
                      handleImageChange(e);
                    }}
                  />
                  <img
                    onClick={handleButtonClick}
                    src="/camara.png"
                    className="w-8 cursor-pointer"
                    alt=""
                  />
                  {profileImgError && (
                    <span className="text-red-500 text-xs">
                      {profileImgError}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* formdiv */}

          <form action="">
            {/* first */}

            {/* 3th */}
            <div className="flex justify-center mt-5 ">
              <div className=" w-[450px]">
                <p className="text-xs font-bold">Enter address</p>
                <textarea
                  style={{ resize: "none" }}
                  type="text"
                  placeholder="Enter address"
                  className="w-full px-2 outline-none  border border-gray-300 rounded-md p-0.5 py-1 max-w-[450px]"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {addressError && (
                  <span className="text-red-500 text-xs">{addressError}</span>
                )}
              </div>
            </div>
            {/* 3th */}
            {/* 4th */}
            <div className="flex justify-center">
              <div className="mt-6 w-full flex md:justify-center md:w-[450px] md:flex-row flex-col gap-4">
                <div className="">
                  <p className="text-xs font-bold">Country</p>
                  <CountrySelect
                    value={countryId}
                    onChange={(e) => {
                      console.log(e.name);
                      setCountryId(e.id);
                      setCountry(e.name);
                    }}
                    placeHolder="Select Country"
                  />
                  {countryError && (
                    <span className="text-red-500 text-xs">{countryError}</span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold">State</p>

                  <StateSelect
                    countryid={countryId}
                    value={state}
                    onChange={(e) => {
                      console.log("in state: ", e.name);
                      setState(e.name); // Set the selected state label
                    }}
                    placeHolder="Select State"
                    style={{
                      width: "200px", // Set custom width
                      height: "40px", // Set custom height
                      border: "none", // Remove inner input border
                      // Add other custom styles here
                    }}
                  />
                  {stateError && (
                    <span className="text-red-500 text-xs">{stateError}</span>
                  )}
                </div>
              </div>
            </div>
            {/* 4th */}
            {/* in4th after */}
            <div className="flex justify-center mt-5">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-[450px]">
                <div className="flex-1">
                  <p className="text-xs font-bold">Postal code</p>
                  <input
                    type="text"
                    className="outline-none w-full px-2 border border-gray-300 rounded-md p-0.5 py-1"
                    placeholder="Postal code"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                  {postCodeError && (
                    <span className="text-red-500 text-xs">
                      {postCodeError}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">Enter date of birth</p>
                  <ReactDatePicker
                    className="outline-none w-full px-2 border border-gray-300 rounded-md p-0.5 py-1"
                    selected={dateOfBirth}
                    onChange={(date) => setDateOfBirth(date)}
                    placeholderText="DD/MM/YYYY"
                    dateFormat="dd/MM/yyyy"
                    maxDate={today}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  {dobError && (
                    <span className="text-red-500 text-xs">{dobError}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-[450px]">
                <div className="flex-1">
                  <p className="text-xs font-bold">Location</p>
                  <input
                    type="text"
                    className="outline-none w-full px-2 border border-gray-300 rounded-md p-0.5 py-1"
                    placeholder="Location"
                    value={Location}
                    onClick={(e) => {
                      // handleLocationChange(e)
                      setIsModalOpen(true);
                    }}
                  />

                  <span className="text-red-500 text-xs">{locationError}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-[450px]">
                <div className="flex-1">
                  <p className=" font-bold text-xs">Return Policy</p>
                  <input
                    type="text"
                    className="outline-none w-full px-2 border border-gray-300 rounded-md p-0.5 py-1"
                    placeholder="Return policy"
                    value={returnPolicy}
                    onChange={(e) => {
                      setReturnPolicy(e.target.value);
                    }}
                  />

                  <span className="text-red-500 text-xs">
                    {returnPolicyError}
                  </span>
                </div>
              </div>
            </div>
            <div></div>
            {/* id section */}
            <div className="flex justify-center">
              <div className="mt-10 w-full flex md:justify-center md:w-[450px] md:flex-row flex-col gap-4">
                <div className="">
                  <p className="text-xs font-bold">Add id</p>
                  <select
                    value={profileId}
                    onChange={(e) => {
                      selectid(e.target.value);
                      setProfileId(e.target.value);
                    }}
                    className="outline-none h-[65%] px-2 border w-full md:w-[220px] border-gray-300 rounded-md p-2 py-1"
                  >
                    <option selected disabled>
                      select option
                    </option>
                    <option value="passport">Passport</option>
                    <option value="driving license">Driving license</option>
                    <option value="other">Other</option>
                  </select>
                  {profileIdError && (
                    <span className="text-red-500 text-xs">
                      {profileIdError}
                    </span>
                  )}
                </div>
                <div className="w-full flex items-center justify-center gap-5">
                  {frontPageImage ? (
                    <img
                      src={URL.createObjectURL(frontPageImage)}
                      className="h-10"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {!frontPageImage && frontImgError && (
                    <span className="text-red-500 text-xs">
                      {frontImgError}
                    </span>
                  )}
                  {backPageImage ? (
                    <img
                      src={URL.createObjectURL(backPageImage)}
                      className="h-10"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {!backPageImage && backImgError && (
                    <span className="text-red-500 text-xs">{backImgError}</span>
                  )}
                </div>
              </div>
            </div>
            <CompanyDetails
              fields={fields}
              setFields={setFields}
              companyType={companyType}
              setCompanyType={setCompanyType}
              companyDatas={companyDatas}
              setCompanyDatas={setCompanyDatas}
            />
            {/* id section */}
            {other && (
              <div className="flex justify-center">
                <div className="mt-2 w-full flex md:justify-center md:w-[450px] md:flex-row flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Enter your id name"
                    name=""
                    id=""
                    className="outline-none w-full px-2 border border-gray-300 rounded-md p-0.5 py-1"
                    onChange={(e) => {
                      setProfileId(e.target.value);
                    }}
                  />
                  {profileIdError && (
                    <span className="text-red-500 text-xs">
                      {profileIdError}
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* in4th after */}
            {/* 5th */}
            <div className="flex items-center justify-center mt-5">
              <div className="justify-center p-2 border border-gray-400 rounded-lg max-w-[450px] w-full">
                <Countryselector
                  bankName={bankName}
                  setBankName={setBankName}
                  accountName={accountName}
                  setAccountName={setAccountName}
                  accountNumber={accountNumber}
                  setAccountNumber={setAccountNumber}
                  ifsc={ifsc}
                  setIfsc={setIfsc}
                  iban={iban}
                  setIban={setIban}
                  bankNameError={bankNameError}
                  accountNameError={accountNameError}
                  accountNumError={accountNumError}
                  ifscError={ifscError}
                  ibanError={ibanError}
                />
              </div>
            </div>

            {/* 5th */}
            {/* formDiv */}
            <div className="flex justify-center">
              <div className="flex  justify-end w-full gap-3 max-w-[420px] mt-5">
                <button
                  type="button"
                  className="w-[100px] p-1 rounded-lg text-red-700 border border-red-700"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[100px] p-1 rounded-lg text-white bg-navblue"
                  value={"submit"}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: import.meta.env.REACT_APP_GOOGLE_MAP_API_KEY,
              }} // Replace "YOUR_API_KEY" with your actual Google Maps API key
              center={{ lat: 10.99835602, lng: 77.01502627 }}
              defaultZoom={11}
              onClick={handleMapClick}
            >
              {selectedCoordinates.lat && selectedCoordinates.lng && (
                <AnyReactComponent
                  lat={selectedCoordinates.lat}
                  lng={selectedCoordinates.lng}
                  text="Selected Location"
                />
              )}
            </GoogleMapReact>
          </div>
        </div>
      )}
      <SpinningLoader />
    </div>
  );
}

export default VentorProfile;
