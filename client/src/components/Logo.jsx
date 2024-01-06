import React from "react";
import { FaForumbee } from "react-icons/fa";

const Logo = (props) => {
  return (
    <div
      className={
        "font-bold items-center gap-1 text-3xl flex font-out " + props.className
      }
    >
      <FaForumbee />
      <p>BimBee</p>
    </div>
  );
};

export default Logo;
