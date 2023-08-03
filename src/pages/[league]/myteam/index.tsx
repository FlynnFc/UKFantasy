import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../../components/Loading";
import { ImBin, ImTwitter, ImDice } from "react-icons/im";
import { FiArrowDownRight } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { MyPlayer } from "../../../components/myPlayer";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import Table from "../../../components/Table";
import InsightsTable from "../../../components/InsightsTable";
import { Pencil } from "lucide-react";
import PlayerGroup from "../../../components/playerGroup";
import { Player, playerStats } from "../../../components/Player";
import PreviewPlayer from "../../../components/PreviewPlayer";
type bonus = {
  name: string;
  description: string;
};

export type player = {
  bonusPoint: { value: number }[];
  id: string;
  name: string;
  price: number;
  rareity: string;
  teamId: string;
  statsId: string;
  image: string;
  points: { value: number }[];
  bonus: { name: string; description: string };
};

export type teamProps = {
  id: string;
  points: string;
  teamName: string;
  SelectedPlayer: player[];
};

export async function getServerSideProps(context: {
  params: { league: string };
}) {
  // const path = "http://localhost:3000/";
  const path = "https://esportsfantasy.app/";
  const { league } = context.params;

  const res = await fetch(`${path}api/allBonuses`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }
  const data = await res.json();

  const res2 = await fetch(`${path}/api/getLeague`, {
    method: "GET",
    headers: { leagueName: league },
  });
  const data2 = await res2.json();

  return {
    props: {
      data,
      data2,
    },
  };
}

