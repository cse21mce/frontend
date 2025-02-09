import { getRecentPosts } from "@/action/posts";
import PostCard from "@/components/PostCard";
import { PostGenerationForm } from "@/components/PostGenerationForm";
import { H1 } from "@/components/ui/typography";

const HomePage = async ({ params }) => {

  const recentPosts = await getRecentPosts();

  return (
    <>
      {/* Form Section */}
      <section className="flex flex-col gap-6 mt-20">
        <H1 className={'text-foreground/70'}>Generate Video</H1>
        <PostGenerationForm />
      </section>


      {/* Recent Post Section */}
      <section className="mt-20 flex-col flex gap-6">
        <H1 className={'text-foreground/70'}>Recent Releases</H1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {
            recentPosts.map(post => {
              return (
                <PostCard post={post} key={post._id} />
              )
            })
          }
        </div>
      </section>
    </>
  );
};

export default HomePage;
