import React, { useState } from 'react';

const CommissionModal = ({ isOpen, onClose, onConfirm }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [newCommission, setNewCommission] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (selectedOption && newCommission) {
            onConfirm({ option: selectedOption, commission: newCommission });
            onClose();
            setSelectedOption('')
            setNewCommission('')
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md relative w-80">
                <button className="absolute top-2 right-2 text-gray-700" onClick={onClose}>X</button>
                <h2 className="text-lg font-bold mb-4">Change Commission</h2>
                <p>Change commission for this product or change commission for all the products of this vendor?</p>
                <div className="mt-4">
                    <label className="block">
                        <input
                            type="radio"
                            value="single"
                            checked={selectedOption === 'single'}
                            onChange={() => setSelectedOption('single')}
                        />
                        <span className="ml-2">This product</span>
                    </label>
                    <label className="block mt-2">
                        <input
                            type="radio"
                            value="all"
                            checked={selectedOption === 'all'}
                            onChange={() => setSelectedOption('all')}
                        />
                        <span className="ml-2">All products</span>
                    </label>
                </div>
                {selectedOption && (
                    <div className="mt-4">
                        <label className="block">
                            <span className="block text-gray-700">New Commission</span>
                            <input
                                type="number"
                                value={newCommission}
                                onChange={(e) => setNewCommission(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter new commission"
                            />
                        </label>
                    </div>
                )}
                <div className="mt-4 flex justify-end">
                    <button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded" onClick={onClose}>Cancel</button>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
                        onClick={handleConfirm}
                        disabled={!newCommission}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommissionModal;
