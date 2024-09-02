import { getPosts } from "@/action/posts";
import PostCard from "@/components/PostCard";
import { H1, H2 } from "@/components/ui/typography";

const AllPosts = async () => {

  const posts = await getPosts();

  return <section className="flex flex-col gap-6">
    {
      posts.map(post => {
        return (
          <div className="" key={post.date}>
            <H2 className={'border-0 mb-1 text-border'}>{post.date}</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {
                post.releases.map(postRelese => {
                  return <PostCard post={postRelese} key={postRelese._id} />
                })
              }
            </div>
          </div>
        )
      })
    }
  </section>;
};

export default AllPosts;
