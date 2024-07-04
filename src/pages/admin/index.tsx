import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import {
  BsFillCalculatorFill,
  BsFillCollectionFill,
  BsGraphUp,
  BsReverseListColumnsReverse,
} from "react-icons/bs";
import Adminlayout from "../../components/AdminLayout";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  // const path = "http://localhost:3000";
  const path = "https://uk-fantasy.vercel.app";
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

const Admin = (props: {
  data: [{ id: string; name: string; offical: boolean }];
}) => {
  const [page, setPage] = useState("points");
  return <Adminlayout></Adminlayout>;
};

export default Admin;
