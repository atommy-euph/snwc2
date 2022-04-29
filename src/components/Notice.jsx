import React from "react";

const Notice = ({ text, level }) => {
  let icon;
  switch (level) {
    case "INFO":
      icon = "INFO";
      break;
    case "ALERT":
      icon = "ALERT";
      break;
    default:
      icon = "INFO";
  }
  return (
    <p>
      {icon}: {text}
    </p>
  );
};

export default Notice;
