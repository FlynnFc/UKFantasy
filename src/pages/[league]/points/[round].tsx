import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

export async function getServerSideProps(context: any) {
  const url = context.req.url;
  console.log(url);
  const res = await fetch("http://localhost:3000/api/allUserTeamsByLeague", {
    method: "GET",
    headers: { url: JSON.stringify(url) },
  });
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

  //todo
  const roundStatsFetcher = () => {
    //calls bucket to find round by league and number
    //If no file found return round never submitted
  };

  //todo
  const fileProcesMain = async () => {
    // Detect what kind of file it is
    //  THEN RECIVE all selected players for said league.
    //      First pass add round n points to array to players that match (can just compare steamid)
    //      Second pass go through each SelectedPlayer and check what bonus they have and add the corresponding bonus to their bonus points array
    //      Match steamIds (There will be many of each player)
    //      Points and Bonus points needs to be an array where each element is round n
    //      For each player add!!!! the points associated with their steamId then find the bonus that coincides and add said bonus point.
    //      Match player bonusName column and then apply bonus point that co-incides
  };

  const handleUpload = async (e: HTMLFormElement) => {
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
    //todo
    //Loop through array and create an object with each player, their points and their bonuses
    const submitData: any[] = [];
    for (let i = 1; i < jsonData.length; i++) {
      const player: (string | number)[] = jsonData[i];
      const basePoints = player[75];
      const entryKing = player[76];
      const utilNerd = player[77];
      // console.log(
      //   `${player[0]}'s base points is ${basePoints}. steamid: ${player[1]}`
      // );
      const formattedPlayer = {
        name: player[0],
        steamid: player[1],
        points: basePoints,
      };
      submitData.push(formattedPlayer);
    }

    const currentlySelectedTeams = props.data;
    const allSelectedPlayers: any[] = [];
    currentlySelectedTeams.forEach((el: any) => {
      el.SelectedPlayer.forEach((el: { name: string; id: string }) =>
        allSelectedPlayers.push({ name: el.name.toLowerCase(), id: el.id })
      );
    });
    const finalData = comparer(submitData, allSelectedPlayers);
    console.log(finalData);
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
              <div className="grid w-full grid-cols-2 gap-2">
                <Link href={`./round${current - 1}`}>
                  <button className=" btn w-full">{`Go to prior round`}</button>
                </Link>
                <Link href={`./round${current + 1}`}>
                  <button className="btn  w-full">{`Go to next round`}</button>
                </Link>
              </div>
            </div>
          </form>
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
};

export default Round;
