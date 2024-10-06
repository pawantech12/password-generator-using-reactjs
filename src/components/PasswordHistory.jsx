// src/PasswordHistory.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";

const PasswordHistory = () => {
  const location = useLocation();
  const { history } = location.state || { history: [] };
  const [copyStatus, setCopyStatus] = useState("");

  const copyToClipboard = (pwd) => {
    navigator.clipboard.writeText(pwd);
    setCopyStatus("Copied!");
    setTimeout(() => {
      setCopyStatus("");
    }, 2000); // Reset the message after 2 seconds
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-400">
      <div className="w-[400px] mx-auto p-6 bg-custom-dark-blue rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Password History
        </h2>
        {history?.length === 0 ? (
          <p className="text-gray-300">No password history available.</p>
        ) : (
          <ul>
            {history?.map((pwd, index) => (
              <li
                key={index}
                className="bg-custom-light-blue text-gray-300 p-4 rounded-lg mb-2 flex items-center justify-between transition-transform transform hover:scale-105 relative"
              >
                <span>{pwd}</span>
                <button
                  onClick={() => copyToClipboard(pwd)}
                  className="bg-custom-violet text-white p-2 rounded-md flex items-center transition-colors duration-200 hover:bg-opacity-80"
                >
                  <FaRegCopy className="w-4 h-4 mr-1" />
                </button>
                {copyStatus && (
                  <div className="absolute bottom-12 -right-3 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs rounded p-1 w-fit text-center">
                    {copyStatus}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PasswordHistory;
