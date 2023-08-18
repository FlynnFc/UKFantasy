import { Toaster } from "react-hot-toast";
import PlayerEditAdmin from "../../components/PlayerEditAdmin";
import { useState } from "react";
import Adminlayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";
import PlayerStatsAdmin from "../../components/PlayerStatsAdmin";
import AddTeamsAdmin from "../../components/AddTeamsAdmin";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  // const path = "http://localhost:3000/";
  const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}api/leagues`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }

  const res2 = await fetch(`${path}/api/admins`, {
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
  const [subs, setSubs] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState("editplayers");
  return (
    <Adminlayout>
      <div className="grid grid-cols-7 border-l border-info ">
        <div className="col-span-1  rounded-tr-lg bg-neutral">
          <ul className="flex flex-col text-lg text-neutral-content">
            <li
              onClick={() => setCurrentPage("editplayers")}
              className={`flex cursor-pointer flex-row items-center gap-4 rounded-tr-lg p-3 hover:bg-neutral-focus ${
                currentPage === "editplayers" && "btn-active"
              }`}
            >
              Edit players
            </li>
            {/* <li
              onClick={() => setCurrentPage("addteams")}
              className={`lex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "addteams" && "btn-active"
              }`}
            >
              Add teams
            </li> */}
            <li
              onClick={() => setCurrentPage("playerstats")}
              className={`flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "playerstats" && "btn-active"
              }`}
            >
              Player selection stats
            </li>
            <li
              onClick={() => setCurrentPage("create")}
              className={`flex cursor-pointer flex-row items-center gap-4 p-3 hover:bg-neutral-focus ${
                currentPage === "create" && "btn-active"
              }`}
            >
              Create league
            </li>
          </ul>
        </div>
        <div className=" col-span-6 flex items-start justify-center">
          <Toaster />

          {currentPage === "editplayers" && <PlayerEditAdmin />}
          {/* 
          {currentPage === "addteams" && <AddTeamsAdmin />} */}

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
              {/* This should not submit immediatly. Give the user some info about what the output would be. Litterally a list to preview the teams and players. */}
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
              <section className="mb-2 grid gap-4">
                <h3 className="text-2xl">League options</h3>
                <div className="grid">
                  <label className="label flex flex-col items-start" htmlFor="">
                    Will you allow substitutes?{" "}
                    <span className="text-sm">
                      This is advised if you have teams size over 5 and are
                      unsure which players will player per round.
                    </span>
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <label className="label" htmlFor="">
                        Enable subs
                      </label>
                      <input
                        onChange={(e) => {
                          console.log(e.target.checked);
                          setSubs(!!e.target.checked);
                        }}
                        required
                        name="subs"
                        type="checkbox"
                        className="checkbox"
                      />
                    </div>
                  </div>
                  {subs && (
                    <>
                      <label className="label" htmlFor="">
                        How many subs would you like?
                      </label>
                      <input className="input" min={1} max={4} type="number" />
                    </>
                  )}
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
