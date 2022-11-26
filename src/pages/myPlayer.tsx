import React from "react";

const MyPlayer = () => {
  return (
    <div className="h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded bg-base-content p-6 text-base-100">
          <h1 className="mb-3 text-2xl font-bold">Submit your player</h1>
          <form action="#" className="flex flex-col justify-center">
            <label htmlFor="name">In-game name</label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="mb-4 rounded bg-base-100 p-2 text-base-content"
            />
            <label htmlFor="discname">Discord name</label>
            <input
              name="discname"
              type="text"
              placeholder="username#123"
              className="mb-4 rounded bg-base-100 p-2 text-base-content"
            />
            <label htmlFor="iamge">Upload image</label>
            <input
              type="file"
              name="iamge"
              id="iamgeUpload"
              className="mb-4 rounded bg-base-100 p-2 text-base-content"
            />
            <button className="btn mt-2 bg-base-100">Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPlayer;
