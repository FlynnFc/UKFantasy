import Link from "next/link";
import React from "react";

const TeamButtonTable = (props: { name: string; id: string }) => {
  return (
    <>
      <Link href={`/team/${props.id}`}>
        <button className="rounded p-2 transition-none hover:bg-base-300">
          {props.name}
        </button>
      </Link>
    </>
  );
};

export default TeamButtonTable;
