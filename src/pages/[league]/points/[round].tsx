import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

export async function getServerSideProps() {
  const res = await fetch("https://uk-fantasy.vercel.app/api/allTeams");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Createplayer = (props: { data: [] }) => {
  const admins = useMemo(() => new Set(["mastare.flynn@gmail.com"]), []);
  const { query } = useRouter();
  const session = useSession();
  const [authorised, setAuthorised] = useState(false);
  const current = useMemo(() => {
    const currentRound = query.round;
    return parseInt(currentRound?.slice(5) as string);
  }, [query]);

  // const [formData, setFormData] = useState({});
  const submit = () => {
    console.log(current);
  };

  //todo
  const roundStatsFetcher = () => {
    //calls bucket to find round by league and number
    //If no file found return round never submitted
  };

  useEffect(() => {
    if (
      session.data?.user?.email &&
      admins.has(session.data?.user?.email?.toString())
    ) {
      setAuthorised(true);
    } else setAuthorised(false);
  }, [admins, session.data?.user?.email]);

  return (
    <div>
      {authorised ? (
        <section className="flex min-h-screen w-auto flex-col justify-start gap-2">
          <h1 className="text-center text-3xl">{`Submit stats for round ${current}`}</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col items-center justify-center gap-4"
          >
            <div className="rounded-btn flex w-[40%] flex-col space-y-3 bg-base-300 p-6 text-xl">
              <input
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="file-input"
                type="file"
                name="roundFile"
                id="roundFile"
              />

              <button onClick={submit} className="btn w-full">
                Submit round
              </button>
            </div>
            <Link href={`./round${current + 1}`}>
              <button className="btn-accent btn w-max">{`Submit new round`}</button>
            </Link>
          </form>
        </section>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-xl">
            Ooops.... you&apos;re not supposed to be here{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Createplayer;
