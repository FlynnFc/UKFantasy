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
  // const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rareity, setRareity] = useState("");
  const [team, setTeam] = useState("");
  const submit = () => {
    console.log(name, price, rareity);
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
        <>
          <h1 className="text-center text-3xl">Create new player</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex min-h-screen items-start justify-center "
          >
            <div className="rounded-btn flex w-[40%] flex-col space-y-3 bg-base-300 p-6 text-xl">
              <label className="label">Player Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="player name"
                type="text"
                value={name}
              />
              <label className="label">price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="input"
                placeholder="price"
                type="text"
              />
              <label className="label">rareity</label>
              <select
                value={rareity}
                onChange={(e) => setRareity(e.target.value)}
                className="select"
                name="rareity"
                id="rareity"
              >
                <option selected value="bronze">
                  bronze
                </option>
                <option value="silver">silver</option>
                <option value="gold">gold</option>
              </select>
              <label className="label">Team</label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="select"
                name="team"
                id="team"
              >
                {props.data.map((el: { id: string; teamName: string }) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.teamName}
                    </option>
                  );
                })}
              </select>
              <button onClick={submit} className="btn w-full">
                Submit
              </button>
            </div>{" "}
          </form>
        </>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-xl">
            Ooops.... you&apos;re not supposed to be here{" "}
          </h1>
          <Link href={`/leagues`}>
            <button className="btn">{`Go back to ${query.league}`}</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Createplayer;
