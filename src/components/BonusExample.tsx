import React, { useState } from "react";
import { MyPlayer } from "./myPlayer";

type playerType = {
  id: string;
  name: string;
  price: number;
  image: string;
  rareity: string;
  statsId: string;
  teamId: string;
  bonus?: { name: string; description: string };
};

type exampleTeam = {
  id: string;
  teamName: string;
  Player: playerType[];
};

const BonusExample = () => {
  const Defaultteam: exampleTeam = {
    id: "clb6rkolq0000j9dwh0qge2ev",
    teamName: "Team 7AM",
    Player: [
      {
        id: "clb6rldmx0002j9dwhvehjk9p",
        name: "Rallen",
        price: 24000,
        image:
          "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Husky_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fSHVza3lfQ2FyZC5qcGciLCJpYXQiOjE2ODk3MTA1OTksImV4cCI6MTcyMTI0NjU5OX0.gD7E-eILojmWm2gM5v_nHsbQXcFxvHzk3ftk70bmFA8&t=2023-07-18T20%3A03%3A26.963Z",
        rareity: "gold",
        statsId: "",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhi0003j9dw2xp7vagz",
        name: "CRUC1AL",
        price: 22000,
        image:
          "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_LVN_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fTFZOX0NhcmQuanBnIiwiaWF0IjoxNjg5NzEwNjA4LCJleHAiOjE3MjEyNDY2MDh9.InNlkB11ZS_cuePsUg0iQzyESCcimXSJFvSRmdfK6JU&t=2023-07-18T20%3A03%3A35.745Z",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhj0005j9dwnl5t10af",
        name: "Thomas",
        price: 23500,
        image:
          "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Silence.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fU2lsZW5jZS5qcGciLCJpYXQiOjE2ODk3MTA2MTYsImV4cCI6MTcyMTI0NjYxNn0.dBtlwJKpIrAf_F7AZKGPess6qSYMvK0IO0RB007P87Q&t=2023-07-18T20%3A03%3A44.184Z",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhj0007j9dwhye4s3zc",
        name: "CYPHER",
        price: 23000,
        image:
          "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Vacancy_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fVmFjYW5jeV9DYXJkLmpwZyIsImlhdCI6MTY4OTcxMDYyNCwiZXhwIjoxNzIxMjQ2NjI0fQ.FIfSNOt-e0eMGnSypqwhP8qNKGGxsaur_DsnREB3tVU&t=2023-07-18T20%3A03%3A52.177Z",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhj0009j9dw5aoy6tnl",
        name: "volt",
        price: 22500,
        image:
          "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_yz0.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1feXowLmpwZyIsImlhdCI6MTY4OTcxMDYzNSwiZXhwIjoxNzIxMjQ2NjM1fQ.e6MlGpQIVdOlKIjEKwumPloaKaHmTmqI5O1Ea_TCzg8&t=2023-07-18T20%3A04%3A02.854Z",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
    ],
  };

  const allBonuses = [
    {
      name: "ADR warrior",
      description:
        "+10 points for having 85 ADR. +5 for over 70 but less than 85. -5 for less than 70",
    },
    {
      name: "All rounder",
      description:
        "+10 points for having a KAST of over 70%. +5 for having over 60% but less than 70%. -5 for anything less than 60",
    },
    {
      name: "awper",
      description:
        "+10 points for having 0.2 AWP kills per round or higher. +5 for having more than 0.12 but less than 0.2. -5 for less than 0.12",
    },
    {
      name: "Clutcher",
      description:
        "+10 points for a Clutch win % higher than 10%. +5 for higher than 1% but less than 10%. -5 for less than 1%",
    },
    {
      name: "Entry king",
      description:
        "+10 points  for anything over 0.12 entry kills per round. +5 for anything over 0.06 but not over 0.12. -5 points very anything under 0.06",
    },
    {
      name: "Head Clicker",
      description:
        "+10 points for having a headshot percentage over 65%. +5 for being over 40% but less than 65%. -5 for less than 40%",
    },
    {
      name: "PTFO",
      description:
        "+10 points for averaging 0.09  defuse/plants per round. +5 for over 0.05 but less than 0.09 . -5 for anything under 0.05",
    },
    {
      name: "Site on lock",
      description:
        "+10 points for an entry hold win % higher than 60%. +5 for higher than 40% but less than 60%. -5 for less than 40%",
    },
    {
      name: "Stat padder",
      description:
        "+10 points for having a HLTV rating (2.0) higher than 1.35. +5 for higher than 0.85. -5 for less than 0.85",
    },
    {
      name: "Trade me",
      description:
        "+10 points for averaging 0.2 trade deaths per round. +5 for over 0.15 but less than 0.2. -5 for less than 0.15",
    },
    {
      name: "Util nerd",
      description:
        "+10 points  for averaging 2 grenades thrown a round (excludes decoys). +5 for over 1.5 but less than 2. -5 for anything under 1.5",
    },
  ];

  const [team, setTeam] = useState(Defaultteam);

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
      prev!.Player[i]!.bonus = {
        name: Identifier,
        description: allBonuses[Index]?.description,
      };

      return { ...prev };
    });
  };

  const handleBonusDelete = (i: number) => {
    setTeam((prev: any) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      prev!.Player[i]!.bonus = null;

      return { ...prev };
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex select-none flex-col items-center justify-between">
      <div className="flex flex-col justify-start space-y-4">
        <section className="mx-4 mt-1 flex w-fit flex-wrap  justify-center gap-2 lg:justify-start">
          {allBonuses.map((el, i) => {
            for (let i = 0; i < 5; i++) {
              const element = team?.Player[i];

              if (element?.bonus?.name === el.name) {
                return (
                  <span
                    key={el.name}
                    draggable={false}
                    onDragStart={(e) => handleOnDrag(e, el.name, i)}
                    className={`${` rounded-btn cursor-not-allowed bg-gray-900 p-3 text-gray-700 line-through`}`}
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
                onDragStart={(e) => handleOnDrag(e, el.name, i)}
                className="tooltip rounded-btn cursor-grab bg-primary/90 p-3 text-primary-content transition-all hover:scale-105"
                data-tip={el.description}
              >
                {el.name}
              </span>
            );
          })}
        </section>
      </div>

      <div className="flex h-auto w-full flex-col items-center justify-between gap-1 rounded-lg p-6 sm:flex-row sm:gap-0 sm:space-x-4 lg:w-fit lg:items-start">
        {team &&
          team.Player?.map((el, i) => {
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
    </div>
  );
};

export default BonusExample;
