import React from "react";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import CheckBox from "./components/CheckBox";


const App = () => {
  const [length, setLength] = useState(4);
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false)

  const handleCheckBoxChange = (i) => {
    const updateCheckBoxData = [...checkBoxData];
    updateCheckBoxData[i].state = !updateCheckBoxData[i].state;
    setCheckBoxData(updateCheckBoxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="lg:w-[50%] p-24 m-10 bg-gray-800 rounded-xl">
      {/* Password Text & Copy */}
      {password && (
        <div className="text-white flex justify-between items-center text-xl font-bold">
          <div className="title">{password}</div>
          <button
            onClick={handleCopy}
            className="px-8 py-4 border-none bg-teal-500 text-white font-bold cursor-pointer rounded-xl"
          >
            {copied?"Copied":"Copy"}
          </button>
        </div>
      )}

      {/* Character Length */}
      <div className="flex flex-col text-white text-xl font-bold mt-10">
        <span className="w-full flex justify-between mb-5">
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* Checkboxes */}
      <div className="text-white mt-10 grid grid-cols-2 gap-2">
        {checkBoxData.map((checkbox, index) => {
          return <CheckBox title={checkbox.title} onChange={()=> handleCheckBoxChange(index)} checkbox={checkbox.state} />
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password} />

      {/* Error handling */}
      {errorMessage && <div className="errorMessage text-red-400">{errorMessage}</div>}

      {/* Generate Button */}
      <button
        className="w-full px-8 py-4 border-none bg-teal-500 text-white font-bold cursor-pointer rounded-xl mt-10 text-2xl"
        onClick={() => generatePassword(checkBoxData, length)}
      >
        GENERATE PASSWORD
      </button>
    </div>
  );
};

export default App;
