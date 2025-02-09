"use client"; // Ensures it's a Client Component

import React, { useRef, useState } from "react";
import { ChevronUp, ChevronDown, Play, Pause } from "lucide-react";

const VideoCard = ({ url, title, description, views, activeVideoRef, setActiveVideoRef }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); // Pause current video
        setIsPlaying(false);
      } else {
        if (activeVideoRef && activeVideoRef.current && activeVideoRef.current !== videoRef.current) {
          activeVideoRef.current.pause(); // Pause any previously active video
        }
        videoRef.current.play(); // Play current video
        setActiveVideoRef(videoRef); // Set this video as the active video
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex-shrink-0 w-[90%] max-w-md h-[calc(100vh-80px)] relative mx-auto mt-4">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        src={url}
        muted
        loop
        onPause={() => setIsPlaying(false)} // Ensure button syncs with video state
        onPlay={() => setIsPlaying(true)}
      ></video>

      {/* Centered Play/Pause Button */}
      <div
        onClick={togglePlayback}
        className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
      >
        <div className="bg-black/50 p-4 rounded-full">
          {isPlaying ? (
            <Pause className="w-10 h-10 text-white" />
          ) : (
            <Play className="w-10 h-10 text-white" />
          )}
        </div>
      </div>

      {/* Overlay Content */}
      <div className="absolute bottom-8 left-4 text-white space-y-2 z-10">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
        <div className="text-xm pb-6">{views} views</div>
      </div>
    </div>
  );
};

const VideoFeed = () => {
  const videos = [
    {
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      title: "Big Buck Bunny 1",
      description: "Watch Big Buck Bunny in HD!",
      views: "10K",
    },
    {
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4",
      title: "Big Buck Bunny 2",
      description: "Another amazing scene from Big Buck Bunny!",
      views: "20K",
    },
    {
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4",
      title: "Big Buck Bunny 3",
      description: "Enjoy the third clip of Big Buck Bunny!",
      views: "15K",
    },
    {
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_15mb.mp4",
      title: "Big Buck Bunny 4",
      description: "Final scene of Big Buck Bunny in action!",
      views: "25K",
    },
  ];

  const scrollRef = useRef(null);
  const activeVideoRef = useRef(null); // Tracks the currently active video
  const [activeVideoState, setActiveVideoRef] = useState(null); // Sync state with ref
  const activeVideoIndex = useRef(0);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const items = Array.from(scrollRef.current.children);
      const totalVideos = items.length;

      // Adjust activeVideoIndex based on the direction
      if (direction === "up" && activeVideoIndex.current > 0) {
        activeVideoIndex.current -= 1;
      } else if (direction === "down" && activeVideoIndex.current < totalVideos - 1) {
        activeVideoIndex.current += 1;
      }

      // Scroll to the target video
      const selectedVideo = items[activeVideoIndex.current];
      selectedVideo.scrollIntoView({ behavior: "smooth", block: "start" });

      // Pause the previously active video if any
      if (activeVideoState && activeVideoState.current) {
        activeVideoState.current.pause();
      }
    }
  };

  return (
    <div className="relative flex items-center rounded-xl justify-center overflow-hidden h-[inherit] bg-black">
      {/* Scroll Buttons */}
      <div className="flex flex-col gap-4 fixed right-4 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => handleScroll("up")}
          className="bg-gray-700 hover:bg-gray-800 text-white rounded-full p-3 shadow-md"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleScroll("down")}
          className="bg-gray-700 hover:bg-gray-800 text-white rounded-full p-3 shadow-md"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Video Feed */}
      <div
        ref={scrollRef}
        className="overflow-hidden h-[calc(100vh-80px)] w-full flex flex-col"
      >
        {videos.map((video, index) => (
          <div key={index} className="h-[calc(100vh-80px)] flex-shrink-0">
            <VideoCard
              url={video.url}
              title={video.title}
              description={video.description}
              views={video.views}
              activeVideoRef={activeVideoRef}
              setActiveVideoRef={setActiveVideoRef}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;







