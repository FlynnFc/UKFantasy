import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import PointCalcForm from "./PointCalcForm";

const Round = (props: { data: []; selectedRound: number }) => {
  const admins = useMemo(() => new Set(["mastare.flynn@gmail.com"]), []);
  const session = useSession();
  const [authorised, setAuthorised] = useState(false);
  const [file, setFile] = useState<any>();
  const [sheetName, setSheetName] = useState("");
  const [calculateType, setCalculateType] = useState("");
  const current = useMemo(() => props.selectedRound, [props.selectedRound]);

  // const [formData, setFormData] = useState({});
  const submit = (e: any) => {
    toast.promise(handleUpload(e), {
      loading: "processing...",
      success: <b>File processed</b>,
      error: <b>Could not process</b>,
    });
  };

  const findPointsColumn = async (jsonData: any) => {
    let pointsIndex = 0;
    const data = await jsonData;
    for (let index = 0; index < data[0].length; index++) {
      const el: string = data[0][index];
      if (el.toLowerCase() === "points") pointsIndex += index;
    }
    return pointsIndex;
  };

  //todo
  const roundStatsFetcher = () => {
    //calls bucket to find round by league and number
    //If no file found return round never submitted
  };

  //todo
  const fileProcesMain = async (e: HTMLFormElement) => {
    e.preventDefault();
    const f = file[0];
    const data = await f.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet: any = workbook.Sheets[sheetName];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    return jsonData;
  };

  const handleUpload = async (e: HTMLFormElement) => {
    const jsonData: any = await fileProcesMain(e);
    console.log(jsonData);
    const pointsColumn = await findPointsColumn(jsonData);

    const submitData: any[] = [];
    for (let i = 1; i < jsonData.length; i++) {
      try {
        const player: (string | number)[] = jsonData[i];
        const basePoints = player[pointsColumn];

        // console.log(
        //   `${player[0]}'s base points is ${basePoints}. steamid: ${player[1]}`
        // );
        const formattedPlayer = {
          name: player[0],
          steamid: player[1],
          points: basePoints,
        };
        submitData.push(formattedPlayer);
      } catch (error) {
        return new Error("cannot proccess file");
      }
    }
    const currentlySelectedTeams = props.data;
    const allSelectedPlayers: any[] = [];
    currentlySelectedTeams.forEach((el: any) => {
      el.SelectedPlayer.forEach((el: { name: string; id: string }) =>
        allSelectedPlayers.push({ name: el.name.toLowerCase(), id: el.id })
      );
    });
    const finalData = comparer(submitData, allSelectedPlayers);

    const res = await fetch("/api/ApplyPoints", {
      method: "POST",
      body: JSON.stringify(finalData),
    });
    return res;
  };

  const comparer = (points: string | any[], userPlayers: any[]) => {
    const elements = [];
    for (let index = 0; index < userPlayers.length; index++) {
      let element = userPlayers[index];
      for (let index = 0; index < points.length; index++) {
        const element2 = points[index];
        if (element?.name === element2.name.toLowerCase()) {
          element = {
            ...element,
            steamid: element2.steamid,
            points: element2.points,
          };
          elements.push(element);
        }
      }
    }
    return elements;
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
    <div className="mt-5 w-full">
      <Toaster />
      {authorised ? (
        <section className="flex w-full flex-col items-center justify-start gap-2">
          <h1 className="text-center text-3xl">
            {`Submit stats for round`}
            <span className="text-4xl text-orange-500">{current}</span>
          </h1>
          <div className="rounded-btn mt-8 flex w-full max-w-2xl flex-col items-center justify-center bg-base-300">
            <form
              onSubmit={submit}
              className="flex w-full flex-col gap-4 px-4 pt-4"
            >
              <div className="flex items-start justify-start">
                <label htmlFor="selctingtype" className="label text-xl">
                  What processing do you need for this submission?
                </label>
              </div>
              <select
                onChange={(e) => setCalculateType(e.target.value)}
                className="select w-full"
                name="sheetType"
                id="sheetType"
              >
                <option value="precalculated">Pre-calculated</option>
                <option value="calculate">Calculate for me</option>
              </select>
              <progress
                className="progress progress-primary w-full"
                value="100"
                max="100"
              ></progress>
              {calculateType === "precalculated" && (
                <div className="rounded-btn flex w-full flex-col gap-3 pb-4 text-xl">
                  <div>
                    <label className="label" htmlFor="sheetName">
                      What sheet features the points and bonus columns?
                    </label>
                    <input
                      onChange={(e) => setSheetName(e.target.value)}
                      required
                      className="input w-full"
                      type="text"
                      name="sheetName"
                      id="sheetName"
                      placeholder="sheet name"
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="file">
                      File upload
                    </label>
                    <input
                      required
                      onChange={(e) => setFile(e.target.files)}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      className="file-input w-full"
                      type="file"
                      name="roundFile"
                      id="roundFile"
                    />
                  </div>

                  <button type="submit" className="btn-primary btn">
                    Submit round
                  </button>
                </div>
              )}
            </form>
            {calculateType !== "precalculated" && <PointCalcForm />}
          </div>
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
export default Round;
