import React, { FormEvent, useState } from "react";
import * as XLSX from "xlsx";

const AddTeamsAdmin = () => {
  const [file, setFile] = useState<any>();
  const [data, setData] = useState();
  const [sheet, setSheet] = useState("");

  const fileProcess = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = file[0];
    const data = await f.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet: any = workbook.Sheets[sheet];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });

    console.log(workbook);
  };
  return (
    <form onSubmit={fileProcess} className="rounded-btn bg-base-300 p-4">
      <h3 className="text-2xl">Teams & Players competing</h3>
      <section className="mb-2 grid gap-4">
        <div className="grid">
          <label className="label" htmlFor="">
            Excel file with players and their teams
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
        <div className="flex flex-col">
          <label className="label" htmlFor="">
            Name of targeted sheet
          </label>
          <input type="text" name="" className="input" id="" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="label" htmlFor="">
              Name of player column
            </label>
            <input type="text" name="" className="input" id="" />
          </div>{" "}
          <div className="flex flex-col">
            <label className="label" htmlFor="">
              Name of team column
            </label>
            <input type="text" name="" className="input" id="" />
          </div>
        </div>
      </section>
      <button className="btn w-full">Submit</button>
    </form>
  );
};

export default AddTeamsAdmin;
