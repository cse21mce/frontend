import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as Thumbnail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }) => {

    const href = encodeURIComponent(post?.title).replace(/%20/g, '+')
    return (
        <Link href={`/post/${href}`}>
            <Card className="shadow-md">
                <CardContent className="pt-6">
                    <div className={`bg-secondary rounded-md flex items-center justify-center h-[250px] overflow-hidden ${post.images ? 'p-0' : 'p-6'}`}>
                        {
                            post.images
                                ?
                                <Image src={post.images[0]} width={250} height={250} quality={100} className='w-full h-full object-cover rounded-md' alt={post.title} />
                                :
                                <Thumbnail className="w-32 h-32" />
                        }
                    </div>
                </CardContent>

                <CardHeader className="pt-0">
                    <CardTitle className="text-ellipsis overflow-hidden text-nowrap text-accent" title={post.title}>{post.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{post.date_posted}</p>
                    <CardDescription className="overflow-hidden text-ellipsis line-clamp-5 text-zinc-700 text-base">{post.content}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default PostCard