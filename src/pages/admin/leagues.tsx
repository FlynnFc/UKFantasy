import { Toaster } from "react-hot-toast";
import PlayerEditAdmin from "../../components/PlayerEditAdmin";
import {
  BsFillCalculatorFill,
  BsFillCollectionFill,
  BsGraphUp,
  BsReverseListColumnsReverse,
} from "react-icons/bs";
import { useState } from "react";
import Adminlayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";
import PlayerStatsAdmin from "../../components/PlayerStatsAdmin";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  // const path = "http://localhost:3000/";
  const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}api/allLeagues`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }

  const res2 = await fetch(`${path}/api/allAdmins`, {
    method: "GET",
  });
  if (!res.ok) {
    console.error("error");
  }
  const temp = await res2.json();
  const data = await res.json();
  const admins = new Set(temp.map((el: { id: string }) => el.id));

  const isAdmin = admins.has(session?.user?.id);

  if (isAdmin) {
    return {
      props: {
        data,
      },
    };
  } else
    return {
      redirect: {
        destination: "/epic39",
        permanent: false,
      },
    };
}

const Leagues = () => {
  //TODO
  // Date logic - Check if date has already passed, if start time is before end time and if submit time is before start time
  // Dates need to be converted into prisma supported date format (look up)

  const [currentPage, setCurrentPage] = useState("editplayers");
  return (
    <Adminlayout>
      <div className="grid grid-cols-7 border-l ">
        <div className="col-span-1  rounded-tr-lg bg-neutral">
          <ul className="my-2 flex flex-col gap-2  px-2 text-lg">
            <li
              onClick={() => setCurrentPage("editplayers")}
              className={`rounded-btn flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "editplayers" && "bg-base-300"
              }`}
            >
              Edit players
            </li>
            <li
              onClick={() => setCurrentPage("playerstats")}
              className={`rounded-btn flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "playerstats" && "bg-base-300"
              }`}
            >
              Player selection stats
            </li>
            <li
              onClick={() => setCurrentPage("create")}
              className={`rounded-btn flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "create" && "bg-base-300"
              }`}
            >
              Create league
            </li>
          </ul>
        </div>
        <div className=" col-span-6 flex items-start justify-center">
          <Toaster />

          {currentPage === "editplayers" && <PlayerEditAdmin />}

          {currentPage === "create" && (
            <form
              className="rounded-btn flex flex-col gap-4 bg-base-300 p-6"
              action="#"
            >
              <section className="grid grid-cols-2 gap-4">
                <section className="grid gap-4">
                  <h3 className="text-2xl">Basic Info</h3>
                  <div className="flex flex-col">
                    <label className="label" htmlFor="">
                      League name
                    </label>
                    <input type="text" className="input" name="" id="" />
                  </div>

                  <div className="grid">
                    <div className="flex flex-col">
                      <label className="label" htmlFor="">
                        League description
                      </label>
                      <input type="text" className="input" name="" id="" />
                    </div>
                  </div>
                </section>
                <section className="grid gap-4">
                  <h3 className="text-2xl">Key dates</h3>
                  <div className="flex flex-col">
                    <label className="label" htmlFor="">
                      Users can submit teams from
                    </label>
                    <input type="date" className="input" name="" id="" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <label className="label" htmlFor="">
                        League start time
                      </label>
                      <input type="date" className="input" name="" id="" />
                    </div>
                    <div className="flex flex-col">
                      <label className="label" htmlFor="">
                        League end time
                      </label>
                      <input type="date" className="input" name="" id="" />
                    </div>
                  </div>
                </section>
              </section>
              <h3 className="text-2xl">Teams & Players competing</h3>
              <section className="mb-2 grid gap-4">
                <div className="grid">
                  <label className="label" htmlFor="">
                    Excel file with players and their teams
                  </label>
                  <input type="file" className="file-input" />
                </div>
                <div className="flex flex-col">
                  <label className="label" htmlFor="">
                    Name of targeted sheet
                  </label>
                  <input type="text" name="" className="input" id="" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="label" htmlFor="">
                      Name of player column
                    </label>
                    <input type="text" name="" className="input" id="" />
                  </div>{" "}
                  <div className="flex flex-col">
                    <label className="label" htmlFor="">
                      Name of team column
                    </label>
                    <input type="text" name="" className="input" id="" />
                  </div>
                </div>
              </section>
              <button disabled className="btn">
                create new league
              </button>
            </form>
          )}

          {currentPage === "playerstats" && <PlayerStatsAdmin />}
        </div>
      </div>
    </Adminlayout>
  );
};
export default Leagues;
