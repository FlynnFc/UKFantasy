import Link from "next/link";
import React, { useMemo } from "react";

export async function getServerSideProps() {
  // const path = "http://localhost:3000/";
  const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}api/allLeagues`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Admin = (props: {
  data: [{ id: string; name: string; offical: boolean }];
}) => {
  const cols = useMemo(() => {
    return props.data.length;
  }, [props.data.length]);
  console.log(props.data.length);
  return (
    <div className={`container mx-auto min-h-screen w-full max-w-xl`}>
      <div
        className={`flex-wrap items-start justify-center gap-10 p-4 md:grid  md:grid-cols-${cols}  md:grid-rows-2`}
      >
        {props.data.map((el) => {
          return (
            <div
              key={el.id}
              className="rounded-btn flex h-min min-w-[5rem] flex-col gap-2 bg-base-content p-4 uppercase text-base-100 shadow"
            >
              <h1 className="text-center text-2xl">{el.name}</h1>
              <Link target="_blank" href={`/${el.name.toLowerCase()}/points`}>
                <button className="btn-sm btn">Apply points</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
