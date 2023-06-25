import Link from "next/link";
import React from "react";

const Points = (props: { data: any }) => {
  return (
    <>
      {props.data.map((el: { name: string; id: string }) => {
        return (
          <div
            key={el.id}
            className="rounded-btn flex h-min min-w-max flex-col gap-2 bg-base-content p-4 uppercase text-base-100 shadow"
          >
            <h1 className="text-center text-2xl">{el.name}</h1>
            <div className="flex flex-row gap-2">
              <Link passHref href={`/${el.name.toLowerCase()}/points`}>
                <a className="btn-sm btn cursor-pointer" target="_blank">
                  Apply points
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Points;
