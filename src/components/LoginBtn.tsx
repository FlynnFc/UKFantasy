import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowDropdown } from "react-icons/io";
export default function LoginBtn(props: { primary: boolean }) {
  const { status } = useSession();

  console.log(status);
  return (
    <>
      {status === "loading" ? (
        <button
          disabled
          className="btn animate-pulse border-none bg-transparent px-2 text-4xl text-base-content"
        >
          <IoIosArrowDropdown />
        </button>
      ) : status === "authenticated" ? (
        <div className="dropdown-end dropdown hover:text-primary-content">
          <label
            tabIndex={0}
            className="btn border-none bg-transparent px-2 text-4xl text-base-content hover:text-inherit"
          >
            <IoIosArrowDropdown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-btn w-[12.7rem] space-y-2 bg-primary p-2 text-primary-content shadow"
          >
            <li>
              <Link href={"/profile"}>
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href={"/settings"}>
                <a>Settings</a>
              </Link>
            </li>
            <li>
              {" "}
              <Link href="/leagues">
                <a>Leagues</a>
              </Link>
            </li>
            <li>
              <button className="btn text-white " onClick={() => signOut()}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button
          className={`${
            props.primary ? "btn-primary" : "btn mt-4 w-max"
          } btn mr-2`}
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </>
  );
}
