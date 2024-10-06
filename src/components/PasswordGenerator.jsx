import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [tooltip, setTooltip] = useState(""); // New state for tooltip
  const navigate = useNavigate();

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let characterPool = "";

    if (includeLowercase) characterPool += lowercase;
    if (includeUppercase) characterPool += uppercase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
    setPasswordHistory([...passwordHistory, generatedPassword]);
  };

  const copyToClipboard = () => {
    if (password === "") {
      setTooltip("Please generate a password to copy!"); // Show message if password is empty
    } else {
      navigator.clipboard.writeText(password);
      setTooltip("Copied!"); // Set tooltip message
    }

    // Hide the tooltip after 2 seconds
    setTimeout(() => {
      setTooltip(""); // Clear tooltip message
    }, 2000);
  };

  return (
    <div className="w-[400px] mx-auto p-6 bg-custom-dark-blue rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Generate Your Password
      </h2>
      <div className="bg-custom-light-blue h-14 p-4 rounded-md text-gray-300 text-center">
        {password}
      </div>

      {/* Length Slider */}
      <div className="my-4">
        <label className="block text-xs uppercase text-gray-400 font-medium">
          Length: {length}
        </label>
        <input
          type="range"
          min="5"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
          style={{
            appearance: "none",
            background: `linear-gradient(to right, #5E69DC ${
              ((length - 5) / (32 - 5)) * 100
            }%, #cbd5e1 ${((length - 5) / (32 - 5)) * 100}%)`,
            height: "4px",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Character Types with Toggle Buttons */}
      <div className="mb-4">
        <label className="block text-xs uppercase text-gray-400 font-medium">
          Settings
        </label>
        <div className="flex flex-col mt-3">
          {[
            {
              label: "Lowercase",
              state: includeLowercase,
              setState: setIncludeLowercase,
            },
            {
              label: "Uppercase",
              state: includeUppercase,
              setState: setIncludeUppercase,
            },
            {
              label: "Numbers",
              state: includeNumbers,
              setState: setIncludeNumbers,
            },
            {
              label: "Symbols",
              state: includeSymbols,
              setState: setIncludeSymbols,
            },
          ].map(({ label, state, setState }) => (
            <div
              key={label}
              className="bg-custom-light-blue rounded-md px-4 py-3 mb-2 flex items-center justify-between"
            >
              <span className="mr-2 text-gray-300">Include {label}</span>
              <button
                onClick={() => setState(!state)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out ${
                  state ? "bg-custom-violet" : "bg-gray-300"
                }`}
              >
                <span
                  className={`transform transition-transform duration-300 ease-in-out h-6 w-6 bg-white rounded-full shadow ${
                    state ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-4 items-center">
        <button
          onClick={generatePassword}
          className="bg-blue-500 text-white p-2 w-full font-medium rounded"
        >
          Generate Password
        </button>
        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="bg-custom-light-blue text-gray-300 p-3 rounded"
          >
            <FaRegCopy className="w-5 h-5" />
          </button>
          {tooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs rounded p-1 w-40 text-center">
              {tooltip}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() =>
          navigate("/history", { state: { history: passwordHistory } })
        }
        className="bg-indigo-500 text-white p-2 rounded mt-4 w-full"
      >
        Show Password History
      </button>
    </div>
  );
};

export default PasswordGenerator;
