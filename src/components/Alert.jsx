import React from "react";
import classNames from "classnames";

const Alert = ({ message, isOpen }) => {
  const classes = classNames(
    "fixed text-center py-2 border-2 border-black bg-white top-[20rem] w-80 shadow-lg rounded",
    {
      hidden: !isOpen,
    }
  );

  return <p className={classes}>{message}</p>;
};

export default Alert;
