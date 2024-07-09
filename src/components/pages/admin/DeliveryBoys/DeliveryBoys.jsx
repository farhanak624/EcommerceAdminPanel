import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { getDeliveryBoysAdmin, actionOnDeliveryBoy, addNewDeliveryBoy, editDeliveryBoy, getOrderForAssigning, getAssignedOrdersAdmin, getReturnOrdersAdmin } from "../../../../Api/ApiCall";
import { toast } from "react-toastify";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";
import { uploadImageV2 } from "../../../imageUpload";
import DeliveryBoyModal from "./DeliveryBoyModal"
import AssignOrdersModal from './AssignOrdersModal';
import BoyModal from "./BoyModal";
import Loading from "../../../LodingDiv/LoaderSmall";

const DeliveryBoys = () => {
    const [selectedTab, setSelectedTab] = useState("Delivery Boys");
    const [returnOrderTab, setReturnOrderTab] = useState("ToAssign");
    const [deliveryBoys, setDeliveryBoys] = useState([]);
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [returnOrders, setReturnOrders] = useState([]);
    const [orders, setOrders] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [boyId, setBoyId] = useState('');
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [profileImageError, setProfileImageError] = useState("");
    const [loading, setLoading] = useState(false)
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [deliveryBoyId, setDeliveryBoyId] = useState("");
    const [loadingButtonId, setLoadingButtonId] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [boyModalOpen, setBoyModalOpen] = useState(false);
    const [selectedBoy, setSelectedBoy] = useState('');


    const dispatch = useDispatch();

    useEffect(() => {
        loadData(selectedTab);
    }, [selectedTab, returnOrderTab]);

    const loadData = async (tab) => {
        dispatch(loadSpinner());

        try {
            if (tab === "Delivery Boys") {
                const data = await getDeliveryBoysAdmin();
                setDeliveryBoys(data?.data?.deliveryBoys || []);
            } else if (tab === "Assigned Orders") {
                const data = await getAssignedOrdersAdmin();
                console.log("data?.data?.assignedOrders: ", data?.data?.assignedOrders)
                setAssignedOrders(data?.data?.assignedOrders || []);
            } else if (tab === "Return Orders") {
                const data = await getReturnOrdersAdmin(returnOrderTab);
                setReturnOrders(data?.data?.returnOrders || []);
                console.log("returned orders: ", returnOrders)
            }
        } catch (err) {
            toast("something went wrong");
            console.log(err);
        } finally {
            dispatch(loadSpinner());
        }
    };

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    const handleReturnOrderTabClick = (tabName) => {
        setReturnOrderTab(tabName);
    };

    const getDisplayValue = (value) => {
        return value != undefined || value != null || value === "" ? value : "N/A";
    };

    const getColorClass = (status) => {
        switch (status) {
            case 'Picked':
            case 'Picked From User':
                return 'text-light-blue';
            case 'Shipped':
            case 'In Transit':
                return 'text-dark-blue';
            case 'Out For Delivery':
                return 'text-light-green';
            case 'Delivered':
            case 'Returned':
                return 'text-dark-green';
            case 'Placed':
            case 'Waiting For Pickup':
                return 'text-dark-yellow';
            default:
                return '';
        }
    };

    const handleToggleBlock = (id) => {
        const deliveryBoy = deliveryBoys.find((v) => v._id === id);
        const action = deliveryBoy.isBlock ? "unblock" : "block";

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${action} this delivery boy?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${action} it!`,
        }).then((result) => {
            if (result.isConfirmed) {
                actionOnDeliveryBoy(id)
                    .then((data) => {
                        console.log("data in actionOnDeliveryBoy: ", data);
                        setDeliveryBoys((prevBoys) =>
                            prevBoys.map((boy) =>
                                boy._id === id
                                    ? {
                                        ...boy,
                                        isBlock: !boy.isBlock,
                                    }
                                    : boy
                            )
                        );
                        Swal.fire(
                            `${action.charAt(0).toUpperCase() + action.slice(1)}ed!`,
                            `Delivery boy has been ${action}ed.`,
                            "success"
                        );
                    })
                    .catch((error) => {
                        console.error("Error updating blocking status:", error);
                        Swal.fire("Failed!", `Failed to ${action} the Delivery boy.`, "error");
                    });
            }
        });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setLoading(false)
        setNameError("");
        setEmailError("");
        setPhoneNumberError("");
        setPasswordError("");
        setProfileImageError("")
        setBoyId('')
        setName('')
        setProfileImage('')
        setEmail('')
        setPhoneNumber('')
        setPassword('')
        setShowModal(false);
    };

    const openEditModal = (boyDetails) => {
        setBoyId(boyDetails._id)
        setProfileImage(boyDetails.profileImage)
        setName(boyDetails.name)
        setEmail(boyDetails.email)
        setPhoneNumber(boyDetails.phoneNumber)
        setPassword(boyDetails.password)
        setShowEditModal(true)
    };

    const closeEditModal = () => {
        setLoading(false)
        setNameError("");
        setEmailError("");
        setPhoneNumberError("");
        setPasswordError("");
        setProfileImageError("")
        setBoyId('')
        setName('')
        setEmail('')
        setPhoneNumber('')
        setPassword('')
        setProfileImage('')
        setShowEditModal(false);
    };

    const saveDeliveryBoyDetails = async (e) => {
        e.preventDefault();

        setNameError("");
        setEmailError("");
        setPhoneNumberError("");
        setPasswordError("");
        setProfileImageError("")

        setNameError(prevNameError => {
            if (!name.trim()) {
                return "Name is required";
            }
            return prevNameError;
        });
        setEmailError(prevEError => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || email.trim() === '' || !emailRegex.test(email)) {
                return 'Valid email is required';
            }
            return prevEError;
        });
        setPhoneNumberError(prevPhoneError => {
            if (!phoneNumber.trim()) {
                return "Phone Number is required";
            }
            return prevPhoneError;
        });
        setPasswordError(prevPasswordError => {
            if (!password.trim()) {
                return "Password is Required";
            }
            return prevPasswordError;
        });
        setProfileImageError(prevProfileError => {
            if (!profileImage) {
                return "Profile Image is Required";
            }
            return prevProfileError;
        });


        if (!name.trim() || !email.trim() || !phoneNumber.trim() || !password.trim() || !profileImage) {
            // If any of the fields are empty, return early without saving the boy details
            return;
        }

        if (!nameError && !emailError && !phoneNumberError && !passwordError && !profileImageError) {
            try {
                setLoading(true)
                const profileImageResponse = await uploadImageV2(profileImage);

                const response = await addNewDeliveryBoy({ name, email, phoneNumber, password, profileImage: profileImageResponse.images[0].imageUrl })
                console.log("response adding new boy: ", response)
                if (response.data.message) {
                    setLoading(false)
                    setName("");
                    setProfileImage("");
                    setEmail("");
                    setPhoneNumber("");
                    setPassword("");

                    getDeliveryBoysAdmin().then((data) => {
                        const profileData = data.data.deliveryBoys;
                        setDeliveryBoys(profileData);
                    }).catch((error) => {
                        setLoading(false)
                        console.log(error);
                    });

                    setShowModal(false)
                    setNameError("");
                    setEmailError("");
                    setProfileImageError("");
                    setPhoneNumberError("");
                    setPasswordError("");
                    toast.success("New Delivery Boy details added successfully");
                }
            } catch (err) {
                setLoading(false)
                console.log("error in adding delivery Boy: ", err)
                toast.error(err.response.data.message);
            }
        }
    }

    const editDeliveryBoyDetails = async (e) => {
        e.preventDefault();
        console.log("profileImage: ", profileImage)
        setNameError("");
        setEmailError("");
        setPhoneNumberError("");
        setPasswordError("");
        setProfileImageError("")


        setNameError(prevNameError => {
            if (!name.trim()) {
                return "Name is required";
            }
            return prevNameError;
        });
        setEmailError(prevEError => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || email.trim() === '' || !emailRegex.test(email)) {
                return 'Valid email is required';
            }
            return prevEError;
        });
        setPhoneNumberError(prevPhoneError => {
            if (!phoneNumber.trim()) {
                return "Phone Number is required";
            }
            return prevPhoneError;
        });
        setPasswordError(prevPasswordError => {
            if (!password.trim()) {
                return "Password is Required";
            }
            return prevPasswordError;
        });
        setProfileImageError(prevProfileError => {
            if (!profileImage) {
                return "Profile Image is Required";
            }
            return prevProfileError;
        });

        if (!name.trim() || !email.trim() || !phoneNumber.trim() || !password.trim() || !profileImage) {
            return;
        }

        try {
            setLoading(true)
            let profileImageUrl = profileImage;

            if (profileImage instanceof File) {
                const profileImageResponse = await uploadImageV2(profileImage);
                profileImageUrl = profileImageResponse.images[0].imageUrl;
            }

            const response = await editDeliveryBoy({
                boyId,
                name,
                email,
                profileImage: profileImageUrl,
                password
            });

            console.log("response editing Boy: ", response)
            if (response.data.message) {
                setLoading(false)
                setName("");
                setProfileImage("");
                setEmail("");
                setPhoneNumber("");
                setPassword("");

                getDeliveryBoysAdmin().then((data) => {
                    const profileData = data.data.deliveryBoys;
                    setDeliveryBoys(profileData);
                }).catch((error) => {
                    setLoading(false)
                    console.log(error);
                });

                setShowEditModal(false);
                setNameError("");
                setEmailError("");
                setProfileImageError("");
                setPhoneNumberError("");
                setPasswordError("");
                toast.success("Delivery Boy details updated");
            }
        } catch (err) {
            setLoading(false)
            console.log("error in editing delivery boy: ", err)
            toast.error(err.response.data.message);
        }
    }

    const getOrders = async (id) => {
        setLoadingButtonId(id);
        setDeliveryBoyId(id)
        getOrderForAssigning().then((data) => {
            console.log("data:", data)
            setOrders(data?.data?.orders);
            setIsAssignModalOpen(true)
            setLoadingButtonId('');
        })
            .catch((err) => {
                toast("something wrong");
                setLoadingButtonId('');
                console.log(err);
            })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleCheckboxChange = (orderId, productId, productSizeId) => {
        const orderKey = `${orderId}_${productId}_${productSizeId}`;
        console.log("orderKey: ", orderKey);
        setSelectedOrders((prevSelectedOrders) =>
            prevSelectedOrders.includes(orderKey)
                ? prevSelectedOrders.filter((key) => key !== orderKey)
                : [...prevSelectedOrders, orderKey]
        );
    };

    const handleSingleAssign = (order) => {
        const orderKey = `${order._id}_${order.productId}_${order.productSizeId}`;
        setBoyModalOpen(true)
        setSelectedOrders([orderKey])
    }

    const handleAssignPickup = (orders) => {
        console.log("Assigning pickup for orders: ", orders);
        setBoyModalOpen(true);
    };

    const anyCheckboxChecked = selectedOrders.length > 0;


    return (
        <div className="relative">
            <h1 className="font-bold">Delivery Boys</h1>

            <div
                className="bg-containerWhite mt-5 rounded-lg shadow-md overflow-x-auto p-4"
                style={{ scrollbarWidth: "none" }}
            >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex">
                        <button
                            className={`text-sm px-5 py-1 rounded-l-md ${selectedTab === "Delivery Boys" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
                                }`}
                            onClick={() => handleTabClick("Delivery Boys")}
                        >
                            Delivery Boys
                        </button>
                        <button
                            className={`text-sm px-5 py-1 ${selectedTab === "Assigned Orders" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
                                }`}
                            onClick={() => handleTabClick("Assigned Orders")}
                        >
                            Assigned Orders
                        </button>
                        <button
                            className={`text-sm px-5 py-1 rounded-r-md ${selectedTab === "Return Orders" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
                                }`}
                            onClick={() => handleTabClick("Return Orders")}
                        >
                            Return Orders
                        </button>
                    </div>

                    <button
                        className="px-2 py-2 font-semibold flex max-w-44 gap-3 rounded-md shadow-sm items-center"
                        style={{ backgroundColor: "rgba(47, 78, 255, 0.06)" }}
                        onClick={openModal}
                    >
                        Add Delivery Boy
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 0C3.58185 0 0 3.58185 0 8C0 12.4182 3.58185 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58185 12.4182 0 8 0ZM8 15.3846C3.92154 15.3846 0.615385 12.0785 0.615385 8C0.615385 3.92154 3.92154 0.615385 8 0.615385C12.0785 0.615385 15.3846 3.92154 15.3846 8C15.3846 12.0785 12.0785 15.3846 8 15.3846Z"
                                fill="black"
                            />
                            <path
                                d="M13.0811 7.69261H8.3119V2.92338C8.3119 2.83845 8.24298 2.76953 8.15805 2.76953H7.85036C7.76544 2.76953 7.69652 2.83845 7.69652 2.92338V7.69261H2.92728C2.84236 7.69261 2.77344 7.76153 2.77344 7.84646V8.15415C2.77344 8.23907 2.84236 8.30799 2.92728 8.30799H7.69652V13.0772C7.69652 13.1618 7.76544 13.2311 7.85036 13.2311H8.15805C8.24298 13.2311 8.3119 13.1618 8.3119 13.0772V8.30799H13.0811C13.1657 8.30799 13.235 8.23907 13.235 8.15415V7.84646C13.235 7.76153 13.1657 7.69261 13.0811 7.69261Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                </div>

                {selectedTab === "Return Orders" && (
                    <div className="flex mt-2">
                        <button
                            className={`text-sm px-5 py-1 ${returnOrderTab === "ToAssign" ? "font-bold" : "font-normal text-gray-500"}`}
                            onClick={() => handleReturnOrderTabClick("ToAssign")}
                        >
                            Assign Pickup
                        </button>
                        <button
                            className={`text-sm px-5 py-1 ${returnOrderTab === "Completed" ? "font-bold" : "font-normal text-gray-500"}`}
                            onClick={() => handleReturnOrderTabClick("Completed")}
                        >
                            Assigned Pickups
                        </button>
                    </div>
                )}

                {selectedTab === "Delivery Boys" && (
                    <table className="min-w-[100vh] w-full text-center leading-normal mt-5">
                        <thead style={{ backgroundColor: "rgba(242, 242, 242, 1)", height: "50px" }}>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Phone Number</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Email</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Status</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Action</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Assign Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryBoys.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-black text-center py-3">No data available</td>
                                </tr>
                            ) : (
                                deliveryBoys?.map((boy, index) => (
                                    <tr key={index} className="" style={{ height: "50px" }}>

                                        <td className="text-sm text-center py-3" >
                                            <div className="flex flex-col items-center md:flex-row sm:items-center">
                                                <img
                                                    src={
                                                        boy?.profileImage
                                                            ? boy.profileImage
                                                            : "/defaultProfile.png"
                                                    }
                                                    className="m-2 w-7 h-7 mr-2 rounded-full"
                                                    alt="boy Profile"
                                                />
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    {getDisplayValue(boy.name)}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    {getDisplayValue(boy.phoneNumber)}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm">
                                                    {getDisplayValue(boy.email)}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    {boy.isBlock ? "In Active" : "Active"}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <svg width="70" height="29" viewBox="0 0 70 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="70" height="29" rx="5" fill="#F2F2F2" />
                                                    <g onClick={() => openEditModal(boy)}>
                                                        <rect x="0" y="0" width="35" height="29" fill="transparent" />
                                                        <path d="M25.0229 16.12C24.8437 16.12 24.6985 16.2652 24.6985 16.4443V19.3239C24.6979 19.8611 24.2626 20.2964 23.7252 20.2969H14.6221C14.0848 20.2964 13.6495 19.8611 13.6489 19.3239V10.8726C13.6495 10.3355 14.0848 9.90024 14.6221 9.89961H17.5027C17.6819 9.89961 17.8271 9.75443 17.8271 9.57529C17.8271 9.39629 17.6819 9.25098 17.5027 9.25098H14.6221C13.7267 9.25199 13.001 9.97739 13 10.8726V19.324C13.001 20.2192 13.7267 20.9446 14.6221 20.9456H23.7252C24.6207 20.9446 25.3464 20.2192 25.3474 19.324V16.4443C25.3474 16.2652 25.2021 16.12 25.0229 16.12Z" fill="black" />
                                                        <path d="M25.1915 8.42768C24.6212 7.85744 23.6966 7.85744 23.1263 8.42768L17.3369 14.2166C17.2972 14.2563 17.2686 14.3054 17.2536 14.3594L16.4923 17.1077C16.461 17.2204 16.4928 17.3411 16.5755 17.4239C16.6582 17.5065 16.7789 17.5383 16.8916 17.5071L19.6402 16.7457C19.6942 16.7308 19.7433 16.7021 19.783 16.6625L25.5723 10.8734C26.1417 10.3028 26.1417 9.37907 25.5723 8.80844L25.1915 8.42768ZM18.044 14.4275L22.7822 9.6896L24.3103 11.2176L19.572 15.9555L18.044 14.4275ZM17.7387 15.04L18.9596 16.2608L17.2709 16.7286L17.7387 15.04ZM25.1134 10.4146L24.7693 10.7587L23.2411 9.23064L23.5853 8.88652C23.9021 8.56977 24.4157 8.56977 24.7325 8.88652L25.1134 9.26727C25.4297 9.5844 25.4297 10.0976 25.1134 10.4146Z" fill="black" />
                                                    </g>
                                                    <g onClick={() => handleToggleBlock(boy._id)}>
                                                        <rect x="35" y="0" width="35" height="29" fill="transparent" />
                                                        <path d="M51 21C49.8133 21 48.6533 20.6481 47.6666 19.9888C46.6799 19.3295 45.9109 18.3925 45.4567 17.2961C45.0026 16.1998 44.8838 14.9933 45.1153 13.8295C45.3468 12.6656 45.9182 11.5965 46.7574 10.7574C47.5965 9.91825 48.6656 9.3468 49.8295 9.11529C50.9933 8.88378 52.1998 9.0026 53.2961 9.45673C54.3925 9.91085 55.3295 10.6799 55.9888 11.6666C56.6481 12.6533 57 13.8133 57 15C56.9983 16.5908 56.3656 18.1159 55.2407 19.2407C54.1159 20.3656 52.5908 20.9983 51 21ZM47.2128 12.06C46.5549 12.8986 46.1982 13.9341 46.2 15C46.2014 16.2726 46.7076 17.4927 47.6075 18.3925C48.5073 19.2924 49.7274 19.7986 51 19.8C52.066 19.8026 53.1018 19.4458 53.94 18.7872L47.2128 12.06ZM51 10.2C49.9341 10.198 48.8985 10.5547 48.06 11.2128L54.7872 17.94C55.4452 17.1014 55.802 16.0659 55.8 15C55.7986 13.7274 55.2924 12.5073 54.3925 11.6075C53.4927 10.7076 52.2726 10.2014 51 10.2Z" fill="#F85949" />
                                                    </g>
                                                    <path opacity="0.4" d="M35 6L35 23" stroke="black" stroke-width="0.6" stroke-linecap="round" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="flex justify-center">
                                                <button
                                                    className={`px-2 py-1 rounded-md text-white bg-blue-600`}
                                                    onClick={() => getOrders(boy._id)}
                                                >
                                                    {loadingButtonId === boy._id ? (
                                                        <Loading />
                                                    ) : (
                                                        'Assign'
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}

                {selectedTab === "Assigned Orders" && (
                    <table className="min-w-[100vh] w-full text-center leading-normal mt-5">
                        <thead style={{ backgroundColor: "rgba(242, 242, 242, 1)", height: "50px" }}>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Order ID</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Customer</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Status</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Delivery Boy</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-black text-center py-3">No data available</td>
                                </tr>
                            ) : (
                                assignedOrders.map((order, index) => (
                                    <tr key={index} className="" style={{ height: "50px" }}>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    #{getDisplayValue(order.orderId).slice(-5)}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    {getDisplayValue(order.customer)}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    {getDisplayValue(order.phone)}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center">
                                                <span className={`sm:ml-2 sm:mt-0 text-sm capitalize ${getColorClass(order.status)}`}>
                                                    {getDisplayValue(order.status)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    {getDisplayValue(order.status)}
                                                </span>
                                            </div>
                                        </td> */}

                                        <td>
                                            <div className="flex justify-center">
                                                <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                    {getDisplayValue(order.deliveryBoy)}
                                                </span>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}

                {selectedTab === "Return Orders" && (
                    <>
                        {returnOrderTab === "ToAssign" && (
                            <>
                                <table className="min-w-[100vh] w-full text-center leading-normal mt-5">
                                    <thead style={{ backgroundColor: "rgba(242, 242, 242, 1)", height: "50px" }}>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Order ID</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Customer</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Return Reason</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Return Date</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {returnOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-black text-center py-3">No data available</td>
                                            </tr>
                                        ) : (
                                            returnOrders.map((order, index) => (
                                                <tr key={index} className="" style={{ height: "50px" }}>

                                                    <td>
                                                        <div className="flex justify-center">
                                                            <input
                                                                type="checkbox"
                                                                className="h-5 w-5 text-blue-600"
                                                                checked={selectedOrders.includes(`${order._id}_${order.productId}_${order.productSizeId}`)}
                                                                onChange={() => handleCheckboxChange(order._id, order.productId, order.productSizeId)}
                                                            />
                                                            <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                                #{getDisplayValue(order._id).slice(-5)}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="flex justify-center">
                                                            <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                                {getDisplayValue(order.user)}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="flex justify-center">
                                                            <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                                {getDisplayValue(order.reasonOfReturn)}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="flex justify-center">
                                                            <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                                {formatDate(getDisplayValue(order.returnDate))}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <button
                                                            className={`px-2 py-1 rounded-md text-white bg-blue-600`}
                                                            onClick={() => handleSingleAssign(order)}
                                                        >
                                                            Assign
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                                {anyCheckboxChecked && (
                                    <div className="flex justify-end mt-5">
                                        <button
                                            className="px-4 py-2 rounded-md text-white bg-blue-600"
                                            onClick={() => handleAssignPickup(selectedOrders)}
                                        >
                                            Assign Pickup
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {returnOrderTab === "Completed" && (
                            <table className="min-w-[100vh] w-full text-center leading-normal mt-5">
                                <thead style={{ backgroundColor: "rgba(242, 242, 242, 1)", height: "50px" }}>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Order ID</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Customer</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Return Reason</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Return Date</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">status</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-bold capitalize tracking-wider">Assigned Delivery Boy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {returnOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-black text-center py-3">No data available</td>
                                        </tr>
                                    ) : (
                                        returnOrders.map((order, index) => (
                                            <tr key={index} className="" style={{ height: "50px" }}>

                                                <td>
                                                    <div className="flex justify-center">
                                                        <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                            #{getDisplayValue(order._id).slice(-5)}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="flex justify-center">
                                                        <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                            {getDisplayValue(order.user)}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="flex justify-center">
                                                        <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                            {getDisplayValue(order.reasonOfReturn)}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="flex justify-center">
                                                        <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                            {formatDate(getDisplayValue(order.returnDate))}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="flex justify-center">
                                                        <span className={`sm:ml-2 sm:mt-0 text-sm text-transform: capitalize ${getColorClass(order.returnStatus)}`}>
                                                            {getDisplayValue(order.returnStatus)}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="flex flex-col justify-center items-center md:flex-row sm:items-center">
                                                        <img
                                                            src={
                                                                order?.deliveryBoyImage
                                                                    ? order.deliveryBoyImage
                                                                    : "/defaultProfile.png"
                                                            }
                                                            className="m-2 w-7 h-7 mr-2 rounded-full"
                                                            alt="boy Profile"
                                                        />
                                                        <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                                                            {getDisplayValue(order?.deliveryBoyName)}
                                                        </span>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </>
                )}

            </div>

            {showModal && (
                <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="relative bg-white rounded-lg w-96">
                        <svg onClick={closeModal} className="absolute top-0 right-0 m-5 cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z" stroke="black" stroke-width="1.25" stroke-linecap="round" />
                        </svg>
                        {/* <button className="absolute top-0 right-0 p-0" onClick={closeModal}>Close</button> */}
                        <div className="p-6">
                            <DeliveryBoyModal
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                                password={password}
                                setPassword={setPassword}
                                profileImage={profileImage}
                                setProfileImage={setProfileImage}
                                profileImageError={profileImageError}
                                nameError={nameError}
                                emailError={emailError}
                                phoneNumberError={phoneNumberError}
                                passwordError={passwordError}
                                onSave={saveDeliveryBoyDetails}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="relative bg-white rounded-lg w-96">
                        <svg onClick={closeEditModal} className="absolute top-0 right-0 m-5 cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z" stroke="black" stroke-width="1.25" stroke-linecap="round" />
                        </svg>
                        <div className="p-6">
                            <DeliveryBoyModal
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                                password={password}
                                setPassword={setPassword}
                                profileImage={profileImage}
                                setProfileImage={setProfileImage}
                                profileImageError={profileImageError}
                                nameError={nameError}
                                emailError={emailError}
                                phoneNumberError={phoneNumberError}
                                passwordError={passwordError}
                                isEditMode={true}
                                onSave={editDeliveryBoyDetails}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            )}

            <AssignOrdersModal
                isOpen={isAssignModalOpen}
                onClose={() => { setIsAssignModalOpen(false); setSelectedOrders([]); }}
                orders={orders}
                deliveryBoyId={deliveryBoyId}
                setDeliveryBoyId={setDeliveryBoyId}
            />

            <BoyModal
                isOpen={boyModalOpen}
                onClose={() => { setBoyModalOpen(false); setSelectedOrders([]); setSelectedBoy('') }}
                deliveryBoys={deliveryBoys}
                selectedOrders={selectedOrders}
                setSelectedBoy={setSelectedBoy}
                selectedBoy={selectedBoy}
                setReturnOrders={setReturnOrders}
            />

        </div>
    );
};

export default DeliveryBoys;
