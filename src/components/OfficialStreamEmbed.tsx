import React from "react";

const OfficialStreamEmbed = () => {
  return (
    <div
      draggable
      className={`collapse-arrow rounded-btn collapse fixed bottom-1 left-1 z-20 mt-5 hidden h-max w-max bg-secondary text-secondary-content shadow-lg lg:grid`}
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex justify-between">
        <h4 className="text-lg">The official stream is Live right now!</h4>
      </div>
      <div className="collapse-content">
        <iframe
          src="https://player.twitch.tv/?channel=lirik&parent=esportsfantasy.app"
          height="252"
          width="448"
          className="rounded-btn"
        >
          iframe is not support in your browser
        </iframe>
      </div>
    </div>
  );
};

export default OfficialStreamEmbed;
