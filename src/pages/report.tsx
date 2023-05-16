import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiCopyAlt } from "react-icons/bi";
const reportbugs = () => {
  const emailCopy = () => {
    navigator.clipboard.writeText("foleyclarkef@gmail.com");
    toast.success("coppied email to clipboard");
  };

  return (
    <main className="min-h-screen">
      <Toaster />
      <section className="prose mx-auto lg:prose-xl">
        <h1>Reporting bugs</h1>
        <p>Please structure your email like this:</p>
        <ul>
          <li>A short explanation of the issue</li>
          <li>If you can repeat the bug please list the steps you took</li>
          <li>If you can please include screenshots or a video of the issue</li>
        </ul>
        <h4 className="flex">
          please send your report to this email: foleyclarkef@gmail.com{" "}
          <span
            onClick={emailCopy}
            className="inline cursor-pointer px-1 transition hover:scale-110"
          >
            <BiCopyAlt />
          </span>
        </h4>
      </section>
    </main>
  );
};

export default reportbugs;
