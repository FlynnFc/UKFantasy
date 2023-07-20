import React, { useState } from "react";
import toast from "react-hot-toast";

type LeagueData = {
  Teams: {
    teamName: string;
    id: string;
    Player: { id: string; name: string }[];
  }[];
};

const PlayerEditAdmin = () => {
  const [selectedLeague, setSelectedLeague] = useState("epic39");
  const [leagueData, setLeagueData] = useState<LeagueData>();

  const leagueDataHandler = async (league: string) => {
    const res = await fetch(`/api/allTeams`, {
      method: "GET",
      headers: { leaguename: league },
    });
    if (!res.ok) {
      console.error("error", res);
      return;
    }
    const data = await res.json();
    setLeagueData(data);
  };

  const [playerName, setPlayerName] = useState("");
  const [playerPrice, setPlayerPrice] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [playerData, setPlayerData] = useState();

  const playerDataHandler = async (player: string) => {
    const res = await fetch(`/api/playerById`, {
      method: "GET",
      headers: { id: player },
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
    const data = await res.json();
    setPlayerData(data);
    setPlayerName(data.name);
    setPlayerPrice(data.price);
  };

  const submiter = async () => {
    const playerinfo = JSON.stringify({ name: playerName, price: playerPrice });
    const res = await fetch(`/api/updatePlayer`, {
      method: "POST",
      headers: { id: selectedPlayer },
      body: playerinfo,
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
  };

  const playerUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(submiter(), {
      loading: "Updating player...",
      success: <b>Updated!</b>,
      error: <b>Could not update.</b>,
    });
  };
  return (
    <div className="grid w-full max-w-3xl gap-2 ">
      <label className="label">What league is the player in?</label>
      <select
        onChange={(e) => {
          setSelectedLeague(e.target.value);
          leagueDataHandler(e.target.value);
        }}
        className="select-bordered select w-full"
      >
        <option selected disabled value="">
          League
        </option>
        <option value="epic39">Epic39</option>
        <option value="demo">Demo</option>
      </select>

      {leagueData && (
        <>
          <label htmlFor="" className="label">
            What is the players name?
          </label>
          <select
            value={selectedPlayer}
            onChange={(e) => {
              setSelectedPlayer(e.target.value);
              playerDataHandler(e.target.value);
            }}
            className="select-bordered select"
          >
            {leagueData &&
              leagueData.Teams.map((team) => {
                return (
                  <optgroup key={team.teamName} label={team.teamName}>
                    {team.Player.map((player) => (
                      <option value={player.id} className="p-1" key={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
          </select>
        </>
      )}

      {playerData && (
        <form
          className="rounded-btn flex flex-col gap-3 bg-base-300 p-4"
          onSubmit={(e) => playerUpdateHandler(e)}
        >
          <h2 className="text-center text-xl">Edit details</h2>
          <div className="flex flex-col">
            <label className="label" htmlFor="">
              Name
            </label>
            <input
              value={playerName ? playerName : ""}
              onChange={(e) => setPlayerName(e.target.value)}
              className="input-bordered input"
              type="text"
              placeholder="playername"
            />
            <label className="label" htmlFor="">
              Price
            </label>
            <input
              value={playerPrice ? playerPrice : 0}
              onChange={(e) => setPlayerPrice(parseInt(e.target.value))}
              className="input-bordered input"
              type="number"
              placeholder="price"
            />
          </div>
          <button className="btn">Update</button>
        </form>
      )}
    </div>
  );
};

export default PlayerEditAdmin;
