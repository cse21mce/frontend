'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { encodeURL } from "@/lib/utils";
import { Image as Thumbnail } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "./ui/link";

const PostCard = ({ post }) => {
    const [language, setLanguage] = useState('english');
    const [isClient, setIsClient] = useState(false); // Track if the component is on the client
    const params = useSearchParams();

    useEffect(() => {
        setIsClient(true); // Set isClient to true when the component mounts
    }, []);

    useEffect(() => {
        if (isClient) {
            const lang = params.get('lang') || 'english';
            setLanguage(lang);
        }
    }, [params, isClient]);

    const href = encodeURL(post?.translations?.english?.title);

    const title = post?.translations[language]?.title;
    const content = post?.translations[language]?.content;

    return (
        <Link href={`/post/${href}`} className="shadow-xl">
            <Card  >
                <CardContent className="pt-6">
                    <div className={`bg-secondary rounded-md flex items-center justify-center h-[250px] overflow-hidden ${post.images ? 'p-0' : 'p-6'}`}>
                        {
                            post.images
                                ?
                                <Image suppressHydrationWarning src={post.images[Math.floor(Math.random() * post.images.length)]} width={250} height={250} quality={100} className='w-full h-full object-cover aspect-video border rounded-md' alt={title} />
                                :
                                <Thumbnail className="w-32 h-32" />
                        }
                    </div>
                </CardContent>

                <CardHeader className="pt-0">
                    <CardTitle className="text-ellipsis overflow-hidden text-nowrap text-accent" title={title}>{title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{post.date_posted}</p>
                    <CardDescription className="overflow-hidden text-ellipsis line-clamp-5 text-zinc-700 text-base">{content}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
};

export default PostCard;