"use client";
import Image from "next/image";
import { createContext, useState } from "react";
import icon from "../../public/devdebug-icon.png";

export const DebugContext = createContext(null);

const DebugContextProvider = ({ children }) => {
  const [openWindow, setOpenWindow] = useState(false);
  const [allConsoleData, setAllConsoleData] = useState([]);

  if (process.env.NODE_ENV === "production") {
    return children;
  }

  const handleButtonClick = () => {
    setOpenWindow((prop) => !prop);
  };

  const handleConsoleData = (inputData) => {
    setAllConsoleData((prop) => [...prop, inputData]);
  };

  return (
    <DebugContext.Provider value={{ handleConsoleData }}>
      {children}
      {openWindow && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] flex h-[296px] max-h-[90%] min-h-[calc(16*3.5)] w-auto gap-[calc(16*0.125)] border-t border-gray-700 bg-gray-800 text-white">
          <button
            onClick={handleButtonClick}
            className="absolute bottom-full right-2 rounded-t-md border border-gray-700 bg-gray-800 px-1 py-0.5"
            type="button"
          >
            <UpArrow />
          </button>
          <div className="w-full text-sm">
            {allConsoleData?.map((ele, idx) => (
              <div
                className="flex justify-between border-b border-gray-700 p-2"
                key={"line-" + idx}
              >
                <div>{ele.data}</div>
                <div className="text-xs text-sky-500 underline">
                  <span>{ele.file}</span>
                  <span>:</span>
                  <span>{ele.line}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {openWindow || (
        <button
          onClick={handleButtonClick}
          className="fixed bottom-5 right-5 z-[9999]"
          type="button"
        >
          <Image src={icon} alt="dev debug icon" />
        </button>
      )}
    </DebugContext.Provider>
  );
};

const UpArrow = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
    </svg>
  );
};

export default DebugContextProvider;
