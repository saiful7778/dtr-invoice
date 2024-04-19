"use client";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import useStateData from "@/hooks/useStateData";
import Button from "@/components/Button";

const ThemeChange = () => {
  const { handleTheme, theme } = useStateData();
  return (
    <Button onClick={handleTheme} shape="icon-button" variant="primary">
      {theme ? <IoMoonOutline size={22} /> : <IoSunnyOutline size={22} />}
    </Button>
  );
};

export default ThemeChange;
