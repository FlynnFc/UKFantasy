import React from "react";
import { MyPlayer } from "../components/myPlayer";

const myteam = () => {
  const user = "Flynn";
  const seed = [
    { name: "Lvn", price: 22000, rareity: "gold", team: "God Squad" },
    { name: "Smooya", price: 30000, rareity: "gold", team: "God Squad" },
    { name: "Haznoodle", price: 20000, rareity: "silver", team: "God Squad" },
    { name: "Dweg", price: 200, rareity: "bronze", team: "God Squad" },
    { name: "Edeninho", price: 7.3, rareity: "bronze", team: "God Squad" },
  ];
  return (
    <main className="min-w-screen container mx-auto flex min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <h1 className="mb-10 text-4xl">{`${user}'s Team`}</h1>
      <div className="flex w-[70vw] flex-row justify-between space-x-2 bg-base-300 p-6">
        {seed.map((el) => {
          return (
            <MyPlayer
              key={el.name}
              name={el.name}
              price={el.price}
              rareity={el.rareity}
            />
          );
        })}
      </div>
    </main>
  );
};

export default myteam;
