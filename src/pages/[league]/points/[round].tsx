import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

export async function getServerSideProps(context: any) {
  const url = context.req.url;
  console.log(url);
  const res = await fetch(
    "https://esportsfantasy.app/api/allUserTeamsByLeague",
    {
      method: "GET",
      headers: { url: JSON.stringify(url) },
    }
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Round = (props: { data: [] }) => {
  const admins = useMemo(() => new Set(["mastare.flynn@gmail.com"]), []);
  const { query } = useRouter();
  const session = useSession();
  const [authorised, setAuthorised] = useState(false);
  const [file, setFile] = useState<any>();
  const current = useMemo(() => {
    const currentRound = query.round;
    return parseInt(currentRound?.slice(5) as string);
  }, [query]);

  // const [formData, setFormData] = useState({});
  const submit = (e: any) => {
    toast.promise(handleUpload(e), {
      loading: "processing...",
      success: <b>File processed</b>,
      error: <b>Could not process</b>,
    });
  };

  const findPointsColumn = async (jsonData: any) => {
    let pointsIndex = 0;
    const data = await jsonData;
    console.log(data);
    for (let index = 0; index < data[0].length; index++) {
      const el: string = data[0][index];
      if (el.toLowerCase() === "points") pointsIndex += index;
    }
    return pointsIndex;
  };

  //todo
  const roundStatsFetcher = () => {
    //calls bucket to find round by league and number
    //If no file found return round never submitted
  };

  //todo
  const fileProcesMain = async (e: HTMLFormElement) => {
    e.preventDefault();
    console.log(file[0]);
    const f = file[0];
    const data = await f.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet: any = workbook.Sheets["Round 1"];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    return jsonData;
  };

  const handleUpload = async (e: HTMLFormElement) => {
    const jsonData: any = await fileProcesMain(e);
    const pointsColumn = await findPointsColumn(jsonData);

    const submitData: any[] = [];
    console.log(jsonData);
    for (let i = 1; i < jsonData.length; i++) {
      try {
        const player: (string | number)[] = jsonData[i];
        const basePoints = player[pointsColumn];

        // console.log(
        //   `${player[0]}'s base points is ${basePoints}. steamid: ${player[1]}`
        // );
        const formattedPlayer = {
          name: player[0],
          steamid: player[1],
          points: basePoints,
        };
        submitData.push(formattedPlayer);
      } catch (error) {
        return new Error("cannot proccess file");
      }
    }
    console.log(submitData);
    const currentlySelectedTeams = props.data;
    const allSelectedPlayers: any[] = [];
    currentlySelectedTeams.forEach((el: any) => {
      el.SelectedPlayer.forEach((el: { name: string; id: string }) =>
        allSelectedPlayers.push({ name: el.name.toLowerCase(), id: el.id })
      );
    });
    const finalData = comparer(submitData, allSelectedPlayers);
    console.log(finalData);

    const res = await fetch("/api/ApplyPoints", {
      method: "POST",
      body: JSON.stringify(finalData),
    });
    return res;
  };

  const comparer = (points: string | any[], userPlayers: any[]) => {
    const elements = [];
    for (let index = 0; index < userPlayers.length; index++) {
      let element = userPlayers[index];
      for (let index = 0; index < points.length; index++) {
        const element2 = points[index];
        if (element?.name === element2.name.toLowerCase()) {
          element = {
            ...element,
            steamid: element2.steamid,
            points: element2.points,
          };
          elements.push(element);
        }
      }
    }
    return elements;
  };
  useEffect(() => {
    if (
      session.data?.user?.email &&
      admins.has(session.data?.user?.email?.toString())
    ) {
      setAuthorised(true);
    } else setAuthorised(false);
  }, [admins, session.data?.user?.email]);

  if (current > 0) {
    return (
      <div>
        <Toaster />
        {authorised ? (
          <section className="flex min-h-screen w-auto flex-col justify-start gap-2">
            <h1 className="text-center text-3xl">{`Submit stats for round ${current}`}</h1>
            <form
              onSubmit={submit}
              className="mt-8 flex flex-col items-center justify-center gap-4"
            >
              <div className="rounded-btn flex w-[40%] flex-col space-y-3 bg-base-300 p-6 text-xl">
                <input
                  onChange={(e) => setFile(e.target.files)}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  className="file-input"
                  type="file"
                  name="roundFile"
                  id="roundFile"
                />

                <button type="submit" className="btn-primary btn">
                  Submit round
                </button>
              </div>
            </form>
            <div className="flex w-full items-end justify-center">
              <div className="join grid grid-cols-2">
                <Link
                  href={{
                    pathname: `/[slug]/points/round${current - 1}`,
                    query: { slug: query.league },
                  }}
                >
                  <button
                    className={`join-item border-r-none btn-outline btn rounded-r-none ${
                      current <= 1 && "btn-disabled"
                    }`}
                  >
                    Previous round
                  </button>
                </Link>
                <Link
                  href={{
                    pathname: `/[slug]/points/round${current + 1}`,
                    query: { slug: query.league },
                  }}
                >
                  <button className="join-item btn-outline btn rounded-l-none border-l-0">
                    Next round
                  </button>
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-xl">
              Ooops.... you&apos;re not supposed to be here{" "}
            </h1>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <section className="flex min-h-screen w-auto flex-col justify-start gap-2">
        <h1 className="text-center text-3xl">{`This is not a valid round`}</h1>
      </section>
    );
  }
};
export default Round;
