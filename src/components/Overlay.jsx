import React from "react";

import close from "../icons/close.svg";

const Overlay = ({ children, title, onClose }) => {
  return (
    <div className="overflow-y-scroll hidden-scrollbar fixed flex flex-col items-center top-0 bg-white w-screen h-screen px-8 z-50">
      <div className="flex flex-row justify-between items-center w-full max-w-xl mt-6">
        <h2 className="m-0 text-2xl">{title}</h2>
        <button className="" onClick={onClose}>
          <img className="w-5" src={close} alt="close" />
        </button>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Overlay;
