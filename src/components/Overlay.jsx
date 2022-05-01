import React from "react";

import close from "../icons/close.svg";

const Overlay = ({ children, title, onClose }) => {
  return (
    <div className="fixed flex flex-row justify-center top-0 bg-white w-screen h-screen z-50">
      <div className="relative w-full max-w-xl pt-16 px-6">
        <h2 className="absolute top-4 m-0 text-2xl">{title}</h2>
        <button className="absolute top-2.5 right-4" onClick={onClose}>
          <img src={close} alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
