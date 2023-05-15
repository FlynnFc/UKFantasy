import React from "react";

const Loading = () => {
  return (
    <>
      <div className="fixed bottom-1 left-1 z-20 flex animate-bounce flex-row rounded-lg bg-primary p-4">
        <h3 className="text-xl font-bold text-primary-content">Loading...</h3>
      </div>
    </>
  );
};

export default Loading;
