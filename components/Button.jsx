import React from "react";

const Button = ({ value, keybind, onClick }) => {
  return (
    <div className="my-2 flex flex-col items-center">
      <p className="m-0 mb-0.5 text-sm text-gray-400">Press '{keybind}' Key</p>
      <button
        className="font-bold text-2xl w-64 border-black border-2 py-2 shadow-md"
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
