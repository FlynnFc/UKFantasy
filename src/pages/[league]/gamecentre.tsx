import React, { useState } from "react";
import { stream } from "../../components/AllLiveChannels";
import { BsFillCircleFill } from "react-icons/bs";

export async function getStaticProps(paths: { params: { league: string } }) {
  // const path = "http://localhost:3000";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/leagues`, {
    method: "GET",
    headers: { leaguename: paths.params.league },
  });
  const data = await res.json();
  const streamsRes = await fetch(`${path}/api/twitchstreams`);
  const streamData = await streamsRes.json();
  const streams = streamData.data;
  return {
    props: {
      data,
      streams,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  // const path = "http://localhost:3000";
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/leagues`, { method: "GET" });
  const data = await res.json();

  const paths = data.map((league: { name: string }) => ({
    params: { league: league.name.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

const Gamecenter = (props: { streams: stream[] }) => {
  console.log(props);
  const [currentStream, setCurrentStream] = useState("");

  const streamHandler = (name: string) => {
    setCurrentStream(name);
  };
  return (
    <main className="min-w-screen   flex min-h-[88.3vh] flex-col gap-2 bg-blue-100  p-4">
      <section className="grid w-full grid-cols-12 gap-3">
        <section className="rounded-btn col-span-2 bg-base-300">
          <ul className="max-h-screen overflow-auto">
            <CustomStreamLink
              current={currentStream}
              selector={streamHandler}
              user_name={"xqc"}
              live={true}
              title={"testing this stream"}
              viewer_count={2}
            />
            <CustomStreamLink
              current={currentStream}
              selector={streamHandler}
              user_name={"lirik"}
              live={true}
              title={"Yoo its lirik"}
              viewer_count={2}
            />
          </ul>
        </section>
        <section className="col-span-8 flex items-center justify-center ">
          <iframe
            className="rounded-btn"
            src={`https://player.twitch.tv/?channel=${currentStream}&parent=localhost`}
            allowFullScreen
            height="792"
            width="1408"
          ></iframe>
        </section>
        <section className="rounded-btn col-span-2 w-full bg-base-300">
          players
        </section>
      </section>
    </main>
  );
};

const CustomStreamLink = (props: any) => {
  return (
    <li
      onClick={() => props.selector(props.user_name)}
      className={` ${
        props.current === props.user_name && "bg-primary"
      } flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 p-2 text-center transition-all first:rounded-t-lg  hover:bg-base-200`}
    >
      <div className="inline-block w-full min-w-0 flex-col items-start text-left">
        <h4 className="text-lg">{props.user_name}</h4>
        <p className="block overflow-hidden truncate text-xs">{props.title}</p>
      </div>

      <span className="flex flex-row items-center gap-1 text-xs font-bold text-red-500">
        {props.live ? (
          <>
            <BsFillCircleFill />
            <span>{props.viewer_count}</span>
          </>
        ) : (
          <h4 className="text-sm text-base-content"></h4>
        )}
      </span>
    </li>
  );
};

export default Gamecenter;
