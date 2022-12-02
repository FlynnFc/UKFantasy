import React from "react";

const Createplayer = () => {
  const submit = (e: any) => {
    e.prevetDefault();
    console.log(submit);
  };
  return (
    <form className="flex min-h-screen  items-center justify-center ">
      <div className="flex w-[40%] flex-col space-y-2 rounded bg-base-300 p-5">
        <label className="label">Player Name</label>
        <input className="input" placeholder="player name" type="text" />
        <label className="label">price</label>
        <input className="input" placeholder="price" type="text" />
        <label className="label">rareity</label>
        <select className="select" name="rareity" id="rareity">
          <option value="bronze">bronze</option>
          <option value="silver">silver</option>
          <option value="gold">gold</option>
        </select>
        <button className="btn w-full">Submit</button>
      </div>
    </form>
  );
};

export default Createplayer;
