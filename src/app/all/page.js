import { getPosts } from "@/action/posts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";
import { Image as Thumbnail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AllPosts = async () => {

  const posts = await getPosts();
  console.log(posts)

  return <section className="flex flex-col gap-6">
    <H1>All PIB Releases</H1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {
        posts.map(post => {
          return (
            <Link href={`/post/${post.title.replaceAll(' ', '+')}`} key={post._id}>
              <Card >
                <CardHeader>
                  <CardTitle className="text-ellipsis overflow-hidden text-nowrap" title={post.title}>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary rounded-md flex items-center justify-center mb-6 p-6">
                    {
                      post.images ?
                        <Image src={post.images[0]} width={560} height={560} quality={100} className='w-full h-auto max-h-[560] object-cover' alt={post.title} />

                        : <Thumbnail className="w-32 h-32" />
                    }
                  </div>
                  <p className="overflow-hidden text-ellipsis line-clamp-6">{post.content}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })
      }
    </div>
  </section>;
};

export default AllPosts;
