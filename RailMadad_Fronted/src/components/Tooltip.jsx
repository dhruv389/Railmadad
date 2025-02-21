import { useState } from "react";

const Tooltip = ({ children, text, position = "left" }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block ">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div
          className={`absolute whitespace-nowrap w-[4rem] h-auto flex bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } left-1/2 transform -translate-x-1/2 before:absolute before:content-[''] before:w-3 before:h-3 before:bg-black before:rotate-45 before:left-1/2 before:-translate-x-1/2 ${
            position === "top" ? "before:top-full" : "before:bottom-full"
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
