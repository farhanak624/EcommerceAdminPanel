import React, { useState } from 'react';
import { assignOrders } from "../../../../Api/ApiCall";
import { toast } from "react-toastify";

const AssignOrdersModal = ({ isOpen, onClose, orders, deliveryBoyId, setDeliveryBoyId }) => {
    const [selectedOrders, setSelectedOrders] = useState([]);

    const handleCheckboxChange = (orderId, productId, productSizeId) => {
        const orderKey = `${orderId}_${productId}_${productSizeId}`;
        console.log("orderKey: ", orderKey);
        setSelectedOrders((prevSelectedOrders) =>
            prevSelectedOrders.includes(orderKey)
                ? prevSelectedOrders.filter((key) => key !== orderKey)
                : [...prevSelectedOrders, orderKey]
        );
    };

    const orderAssign = async (e) => {
        e.preventDefault();
        const assignments = selectedOrders.map(key => {
            const [orderId, productId, productSizeId] = key.split('_');
            return { orderId, productId, productSizeId };
        });

        const payload = {
            deliveryBoyId,
            assignments
        };

        try {
            const response = await assignOrders(payload);
            console.log('Orders assigned successfully', response);
            toast.success(response.data.message);
            setDeliveryBoyId('')
            onClose();
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
                    <h2 className="font-bold">Assign Orders</h2>
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
                    {orders.map((order) => (
                        <div key={`${order._id}_${order.productId}`} className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                className="custom-checkbox rounded-full h-5 w-5 text-blue-600"
                                checked={selectedOrders.includes(`${order._id}_${order.productId}_${order.productSizeId}`)}
                                onChange={() => handleCheckboxChange(order._id, order.productId, order.productSizeId)}
                            />
                            <div className="flex items-center border p-4 rounded-md ml-4 flex-1">
                                <div className="bg-gray-100 rounded-md flex items-center justify-center">
                                    <svg width="74" height="62" viewBox="0 0 74 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.6">
                                            <rect width="74" height="61.7938" rx="10" fill="#EFEFEF" />
                                        </g>
                                        <path d="M31.622 48.8234C31.0151 48.8258 30.432 48.587 30.001 48.1595C29.5701 47.7321 29.3267 47.1509 29.3242 46.5439C29.3218 45.9369 29.5606 45.3538 29.9881 44.9229C30.4156 44.492 30.9967 44.2485 31.6037 44.2461H31.622C32.229 44.2461 32.8112 44.4872 33.2404 44.9164C33.6696 45.3456 33.9107 45.9278 33.9107 46.5347C33.9107 47.1417 33.6696 47.7239 33.2404 48.1531C32.8112 48.5823 32.229 48.8234 31.622 48.8234Z" fill="#396CE8" />
                                        <path d="M46.2666 48.8234C45.6596 48.8258 45.0765 48.587 44.6456 48.1595C44.2147 47.7321 43.9712 47.1509 43.9688 46.5439C43.9663 45.9369 44.2051 45.3538 44.6326 44.9229C45.0601 44.492 45.6413 44.2485 46.2483 44.2461H46.2666C46.8736 44.2461 47.4557 44.4872 47.8849 44.9164C48.3141 45.3456 48.5552 45.9278 48.5552 46.5347C48.5552 47.1417 48.3141 47.7239 47.8849 48.1531C47.4557 48.5823 46.8736 48.8234 46.2666 48.8234Z" fill="#396CE8" />
                                        <path opacity="0.4" d="M49.8924 19.0711H27.8133L27.4307 16.5335C27.2682 15.3294 26.6726 14.2258 25.7553 13.4292C24.838 12.6325 23.6618 12.1974 22.4469 12.2052H21.9708C21.6067 12.2052 21.2574 12.3499 20.9999 12.6074C20.7423 12.8649 20.5977 13.2142 20.5977 13.5784C20.5977 13.9426 20.7423 14.2918 20.9999 14.5494C21.2574 14.8069 21.6067 14.9516 21.9708 14.9516H22.4469C23.0015 14.9487 23.538 15.1484 23.9557 15.5132C24.3734 15.878 24.6436 16.3827 24.7154 16.9326L27.4636 36.0621C27.5849 36.9367 28.0191 37.7376 28.6856 38.3166C29.3522 38.8956 30.2059 39.2135 31.0888 39.2113H46.2306C46.8872 39.3072 47.5566 39.2636 48.1953 39.0834C48.8339 38.9032 49.4274 38.5904 49.937 38.1654C50.4466 37.7404 50.8609 37.2128 51.153 36.617C51.445 36.0211 51.6082 35.3704 51.6318 34.7072L53.481 23.3921C53.5775 22.8653 53.5571 22.3237 53.4215 21.8056C53.2859 21.2875 53.0382 20.8054 52.696 20.3934C52.3539 19.9814 51.9255 19.6495 51.441 19.421C50.9566 19.1925 50.428 19.0731 49.8924 19.0711Z" fill="#396CE8" />
                                        <path d="M37.6455 32.9545C37.2812 32.9548 36.9316 32.8106 36.6733 32.5536L34.2327 30.1111C33.9827 29.852 33.8444 29.5051 33.8477 29.145C33.851 28.785 33.9956 28.4406 34.2503 28.1861C34.505 27.9317 34.8495 27.7874 35.2096 27.7845C35.5696 27.7815 35.9164 27.9201 36.1753 28.1703L37.64 29.6351L41.5509 25.7242C41.8097 25.4659 42.1606 25.3209 42.5262 25.3213C42.8919 25.3216 43.2425 25.4672 43.5008 25.7261C43.7592 25.9849 43.9041 26.3357 43.9037 26.7014C43.9034 27.0671 43.7578 27.4176 43.499 27.676L38.6159 32.5536C38.3581 32.8102 38.0093 32.9543 37.6455 32.9545Z" fill="#396CE8" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium">#{order._id.slice(-5)}</p>
                                    <p className="text-sm">{order.user}</p>
                                    <p className="text-sm">{order.phone}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                    <button onClick={orderAssign} className="text-white px-4 py-2 rounded-md" style={{ backgroundColor: "#2F4EFF" }}>
                        Assign Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignOrdersModal;
