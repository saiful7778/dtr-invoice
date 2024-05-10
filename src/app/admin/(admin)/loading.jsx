import { ImSpinner9 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <span role="status">
        <ImSpinner9 className="animate-spinner" size={60} />
      </span>
    </div>
  );
};

export default Loading;
