import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Modal({ setModalOpen }) {
  const navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-80 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* modal header */}
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold text-center w-full">Confirm</h5>
          <button
            className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
            onClick={() => setModalOpen(false)}
          >
            <RiCloseLine size={24} />
          </button>
        </div>
        {/* modal content */}
        <div className="text-center mb-4">
          Are you sure you want to log out?
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              setModalOpen(false);
              localStorage.clear();
              navigate("./signin");
            }}
          >
            Log Out
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
