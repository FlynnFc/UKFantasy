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
    teamName: "Into the breach",
    Player: [
      {
        id: "clb6rldmx0002j9dwhvehjk9p",
        name: "Rallen",
        price: 24000,
        image:
          "https://img-cdn.hltv.org/playerbodyshot/I1ABQFlv-1vKh0QfZqgJ2t.png?ixlib=java-2.1.0&w=400&s=a87f39842f0056664d21ced21c658e08",
        rareity: "gold",
        statsId: "",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhi0003j9dw2xp7vagz",
        name: "CRUC1AL",
        price: 22000,
        image:
          "https://img-cdn.hltv.org/playerbodyshot/NQ9EkN_JfInD-s2xphdfy9.png?ixlib=java-2.1.0&w=400&s=83ffe82afd8ab13cc2511c3d61d37a00",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhj0005j9dwnl5t10af",
        name: "Thomas",
        price: 23500,
        image:
          "https://img-cdn.hltv.org/playerbodyshot/19lZmEgLlFpQl0FP_89OEr.png?ixlib=java-2.1.0&w=400&s=ce6a66e60feacb2cbe0a6161a77f4ff2",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhj0007j9dwhye4s3zc",
        name: "CYPHER",
        price: 23000,
        image:
          "https://img-cdn.hltv.org/playerbodyshot/2O8iemGgkX6tUOUzaZrRtc.png?ixlib=java-2.1.0&w=400&s=d4568a843a84deae87421c508b5a01b6",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
      {
        id: "clb6rmzhj0009j9dw5aoy6tnl",
        name: "volt",
        price: 22500,
        image:
          "https://img-cdn.hltv.org/playerbodyshot/UWZQElkD5-inGTM72NGJXU.png?ixlib=java-2.1.0&w=400&s=763997cba47f7fe1c765ded00e2cd181",
        rareity: "gold",
        statsId: "clb3wv98b0000j9fgp1eqw0xj",
        teamId: "clb6rkolq0000j9dwh0qge2ev",
      },
    ],
  };

  const allBonuses = [
    {
      name: "1 Tap king",
      description: "Headshot kills grants bonus points",
    },
    {
      name: "ADR Merchant",
      description: "High ADR grants bonus points",
    },
    {
      name: "AWPer",
      description: "AWP kills grant bonus points",
    },
    {
      name: "Entry fragger",
      description: "Entry kills grant bonus points",
    },
    {
      name: "let him cook",
      description: "Players who perform well late round get bonus points",
    },
    {
      name: "Nart out here demon",
      description: "Flashs assits, Nade & Mollo dmg grant bonus points",
    },
    {
      name: "Noob",
      description: "Rounds with 0% KAST grant bonus points",
    },
    {
      name: "SashAFP Cosplay",
      description: "Teamflashs grant bonus points",
    },
    {
      name: "Scream wanna be",
      description: "High headshot % grants bonus points",
    },
    {
      name: "Stevie Wonder",
      description: "Time flashed grants bonus points",
    },
    {
      name: "The Gardener",
      description: "Bomb plants grant bonus points",
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
        <section className="mx-4 mt-1 flex w-fit flex-wrap justify-center gap-2 lg:justify-start">
          {allBonuses.map((el, i) => {
            for (let i = 0; i < 5; i++) {
              const element = team?.Player[i];
              console.log(element);
              if (element?.bonus?.name === el.name) {
                return (
                  <span
                    key={el.name}
                    draggable={false}
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
                onDragStart={(e) => handleOnDrag(e, el.name, i)}
                className="rounded-btn cursor-grab bg-primary/90 p-3 text-primary-content transition-all hover:scale-105"
              >
                {el.name}
              </span>
            );
          })}
        </section>
      </div>

      <div className="flex h-auto w-full flex-col items-stretch justify-between gap-1 rounded-lg p-6 sm:flex-row sm:gap-0 sm:space-x-4 lg:w-fit lg:items-start">
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
