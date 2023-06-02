import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Round from "../../../components/Round";
import { AiOutlineCheckCircle, AiOutlineInfoCircle } from "react-icons/ai";

export async function getServerSideProps(context: any) {
  const url = context.req.url;
  console.log(url);
  const res = await fetch(
    "https://esportsfantasy.app/api/allUserTeamsByLeague",
    {
      method: "GET",
      headers: { url: JSON.stringify(url) },
    }
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Index = (props: any) => {
  console.log(props);
  const currentRound = useMemo(
    () => props.data[0].SelectedPlayer[1].points,
    [props.data]
  );

  const [selectedRound, setSelectedRound] = useState(currentRound.length + 1);
  return (
    <div className="min-w-screen container flex h-full min-h-screen max-w-7xl  select-none flex-col items-center justify-start gap-4 sm:mx-auto">
      <h1 className="mb-5 text-5xl">Epic39 point dashboard</h1>
      <div className="grid grid-cols-6">
        {currentRound.map((el: number, idx: number) => {
          console.log(el, idx);
          if (idx === 0) {
            return (
              <button
                onClick={() => setSelectedRound(idx + 1)}
                key={idx}
                className={`join-item  btn rounded-none ${
                  idx + 1 === selectedRound && "btn-active"
                }`}
              >
                {`Round ${idx + 1}`}
              </button>
            );
          } else if (idx === currentRound.length - 1) {
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
          } else {
            return (
              <button
                onClick={() => setSelectedRound(idx + 1)}
                key={idx}
                className={`join-item  btn rounded-none ${
                  idx + 1 === selectedRound && "btn-active"
                }`}
              >
                {`Round ${idx + 1}`}
              </button>
            );
          }
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
      <Round data={props.data} selectedRound={selectedRound} />
      <div className="collapse w-max bg-info">
        <input type="checkbox" />
        <div className="collapse-title flex flex-row gap-1 text-xl font-medium">
          What format does the file need to follow? <AiOutlineInfoCircle />
        </div>
        <div className="collapse-content rounded-btn w-[36rem]">
          <ul className="flex flex-col items-start gap-1">
            <li className="flex flex-row items-center justify-center gap-2">
              <AiOutlineCheckCircle className="text-xl" /> There must be a
              points, steamid, and name column
            </li>
            <li className="flex flex-row items-center justify-center gap-2">
              <AiOutlineCheckCircle className="text-xl" /> The points column
              must include numbers exclusively
            </li>
            <li className="flex flex-row items-center justify-center gap-2">
              <AiOutlineCheckCircle className="text-xl" /> Must use steamid64
              (76561198.....)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
