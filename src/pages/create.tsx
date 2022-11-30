import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NotSignedin from "../components/NotSignedin";
import { Player } from "../components/Player";
import PlayerGroup from "../components/playerGroup";
import PlayerGroupSkeleton from "../components/playerGroupSkeleton";
import SelectedPlayer from "../components/SelectedPlayer";
import lvn from "../images/lvn.webp";
import dweg from "../images/dweg.webp";
import smooya from "../images/smooya.webp";
import thomas from "../images/thomas.webp";
import vacancey from "../images/vacancey.webp";
import toast, { Toaster } from "react-hot-toast";

type player = {
  map(arg0: (el: any) => JSX.Element): unknown;
  id: string;
  name: string;
  price: number;
  Rareity: string;
  teamId: string;
  statsId: string;
};

const Create = (props: {
  data: {
    map(
      arg0: (el: { teamName: string; Player: player }) => void
    ): React.ReactNode;
    player: player[];
  };
}) => {
  console.log(props.data);
  const [introModal, setIntroModal] = useState(true);
  const [myTeam, setMyTeam] = useState<JSX.Element[]>([]);
  const [money, setMoney] = useState(100000);
  const [teamFull, setTeamFull] = useState(false);
  const [deletes, setDeletes] = useState("");
  const session = useSession();
  const [teamName, setTeamName] = useState("Your Team");

  //Ensures Team name is never empty string
  useEffect(() => {
    if (teamName.length < 1) {
      setTeamName("Your Team");
    }
  }, [teamName.length]);

  //Updates total money as user changes players
  useEffect(() => {
    let count = 100000;
    if (myTeam.length === 0) {
      setMoney(count);
      return;
    }
    //Loops through team, player prices take away from total.
    for (let i = 0; i < myTeam.length; i++) {
      count = count - myTeam[i]?.props.price;
    }
    setMoney(count);
  }, [myTeam]);

  //Using this to update on delete I have no idea why react doesnt allow me to access the most recent state when onClick from different component
  useEffect(() => {
    const tempTeam = myTeam;
    for (let index = 0; index < tempTeam.length; index++) {
      const element = tempTeam[index]?.key;
      if (element === deletes) {
        tempTeam.splice(index, 1);
      }
    }

    setMyTeam([...tempTeam]);
    if (tempTeam.length < 5) {
      setTeamFull(false);
    }
  }, [deletes]);

  //Sets name to deletes so I know which player to delete
  const PlayerRemove = (data: { name: React.SetStateAction<string> }) => {
    setDeletes(data.name);
    console.log("Deleted player", data.name);
  };

  //Adding player to myTeam
  const PlayerSelect = (data: any) => {
    if (!teamFull) {
      if (myTeam.length === 4) {
        setTeamFull(true);
      }
      setMyTeam((prev) => [
        ...prev,
        <SelectedPlayer
          PlayerRemove={PlayerRemove}
          rareity={data.rareity}
          name={data.name}
          price={data.price}
          img={data.img}
          key={data.name}
          team={myTeam}
        />,
      ]);
    }
  };

  //Submits people in myTeam to DB
  const teamSubmitHandler = async () => {
    const test = {
      teamName: teamName,
      points: 0,
      rolePoints: 0,
      userId: session.data?.user?.id,
      players: [...myTeam],
    };

    console.log(test);
    // const body = await JSON.stringify(test);
    //   const response = await fetch("/api/submitTeam", {
    //     method: "POST",
    //     body: body,
    //   });
  };

  const submit = () => {
    toast.promise(teamSubmitHandler(), {
      loading: "Submiting your team...",
      success: <b>Team Submitted!</b>,
      error: <b>`We could not add your team`</b>,
    });
  };
  return (
    <main className="min-w-screen container flex h-full min-h-[88.3vh]  max-w-7xl flex-col items-end justify-start p-4  sm:mx-auto">
      <Toaster position="bottom-right" />
      {introModal && (
        <div className="createModal fixed top-0 left-0 z-10 flex h-screen w-full items-start justify-center overflow-auto">
          <div className="mt-32 w-[80%] rounded-lg bg-primary p-10 text-base-100">
            <h1 className="text-3xl font-bold leading-loose">
              Welcome to team creatation
            </h1>
            <p className="mb-2 py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
              accusamus expedita facere ex voluptatem exercitationem veniam
              itaque est repellendus libero neque, culpa distinctio aliquam
              dolor atque natus esse non nisi!
            </p>
            <h2 className="text-2xl font-bold leading-loose">
              How do points work?
            </h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
              accusamus expedita facere ex voluptatem exercitationem veniam
              itaque est repellendus libero neque, culpa distinctio aliquam
              dolor atque natus esse non nisi!
            </p>
            <div className="mr-8 flex justify-end">
              <button onClick={() => setIntroModal(false)} className="btn">
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
      {session.data ? (
        <div className="w-full">
          <h2 className="text-center text-3xl leading-snug lg:text-5xl">
            {teamName}
          </h2>
          <div className="mt-4 flex items-end justify-center lg:mt-0 lg:justify-end">
            <button
              disabled={!teamFull}
              onClick={() => {
                if (teamName === "Your Team") {
                  toast.error("Please enter a team name");
                  return;
                } else submit();
              }}
              className="btn-outline btn"
            >
              Submit Team
            </button>
          </div>
          <div className="z-10 my-4 ">
            <PlayerGroupSkeleton setTeamName={setTeamName} money={money}>
              {myTeam}
            </PlayerGroupSkeleton>
          </div>
          <select className="select-bordered select mb-3 w-full max-w-xs">
            <option disabled>Sort by</option>
            <option selected>Teams</option>
            <option>Price</option>
          </select>
          <div className="space-y-6">
            {/* <PlayerGroup team="God Squad">
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Smooya"
                price={30000}
                img={smooya}
                team={myTeam}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="silver"
                name="LVN &#128163;"
                price={22000}
                img={lvn}
                team={myTeam}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="bronze"
                name="Dweg"
                price={3.4}
                img={dweg}
                team={myTeam}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Thomas"
                price={22000}
                img={thomas}
                team={myTeam}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Vacancey"
                price={25000}
                img={vacancey}
                team={myTeam}
              />
            </PlayerGroup> */}
            {props.data.map((el) => {
              console.log(el);
              return (
                <PlayerGroup team={el.teamName} key={el.teamName}>
                  {el.Player?.map((els) => {
                    return (
                      <Player
                        key={els.id}
                        teamFull={teamFull}
                        PlayerSelect={PlayerSelect}
                        moneyLeft={money}
                        rareity={els.Rareity}
                        name={els.name}
                        price={els.price}
                        img={lvn}
                        team={myTeam}
                      />
                    );
                  })}
                </PlayerGroup>
              );
            })}
          </div>
        </div>
      ) : (
        <NotSignedin />
      )}
    </main>
  );
};
export default Create;

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:3000/api/allTeams");
  const data = await res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}
