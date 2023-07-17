import { AnimatePresence, motion } from "framer-motion";
import { ArrowBigUp, Heart, Mailbox } from "lucide-react";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { date } from "zod";

export async function getStaticProps(paths: { params: { league: string } }) {
  // const path = "http://localhost:3000";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/getPosts`, {
    method: "GET",
    headers: { leaguename: paths.params.league },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 15,
  };
}

export async function getStaticPaths() {
  // const path = "http://localhost:3000/";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/allLeagues`, { method: "GET" });
  const data = await res.json();

  const paths = data.map((league: { name: string }) => ({
    params: { league: league.name.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

const Highlights = (props: { data: any }) => {
  const [order, setOrder] = useState<"top" | "new">("top");
  const [postModal, setPostModal] = useState(false);

  const newPostHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const posts = useMemo(() => {
    if (order === "top") {
      const sorted = props.data.sort((a: any, b: any) => b.likes - a.likes);
      return props.data;
    } else {
      const sorted = props.data.sort(
        (a: any, b: any) => Date.parse(b.submitDate) - Date.parse(a.submitDate)
      );
      return sorted;
    }
  }, [order, props.data]);
  return (
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
      <section className="flex flex-col gap-4 p-4 ">
        <section className="rounded-btn grid grid-cols-2 items-center gap-4 bg-base-300 p-2">
          <div className="flex flex-row gap-1">
            <button
              onClick={() => setOrder("top")}
              className={`rounded-btn flex flex-row gap-1 p-2 font-semibold hover:bg-base-100 active:scale-95 ${
                order === "top" && "bg-base-100"
              }`}
            >
              <ArrowBigUp /> Top
            </button>
            <button
              onClick={() => setOrder("new")}
              className={`rounded-btn flex flex-row gap-1 p-2 font-semibold hover:bg-base-100 active:scale-95 ${
                order === "new" && "bg-base-100"
              }`}
            >
              <Mailbox /> New
            </button>
          </div>
          {!postModal ? (
            <button
              onClick={() => setPostModal(true)}
              className="btn w-fit justify-self-end"
            >
              Post
            </button>
          ) : (
            <button
              onClick={() => setPostModal(false)}
              className="btn-error btn w-fit justify-self-end"
            >
              Close
            </button>
          )}
        </section>
        <AnimatePresence>
          {postModal && (
            <motion.form
              className="rounded-btn flex w-full flex-col gap-4 bg-base-300 p-6"
              onSubmit={newPostHandler}
            >
              <label htmlFor="">Title</label>
              <input
                placeholder="post title"
                className="input"
                type="text"
                name=""
                id=""
              />
              <label htmlFor="">url</label>
              <input
                placeholder="twitch clip / streamable link"
                className="input"
                type="url"
                name=""
                id=""
              />
              <button className="btn">Post</button>
            </motion.form>
          )}
          {posts.map(
            (el: {
              id: string;
              source: string;
              author: { name: string };
              likes: number;
              title: string;
            }) => {
              console.log(el);
              return (
                <Post
                  key={el.id}
                  src={el.source}
                  author={el.author.name}
                  likes={el.likes}
                  title={el.title}
                />
              );
            }
          )}
        </AnimatePresence>
        {props.data.error && props.data.error}
      </section>
    </section>
  );
};

export default Highlights;

const Post = ({
  title,
  author,
  src,
  likes,
}: {
  title: string;
  author: string;
  src: string;
  likes: number;
}) => {
  const localpath = "localhost";
  console.log(src);
  // https://www.twitch.tv/lirik/clip/AdventurousGlamorousBaboonResidentSleeper-8tEMe2_qdEjvgP3H
  const regex = /[a-zA-Z0-9_-]+/gm;
  const result = src.match(regex);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout={true}
      className="rounded-btn mb-0 flex flex-col gap-4 border-b-2 border-base-100 bg-base-300 p-4 shadow"
    >
      <div className="flex flex-row items-center justify-between text-base-content">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="text-gray-600">{author}</span>
        </div>
        <div className="w-fit">
          <LikeButton likes={likes} />
        </div>
      </div>
      <div className="">
        <iframe
          src={`https://clips.twitch.tv/embed?clip=${
            result && result?.length > 9 && result[10]
          }&parent=${localpath}`}
          allowFullScreen
          height="378"
          width="620"
          className="rounded-btn"
        ></iframe>
      </div>
    </motion.div>
  );
};

const LikeButton = ({ likes }: { likes: number }) => {
  const [postLikes, setPostLikes] = useState(likes);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      setPostLikes((prev) => prev--);
    } else {
      setPostLikes((prev) => prev++);
    }
    setIsClicked(!isClicked);
  };

  return (
    <div className="grid w-[4.2rem] grid-flow-col items-center justify-items-center">
      <button className={`active:scale-105`} onClick={handleClick}>
        <Heart className={`text-red-500 ${isClicked && "fill-red-500"}`} />
      </button>
      <span className="text-end">{postLikes}</span>
    </div>
  );
};
