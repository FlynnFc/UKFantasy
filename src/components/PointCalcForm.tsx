import React from "react";

const PointCalcForm = () => {
  return (
    <form
      className="rounded-btn flex max-w-2xl flex-col gap-3 bg-base-300 p-4 text-xl"
      action="#"
    >
      <div>
        <label htmlFor="sheetName" className="label">
          What sheet features the players you want to calculate points for?
        </label>
        <input
          type="text"
          name="sheetName"
          className="input w-full"
          placeholder="sheet name"
        />
      </div>{" "}
      <div>
        <label htmlFor="firstnumber" className="label">
          Calcuation options
        </label>
        <select className=" select w-full" name="calcOptions" id="calcOptions">
          <option value="default">default</option>
          {/* add table to sort through algo options and display here */}
          <option value="create">create new</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="file">
          File upload
        </label>
        <input
          required
          onChange={(e) => console.log(e.target.files)}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className="file-input w-full"
          type="file"
          name="roundFile"
          id="roundFile"
        />
      </div>
      <button className="btn-primary btn w-full" type="submit">
        submit
      </button>
    </form>
  );
};

export default PointCalcForm;
