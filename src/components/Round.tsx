import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import PointCalcForm from "./PointCalcForm";

const Round = (props: { data: []; selectedRound: number }) => {
  const admins = useMemo(() => new Set(["mastare.flynn@gmail.com"]), []);
  const session = useSession();
  const [authorised, setAuthorised] = useState(false);
  const current = useMemo(() => props.selectedRound, [props.selectedRound]);

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
            <span className="text-4xl text-orange-500"> {current}</span>
          </h1>
          <div className="rounded-btn mt-8 flex w-full max-w-2xl flex-col items-center justify-center bg-base-300">
            <PointCalcForm
              currentRound={props.selectedRound}
              data={props.data}
            />
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
