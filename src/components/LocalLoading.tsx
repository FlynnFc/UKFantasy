import React from "react";

const LocalLoading = () => {
  return (
    <div className="flex min-w-full animate-pulse flex-row rounded-lg bg-base-100 p-4 ">
      <h3 className="w-full text-center font-bold text-inherit text-primary-content">
        Loading...
      </h3>
    </div>
  );
};

export default LocalLoading;
