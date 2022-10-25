import React from "react";
import LoginBtn from "./LoginBtn";

const NotSignedin = () => {
  return (
    <div className="fixed mt-[15%] flex h-screen w-full flex-col items-center justify-start">
      <div>
        <p>
          Oi Bruv you are not signed in you need to sign in to view this page
        </p>
        <div className="flex justify-start py-2">
          <LoginBtn></LoginBtn>
        </div>
      </div>
    </div>
  );
};

export default NotSignedin;
