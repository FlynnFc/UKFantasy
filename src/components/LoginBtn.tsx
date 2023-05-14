import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowDropdown } from "react-icons/io";
export default function LoginBtn(props: { primary: boolean }) {
  const { status } = useSession();
  const { route } = useRouter();

  return (
    <>
      {status === "loading" ? (
        <button
          disabled
          className="btn animate-pulse border-none bg-transparent px-2 text-2xl text-base-content sm:text-4xl"
        >
          <IoIosArrowDropdown />
        </button>
      ) : status === "authenticated" ? (
        <div className="dropdown-end dropdown hover:text-primary-content">
          <label
            tabIndex={0}
            className="btn border-none bg-transparent px-2 text-2xl text-base-content hover:text-inherit md:text-4xl"
          >
            <IoIosArrowDropdown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-btn w-[12.7rem] space-y-2 bg-primary p-2 text-primary-content shadow"
          >
            <li>
              <Link href={"/profile"}>
                <a
                  className={`${
                    route === "/profile" ? `bg-primary-focus` : undefined
                  } hover:bg-primary-focus/40`}
                >
                  Profile
                </a>
              </Link>
            </li>
            {status === "authenticated" && (
              <li>
                <Link href="/leagues">
                  <a
                    className={`${
                      route === "/leagues" ? `bg-primary-focus` : undefined
                    } hover:bg-primary-focus/40`}
                  >
                    Leagues
                  </a>
                </Link>
              </li>
            )}

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
          } btn-sm btn mr-2 text-sm sm:btn-md`}
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </>
  );
}
