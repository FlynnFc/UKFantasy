import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LoginBtn from "./LoginBtn";
// import logo from "../images/mininewlogo.png";
import { IoIosArrowDropdown } from "react-icons/io";
const Navbar = () => {
  const [darkmode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState(["black", "lofi"]);
  useEffect(() => {
    localStorage.getItem("theme");
    console.log(localStorage.getItem("theme"));
    const themes: any = localStorage.getItem("theme")?.split(",");
    setTheme(themes);
    const bodyEl = document.querySelector("body");
    bodyEl?.setAttribute("data-theme", themes[1]);
  }, []);

  const themeHandler = () => {
    setDarkMode((prev) => !prev);
    const bodyEl = document.querySelector("body");
    const chosenTheme: any = darkmode ? theme[0] : theme[1];
    bodyEl?.setAttribute("data-theme", chosenTheme);
  };

  return (
    <nav className="navbar static top-0  p-2 ">
      <div className=" hidden w-full justify-evenly sm:flex sm:justify-between">
        <div className="flex space-x-4">
          <Link href="/">
            <a className="btn flex text-xl normal-case">
              <span className="mb-3">UKFantasy</span>
              {/* <Image src={logo} width={60} height={60} alt="logo" /> */}
            </a>
          </Link>
          <Link href="/epic36">
            <button className="btn bg-primary text-lg text-primary-content hover:text-primary">
              Epic36
            </button>
          </Link>
        </div>
        <div className="flex space-x-2">
          <label className="swap-rotate swap">
            <input
              onClick={themeHandler}
              data-toggle-theme="winter,night"
              type="checkbox"
            />
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <LoginBtn primary={true} />
        </div>
      </div>
      {/* <div className="flex w-full justify-end">
        <div className="dropdown-end dropdown sm:hidden">
          <label tabIndex={0} className="btn m-1 p-2 text-3xl">
            <IoIosArrowDropdown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-primary p-2 text-primary-content shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
