import React from "react";

const Loading = () => {
  return (
    <>
      <div className="fixed bottom-2 left-2 z-20 flex animate-bounce flex-row rounded-lg bg-primary p-2">
        <h3 className="text-xl font-bold text-primary-content">Loading...</h3>
      </div>
    </>
  );
};

export default Loading;
