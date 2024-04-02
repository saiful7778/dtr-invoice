import Image from "next/image";
import pointerBg from "../../public/pointer-bg.png";

const Point = ({ children }) => {
  return (
    <div className="relative z-10 h-[50px] w-[50px] font-medium text-accent">
      <Image
        className="h-full w-full object-cover object-center"
        src={pointerBg}
        alt="pointer background"
      />
      <div className="absolute inset-0 z-20 flex items-center justify-center text-xl">
        {children}
      </div>
    </div>
  );
};

export default Point;
