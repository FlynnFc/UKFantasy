import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  BsFillCalculatorFill,
  BsFillCollectionFill,
  BsGraphUp,
  BsReverseListColumnsReverse,
} from "react-icons/bs";

const Adminlayout = ({ children }: any) => {
  const router = useRouter();
  console.log(router);
  const currentPage = useMemo(
    () => router.pathname.split("/")[2],
    [router.pathname]
  );

  console.log(currentPage);
  return (
    <div className={`max-w-screen flex min-h-screen flex-row `}>
      <div className=" w-max bg-neutral p-4 px-3 shadow">
        <ul className="flex flex-col gap-5 text-xl text-neutral-content ">
          <Link href={`/admin/points`}>
            <li
              className={`rounded-btn flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "points" && "btn-active"
              }`}
            >
              <BsFillCalculatorFill /> Points
            </li>
          </Link>
          <Link href={`/admin/bonuses`}>
            <li
              className={`rounded-btn flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "bonuses" && "btn-active"
              }`}
            >
              <BsFillCollectionFill />
              Bonuses
            </li>
          </Link>
          <Link href={`/admin/leagues`}>
            <li
              className={`rounded-btn flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "leagues" && "btn-active"
              }`}
            >
              <BsReverseListColumnsReverse /> Leagues
            </li>
          </Link>
          <Link href={`/admin/diognostics`}>
            <li
              className={`rounded-btn flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "diagnostics" && "btn-active"
              }`}
            >
              <BsGraphUp /> Diognostics
            </li>
          </Link>
        </ul>
      </div>
      {children}
    </div>
  );
};
export default Adminlayout;
