import React, { useState } from "react";

export async function getStaticProps() {
  const res = await fetch("https://uk-fantasy.vercel.app/api/allTeams");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Createplayer = (props: { data: any[] }) => {
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rareity, setRareity] = useState("");
  const [team, setTeam] = useState("");
  const submit = (e: any) => {
    console.log(name, price, rareity);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex min-h-screen  items-center justify-center "
    >
      <div className="flex w-[40%] flex-col space-y-2 rounded bg-base-300 p-5">
        <label className="label">Player Name</label>
        <input
          onChange={(e: any) => setName(e.target.value)}
          className="input"
          placeholder="player name"
          type="text"
          value={name}
        />
        <label className="label">price</label>
        <input
          onChange={(e: any) => setPrice(e.target.value)}
          value={price}
          className="input"
          placeholder="price"
          type="text"
        />
        <label className="label">rareity</label>
        <select
          value={rareity}
          onChange={(e: any) => setRareity(e.target.value)}
          className="select"
          name="rareity"
          id="rareity"
        >
          <option selected value="bronze">
            bronze
          </option>
          <option value="silver">silver</option>
          <option value="gold">gold</option>
        </select>
        <label className="label">Team</label>
        <select
          value={team}
          onChange={(e: any) => setTeam(e.target.value)}
          className="select"
          name="team"
          id="team"
        >
          {props.data.map((el: any) => {
            return (
              <option key={el.id} value={el.id}>
                {el.teamName}
              </option>
            );
          })}
        </select>
        <button onClick={submit} className="btn w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Createplayer;
