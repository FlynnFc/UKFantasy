import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Settings = () => {
  const [themeChosen, setTheme] = useState<string>("");
  const [name, setName] = useState("");
  const session = useSession();
  function themeSubmitter() {
    localStorage.setItem("theme", themeChosen);
    toast.success("Theme changed");
  }

  function newName(val: string) {
    setName(() => val);
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    toast.promise(newNameSubmitter(e), {
      loading: "Saving...",
      success: <b>Name Saved!</b>,
      error: <b>Try again later</b>,
    });
  }

  async function newNameSubmitter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitting", name);
    const reqBody = await { name: name, id: session.data?.user?.id };
    const JSONbody = await JSON.stringify(reqBody);
    try {
      const res = await fetch(`./api/userNameUpdate`, {
        method: "PUT",
        body: JSONbody,
      });
      if (!res) {
        console.error("woops");
      } else {
        console.log("name submitted!");
      }
    } catch (error) {
      console.error("woops");
    }
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
      <div className="h-full w-[30rem] rounded-lg bg-base-300 p-8">
        <Toaster position="bottom-left" />
        <form className="form" onSubmit={(e) => submitHandler(e)}>
          <label className="label text-xl" htmlFor="name">
            Display Name
          </label>
          <input
            type="text"
            className="input w-full max-w-xs"
            placeholder="Display name"
            onChange={(e) => newName(e.target.value)}
          />
          <button type="submit" className="btn-success btn-sm btn mx-2">
            Submit
          </button>
        </form>
        <form className="form" action="">
          <label className="label mt-1 text-xl" htmlFor="name">
            Theme
          </label>
          <select
            onChange={(e) => setTheme(e.target.value)}
            className="select w-full max-w-xs"
          >
            <option disabled selected>
              Choose a theme
            </option>
            <option value={"winter,night"}>Default</option>
            <option value={"corporate,business"}>Microsoft</option>
            <option value={"lofi,black"}>Minimal</option>
            <option value={"cyberpunk,synthwave"}>{`What's this?`}</option>
          </select>
          <button
            onClick={themeSubmitter}
            className="btn-success btn-sm btn mx-2"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Settings;
