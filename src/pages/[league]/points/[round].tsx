import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

export async function getServerSideProps(context: any) {
  const url = context.req.url;
  console.log(url);
  const processed = url.split("/");
  const res = await fetch("https://uk-fantasy.vercel.app/api/userteam", {
    method: "GET",
    headers: { leaguename: processed[1] },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Round = () => {
  return <h1>This page is no longer used</h1>;
};
export default Round;
