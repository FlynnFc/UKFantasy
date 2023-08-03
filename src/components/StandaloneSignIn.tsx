import { signIn } from "next-auth/react";
import React from "react";

const StandaloneSignIn = () => {
  return (
    <>
      <button
        className={`mr-2 rounded-lg bg-primary p-8 text-4xl text-primary-content`}
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
};

export default StandaloneSignIn;
