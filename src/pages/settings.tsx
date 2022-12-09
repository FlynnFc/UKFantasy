import React, { useEffect, useState } from "react";

const Settings = () => {
  const [themeChosen, setTheme] = useState<string>("");

  useEffect(() => {
    console.log(themeChosen);
  }, [themeChosen]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
      <div className="h-full w-[60rem] rounded-lg bg-base-300 p-8">
        <form className="form" action="">
          <label className="label" htmlFor="name">
            Display Name
          </label>
          <input
            type="text"
            className="input w-full max-w-xs"
            placeholder="Display name"
          />
          <button className="btn-success btn-sm btn mx-2">Submit</button>
        </form>
        <form className="form" action="">
          <label className="label" htmlFor="name">
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
            <option value={"CyberPunk,Sythnwave"}>{`What's this?`}</option>
          </select>
          <button className="btn-success btn-sm btn mx-2">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Settings;
