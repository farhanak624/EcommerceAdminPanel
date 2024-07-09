import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../../../LodingDiv/LoaderSmall";

function DeliveryBoyModal({
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    profileImage,
    setProfileImage,
    nameError,
    emailError,
    PhoneNumberError,
    passwordError,
    profileImageError,
    loading,
    isEditMode = false,
    onSave = () => { }
}) {

    const [modalTitle, setModalTitle] = useState("Add Delivery Boy");

    useState(() => {
        if (isEditMode) {
            setModalTitle("Edit Delivery Boy Details");
        } else {
            setModalTitle("Add Delivery Boy");
        }
    }, [isEditMode]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };


    return (
        <>
            <h1 className="font-bold">{modalTitle}</h1>
            {(nameError ||
                emailError ||
                PhoneNumberError ||
                passwordError ||
                profileImageError) && (
                    <span className="text-red-500 text-xs">Add Delivery Boy Details Properly</span>
                )}
            <div className="mt-5 flex flex-col items-center">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 overflow-hidden" style={{ borderColor: '#5669FF' }}>
                        {  profileImage ? (
                            <img
                            src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                            src={"/defaultProfile.png"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        ) }
                    </div>
                    <label
                        htmlFor="profileImageInput"
                        className="absolute bottom-0 right-0 bg-white rounded-full cursor-pointer"
                    >
                        <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.468148" y="0.468148" width="27.6267" height="24.64" rx="12.32" fill="#5669FF" />
                            <rect x="0.468148" y="0.468148" width="27.6267" height="24.64" rx="12.32" stroke="white" stroke-width="0.936296" />
                            <g clip-path="url(#clip0_4742_19335)">
                                <path d="M12.888 5.98926C12.5849 5.98927 12.2872 6.07035 12.026 6.22409C11.7647 6.37784 11.5493 6.59865 11.402 6.86366L10.8876 7.78926H9.38203C8.77203 7.78926 8.18702 8.03158 7.75569 8.46291C7.32435 8.89425 7.08203 9.47926 7.08203 10.0893V16.8893C7.08203 17.4993 7.32435 18.0843 7.75569 18.5156C8.18702 18.9469 8.77203 19.1893 9.38203 19.1893H13.8804C13.7461 18.867 13.6447 18.532 13.578 18.1893H9.38203C9.03725 18.1893 8.70659 18.0523 8.46279 17.8085C8.219 17.5647 8.08203 17.234 8.08203 16.8893V10.0893C8.08203 9.74448 8.219 9.41382 8.46279 9.17002C8.70659 8.92622 9.03725 8.78926 9.38203 8.78926H11.476L12.276 7.34926C12.3367 7.24013 12.4254 7.1492 12.533 7.0859C12.6406 7.02261 12.7632 6.98924 12.888 6.98926H15.676C15.8009 6.98924 15.9235 7.02261 16.0311 7.0859C16.1387 7.1492 16.2274 7.24013 16.288 7.34926L17.088 8.78926H19.182C19.5268 8.78926 19.8575 8.92622 20.1013 9.17002C20.3451 9.41382 20.482 9.74448 20.482 10.0893V12.3093C20.8348 12.4393 21.17 12.6069 21.482 12.8069V10.0893C21.482 9.47926 21.2397 8.89425 20.8084 8.46291C20.377 8.03158 19.792 7.78926 19.182 7.78926H17.6764L17.162 6.86366C17.0148 6.59865 16.7994 6.37784 16.5381 6.22409C16.2768 6.07035 15.9792 5.98927 15.676 5.98926H12.888ZM14.282 9.98926C14.9525 9.98925 15.6061 10.1998 16.1505 10.5911C16.695 10.9825 17.3164 12.1705 17.3164 12.1705L16.3804 12.5253C16.3804 12.5253 16.0517 11.8255 15.7661 11.5649C15.4805 11.3043 15.1313 11.1236 14.7536 11.041C14.3759 10.9583 13.9832 10.9766 13.6148 11.0941C13.2465 11.2116 12.9156 11.4241 12.6555 11.7101C12.3954 11.9962 12.2153 12.3457 12.1333 12.7235C12.0513 13.1013 12.0704 13.4941 12.1885 13.8622C12.3066 14.2303 12.5196 14.5608 12.8061 14.8204C13.0926 15.08 13.4425 15.2595 13.8204 15.3409C13.7028 15.6497 13.6136 15.9729 13.5564 16.3069C12.7905 16.1296 12.1166 15.6766 11.6633 15.0342C11.2101 14.3919 11.0091 13.6052 11.0988 12.8241C11.1885 12.0431 11.5626 11.3224 12.1497 10.7995C12.7368 10.2767 13.4959 9.98825 14.282 9.98926ZM23.082 17.1893C23.082 19.6193 21.112 21.5893 18.682 21.5893C16.252 21.5893 14.282 19.6193 14.282 17.1893C14.282 14.7593 16.252 12.7893 18.682 12.7893C21.112 12.7893 23.082 14.7593 23.082 17.1893ZM19.082 14.7893C19.082 14.6832 19.0399 14.5814 18.9649 14.5064C18.8899 14.4314 18.7881 14.3893 18.682 14.3893C18.5759 14.3893 18.4742 14.4314 18.3992 14.5064C18.3242 14.5814 18.282 14.6832 18.282 14.7893V16.7893H16.282C16.1759 16.7893 16.0742 16.8314 15.9992 16.9064C15.9242 16.9814 15.882 17.0832 15.882 17.1893C15.882 17.2953 15.9242 17.3971 15.9992 17.4721C16.0742 17.5471 16.1759 17.5893 16.282 17.5893H18.282V19.5893C18.282 19.6953 18.3242 19.7971 18.3992 19.8721C18.4742 19.9471 18.5759 19.9893 18.682 19.9893C18.7881 19.9893 18.8899 19.9471 18.9649 19.8721C19.0399 19.7971 19.082 19.6953 19.082 19.5893V17.5893H21.082C21.1881 17.5893 21.2899 17.5471 21.3649 17.4721C21.4399 17.3971 21.482 17.2953 21.482 17.1893C21.482 17.0832 21.4399 16.9814 21.3649 16.9064C21.2899 16.8314 21.1881 16.7893 21.082 16.7893H19.082V14.7893Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_4742_19335">
                                    <rect width="19.2" height="19.2" fill="white" transform="translate(4.67969 3.18848)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </label>
                    <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
            </div >

            <div className="mt-5">
                <p className="text-xs font-bold mb-1">Full Name</p>
                <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="outline-none px-2 border w-full border-gray-300 rounded-md p-0.5 py-1"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        console.log("edit name:", e.target.value);
                    }}
                />
            </div>
            <div className="mt-5">
                <p className="text-xs font-bold mb-1">Email Id</p>
                <input
                    type="text"
                    placeholder="Enter Email Id"
                    className="outline-none border px-2 w-full border-gray-300 rounded-md p-0.5 py-1"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div className="mt-5">
                <p className="text-xs font-bold mb-1">Phone Number</p>
                <input
                    type="number"
                    placeholder="Enter account number"
                    className="outline-none border px-2 w-full border-gray-300 rounded-md p-0.5 py-1"
                    value={phoneNumber}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <p className="text-xs font-bold mb-1">Create Password</p>
                <input
                    type="text"
                    placeholder="Enter Password"
                    className="outline-none border px-2 w-full border-gray-300 rounded-md p-0.5 py-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex justify-end mt-10">
                <button
                    onClick={onSave}
                    className="text-white px-4 py-2 rounded-md w-full"
                    style={{ backgroundColor: "#2F4EFF" }}
                >
                    {loading ? <Loading /> : "Save"}
                </button>
            </div>
        </>
    );
}

export default DeliveryBoyModal;
