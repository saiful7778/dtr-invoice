"use client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { Popover } from "keep-react";
import cn from "@/lib/utils/cn";
import { button, focus } from "@/lib/styles";

const ActionMenu = ({ position, handleDelete, handleUpdate }) => {
  return (
    <div className="flex justify-center">
      <Popover placement={position || "left-start"}>
        <Popover.Action
          className={cn(
            "mx-auto",
            button.base,
            button.primary,
            button.size.sm,
            button.shape["icon-button"],
            focus.base,
          )}
        >
          <BsThreeDotsVertical size={15} />
        </Popover.Action>
        <Popover.Content className="popover z-20 overflow-hidden rounded border border-gray-300 bg-gray-50 shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
          <button
            onClick={handleDelete}
            className="flex w-full items-center justify-between gap-4 px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <span>Delete</span>
            <span>
              <FaTrashCan
                className="!fill-gray-900 dark:!fill-gray-50"
                size={14}
              />
            </span>
          </button>
          <button
            onClick={handleUpdate}
            className="flex w-full items-center justify-between gap-4 px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <span>Edit</span>
            <span>
              <CiEdit
                className="!fill-gray-900 dark:!fill-gray-50"
                strokeWidth={1}
              />
            </span>
          </button>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default ActionMenu;
