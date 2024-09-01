import { getPost } from '@/action/posts'
import LanguageSelector from '@/components/LanguageSelector'
import TranslarteAllBtn from '@/components/TranslarteAllBtn'
import { Skeleton } from '@/components/ui/skeleton'
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

const PostPage = async ({ searchParams, params }) => {
    const post = await getPost(params.title);
    const lang = searchParams?.lang || 'english';

    return (
        <section className='flex flex-col gap-6'>
            <div className="ml-auto flex gap-2 flex-wrap">
                {/* <TranslarteAllBtn title={post?.title} content={post?.content} ministry={post?.ministry} /> */}
                <LanguageSelector title={post?.title} content={post?.content} ministry={post?.ministry} />
            </div>
            {
                lang === 'english' ? <>
                    <div className="">
                        <H1>{post?.title}</H1>
                        <div className="mt-2">
                            <H3>{post?.ministry}</H3>
                            <Muted className={''}>{post?.date_posted}</Muted>
                        </div>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 place-content-center">
                        {
                            post?.images ?
                                post.images.map((image, index) => {
                                    return (
                                        <Image key={index} src={image} width={560} height={560} quality={100} className='w-full rounded-md h-full bg-secondary max-h-[500px] object-contain' alt={post.title} />
                                    )
                                })

                                : null
                        }
                    </div>
                    <article>{post?.content}</article>
                </>
                    : post?.translations[lang]?.title ?
                        <>
                            <div className="">
                                <H1>{post?.translations[lang]?.title}</H1>
                                <div className="mt-2">
                                    <H3>{post?.translations[lang]?.ministry}</H3>
                                    <Muted className={''}>{post?.date_posted}</Muted>
                                </div>
                            </div>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 place-content-center">
                                {
                                    post?.images ?
                                        post.images.map((image, index) => {
                                            return (
                                                <Image key={index} src={image} width={560} height={560} quality={100} className='w-full rounded-md h-full bg-secondary max-h-[500px] object-contain' alt={post.title} />
                                            )
                                        })

                                        : null
                                }
                            </div>
                            <article>{post?.translations[lang]?.content}</article>
                        </>
                        :
                        <>

                            <H1>Please wait...</H1>
                            <Skeleton className={'w-full h-[450px]'} />
                            <H3>Press Relese is being translated.</H3>
                        </>
            }

        </section>
    )
}

export default PostPage