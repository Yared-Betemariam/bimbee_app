import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-col font-medium text-lg py-4">
      <h1 className="text-2xl">Page Not Found</h1>
      <Link to="/dashboard" className="text-yellow-400 underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PageNotFound;
