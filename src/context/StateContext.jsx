"use client";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const StateContext = createContext(null);

const StateContextProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme] = useState(false);

  useLayoutEffect(() => {
    const getTheme = localStorage.getItem("theme");
    if (getTheme) {
      setTheme(getTheme === "dark" ? true : false);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "");
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

export default StateContextProvider;
