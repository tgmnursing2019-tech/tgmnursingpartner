import React from "react";

const VideoSection = ({ videos = [] }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {videos.map((video, index) => (
        <div key={index} className="rounded-xl overflow-hidden shadow">
          <iframe
            width="100%"
            height="200"
            src={video}
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;