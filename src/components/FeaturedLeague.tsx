import Link from "next/link";
import React from "react";

const FeaturedLeague = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-base-content">Featured League</h1>
      <div className="shad mt-4 rounded-xl bg-primary p-6 text-primary-content shadow-lg">
        <h2 className="py-4 text-4xl font-bold">Epic 39</h2>
        <p className="py-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas neque
          ad nisi commodi totam, dolorem inventore repellat esse beatae
          accusantium enim minus ipsam libero ab, temporibus aliquam dolor eaque
          quidem!
        </p>
        <Link href={"./epic39"}>
          <button className="btn">Take a look</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedLeague;
