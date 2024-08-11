import { getPosts } from "@/action/posts";
import PostCard from "@/components/PostCard";
import { H1 } from "@/components/ui/typography";

const AllPosts = async () => {

  const posts = await getPosts();

  return <section className="flex flex-col gap-6">
    <H1>All PIB Releases</H1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {
        posts.map(post => {
          return (
            <PostCard post={post} key={post._id} />
          )
        })
      }
    </div>
  </section>;
};

export default AllPosts;
