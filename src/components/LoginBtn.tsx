import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowDropdown } from "react-icons/io";
export default function LoginBtn(props: { primary: boolean }) {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <div className="dropdown-end dropdown ">
          <label
            tabIndex={0}
            className="btn border-none bg-transparent px-2 text-4xl text-base-content"
          >
            <IoIosArrowDropdown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-[13.6rem] space-y-2 bg-primary p-2 text-primary-content shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <Link href={"/settings"}>
                <a>Settings</a>
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
