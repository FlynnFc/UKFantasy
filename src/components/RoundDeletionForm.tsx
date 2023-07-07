import React, { ChangeEvent, useState } from "react";
import PointCalcForm from "./PointCalcForm";

const RoundDeletionForm = ({ round, data }: { round: number; data: [] }) => {
  const [updateDeletePrefrence, setUpdateDeletePrefrence] = useState<string>();
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [deleteCheckInput, setDeleteCheckInput] = useState("");
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateDeletePrefrence(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <h2 className="text-center text-3xl">
        {`Edit/Delete stats for round`}
        <span className="text-4xl text-orange-500"> {round}</span>
      </h2>
      <form
        className="rounded-btn flex max-w-2xl flex-col gap-3 bg-base-300 p-4 text-lg"
        action="#"
      >
        <div className="flex flex-col items-start gap-1">
          <p>Do you want to update or Delete this round?</p>

          <div className="flex gap-1">
            <input
              onChange={handleRadioChange}
              id="update"
              className="radio"
              name="update/delete"
              type="radio"
              value="update"
            />
            <label htmlFor="update">Update</label>
          </div>
          <div className="flex gap-1">
            <input
              onChange={handleRadioChange}
              value="delete"
              id="delete"
              className="radio"
              name="update/delete"
              type="radio"
            />
            <label htmlFor="delete">Delete</label>
          </div>
        </div>
      </form>
      {updateDeletePrefrence === "delete" && (
        <div>
          <button
            onClick={() => setDeleteCheck(true)}
            className="btn-error btn w-full"
            type="button"
          >
            delete this round
          </button>
        </div>
      )}
      {updateDeletePrefrence === "update" && (
        <PointCalcForm currentRound={round} data={data} />
      )}
      {deleteCheck && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
          <div className="rounded-btn flex flex-col gap-6 bg-base-300 p-6">
            <h4 className="text-2xl font-semibold">
              Are you sure you want to delete this round?
            </h4>
            <div className="flex flex-col gap-2">
              <label>{`Please type "delete round ${round} permanently"`}</label>
              <input
                className="input"
                value={deleteCheckInput}
                onChange={(e) => setDeleteCheckInput(e.target.value)}
                type="text"
                placeholder={`delete round ${round} permanently`}
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                disabled={
                  deleteCheckInput !== `delete round ${round} permanently`
                }
                onClick={(e) => console.log(`DELETE ALL POINTS WITH ${round}`)}
                className="btn-error btn"
              >
                Delete
              </button>
              <button onClick={() => setDeleteCheck(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoundDeletionForm;