const demoData = {
  id: "clki640jh0000908cdpkko03j",
  teamName: "boshi",
  points: "0",
  rolePoints: "0",
  leagueId: "clitgzx1y000090fwza6i632y",
  userId: "clcpjbp1t0000ml083c75yjmd",
  ready: false,
  league: {
    id: "clitgzx1y000090fwza6i632y",
    name: "epic39",
    description:
      "EPIC39 is a LAN based gaming event in the UK. It features a mixture of casual gaming, stage content and esports tournaments so whether you enjoy playing games for fun or want to be the next esports professional, there will be something for you.",
    offical: true,
    openDate: "2023-07-23T23:13:16.822Z",
    startDate: "2023-07-27T23:59:59.822Z",
    endDate: "2023-07-31T23:13:16.822Z",
    leagueRoundsId: "clith0ai3000290fwr1w8qw24",
  },
  SelectedPlayer: [
    {
      id: "clki640jl0001908cgic7ikij",
      name: "vacancy",
      price: 23000,
      steamid: "76561198190928622",
      image:
        "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Vacancy_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fVmFjYW5jeV9DYXJkLmpwZyIsImlhdCI6MTY4OTgwMDY4MywiZXhwIjoxNzIxMzM2NjgzfQ.heX8Iq7milB1r_83FffChxviP8lVi4zvLsEJr79hh9I&t=2023-07-19T21%3A04%3A52.053Z",
      rareity: "gold",
      playerTeamId: "clki640jh0000908cdpkko03j",
      bonusName: "ADR warrior",
      bonus: {
        name: "ADR warrior",
        description:
          "+10 points for having 85 ADR. +5 for over 70 but less than 85. -5 for less than 70",
      },
      points: [
        { value: 200, roundNumber: 1 },
        { value: 230, roundNumber: 2 },
        { value: 230, roundNumber: 3 },
        { value: 230, roundNumber: 4 },
        { value: 210, roundNumber: 5 },
        { value: 205, roundNumber: 6 },
        { value: 205, roundNumber: 7 },
        { value: 205, roundNumber: 8 },
        { value: 205, roundNumber: 9 },
      ],
      bonusPoint: [
        { value: 10, roundNumber: 1 },
        { value: 5, roundNumber: 2 },
        { value: -5, roundNumber: 3 },
        { value: -5, roundNumber: 4 },
        { value: 10, roundNumber: 5 },
        { value: -5, roundNumber: 6 },
        { value: -5, roundNumber: 7 },
        { value: 10, roundNumber: 8 },
        { value: -5, roundNumber: 9 },
      ],
    },
    {
      id: "clki640jl0002908c1366kxsc",
      name: "frazehh",
      price: 22000,
      steamid: "76561198048229390",
      image:
        "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/Verdant/Verdant_Frazehh.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL1ZlcmRhbnQvVmVyZGFudF9GcmF6ZWhoLmpwZyIsImlhdCI6MTY4OTgwMDc1MSwiZXhwIjoxNzIxMzM2NzUxfQ.korpM8SaNT22vxTtXEYtmTqZrJ2bDQRU3NSNymD2hCM&t=2023-07-19T21%3A05%3A59.453Z",
      rareity: "gold",
      playerTeamId: "clki640jh0000908cdpkko03j",
      bonusName: "Clutcher",
      bonus: {
        name: "Clutcher",
        description:
          "+10 points for a Clutch win % higher than 10%. +5 for higher than 1% but less than 10%. -5 for less than 1%",
      },
      points: [
        { value: 200, roundNumber: 1 },
        { value: 230, roundNumber: 2 },
        { value: 230, roundNumber: 3 },
        { value: 230, roundNumber: 4 },
        { value: 210, roundNumber: 5 },
        { value: 205, roundNumber: 6 },
        { value: 205, roundNumber: 7 },
        { value: 205, roundNumber: 8 },
        { value: 205, roundNumber: 9 },
      ],
      bonusPoint: [
        { value: 10, roundNumber: 1 },
        { value: 5, roundNumber: 2 },
        { value: -5, roundNumber: 3 },
        { value: -5, roundNumber: 4 },
        { value: 10, roundNumber: 5 },
        { value: -5, roundNumber: 6 },
        { value: -5, roundNumber: 7 },
        { value: 10, roundNumber: 8 },
        { value: -5, roundNumber: 9 },
      ],
    },
    {
      id: "clki640jl0004908ctx2munmd",
      name: "Retr00",
      price: 17500,
      steamid: "76561198117338404",
      image:
        "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/Bin%20Chilling/binchilling_retr00.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL0JpbiBDaGlsbGluZy9iaW5jaGlsbGluZ19yZXRyMDAuanBnIiwiaWF0IjoxNjg5ODA4OTY2LCJleHAiOjE3MjEzNDQ5NjZ9.Z1d4RtHQEUrbmVyz2R0tMdBIHppwTS6BxXHoCTW8e6o&t=2023-07-19T23%3A22%3A55.048Z",
      rareity: "silver",
      playerTeamId: "clki640jh0000908cdpkko03j",
      bonusName: "Awper",
      bonus: {
        name: "Awper",
        description:
          "+10 points for having 0.2 AWP kills per round or higher. +5 for having more than 0.12 but less than 0.2. -5 for less than 0.12",
      },
      points: [
        { value: 200, roundNumber: 1 },
        { value: 230, roundNumber: 2 },
        { value: 230, roundNumber: 3 },
        { value: 230, roundNumber: 4 },
        { value: 210, roundNumber: 5 },
        { value: 205, roundNumber: 6 },
        { value: 205, roundNumber: 7 },
        { value: 205, roundNumber: 8 },
        { value: 205, roundNumber: 9 },
      ],
      bonusPoint: [
        { value: 10, roundNumber: 1 },
        { value: 5, roundNumber: 2 },
        { value: -5, roundNumber: 3 },
        { value: -5, roundNumber: 4 },
        { value: 10, roundNumber: 5 },
        { value: -5, roundNumber: 6 },
        { value: -5, roundNumber: 7 },
        { value: 10, roundNumber: 8 },
        { value: -5, roundNumber: 9 },
      ],
    },
    {
      id: "clki640jl0005908crefqit6j",
      name: "walkeRR",
      price: 16500,
      steamid: "76561198056320387",
      image:
        "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/de_lads/de_lads_walker.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2RlX2xhZHMvZGVfbGFkc193YWxrZXIuanBnIiwiaWF0IjoxNjkwMjAzMzM1LCJleHAiOjE3MjE3MzkzMzV9.ak7H7ihqVN-drb1-zBgoLVS4qiKjuZXygbcsgxv-6ag&t=2023-07-24T12%3A55%3A36.703Z",
      rareity: "silver",
      playerTeamId: "clki640jh0000908cdpkko03j",
      bonusName: "The K0nfig",
      bonus: {
        name: "The K0nfig",
        description:
          "+10 points for having 2 Knifes in a match. +5 for 1 Knife. -5 for none",
      },
      points: [
        { value: 200, roundNumber: 1 },
        { value: 230, roundNumber: 2 },
        { value: 230, roundNumber: 3 },
        { value: 230, roundNumber: 4 },
        { value: 210, roundNumber: 5 },
        { value: 205, roundNumber: 6 },
        { value: 205, roundNumber: 7 },
        { value: 205, roundNumber: 8 },
        { value: 205, roundNumber: 9 },
      ],
      bonusPoint: [
        { value: 10, roundNumber: 1 },
        { value: 5, roundNumber: 2 },
        { value: -5, roundNumber: 3 },
        { value: -5, roundNumber: 4 },
        { value: 10, roundNumber: 5 },
        { value: -5, roundNumber: 6 },
        { value: -5, roundNumber: 7 },
        { value: 10, roundNumber: 8 },
        { value: -5, roundNumber: 9 },
      ],
    },
    {
      id: "clki6cr840009908c52svwywi",
      name: "Whskyyyy",
      price: 18000,
      steamid: "76561198356623290",
      image:
        "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/Binmen%20International/binmeninternational_whsky_updated.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL0Jpbm1lbiBJbnRlcm5hdGlvbmFsL2Jpbm1lbmludGVybmF0aW9uYWxfd2hza3lfdXBkYXRlZC5qcGciLCJpYXQiOjE2ODk5NTUxMTksImV4cCI6MTcyMTQ5MTExOX0.LXzR8zA1Q8mnuN8Ex9DzNMqlrDBV7dkX25MEF_VNZ9Y&t=2023-07-21T15%3A58%3A39.968Z",
      rareity: "silver",
      playerTeamId: "clki640jh0000908cdpkko03j",
      bonusName: "Stat padder",
      bonus: {
        name: "Stat padder",
        description:
          "+10 points for having a HLTV rating (2.0) higher than 1.35. +5 for higher than 0.85. -5 for less than 0.85",
      },
      points: [
        { value: 200, roundNumber: 1 },
        { value: 230, roundNumber: 2 },
        { value: 230, roundNumber: 3 },
        { value: 230, roundNumber: 4 },
        { value: 210, roundNumber: 5 },
        { value: 205, roundNumber: 6 },
        { value: 205, roundNumber: 7 },
        { value: 205, roundNumber: 8 },
        { value: 205, roundNumber: 9 },
      ],
      bonusPoint: [
        { value: 10, roundNumber: 1 },
        { value: 5, roundNumber: 2 },
        { value: -5, roundNumber: 3 },
        { value: -5, roundNumber: 4 },
        { value: 10, roundNumber: 5 },
        { value: -5, roundNumber: 6 },
        { value: -5, roundNumber: 7 },
        { value: 10, roundNumber: 8 },
        { value: -5, roundNumber: 9 },
      ],
    },
  ],
};

