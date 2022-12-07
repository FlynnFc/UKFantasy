import { useSession, signIn, signOut } from "next-auth/react";
import { IoIosArrowDropdown } from "react-icons/io";
export default function LoginBtn(props: { primary: boolean }) {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <>
        <div className="dropdown-end dropdown">
          <label
            tabIndex={0}
            className="btn m-1 border-none bg-transparent p-1 px-2 text-4xl text-base-content"
          >
            <IoIosArrowDropdown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 space-y-2 bg-secondary p-2 text-primary-content shadow "
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button className="btn text-white" onClick={() => signOut()}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  }
  return (
    <>
      <button
        className={`${
          props.primary ? "btn-primary" : "btn mt-4 w-max"
        } btn mr-2`}
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
