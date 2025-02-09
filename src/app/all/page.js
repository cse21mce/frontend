// import { getPosts } from "@/action/posts";
// import PostCard from "@/components/PostCard";
import VideoFeed from "@/components/VideoCard";

const AllPosts = async () => {

  return <section className="flex flex-col gap-6 items-center h-[calc(100svh-112px)] mt-20">
            <VideoFeed />
  </section>;
};

export default AllPosts;
