const style = {
  base: "rounded font-semibold cursor-pointer shadow duration-200 active:focus:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  primary: "bg-blue-600 text-gray-50 hover:bg-blue-700",
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-gray-50",
  confirm:
    "border border-green-600 bg-green-800 text-gray-50 hover:bg-green-700",
  cancel: "border border-red-600 bg-red-700 text-gray-50 hover:bg-red-600",
  size: {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-1 text-base",
    lg: "px-6 py-2.5 text-base",
  },
  shape: {
    circle: "rounded-full p-2",
    "icon-text-button": "inline-flex items-center justify-center gap-1",
    "icon-button":
      "p-1 border border-gray-500 bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-50",
  },
};

export default style;
