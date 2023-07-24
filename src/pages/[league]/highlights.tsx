import { highlightLike } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowBigUp, Heart, Mailbox } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";

export async function getStaticProps(paths: { params: { league: string } }) {
  // const path = "http://localhost:3000";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/getPosts`, {
    method: "GET",
    headers: { leaguename: paths.params.league },
  });
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
    revalidate: 5,
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

type PostType = {
  title: string;
  source: string;
  author: string;
  league: string;
};

const Highlights = (props: { data: any }) => {
  console.log(props);
  const [order, setOrder] = useState<"top" | "new">("top");
  const [postModal, setPostModal] = useState(false);
  const { status, data } = useSession();
  const [newPost, setNewPost] = useState<PostType>();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const { query } = useRouter();
  const newPostHandler = async () => {
    try {
      if (data?.user && title.length && source.length) {
        {
          const result = source.match(new RegExp(`/clip/([^/]+)`))?.[1];
          const result2 = source.match(
            new RegExp(`(?<=https://streamable.com/)[a-zA-Z0-9]+`)
          );
          if (!result && !result2) {
            throw new Error("Please uses a streamable or twitch clip");
          }
        }

        const res = await fetch("/api/postHighlight", {
          method: "POST",
          body: await JSON.stringify({
            title: title,
            source: source,
            author: data.user.id,
            league: query.league,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to submit post");
        }
        setTitle("");
        setSource("");
        return res;
      } else {
        throw new Error("Not enough params passed in form");
      }
    } catch (error) {
      throw error;
    }
  };

  const newPostSubmitter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(newPostHandler(), {
      loading: "Posting...",
      success: <b>Your post is up!</b>,
      error: <b>Could not post.</b>,
    });
  };

  const posts = useMemo(() => {
    if (order === "top") {
      const sorted = props.data.sort((a: any, b: any) => b.likes - a.likes);
      return sorted;
    } else {
      const sorted = props.data.sort(
        (a: any, b: any) => Date.parse(b.submitDate) - Date.parse(a.submitDate)
      );
      return sorted;
    }
  }, [order, props.data]);
  return (
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
      <Toaster position="top-center" />
      <section className="flex flex-col gap-4 p-4 ">
        <section className="rounded-btn grid min-w-[35rem] grid-cols-2 items-center gap-4 bg-base-300 p-2">
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
          {status === "authenticated" &&
            (!postModal ? (
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
            ))}
        </section>
        <AnimatePresence>
          {postModal && (
            <motion.form
              className="rounded-btn flex w-full flex-col gap-3 bg-base-300 p-6"
              onSubmit={newPostSubmitter}
            >
              <label className="label-text font-semibold" htmlFor="">
                Title
              </label>
              <input
                minLength={4}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="post title"
                className="input"
                type="text"
                name=""
                id=""
              />
              <label className="label-text font-semibold" htmlFor="">
                url
              </label>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="twitch clip / streamable link"
                className="input"
                type="url"
                name=""
                id=""
              />
              <button className="btn">Post</button>
            </motion.form>
          )}
          {posts.length > 0 ? (
            posts.map(
              (el: {
                id: string;
                source: string;
                author: { name: string };
                highlightLike: highlightLike[];
                title: string;
              }) => {
                return (
                  <Post
                    key={el.id}
                    src={el.source}
                    author={el.author.name}
                    likes={el.highlightLike}
                    title={el.title}
                    id={el.id}
                  />
                );
              }
            )
          ) : (
            <div className="text-center">
              Be the first to post a highlight for {query.league}!
            </div>
          )}
        </AnimatePresence>
        <button className="btn">Load more</button>
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
  id,
}: {
  title: string;
  author: string;
  src: string;
  likes: highlightLike[];
  id: string;
}) => {
  const localpath = "localhost";
  const Y = "/clip/";
  const [playerType, setPlayerType] = useState("");
  // https://www.twitch.tv/lirik/clip/AdventurousGlamorousBaboonResidentSleeper-8tEMe2_qdEjvgP3H
  const videoURL = useMemo(() => {
    const result = src.match(new RegExp(`${Y}([^/]+)`))?.[1];
    if (result) {
      setPlayerType("twitch");
      return result;
    }
    const result2 = src.match(
      new RegExp(`(?<=https://streamable.com/)[a-zA-Z0-9]+`)
    );
    if (result2) {
      setPlayerType("streamable");
      return result2[0];
    }
  }, [src]);

  console.log(videoURL);
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
          <LikeButton id={id} vidId={videoURL ? videoURL : ""} likes={likes} />
        </div>
      </div>
      <div className="">
        {playerType === "streamable" && (
          <iframe
            src={`https://streamable.com/e/${videoURL}`}
            height="400"
            width="710"
            allowFullScreen
            className="rounded-btn"
          ></iframe>
        )}

        {playerType === "twitch" && (
          <iframe
            src={`https://clips.twitch.tv/embed?clip=${videoURL}&parent=${localpath}`}
            allowFullScreen
            height="400"
            width="710"
            className="rounded-btn"
          ></iframe>
        )}
      </div>
    </motion.div>
  );
};

const LikeButton = ({
  likes,
  id,
  vidId,
}: {
  likes: highlightLike[];
  id: string;
  vidId: string;
}) => {
  const { data } = useSession();
  const [postLikes, setPostLikes] = useState(likes.length);
  const [isClicked, setIsClicked] = useState<boolean>();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    likes.forEach((el) => {
      if (el.userId === data?.user?.id) {
        setIsClicked(true);
      }
    });
  });

  // When someone likes start a 2 second timer and everytime they like/unlike restart it, if the 2 second timer finishes add a like to the db
  // When firing like to db log video ids in cookies?

  const handleClick = () => {
    if (isClicked) {
      setPostLikes((prev) => prev - 1);
    } else {
      setPostLikes((prev) => prev + 1);
    }
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    const delayedSubmit = async () => {
      console.log("Function executed after 5 seconds.");
      const res = await fetch("/api/updatelikes", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          likedBy: data?.user?.id,
          isLiked: await isClicked,
        }),
      });
      if (!res.ok) {
        throw new Error("Could not update");
      } else {
        return res;
      }
      // Add your desired code to execute here
    };

    const timer = setTimeout(() => delayedSubmit(), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, postLikes]);

  return (
    <div className="grid grid-flow-col items-center justify-items-center gap-2">
      {isClicked !== undefined && (
        <>
          <span className="text-end">{postLikes}</span>
          <button className={`active:scale-105`} onClick={handleClick}>
            <Heart className={`text-red-500 ${isClicked && "fill-red-500"}`} />
          </button>
        </>
      )}
    </div>
  );
};
