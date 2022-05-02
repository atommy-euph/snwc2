import React from "react";
import { motion } from "framer-motion";

import classNames from "classnames";

const Alert = ({ message, isOpen }) => {
  const classes = classNames(
    "z-50 fixed text-center py-2 border-2 border-black bg-white top-[20rem] w-80 shadow-lg rounded",
    {
      hidden: !isOpen,
    }
  );

  return (
    <motion.p
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className={classes}
    >
      {message}
    </motion.p>
  );
};

export default Alert;
