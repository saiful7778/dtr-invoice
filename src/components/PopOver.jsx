"use client";
import { Popover } from "keep-react";

const PopOver = ({ position, buttonAction, children }) => {
  return (
    <Popover placement={position}>
      <Popover.Action className="p-0">{buttonAction}</Popover.Action>
      <Popover.Content className="popover z-20 rounded border border-gray-200 bg-gray-50 p-2 shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        {children}
      </Popover.Content>
    </Popover>
  );
};

export default PopOver;
