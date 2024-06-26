"use client";
import { createContext, useEffect, useState } from "react";

export const StateContext = createContext(null);

const StateContextProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme] = useState(
    getValue("theme") == "dark" ? true : false,
  );

  useEffect(() => {
    setValue("theme", theme ? "dark" : "light");
    if (theme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => setTheme((prop) => !prop);

  const handleSidebar = () => setSidebar((prop) => !prop);

  return (
    <StateContext.Provider
      value={{ sidebar, handleTheme, theme, handleSidebar }}
    >
      {children}
    </StateContext.Provider>
  );
};

function getValue(fieldName) {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(fieldName);
  }
}

function setValue(fieldName, fieldValue) {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(fieldName, fieldValue);
  }
}

export default StateContextProvider;
