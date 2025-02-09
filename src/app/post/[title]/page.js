import { getPost } from '@/action/posts';
import { Baloo_2 } from 'next/font/google';
import { H1, H3, Muted, P } from '@/components/ui/typography';
import React from 'react';
import { decodeURL, parseDatePosted } from '@/lib/utils';
import PhotoSlider from '@/components/PhotoSlider';
import AudioPlayer from '@/components/AudioPlayer';

export const generateMetadata = async ({ params }) => {
    const encodedTitle = (await params)?.title;
    const title = decodeURL(encodedTitle);
    const post = await getPost(title);
    return {
        title: post?.translations?.english?.title || "Press Release not Found",
        description: post?.content || "Press Release not Found"
    };
};

const hindiFont = Baloo_2({ subsets: ['latin'] });

const PostPage = async ({ searchParams, params }) => {
    const encodedTitle = (await params)?.title;
    const title = decodeURL(encodedTitle);
    const post = await getPost(title);
    const lang = (await searchParams)?.lang || 'english';

    if (!post) {
        return (
            <section className='mt-20 text-center'>
                <P className={'text-destructive text-xl'}>Post not found</P>
            </section>
        );
    }

    const translatedTitle = post?.translations[lang]?.title;
    const translatedContent = post?.translations[lang]?.content;
    const translatedMinistry = post?.translations[lang]?.ministry;
    const date_posted = parseDatePosted(post?.date_posted);
    const audio = `http://localhost:8000${(post?.translations[lang]?.audio).replaceAll('\\', '/')}`;



    return (
        <section className={`${hindiFont.className} flex flex-col gap-6 mt-20`}>
            <div className="ml-auto flex gap-2 flex-wrap">
            </div>
            <div className="">
                <H1 className={'text-accent'}>{translatedTitle}</H1>
                <div className="mt-2">
                    <H3 className={'text-border'}>{translatedMinistry}</H3>
                    <Muted className={''}>{date_posted}</Muted>
                    <AudioPlayer audio={audio} />
                </div>
            </div>

            <article className='text-lg'>{translatedContent}</article>
            <div className="grid place-content-center">
                {post?.images ? <PhotoSlider images={post.images} alt={translatedTitle} /> : null}
            </div>
        </section>
    );
};

export default PostPage;
