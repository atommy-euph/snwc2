import React from "react";
import classNames from "classnames";

const Alert = ({ message, type, isOpen }) => {
  let icon;
  switch (type) {
    case "INFO":
      icon = "INFO";
      break;
    case "WARNING":
      icon = "WARNING";
      break;
    case "SUCCESS":
      icon = "SUCCESS";
      break;
    default:
      icon = "OTHER";
  }

  const classes = classNames("fixed p-2 top-5 w-40 shadow-lg rounded", {
    hidden: !isOpen,
    "bg-rose-200": type === "WARNING",
    "bg-blue-200 z-20": type === "INFO",
    "bg-green-200 z-20": type === "SUCCESS",
  });

  return (
    <div className={classes}>
      <p>
        {icon}: {message}
      </p>
    </div>
  );
};

export default Alert;
