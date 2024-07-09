import React, { useEffect, useRef } from 'react';

const ImageModal = ({ imageUrl, isOpen, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white p-4 rounded-md relative flex items-center justify-center"
                style={{ width: '70%', maxWidth: '800px', height: '70%', maxHeight: '600px' }}
            >
                {/* <button className="absolute top-2 right-2 text-gray-700" onClick={onClose}>X</button> */}
                <img
                    src={imageUrl}
                    alt="Large view"
                    className="w-full h-full object-contain"
                    style={{ maxWidth: '90%', maxHeight: '90%' }}
                />
            </div>
        </div>
    );
};

export default ImageModal;
