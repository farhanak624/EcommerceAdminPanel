import { useEffect, useState } from 'react'
import { getProfile, addNewBank, editBank, makePrimary } from '../../../../Api/ApiCall'
import Countryselector from '../../../countrySelector/Countryselector';
import { toast } from "react-toastify";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useDispatch } from 'react-redux';
import { loadSpinner } from '../../../../Redux/Features/NavbarSlice';

// const totalStorage = 15;
// const cloudStorage = 8;

// const availableStorage = totalStorage - cloudStorage;



const ProfilePage = () => {
    const dispatch = useDispatch();
    const [profileDetails, setProfileDetails] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [bankId, setBankId] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [iban, setIban] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [bankNameError, setBankNameError] = useState("");
    const [accountNameError, setAccountNameError] = useState("");
    const [accountNumError, setAccountNumError] = useState("");
    const [ibanError, setIbanError] = useState("");
    const [ifscError, setIfscError] = useState("");
    const [totalStorage, setTotalStorage] = useState('')
    const [cloudStorage, setCloudStorage] = useState('')
    const [availableStorage, setAvailableStorage] = useState('')
    const [returnPolicy, setReturnPolicy] = useState("");

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setBankId('')
        setBankName('')
        setAccountName('')
        setAccountNumber('')
        setIfsc('')
        setIban('')
        setShowModal(false);
    };

    const openEditModal = (bankDetails) => {
        setBankId(bankDetails._id)
        setBankName(bankDetails.bankName)
        setAccountName(bankDetails.accountName)
        setAccountNumber(bankDetails.accountNumber)
        setIfsc(bankDetails.ifsc)
        setIban(bankDetails.iban)
        setShowEditModal(true)
    };

    const closeEditModal = () => {
        setBankId('')
        setBankName('')
        setAccountName('')
        setAccountNumber('')
        setIfsc('')
        setIban('')
        setShowEditModal(false);
    };

    useEffect(() => {
        dispatch(loadSpinner());
        getProfile().then((data) => {
            console.log("data in getProfile", data.data.vendorData);
            const profileData = data.data.vendorData;
            setProfileDetails(profileData);

            // Limit decimals for cloudStorage and totalStorage
            const totalStorageValue = profileData?.cloudDetails?.totalCloud || 0;
            const cloudStorageValue = profileData?.cloudDetails?.cloudStorage || 0;

            setCloudStorage(parseFloat(cloudStorageValue.toFixed(2)));
            setTotalStorage(parseFloat(totalStorageValue.toFixed(2)));
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            dispatch(loadSpinner());
        });
    }, []);

    useEffect(() => {
        // Recalculate availableStorage after setting totalStorage and cloudStorage
        const availableStorageValue = parseFloat((totalStorage - cloudStorage).toFixed(2));
        setAvailableStorage(availableStorageValue);
        console.log("availableSpace: ", availableStorageValue);
    }, [totalStorage, cloudStorage]);


    const data = {
        labels: ['Storage', 'Available'],
        datasets: [
            {
                data: [cloudStorage, availableStorage],
                backgroundColor: ['#2F4EFF', '#27C26E'], // Custom blue and green colors
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%', // Adjust the cutout to control the thickness of the segments
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
        },

    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const saveBankDetails = async (e) => {
        e.preventDefault();

        setBankNameError("");
        setAccountNameError("");
        setAccountNumError("");
        setIbanError("");
        setIfscError("");

        const onlyLetters = /^[A-Za-z\s]+$/;

        // Update error states asynchronously and use the state updater callback function
        setBankNameError(prevBankNameError => {
            if (!bankName.trim()) {
                return "Bank Name is required";
            }
            return prevBankNameError;
        });
        setBankNameError(prevBankNameError => {
            if (!onlyLetters.test(bankName)) {
                return "Bank Name should contain only letters";
            }
            return prevBankNameError;
        });
        setAccountNameError(prevAccountNameError => {
            if (!accountName.trim()) {
                return "Account Name is required";
            }
            return prevAccountNameError;
        });
        setAccountNumError(prevAccountNumError => {
            if (!accountNumber.trim()) {
                return "Account Number is Required";
            }
            return prevAccountNumError;
        });
        setIbanError(prevIbanError => {
            if (!iban.trim()) {
                return "Iban is required";
            }
            return prevIbanError;
        });
        setIfscError(prevIfscError => {
            if (!ifsc.trim()) {
                console.log("no ifsc")
                return "IFSC code is required";
            }
            return prevIfscError;
        });

        if (!bankName.trim() || !accountName.trim() || !accountNumber.trim() || !iban.trim() || !ifsc.trim()) {
            // If any of the fields are empty, return early without saving the bank details
            return;
        }

        if (!bankNameError && !accountNameError && !accountNumError && !ibanError && !ifscError) {
            try {
                const response = await addNewBank({ bankName, accountName, ifsc, iban, accountNumber })
                console.log("response adding new Bank: ", response)
                if (response.data.message) {
                    setBankName("");
                    setAccountName("");
                    setAccountNumber("");
                    setIban("");
                    setIfsc("");
                    getProfile().then((data) => {
                        console.log("data in refetching getProfile", data.data.vendorData);
                        const profileData = data.data.vendorData;
                        setProfileDetails(profileData);
                    }).catch((error) => {
                        console.log(error);
                    });
                    setShowModal(false)
                    setBankNameError("");
                    setAccountNameError("");
                    setAccountNumError("");
                    setIbanError("");
                    setIfscError("");
                    toast.success("New bank details added successfully");
                }
            } catch (err) {
                console.log("error in adding bank: ", err)
                toast.error(err);
            }
        }
    }

    const editBankDetails = async (e) => {
        e.preventDefault();

        // Reset all error states
        setBankNameError("");
        setAccountNameError("");
        setAccountNumError("");
        setIbanError("");
        setIfscError("");

        const onlyLetters = /^[A-Za-z\s]+$/;

        // Update error states using the state updater callback function
        setBankNameError(prevBankNameError => {
            if (!bankName.trim()) {
                console.log("no name")
                return "Bank Name is required";
            }
            return prevBankNameError;
        });
        setBankNameError(prevBankNameError => {
            if (!onlyLetters.test(bankName)) {
                console.log("no name")
                return "Bank Name should contain only letters";
            }
            return prevBankNameError;
        });
        setAccountNameError(prevAccountNameError => {
            if (!accountName.trim()) {
                return "Account Name is required";
            }
            return prevAccountNameError;
        });
        setAccountNumError(prevAccountNumError => {
            if (!accountNumber.trim()) {
                return "Account Number is Required";
            }
            return prevAccountNumError;
        });
        setIbanError(prevIbanError => {
            if (!iban.trim()) {
                return "Iban is required";
            }
            return prevIbanError;
        });
        setIfscError(prevIfscError => {
            if (!ifsc.trim()) {
                console.log("no ifsc")
                return "IFSC code is required";
            }
            return prevIfscError;
        });

        // Now, the error states are updated, so you can check them
        if (!bankName.trim() || !accountName.trim() || !accountNumber.trim() || !iban.trim() || !ifsc.trim()) {
            // If any of the fields are empty, return early without editing the bank details
            return;
        }

        try {
            // Attempt to edit the bank details
            const response = await editBank({ bankId, bankName, accountName, ifsc, iban, accountNumber })
            console.log("response editing Bank: ", response)
            if (response.data.message) {
                // If successful, reset form fields, fetch profile data, close the modal, and show success toast
                setBankName("");
                setAccountName("");
                setAccountNumber("");
                setIban("");
                setIfsc("");
                getProfile().then((data) => {
                    console.log("data in refetching getProfile", data.data.vendorData);
                    const profileData = data.data.vendorData;
                    setProfileDetails(profileData);
                }).catch((error) => {
                    console.log(error);
                });
                setShowModal(false);
                setShowEditModal(false);
                toast.success("Bank details updated");
            }
        } catch (err) {
            // If an error occurs during editing bank details, display an error message
            console.log("error in editing bank: ", err)
            toast.error(err);
        }
    }

    const makeBankPrimary = async () => {
        try {
            const response = await makePrimary({ bankId })
            console.log("response adding Primary Bank: ", response)
            if (response.data.message) {
                getProfile().then((data) => {
                    console.log("data in refetching make primary", data.data.vendorData);
                    const profileData = data.data.vendorData;
                    setProfileDetails(profileData);
                }).catch((error) => {
                    console.log(error);
                });
                // setShowEditModal(false)
            }
        } catch (err) {
            console.log("error in making Primary bank: ", err)
            toast.error(err);
        }
    }

    return (
        <div className="bg-containerWhite rounded-xl w-full p-5 flex flex-col items-center justify-center">
            <div className="h-30 rounded-lg m-25 p-4 shadow-lg border relative flex items-center justify-center flex-col sm:flex-row w-full sm:w-3/4">
                {/* Left Section */}
                <div className="w-full sm:w-1/3 flex items-center justify-center mb-4 sm:mb-0">
                    <img
                        src={profileDetails?.vendorDetails?.profileImage || '/defaultProfile.png'}
                        alt="Profile"
                        className="rounded-full w-40 h-40"
                    />
                </div>

                {/* Right Section */}
                <div className='w-full sm:w-2/3'>
                    <div className='flex flex-col'>
                        <div className='flex items-start mb-2'>
                            <svg className='mr-3' width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.9412 0C4.7676 0 0.558594 4.22409 0.558594 9.41617C0.558594 15.8597 8.95511 25.3192 9.3126 25.7188C9.64838 26.0941 10.2346 26.0934 10.5698 25.7188C10.9273 25.3192 19.3238 15.8597 19.3238 9.41617C19.3237 4.22409 15.1148 0 9.9412 0ZM9.9412 23.8535C7.11534 20.4847 2.24823 13.8385 2.24823 9.41628C2.24823 5.15908 5.69925 1.69569 9.9412 1.69569C14.1832 1.69569 17.6342 5.15908 17.6342 9.41623C17.6341 13.8387 12.7678 20.4837 9.9412 23.8535Z" fill="black" />
                                <path d="M9.93926 4.6344C7.32125 4.6344 5.19141 6.76426 5.19141 9.38223C5.19141 12.0002 7.3213 14.1301 9.93926 14.1301C12.5572 14.1301 14.6871 12.0002 14.6871 9.38223C14.6871 6.76426 12.5572 4.6344 9.93926 4.6344ZM9.93926 12.4307C8.25828 12.4307 6.89081 11.0632 6.89081 9.38223C6.89081 7.70128 8.25833 6.33377 9.93926 6.33377C11.6202 6.33377 12.9877 7.70128 12.9877 9.38223C12.9877 11.0632 11.6202 12.4307 9.93926 12.4307Z" fill="black" />
                            </svg>
                            <p className="w-full sm:w-1/3 text-lg font-semibold">Location</p>
                            <p className="w-full sm:w-2/3">: {profileDetails?.vendorDetails?.state}, {profileDetails?.vendorDetails?.country}</p>
                        </div>
                        <div className='flex items-start mb-2'>
                            <svg className='mr-3 mt-2' width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5975 11.4368C20.5975 13.2537 18.9659 14.7294 16.9627 14.7294H5.03738C3.03415 14.7294 1.40251 13.2537 1.40251 11.4368V4.56315C1.40206 3.97755 1.57524 3.40259 1.90396 2.89835L7.72276 8.1694C8.5933 8.9603 9.75907 9.3961 11.0013 9.3961C12.2409 9.3961 13.4067 8.9603 14.2772 8.1694L20.096 2.89835C20.4247 3.40258 20.5979 3.97755 20.5974 4.56315V11.4368H20.5975ZM16.9626 1.27049H5.03738C4.21013 1.27049 3.44648 1.5241 2.83559 1.94607L8.71294 7.27247C9.32132 7.82123 10.1333 8.12561 11.0013 8.12561C11.8667 8.12561 12.6787 7.82123 13.287 7.27247L19.1644 1.94607C18.5535 1.5241 17.7899 1.27049 16.9626 1.27049ZM16.9626 0H5.03738C2.26034 0 0 2.04756 0 4.56319V11.4368C0 13.9548 2.26034 16 5.03738 16H16.9626C19.7397 16 22 13.9548 22 11.4368V4.56315C22 2.04752 19.7397 0 16.9626 0Z" fill="black" />
                            </svg>

                            <h2 className="w-full sm:w-1/3 text-lg font-semibold">Email</h2>
                            <p className="w-full sm:w-2/3">: {profileDetails.email}</p>
                        </div>
                        <div className='flex items-start'>
                            <svg className='mr-3 mt-1' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1.28906C13.2406 1.28997 15.412 2.06545 17.1463 3.48411C18.8806 4.90278 20.0711 6.87739 20.5161 9.07336C20.9611 11.2693 20.6333 13.5516 19.5881 15.5336C18.5429 17.5155 16.8447 19.0751 14.7812 19.9482C12.408 20.9511 9.73363 20.9701 7.34639 20.0011C4.95914 19.0321 3.05461 17.1545 2.05176 14.7812C1.04891 12.408 1.02989 9.73363 1.99889 7.34639C2.96789 4.95914 4.84553 3.05461 7.21875 2.05176C8.41496 1.54554 9.70109 1.28613 11 1.28906ZM11 0C4.92508 0 0 4.92508 0 11C0 17.0749 4.92508 22 11 22C17.0749 22 22 17.0749 22 11C22 4.92508 17.0749 0 11 0Z" fill="black" />
                                <path d="M14.2094 16.9241C13.5705 16.8811 12.6699 16.6607 11.7907 16.3462C8.69097 15.2367 5.6664 12.2809 5.02359 8.14644C4.90929 7.41038 5.02961 6.73792 5.58734 6.1905C5.77425 6.00745 5.94054 5.80378 6.12316 5.61644C6.81066 4.90874 7.81527 4.8907 8.52726 5.57046C8.75285 5.78531 8.9823 5.99714 9.2023 6.21886C9.50356 6.51594 9.67798 6.9182 9.68896 7.34116C9.69994 7.76411 9.54661 8.17487 9.26117 8.48718C9.08929 8.67796 8.90882 8.85929 8.7275 9.04019C8.52941 9.23785 8.2832 9.35128 8.01894 9.43378C7.69281 9.53605 7.63222 9.67269 7.78047 9.98421C8.71718 11.9462 10.1834 13.3588 12.1792 14.2222C12.446 14.3374 12.5693 14.2854 12.6768 14.0207C12.9122 13.4402 13.3441 13.0169 13.8403 12.6749C14.4019 12.2882 15.2063 12.3741 15.7383 12.8313C16.0299 13.0819 16.3086 13.3473 16.5732 13.6262C16.8579 13.9308 17.016 14.3323 17.0156 14.7492C17.0152 15.1662 16.8563 15.5673 16.571 15.8714C16.4881 15.9616 16.4026 16.0497 16.3231 16.1425C15.8444 16.6989 15.2373 16.9593 14.2094 16.9241Z" fill="black" />
                            </svg>

                            <p className="w-full sm:w-1/3 text-lg font-semibold">Contact</p>
                            <p className="w-full sm:w-2/3">: {profileDetails.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-4">
                        <div className="sm:w-full md:w-1/2 lg:w-1/2  shadow-lg border rounded-md text-center">
                            <h3 className="mt-2 mb-2 text-blue-500 font-bold">Cloud Storage</h3>
                            {/* Circular Graph */}
                            <div className="flex items-center justify-between px-2 mb-4">
                                <div className='relative w-1/3 h-14'>
                                    <Doughnut options={options} data={data} />
                                    {/* <div className="absolute inset-0 flex flex-col justify-center items-center">
                                        <svg x="32%" y="25%" width="12" height="12" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.99164 3.44753C5.89574 4.04464 6.71253 4.32712 7.41351 4.26016C7.53597 6.84051 6.62152 8.36422 5.00101 9C3.43617 8.40493 2.51059 6.94675 2.57914 4.22109C3.40219 4.26606 4.20941 4.08066 4.99164 3.44753ZM7.02698 2.53803C6.96605 2.56937 6.90413 2.60417 6.8432 2.6406C6.66019 2.75253 6.47933 2.88909 6.29476 3.046L5.90082 2.57629C6.03675 2.44482 6.18402 2.32515 6.34027 2.21932C6.46468 2.13446 6.59495 2.05896 6.72933 1.99465C6.78304 1.96656 6.83675 1.94031 6.89202 1.91568C6.63245 1.43661 6.25882 1.09308 5.83578 0.881221C5.41254 0.669974 4.9389 0.588568 4.47758 0.635173C4.01937 0.681167 3.57426 0.854764 3.20649 1.15251C2.7809 1.49583 2.45766 2.00991 2.33325 2.69066L2.29418 2.90354L2.09067 2.94078C1.89126 2.97721 1.71313 3.02728 1.55688 3.09097C1.40551 3.15203 1.27036 3.22753 1.15239 3.31647C1.05805 3.3877 0.97661 3.46748 0.907469 3.55397C0.693408 3.82098 0.594189 4.15596 0.596533 4.49522C0.602392 5.32617 1.13637 5.97253 1.91254 6.08507H1.93598C1.97876 6.30222 2.02876 6.51021 2.08559 6.70925H1.90278L1.86528 6.70579C1.64809 6.67689 1.45102 6.62357 1.27212 6.54644C0.491455 6.20962 0.00610471 5.36891 5.00424e-05 4.49685C-0.00307495 4.01696 0.140089 3.53952 0.449463 3.15284C0.549463 3.02727 0.667431 2.91209 0.802392 2.81033C0.959618 2.69148 1.1395 2.59155 1.34282 2.50933C1.48286 2.45235 1.63266 2.40493 1.79047 2.36687C1.96938 1.62567 2.35122 1.05502 2.84184 0.658984C3.30082 0.288385 3.85336 0.0722534 4.42211 0.015473C4.98851 -0.0415109 5.57132 0.0586179 6.09456 0.32054C6.66488 0.606477 7.16292 1.08209 7.48616 1.75124C7.61624 1.72987 7.74651 1.71888 7.87581 1.72051C8.42268 1.72479 8.95003 1.9285 9.36506 2.39475C9.45217 2.49224 9.5344 2.60254 9.61174 2.72546C9.87209 3.14267 10.0055 3.69989 9.99983 4.2449C9.99416 4.78014 9.85569 5.31253 9.57248 5.7043C9.38791 5.9595 9.151 6.1681 8.86702 6.33356C8.60042 6.48884 8.29065 6.6081 7.94358 6.69398C8.00686 6.47297 8.06077 6.24178 8.10472 6.00021C8.2762 5.94139 8.43284 5.87158 8.57327 5.78998C8.78733 5.66543 8.96233 5.5136 9.09319 5.33126C9.2967 5.04878 9.3969 4.64948 9.401 4.23981C9.40588 3.80999 9.30491 3.37834 9.10881 3.06472C9.05478 2.97752 8.99348 2.89546 8.92561 2.81949C8.63186 2.48979 8.25921 2.3455 7.87171 2.34306C7.59261 2.34042 7.30218 2.41083 7.02698 2.53803ZM5.018 4.34645C5.62953 4.75022 6.18167 4.94132 6.65589 4.89614C6.73851 6.64066 6.12015 7.67105 5.02465 8.10108C5.01761 8.09843 5.01078 8.09579 5.00394 8.09294V4.35765L5.018 4.34645ZM4.99281 3.86677C5.78636 4.39102 6.50316 4.6389 7.11858 4.58029C7.15198 6.79371 6.38284 7.99464 5.00101 8.58056C3.66781 8.03412 2.86274 6.90971 2.87524 4.5459C3.5975 4.58538 4.30609 4.42257 4.99281 3.86677Z"
                                                fill="#2F4EFF"
                                            />
                                        </svg>
                                        <text className='text-xs text-blue-700' x="48%" y="70%" textAnchor="middle" dominantBaseline="middle" fill="#000">
                                            {totalStorage} GB
                                        </text>
                                    </div> */}
                                </div>


                                <div className="text-left w-2/3">
                                    <div className="flex items-center">
                                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                                        <p className="text-xs">Total {totalStorage} GB</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                        <p className="text-xs">Available Space {availableStorage} GB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='m-25 p-4 '>
                <div className="mb-4 sm:flex justify-between">
                    <div className="mb-2 sm:w-1/2 sm:mr-2">
                        <label htmlFor="vendorName" className="text-gray-700 font-semibold">Name</label>
                        <input
                            readOnly
                            type="text"
                            id="vendorName"
                            placeholder="Vendor Name"
                            className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none mt-2"
                            value={profileDetails.name}
                        />
                    </div>
                    <div className="mb-2 sm:w-1/2 relative">
                        <label htmlFor="contactNumber" className="text-gray-700 font-semibold">Date Of Birth</label>
                        <input type="text" id="contactNumber" placeholder="Contact Number" className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" value={formatDate(profileDetails?.vendorDetails?.dateOfBirth)} readOnly />
                    </div>
                </div>
                <div className="mb-4 sm:flex justify-between">
                    <div className="mb-2 sm:w-1/2 sm:mr-2">
                        <label htmlFor="email" className="text-gray-700 font-semibold">Phone</label>
                        <input readOnly type="text" id="email" placeholder="Email ID" className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none mt-2" value={profileDetails.phoneNumber} />
                    </div>
                    <div className="mb-2 sm:w-1/2 relative">
                        <label htmlFor="dob" className="text-gray-700 font-semibold">Email</label>
                        <div className="relative">
                            <input readOnly type="text" id="dob" placeholder="Date of Birth" className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full pr-8 focus:outline-none" value={profileDetails.email} />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="text-gray-700 font-semibold">Address</label>
                    <input readOnly type="text" id="address" placeholder="Address" className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" value={profileDetails?.vendorDetails?.address} />
                </div>
                <div className="mb-4 sm:flex justify-between">
                    <div className="mb-2 sm:w-1/2 sm:mr-2">
                        <label htmlFor="city" className="text-gray-700 font-semibold">State</label>
                        <input readOnly type="text" id="city" placeholder="City" className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" value={profileDetails?.vendorDetails?.state} />
                    </div>
                    <div className="mb-2 sm:w-1/2">
                        <label htmlFor="state" className="text-gray-700 font-semibold">Country</label>
                        <input readOnly type="text" id="state" placeholder="Country" className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" value={profileDetails?.vendorDetails?.country} />
                    </div>
                </div>
                <div className="sm:flex justify-between mb-4">
                    <div className="mb-2 sm:w-1/2 sm:mr-2">
                        <label htmlFor="country" className="text-gray-700 font-semibold">Postal Code</label>
                        <input readOnly type="text" id="country" placeholder="Post" className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" value={profileDetails?.vendorDetails?.postCode} />
                    </div>
                    <div className="sm:w-1/2">
                        <label htmlFor="postcode" className="text-gray-700 font-semibold">ID</label>
                        <input readOnly type="text" id="postcode" placeholder="Profile ID" className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" value={profileDetails?.vendorDetails?.profileId} />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="returnPolicy" className="text-gray-700 font-semibold">Return Policy</label>
                  
                    <textarea
                        style={{ resize: "none" }}
                        type="text"
                        placeholder="Return Policy"
                        className="mt-2 border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                        value={profileDetails?.returnPolicy}
                        onChange={(e) => {
                            setReturnPolicy(e.target.value);
                        }}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="text-gray-700 font-semibold">Bank Account</label>
                    <div className="border border-gray-300 rounded-md py-5 px-2 w-full">
                        <div className="flex justify-end">
                            <span className="text-gray-500 cursor-pointer" onClick={openModal}>Add</span>
                            <svg className='m-1 cursor-pointer' onClick={openModal} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8.5" cy="8.5" r="8.5" fill="#2F4EFF" />
                                <path d="M4 9H14M9 4V14" stroke="white" strokeLinecap="round" />
                            </svg>
                        </div>

                        {showModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
                                <div className="relative bg-white rounded-lg w-96">
                                    <svg onClick={closeModal} className="absolute top-0 right-0 m-5 cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z" stroke="black" stroke-width="1.25" stroke-linecap="round" />
                                    </svg>
                                    {/* <button className="absolute top-0 right-0 p-0" onClick={closeModal}>Close</button> */}
                                    <div className="p-6">
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
                                            isModal={true}
                                            onSave={saveBankDetails}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {profileDetails?.vendorDetails?.bankDetails.sort((a, b) => {
                            if (a.isPrimary && !b.isPrimary) {
                                return -1; // Primary bank should come before non-primary bank
                            }
                        }).map((account, index) => (
                            <div key={index} className="mt-4 border border-gray-300 rounded-md p-2">
                                <div className="flex items-center space-x-4">
                                    <img src='./bankIcon.png' alt={account.bankName} className="w-12 h-12" />
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold">{account.bankName}</p>
                                            <button className="text-blue-500 text-sm" onClick={() => openEditModal(account)}>Edit</button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600">{account.accountNumber}</p>
                                            {account.isPrimary && (
                                                <button className="font-semibold text-sm">Primary</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {showEditModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
                                <div className="relative bg-white rounded-lg w-96">
                                    <svg onClick={closeEditModal} className="absolute top-0 right-0 m-5 cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z" stroke="black" stroke-width="1.25" stroke-linecap="round" />
                                    </svg>
                                    <div className="p-6">
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
                                            isEditMode={true}
                                            onSave={editBankDetails}
                                            onMakePrimary={makeBankPrimary}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage