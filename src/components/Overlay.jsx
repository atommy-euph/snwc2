import React from "react";

import close from "../icons/close.svg";

const Overlay = ({ children, title, onClose }) => {
  return (
    <div className="fixed top-0 pt-14 px-6 bg-white w-screen h-screen">
      <h2 className="fixed top-6 left-6 m-0 text-2xl">{title}</h2>
      <button className="fixed top-4 right-4" onClick={onClose}>
        <img src={close} alt="close" />
      </button>
      {children}
    </div>
  );
};

export default Overlay;
