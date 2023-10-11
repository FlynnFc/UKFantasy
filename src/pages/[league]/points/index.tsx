import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Round from "../../../components/Round";
import { getSession } from "next-auth/react";
import RoundDeletionForm from "../../../components/RoundDeletionForm";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  // const path = "http://localhost:3000";
  const path = "https://uk-fantasy.vercel.app";
  const url = req.url;
  const league = url.split("/");
  console.log(league);
  const res = await fetch(`${path}/api/userteam`, {
    method: "GET",
    headers: { leaguename: JSON.stringify(league[1]) },
  });
  const data = await res.json();

  const res2 = await fetch(`${path}/api/admins`, {
    method: "GET",
  });
  if (!res.ok) {
    console.error("error");
  }
  const temp = await res2.json();
  const admins = new Set(temp.map((el: { id: string }) => el.id));

  if (admins.has(session?.user?.id)) {
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

const Index = (props: { data: any }) => {
  const router = useRouter();

  const leagueName = useMemo(() => {
    const word = router.query.league as string;
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
  }, [router.query]);

  const currentRound = useMemo(() => {
    if (props.data[0]?.SelectedPlayer) {
      let highestround = 1;
      let mostPlayedplayer: number[] = [];
      for (let j = 0; j < props.data.length; j++) {
        const team = props.data[j].SelectedPlayer;
        for (let i = 0; i < team.length; i++) {
          const player = team[i];
          // console.log(player.points[player.points.length - 1]?.roundNumber);
          if (
            highestround < player.points[player.points.length - 1]?.roundNumber
          ) {
            highestround = player.points[player.points.length - 1]?.roundNumber;
          }
          if (player.points.length > mostPlayedplayer.length)
            mostPlayedplayer = [...player.points];
        }
      }
      console.log(highestround);
      const arr = [];
      for (let i = 0; i < highestround; i++) {
        arr.push(i);
      }
      return arr;
    } else return [];
  }, [props.data]);

  const [selectedRound, setSelectedRound] = useState(currentRound.length);
  return (
    <div className="min-w-screen container flex h-full min-h-screen max-w-7xl  select-none flex-col items-center justify-start gap-4 sm:mx-auto">
      <h1 className="mb-5 text-5xl">{`${leagueName} point dashboard`}</h1>
      <div className="grid grid-cols-6">
        {currentRound.map((el: number, idx: number) => {
          return (
            <button
              onClick={() => setSelectedRound(idx + 1)}
              key={idx}
              className={`join-item btn rounded-none ${
                idx + 1 === selectedRound && "btn-active"
              }`}
            >
              {`Round ${idx + 1}`}
            </button>
          );
        })}

        <button
          onClick={() => setSelectedRound(currentRound.length + 1)}
          className={`join-item btn rounded-none ${
            selectedRound === currentRound.length + 1
              ? "bg-primary-focus"
              : "bg-primary"
          }`}
        >{`Round ${currentRound.length + 1}`}</button>
      </div>

      {selectedRound === currentRound.length + 1 && (
        <Round data={props.data} selectedRound={selectedRound} />
      )}
      {selectedRound !== currentRound.length + 1 && (
        <RoundDeletionForm data={props.data} round={selectedRound} />
      )}
    </div>
  );
};

export default Index;
