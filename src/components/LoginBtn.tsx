import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowDropdown } from "react-icons/io";
export default function LoginBtn(props: {
  primary: boolean;
  scrolled: boolean;
}) {
  const { status } = useSession();
  const { route, query } = useRouter();
  return (
    <>
      <ul
        className={`menu menu-horizontal hidden flex-row gap-1 bg-none md:flex ${
          props.scrolled ? "text-neutral-content" : "text-base-content"
        }`}
      >
        <li tabIndex={0} className="p-1">
          <Link href="/leagues">
            <a
              className={`${
                route === "/leagues"
                  ? `bg-primary-focus text-primary-content`
                  : undefined
              } btn btn-ghost text-inherit hover:bg-primary-focus/40`}
            >
              Leagues
            </a>
          </Link>
          <ul className="w-full pr-2">
            <li className="w-full">
              <Link href={`/epic41`}>
                <a
                  className={` btn bg-neutral text-neutral-content hover:bg-neutral hover:text-neutral-content ${
                    query.league === "epic41" &&
                    `bg-primary-focus text-primary-content`
                  }`}
                >
                  Epic41
                </a>
              </Link>
            </li>
          </ul>
        </li>
        {status === "authenticated" && (
          <li className="p-1">
            <Link href={"/profile"}>
              <a
                className={`${
                  route === "/profile"
                    ? `bg-primary-focus text-primary-content`
                    : undefined
                } btn btn-ghost hover:bg-primary-focus/40 `}
              >
                Profile
              </a>
            </Link>
          </li>
        )}
      </ul>
      {status === "loading" ? (
        <button
          disabled
          className="btn animate-pulse border-none bg-transparent px-2 text-2xl text-base-content sm:text-4xl"
        >
          <IoIosArrowDropdown />
        </button>
      ) : status === "authenticated" ? (
        <div className="dropdown-end dropdown hover:text-primary-content md:hidden">
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
              <li className="block md:hidden">
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
          } btn btn-sm mr-2 text-sm sm:btn-md`}
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </>
  );
}
