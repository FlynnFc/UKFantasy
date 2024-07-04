import Link from "next/link";
import React from "react";

const FeaturedLeague = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-base-content">Featured League</h1>
      <div className="rounded-btn mt-14 flex w-full flex-col gap-4 bg-primary px-5 py-7 text-primary-content shadow-lg">
        <h1 className="text-4xl font-bold">Epic 40 Tournament center</h1>
        <p className="text-lg">
          EPIC39 is a LAN based gaming event in the UK. It features a mixture of
          casual gaming, stage content and esports tournaments so whether you
          enjoy playing games for fun or want to be the next esports
          professional, there will be something for you.
        </p>
        <Link href={"./epic40"}>
          <button className="btn w-max">Take a look</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedLeague;
