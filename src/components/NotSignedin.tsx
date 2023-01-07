import React from "react";
import LoginBtn from "./LoginBtn";

const NotSignedin = () => {
  return (
    <div className="fixed z-50 mt-[15%] flex h-screen w-full flex-col items-center justify-start">
      <div>
        <div className="flex justify-start py-2">
          <LoginBtn primary={true}></LoginBtn>
        </div>
      </div>
    </div>
  );
};

export default NotSignedin;
