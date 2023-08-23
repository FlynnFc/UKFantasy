import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Adminlayout from "../../components/AdminLayout";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  // const path = "http://localhost:3000";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/leagues`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }

  const res2 = await fetch(`${path}/api/admins`, {
    method: "GET",
  });
  if (!res.ok) {
    console.error("error");
  }
  const temp = await res2.json();
  const data = await res.json();
  const admins = new Set(temp.map((el: { id: string }) => el.id));

  const isAdmin = admins.has(session?.user?.id);

  if (isAdmin) {
    return {
      props: {
        data,
      },
    };
  } else
    return {
      redirect: {
        destination: "/epic39",
        permanent: false,
      },
    };
}

const Points = (props: { data: any }) => {
  console.log(props);
  return (
    <Adminlayout>
      <div className="ml-2 flex flex-row gap-2">
        {props.data.map((el: { name: string; id: string }) => {
          return (
            <div
              key={el.id}
              className="rounded-btn flex h-min w-fit min-w-max flex-col gap-2 bg-base-200 p-4 uppercase text-base-content"
            >
              <h1 className="text-center text-2xl">{el.name}</h1>
              <div className="flex flex-row gap-2">
                <Link passHref href={`/${el.name.toLowerCase()}/points`}>
                  <a className="btn btn-sm cursor-pointer" target="_blank">
                    Apply points
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Adminlayout>
  );
};

export default Points;
