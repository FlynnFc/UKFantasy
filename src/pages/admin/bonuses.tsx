import React, { useMemo, useState } from "react";
import Adminlayout from "../../components/AdminLayout";

export async function getStaticProps(paths: { params: { league: string } }) {
  // const path = "http://localhost:3000/";
  const path = "https://esportsfantasy.app/";

  const res = await fetch(`${path}api/allBonuses`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }
  const data = await res.json();

  // const res2 = await fetch(`${path}/api/getLeague`, {
  //   method: "GET",
  //   headers: { leagueName: paths.params.league },
  // });
  // const data2 = await res2.json();

  return {
    props: {
      data,
      // data2,
    },
    revalidate: 120,
  };
}

const Bonuses = ({ data }: any) => {
  const [selectedBonus, setSelectedBonus] = useState("");
  const [newName, setNewName] = useState<string | undefined>(undefined);
  const [newDescription, setNewDescription] = useState<string | undefined>(
    undefined
  );
  const bonusMap = useMemo(() => {
    const temp = new Map();
    data.map((val: { name: string; description: string }, i: number) => {
      temp.set(val.name, i);
    });
    return temp;
  }, [data]);

  return (
    <Adminlayout>
      <div className="flex w-full flex-col justify-start gap-2 ">
        <section className="mx-auto grid w-full max-w-2xl gap-4">
          <select className="select-bordered select" name="" id="">
            <option value="edit">Edit bonuses</option>
            <option disabled value="create">
              Add new bonus
            </option>
          </select>
          <form className="rounded-btn grid gap-2 bg-base-300 p-3" action="">
            <label className="label" htmlFor="">
              What Bonus would you like to edit?
            </label>
            <select
              onChange={(e) => setSelectedBonus(e.target.value)}
              defaultValue={"default"}
              name=""
              id=""
              className="select w-full"
            >
              <option value="default" disabled>
                Bonuses
              </option>
              {data.map((el: { name: string; description: string }) => (
                <option value={el.name} key={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
            {selectedBonus && (
              <div className="grid gap-2">
                <h3 className="prose mt-2 text-3xl">Basics</h3>
                <label htmlFor="" className="label">
                  Bonus name
                </label>
                <input
                  onChange={(e) => setNewName(e.target.value)}
                  value={
                    newName === undefined
                      ? data[bonusMap.get(selectedBonus)].name
                      : newName
                  }
                  type="text"
                  className="input"
                />

                <label htmlFor="" className="label">
                  Bonus Description
                </label>
                <textarea
                  rows={4}
                  cols={50}
                  onChange={(e) => setNewDescription(e.target.value)}
                  value={
                    newDescription === undefined
                      ? data[bonusMap.get(selectedBonus)].description
                      : newDescription
                  }
                  className="input"
                />
                <h3 className="prose mt-2 text-3xl">Bonus bounds</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label" htmlFor="">
                      Upper limit (value for +10 points)
                    </label>
                    <input
                      type="number"
                      name=""
                      className="input w-full"
                      min={0}
                      id=""
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="">
                      Mid limit (value for +5 points)
                    </label>
                    <input
                      type="number"
                      name=""
                      className="input  w-full"
                      min={0}
                      id=""
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <button disabled className="btn-success btn">
                Submit
              </button>
              <button
                disabled={
                  newDescription !== undefined || newName !== undefined
                    ? false
                    : true
                }
                type="button"
                onClick={() => {
                  setNewDescription(undefined);
                  setNewName(undefined);
                }}
                className="btn-secondary btn"
              >
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </Adminlayout>
  );
};

export default Bonuses;
