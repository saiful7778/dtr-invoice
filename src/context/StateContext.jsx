"use client";
import { createContext, useState } from "react";

export const StateContext = createContext(null);

const StateContextProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);

  const handleSidebar = () => setSidebar((prop) => !prop);

  return (
    <StateContext.Provider value={{ sidebar, handleSidebar }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
