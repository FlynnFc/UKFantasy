import React, { useEffect, useMemo, useState } from "react";
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
  const res = await fetch(`${path}/api/teams`, {
    method: "GET",
    headers: { leaguename: league[1] },
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
        destination: "/",
        permanent: false,
      },
    };
}

const Index = (props: { data: any }) => {
  const router = useRouter();
  console.log(props);

  const leagueName = useMemo(() => {
    const word = router.query.league as string;
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
  }, [router.query]);

  const currentRound = useMemo(() => {
    if (props.data) {
      let highestround = 0;
      let mostPlayedplayer: any[] = [];
      for (let i = 0; i < props.data.Teams.length; i++) {
        const teams = props.data.Teams[i];
        for (let j = 0; j < teams.Player.length; j++) {
          const player = teams.Player[j];
          const relevantRounds: any[] = [];
          player.playerPoints.map((el: any) => {
            if (el.league === (router.query.league as string)) {
              relevantRounds.push(el);
            }
          });
          if (mostPlayedplayer.length < relevantRounds.length) {
            mostPlayedplayer = relevantRounds;
          }
        }
      }

      for (let i = 0; i < mostPlayedplayer.length; i++) {
        console.log(mostPlayedplayer);
        const element = mostPlayedplayer[i];
        if (element.round > highestround) {
          highestround = element.round;
        }
      }
      return highestround;
    } else return 0;
  }, [props.data, router.query.league]);

  const [selectedRound, setSelectedRound] = useState(currentRound + 1);
  const [buttons, setButtons] = useState<any>();
  useEffect(() => {
    const btns = [];
    for (let index = 0; index < currentRound; index++) {
      btns.push(
        <button
          onClick={() => setSelectedRound(index + 1)}
          key={index}
          className={`join-item btn rounded-none ${
            index + 1 === selectedRound && "btn-active"
          }`}
        >
          {`Round ${index + 1}`}
        </button>
      );
    }
    return setButtons(btns);
  }, [currentRound, selectedRound]);

  return (
    <div className="min-w-screen container flex h-full min-h-screen max-w-7xl  select-none flex-col items-center justify-start gap-4 sm:mx-auto">
      <h1 className="mb-5 text-5xl">{`${leagueName} point dashboard`}</h1>
      <div className="grid grid-cols-6">
        {buttons}
        <button
          onClick={() => setSelectedRound(currentRound + 1)}
          className={`join-item btn rounded-none ${
            selectedRound === currentRound + 1
              ? "bg-primary-focus"
              : "bg-primary"
          }`}
        >{`Round ${currentRound + 1}`}</button>
      </div>

      {selectedRound === currentRound + 1 && (
        <Round
          data={props.data}
          selectedRound={selectedRound}
          league={router.query.league as string}
        />
      )}
      {selectedRound !== currentRound + 1 && (
        <RoundDeletionForm data={props.data} round={selectedRound} />
      )}
    </div>
  );
};

export default Index;
