import Link from "next/link";
import React from "react";

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
  console.log(props);
  return (
    <div className="container mx-auto flex min-h-screen select-none flex-col items-start gap-8 p-4 md:grid md:grid-cols-6 md:grid-rows-1">
      {props.data.map((el) => {
        return (
          <div key={el.id} className="flex flex-col gap-2 bg-base-300 p-4">
            <h1 className="text-center text-2xl">{el.name}</h1>
            <Link passHref href={`/${el.name.toLowerCase()}/points`}>
              <a
                className="btn-primary btn-sm btn  w-full cursor-pointer"
                target="_blank"
              >
                Apply points
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
