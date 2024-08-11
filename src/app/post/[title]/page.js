import { getPost } from '@/action/posts'
import { H1, H3, Muted, P } from '@/components/ui/typography'
import Image from 'next/image'
import React from 'react'

export const generateMetadata = async ({ params }) => {
    const title = params.title.replaceAll('%2B', ' ')
    const post = await getPost(title);
    return {
        title: post?.title || "Press Release not Found",
        description: post?.content || "Press Release not Found"
    }

}

const PostPage = async ({ params }) => {
    const title = decodeURIComponent(params.title).replace(/\+/g, ' ');
    console.log(title)
    const post = await getPost(title);
    return (
        <section className='flex flex-col gap-6'>
            <div className="">
                <H1>{post?.title}</H1>
                <div className="mt-2">
                    <H3>{post?.ministry}</H3>
                    <Muted className={''}>{post?.date_posted}</Muted>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {
                    post?.images ?
                        post.images.map((image, index) => {
                            return (
                                <Image key={index} src={image} width={560} height={560} quality={100} className='w-full rounded-md h-80 max-h-[500px] object-cover' alt={post.title} />
                            )
                        })

                        : null
                }
            </div>
            <article>{post?.content}</article>
        </section>
    )
}

export default PostPage