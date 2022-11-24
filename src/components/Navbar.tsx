import Link from "next/link";
import React, { useState, useEffect } from "react";
import LoginBtn from "./LoginBtn";
import { themeChange } from "theme-change";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  const themeHandler = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="navbar absolute top-0">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <Link href="./">
            <a className="btn-ghost btn text-xl normal-case">UKFantasy</a>
          </Link>
          <Link href="/epic36">
            <button className="btn bg-primary text-primary-content">
              Epic36{" "}
            </button>
          </Link>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={themeHandler}
            className="btn "
            data-toggle-theme="winter,night"
          >
            {!darkMode ? (
              <FaMoon className="text-lg" />
            ) : (
              <FaSun className="text-lg" />
            )}
          </button>

          <LoginBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
