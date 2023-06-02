import React from "react";

const index = () => {
  return (
    <div className="min-w-screen container flex h-full min-h-[88.3vh]  max-w-7xl select-none flex-col items-center justify-start sm:mx-auto">
      <h1 className="text-3xl">Epic39 point dashboard</h1>
      <div className="join">
        <button className="join-item ">Round 1</button>
        <button className="join-item ">Round 2</button>
        <button className="join-item ">Round 3</button>
        <button className="join-item ">Round 4</button>
      </div>
    </div>
  );
};

export default index;
