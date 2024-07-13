import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //   const path = "http://localhost:3000";
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/pickemstats`, {
    method: "GET",
    headers: {
      leaguename: context.params?.league as string,
    },
  });
  const data = await res.json();
  const res2 = await fetch(`${path}/api/pickem`, {
    method: "GET",
    headers: {
      league: context.params?.league as string,
    },
  });
  const pickems = await res2.json();

  return {
    props: {
      data: { data, pickems },
    },
    // revalidate: 300,
  };
}

// export async function getStaticPaths() {
//   // const path = "http://localhost:3000";
//   const path = "https://uk-fantasy.vercel.app";
//   const res = await fetch(`${path}/api/leagues`, { method: "GET" });
//   const data = await res.json();

//   const paths = data.map((league: { name: string }) => ({
//     params: { league: league.name.toLowerCase() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
const Stats = (props: any) => {
  console.log(props);

  const [screenWidth, setScreenWidth] = useState(1000);

  function compare(a: any, b: any) {
    if (a.freq > b.freq) {
      return -1;
    }
    if (a.freq < b.freq) {
      return 1;
    }

    return 0;
  }
  const teamFreq = useMemo(() => {
    const elements: any[] = [];
    props.data.data.Teams.forEach((el: any) => {
      elements.push({ name: el.teamName, freq: el.pickem.length });
    });
    elements.sort(compare);
    return elements;
  }, [props.data.data.Teams]);

  const winFreq = useMemo(() => {
    const elements: any[] = [];
    props.data.pickems.forEach((el: any) => {
      elements.push(el.highestRating);
    });
    const frequencyMap = new Map();

    elements.forEach((string) => {
      // Increment the string's count if it already exists, otherwise set to 1
      if (frequencyMap.has(string)) {
        frequencyMap.set(string, frequencyMap.get(string) + 1);
      } else {
        frequencyMap.set(string, 1);
      }
    });
    const out = Array.from(frequencyMap, ([name, freq]) => ({ name, freq }));
    out.sort(compare);
    return out;
  }, [props.pickems]);
  const loseFreq = useMemo(() => {
    const elements: any[] = [];
    props.data.pickems.forEach((el: any) => {
      elements.push(el.lowestRating);
    });
    const frequencyMap = new Map();

    elements.forEach((string) => {
      // Increment the string's count if it already exists, otherwise set to 1
      if (frequencyMap.has(string)) {
        frequencyMap.set(string, frequencyMap.get(string) + 1);
      } else {
        frequencyMap.set(string, 1);
      }
    });
    const out = Array.from(frequencyMap, ([name, freq]) => ({ name, freq }));
    out.sort(compare);
    return out;
  }, [props.pickems]);
  console.log(props);
  return (
    <main className="min-w-screen container flex h-full min-h-[88.3vh]  max-w-6xl select-none flex-col items-center justify-start  p-4 sm:mx-auto">
      <h1 className="mb-12 w-4/6 text-center text-4xl font-semibold md:text-6xl xl:text-[3rem] xl:leading-tight">
        Pickem Stats
      </h1>
      <section className="flex flex-col md:flex-row">
        <section>
          <h2 className="text-center text-3xl">
            Teams picked to make playoffs
          </h2>
          <BarChart
            width={screenWidth * 0.65}
            height={400}
            data={teamFreq}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltipBlue />} />
            <Bar fill="#3457d4" dataKey={"freq"} stackId="a" />
            <Legend />
          </BarChart>
        </section>
        <section>
          <h2 className="text-center text-3xl ">Teams picked to win groups</h2>
          <BarChart
            width={screenWidth * 0.65}
            height={400}
            data={winFreq}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltipGreen />} />
            <Bar fill="#34d457" dataKey={"freq"} stackId="a" />
            <Legend />
          </BarChart>
        </section>
      </section>
      <section>
        {" "}
        <h2 className="text-center text-3xl ">
          Teams picked to be the lowest rated
        </h2>
        <BarChart
          width={screenWidth * 0.65}
          height={400}
          data={loseFreq}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltipRed />} />
          <Bar fill="#d43934" dataKey={"freq"} stackId="a" />
          <Legend />
        </BarChart>
      </section>
    </main>
  );
};

const CustomTooltipRed = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label" style={{ color: "#d43934" }}>{`${label}`}</p>
        <p
          className="intro"
          style={{ color: "#333" }}
        >{`freq : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomTooltipGreen = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label" style={{ color: "#34d457" }}>{`${label}`}</p>
        <p
          className="intro"
          style={{ color: "#333" }}
        >{`freq : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomTooltipBlue = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label" style={{ color: "#3457d4" }}>{`${label}`}</p>
        <p
          className="intro"
          style={{ color: "#333" }}
        >{`freq : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default Stats;
