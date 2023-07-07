import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Filter from "bad-words";

const filter = new Filter();
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
    const reqBody = await {
      name: filter.clean(name),
      id: session.data?.user?.id,
    };
    const JSONbody = await JSON.stringify(reqBody);
    try {
      const res = await fetch(`./api/userNameUpdate`, {
        method: "PUT",
        body: JSONbody,
      });
      if (!res) {
        console.error("woops");
      } else {
        setName("");
      }
    } catch (error) {
      console.error("woops");
    }
  }

  return (
    <section className="rounded-btn flex h-full w-full flex-col justify-start bg-base-300 p-8 md:w-[30rem]">
      <Toaster position="bottom-left" />
      <form className="form " onSubmit={(e) => submitHandler(e)}>
        <label className="label text-xl" htmlFor="name">
          Change Display Name
        </label>
        <input
          type="text"
          className="input w-full max-w-xs"
          placeholder="Display name"
          value={name}
          onChange={(e) => newName(e.target.value)}
        />
        <button
          disabled={!name}
          type="submit"
          className="btn-success btn-sm btn mx-2"
        >
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
          <option disabled selected={true}>
            Choose a theme
          </option>
          <option value={"mythemeLight,mytheme"}>Default</option>
          <option value={"corporate,business"}>Microsoft</option>
          <option value={"myHalloweenlight,myHalloween"}>Halloween</option>
          <option value={"lofi,black"}>Minimal</option>
          <option value={"cyberpunk,synthwave"}>{`I'm brave`}</option>
        </select>
        <button
          onClick={themeSubmitter}
          className="btn-success btn-sm btn mx-2"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Settings;