const Myteam = (props: {
  data: bonus[];
  leagueId: string;
  data2: {
    openDate: any;
    startDate: string;
  };
}) => {
  const { status, data: session } = useSession();
  const [team, setTeam] = useState<teamProps>();
  const [serverTeam, setServerTeam] = useState<teamProps>();
  const { query } = useRouter();
  const router = useRouter();
  const [leagueName, setLeagueName] = useState("");
  const [bonusDesc, setBonusDesc] = useState(
    "or you can Drag and drop a bonus onto the desired player"
  );
  const [bonusName, setBonusName] = useState(
    `Click a bonus for more details & Drag the bonus to apply`
  );
  const [allBonuses, setAllBonuses] = useState<bonus[]>([]);
  const [userNeedsHelp, setUserNeedsHelp] = useState(false);

  const isStarted = useMemo(() => {
    if (props.data2?.startDate)
      return new Date(props.data2?.startDate) < new Date();
  }, [props.data2?.startDate]);

  const isOpen = useMemo(() => {
    if (props.data2?.openDate)
      return new Date(props.data2?.openDate) < new Date();
  }, [props.data2?.openDate]);

  useEffect(() => {
    if (!isOpen) router.push(`/${query.league}`);
  }, [isOpen, isStarted, query.league, router]);

  useEffect(() => {
    setUserNeedsHelp(!localStorage.getItem("UserTips"));
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${query.league}`);
    } else return;
  }, [query.league, router, status]);
  useEffect(() => {
    const fetcher = async () => {
      if (session?.user?.id && query.league) {
        const id = session.user.id;
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          console.error("error");
        }
        const data = await res.json();
        for (let i = 0; i < data.PlayerTeam.length; i++) {
          if (data.PlayerTeam[i].league.name.toLowerCase() === query.league) {
            setLeagueName(data.PlayerTeam[i].league.name);
            const allPlayers = data.PlayerTeam[i];
            setServerTeam(structuredClone(allPlayers));
            setTeam(structuredClone(allPlayers));

            return;
          }
        }
      } else return "error";
    };
    fetcher();
  }, [query.league, session]);

  useEffect(() => {
    if (session?.user?.id && query.league) {
      setAllBonuses([...props.data]);
    }
  }, [props.data, query.league, session?.user?.id]);

  const linkSetter = () => {
    const path: string = team?.id as string;
    const host = `https://esportsfantasy.app/${query.league}/team/`;
    const link = host + path;
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };

  const teamDeleter = async () => {
    if (session?.user?.id && team?.id) {
      const res = await fetch("/api/deleteTeam", {
        method: "DELETE",
        headers: { id: team.id },
      });
      if (!res.ok) {
        //add error tell user to go back to league page
        toast.error("Could not delete");
      } else {
        router.push(`/${query.league}`);
      }
    }
  };
  const handleOnDrag = (
    e: React.DragEvent,
    Identifier: string,
    index: number
  ) => {
    e.dataTransfer.setData("Identifier", Identifier);
    e.dataTransfer.setData("BonusIndex", index.toString());
  };

  const handleOnDrop = (e: React.DragEvent, i: number) => {
    const Identifier = e.dataTransfer.getData("Identifier");
    const Index = parseInt(e.dataTransfer.getData("BonusIndex"));
    //TODO Figure out this type error
    setTeam((prev: any) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      prev!.SelectedPlayer[i]!.bonus = {
        name: Identifier,
        description: allBonuses[Index]?.description,
      };

      return { ...prev };
    });
  };

  const handleBonusDelete = (i: number) => {
    setTeam((prev: any) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      prev!.SelectedPlayer[i]!.bonus = null;

      return { ...prev };
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const HandleBonusSubmit = async () => {
    const data = { ...team, id: session?.user?.id, league: query.league };
    if (team) {
      const JSONbody = await JSON.stringify(data);
      const res = await fetch("/api/updateTeamBonuses", {
        method: "POST",
        body: JSONbody,
      });
      const load = toast.loading("updating...");
      if (!res.ok) {
        //add error tell user to go back to league page
        toast.dismiss(load);
        toast.error("Could not update team");
      } else {
        toast.dismiss(load);
        toast.success("Bonuses applied");
        router.reload();
      }
    }
  };

  console.log(serverTeam);

  return (
    <main className="min-w-screen container mx-auto flex min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <Toaster position="bottom-left" />
      {serverTeam ? (
        <div className="flex h-full flex-col items-center justify-center ">
          <header className="flex flex-col items-center space-x-2">
            <div className="flex flex-row ">
              <h1 className="text-4xl">{serverTeam.teamName}</h1>
              <button
                onClick={linkSetter}
                className="btn-ghost rounded-btn mx-2  mb-1 p-2 text-2xl transition-all"
              >
                <FiShare className="" />
              </button>
            </div>
          </header>

          <input
            type="checkbox"
            id="my-modal"
            className="modal-toggle bg-red-500"
          />
          <div className="modal">
            <div className="modal-box">
              <h3 className="text-lg font-bold">
                Are you sure you want to delete your team?
              </h3>
              <p>After deleting you can never get it back!</p>
              <div className="modal-action flex w-full justify-end">
                <label
                  htmlFor="my-modal"
                  onClick={teamDeleter}
                  className="btn btn-error"
                >
                  Yes, get rid of it
                </label>
                <label htmlFor="my-modal" className="btn btn-info">
                  {`No I'll keep it`}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex w-full flex-row items-center justify-between">
              <Link href={`/${query.league}`}>
                <button className="btn-ghost rounded-btn my-1 w-fit cursor-pointer p-2 text-2xl text-base-content transition">
                  League page
                </button>
              </Link>
              {!isStarted ? (
                <div className="flex flex-row gap-2">
                  <div className="tooltip" data-tip="Edit players">
                    <Link
                      href={{
                        pathname: "/[league]/myteam/edit",
                        query: { league: leagueName.toLowerCase() },
                      }}
                    >
                      <button className="btn-ghost rounded-btn my-1 h-fit w-fit cursor-pointer  fill-secondary p-2 text-2xl text-secondary transition">
                        <Pencil className="fill-secondary" />
                      </button>
                    </Link>
                  </div>
                  <div
                    className="tooltip"
                    data-tip={userNeedsHelp ? null : "Edit player bonuses"}
                  >
                    {userNeedsHelp && (
                      <div className="rounded-btn absolute bottom-[2.6rem] right-10 hidden w-48 flex-col bg-info p-2 text-base text-info-content md:flex">
                        <p>Make sure you apply bonuses to your players!</p>
                        <button
                          onClick={() => {
                            localStorage.setItem("UserTips", "false");
                            setUserNeedsHelp(false);
                          }}
                          className="btn btn-sm text-white"
                        >
                          got it
                        </button>
                        <span className="absolute bottom-4 right-4 text-white">
                          <FiArrowDownRight />
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        localStorage.setItem("UserTips", "false");
                        setUserNeedsHelp(false);
                      }}
                      className="btn-ghost rounded-btn my-1 w-fit cursor-pointer  p-2 text-2xl text-primary transition"
                    >
                      <label className="cursor-pointer" htmlFor="bonus">
                        <ImDice />
                      </label>
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Delete team">
                    <button className="btn-ghost rounded-btn my-1 h-fit w-fit cursor-pointer  p-2 text-2xl text-error transition">
                      <label className="cursor-pointer" htmlFor="my-modal">
                        <ImBin />
                      </label>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <div className="tooltip" data-tip="Edit players">
                    <button
                      disabled
                      className="btn-disabled btn-ghost rounded-btn my-1 w-fit cursor-pointer  p-2 text-2xl transition"
                    >
                      <Pencil />
                    </button>
                  </div>
                  <div
                    className="tooltip"
                    data-tip={"Cannot edit while tourements are live"}
                  >
                    <button
                      disabled
                      className="btn-disabled btn-ghost rounded-btn my-1 w-fit cursor-pointer  p-2 text-2xl transition"
                    >
                      <label className="cursor-pointer" htmlFor="bonus">
                        <ImDice />
                      </label>
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Delete team">
                    <button className="btn-ghost rounded-btn my-1 h-fit w-fit cursor-pointer  p-2 text-2xl text-error transition">
                      <label className="cursor-pointer" htmlFor="my-modal">
                        <ImBin />
                      </label>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex h-auto flex-col items-stretch justify-between space-y-2 rounded-lg bg-primary p-6 sm:max-w-[80vw] sm:flex-row sm:space-x-4 sm:space-y-0">
              {serverTeam &&
                serverTeam.SelectedPlayer?.map((el) => {
                  return (
                    <MyPlayer
                      key={el.name}
                      name={el.name}
                      price={el.price}
                      rareity={el.rareity}
                      img={el.image}
                      bonus={el.bonus}
                      index={0}
                      points={el.points}
                      deleteBonus={handleBonusDelete}
                      bonusEdit={false}
                    />
                  );
                })}
            </div>
          </div>
          {/* Team editing  */}
          <h2 className="my-5 text-left text-4xl">Insights</h2>
          <section className="h-full w-fit">
            <InsightsTable serverTeam={serverTeam} />
          </section>
        </div>
      ) : (
        <Loading />
      )}

      <input type="checkbox" id="bonus" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex h-5/6 max-h-full w-11/12 max-w-full select-none flex-col items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-4">
            <section className="mt-1 flex flex-wrap justify-start gap-2">
              {allBonuses.map((el, i) => {
                for (let i = 0; i < 5; i++) {
                  const element = team?.SelectedPlayer[i];
                  if (element?.bonus?.name === el.name) {
                    return (
                      <span
                        key={el.name}
                        draggable={false}
                        onClick={() => {
                          setBonusName(el.name);
                          setBonusDesc(el.description);
                        }}
                        onDragStart={(e) => handleOnDrag(e, el.name, i)}
                        className={`${`rounded-btn cursor-not-allowed bg-gray-900 p-3 text-gray-700 line-through`}`}
                      >
                        {el.name}
                      </span>
                    );
                  }
                }
                return (
                  <span
                    key={el.name}
                    draggable={true}
                    onClick={() => {
                      setBonusName(el.name);
                      setBonusDesc(el.description);
                    }}
                    onDragStart={(e) => handleOnDrag(e, el.name, i)}
                    className="rounded-btn cursor-grab bg-primary/90 p-3 text-primary-content transition-all hover:scale-105"
                  >
                    {el.name}
                  </span>
                );
              })}
            </section>
          </div>

          <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg p-6 sm:max-w-[80vw] sm:flex-row sm:space-x-4 sm:space-y-0">
            {team &&
              team.SelectedPlayer?.map((el, i) => {
                return (
                  <div
                    key={el.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleOnDrop(e, i)}
                  >
                    <MyPlayer
                      index={i}
                      deleteBonus={handleBonusDelete}
                      name={el.name}
                      price={el.price}
                      rareity={el.rareity}
                      img={el.image}
                      bonus={el.bonus}
                      bonusEdit={true}
                    />
                  </div>
                );
              })}
          </div>
          <section className="rounded-btn w-full bg-primary p-4 text-primary-content ">
            <p className="text-xl font-bold">
              <span className="text-2xl font-normal">{`${bonusName}: `}</span>
              {bonusDesc}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={HandleBonusSubmit} className="btn btn-success">
                Submit
              </button>
              <div className="modal-action m-0">
                <label htmlFor="bonus" className="btn btn-error ">
                  Cancel
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Myteam;
