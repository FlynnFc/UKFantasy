import Link from "next/link";
import React from "react";
import LoginBtn from "./LoginBtn";

const Navbar = () => {
  return (
    <div className="navbar absolute top-0">
      <div className="flex w-full justify-between">
        <div className="flex">
          <Link href="./">
            <a className="btn-ghost btn text-xl normal-case">UKFantasy</a>
          </Link>
        </div>
        <div className="space-x-2">
          <Link href="/epic36">
            <button className="btn bg-primary">Epic36 </button>
          </Link>
          <LoginBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
