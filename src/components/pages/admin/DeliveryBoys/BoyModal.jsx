import React from 'react';
import { assignPickup } from "../../../../Api/ApiCall";
import { toast } from "react-toastify";

const BoyModal = ({ isOpen, onClose, deliveryBoys, selectedOrders, setSelectedBoy, selectedBoy, setReturnOrders }) => {
    // const [selectedBoy, setSelectedBoy] = useState(null);
    console.log("selectedOrders: ", selectedOrders)

    const orderAssign = async (deliveryBoyId) => {
        const assignments = selectedOrders.map(key => {
            console.log("key: ", key)
            const [orderId, productId, productSizeId] = key.split('_');
            return { orderId, productId, productSizeId };
        });

        const payload = {
            deliveryBoyId,
            assignments
        };
  
        try {
            const response = await assignPickup(payload);
            console.log('Orders assigned successfully', response);
            if (response.data) {
                setReturnOrders(prevOrders =>
                    prevOrders.filter(order => !selectedOrders.includes(`${order._id}_${order.productId}_${order.productSizeId}`))
                );
                toast.success(response.data.message);
                onClose();
            }
        } catch (error) {
            console.error('Failed to assign orders', error);
            toast.error(error.response.data.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 relative" style={{ maxHeight: '90vh' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold">Assign Pickup</h2>
                    <svg onClick={onClose} className="cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style>
                        {`
                            .space-y-4::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                    </style>
                    {deliveryBoys.map((boy) => (
                        <div
                            key={boy._id}
                            className={`flex items-center text-sm border p-4 rounded-md ml-4 flex-1 ${selectedBoy === boy._id ? 'border-blue-700' : 'border-gray-200'}`}
                            onClick={() => setSelectedBoy(boy._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="bg-gray-100 rounded-md flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                                {boy.profileImage ? (
                                    <img
                                        src={boy.profileImage}
                                        alt="Profile"
                                        className="object-cover rounded-md"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <img
                                        src={"/defaultProfile.png"}
                                        alt="Profile"
                                        className="object-cover rounded-md"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                )}
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium">{boy.name}</p>
                                <p className="text-sm">{boy.phoneNumber}</p>
                                <p className="text-sm">{boy.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => orderAssign(selectedBoy)}
                        className={`text-white px-4 py-2 rounded-md ${selectedBoy ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!selectedBoy}
                    >
                        Assign Pickups
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoyModal;

