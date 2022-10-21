import Link from "next/link";
import React from "react";
import LoginBtn from "./LoginBtn";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="flex w-full justify-between">
        <Link href="./">
          <a className="btn-ghost btn text-xl normal-case">UKFantasy</a>
        </Link>
        <LoginBtn />
      </div>
    </div>
  );
};

export default Navbar;
