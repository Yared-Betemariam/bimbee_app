import React from "react";
import { MdError } from "react-icons/md";

const ErrorOccured = ({ label, ...props }) => {
  return (
    <div
      className={
        "text-red-800 px-2 py-1 font-semibold capitalize flex gap-2 items-center" +
        props.className
      }
    >
      <MdError className="text-xl" />
      <p>{label || "Error Occured"}</p>
    </div>
  );
};

export default ErrorOccured;
