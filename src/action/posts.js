'use server';

import dbConnect from "@/lib/db";
import { parseDatePosted } from "@/lib/utils";
import PressRelease from "@/models/PressRelease";
import { revalidatePath } from "next/cache";


export const getPosts = async () => {
    await dbConnect();
    try {
        const pressReleases = await PressRelease.find({}).sort({ date_posted: -1 });

        return pressReleases.map(p => ({ ...p._doc, _id: p._doc._id.toString() }));
    } catch (error) {
        return []
    }
}

export const getPost = async (title) => {
    await dbConnect();

    try {
        const decodedTitle = decodeURIComponent(title).replace(/\+/g, ' ');
        const pressRelease = await PressRelease.findOne({ title: decodedTitle });
        return pressRelease;


    } catch (error) {
        return null
    }
}

export const getRecentPosts = async (title) => {
    await dbConnect();

    try {
        const recentReleases = await PressRelease.find();

        const updatedReleases = recentReleases.map(p => {
            // Extract and parse the date
            const datePosted = parseDatePosted(p._doc.date_posted);

            // Add the timestamp field to the document
            return {
                ...p._doc,
                _id: p._doc._id.toString(),
                timestamp: datePosted.getTime() // Add timestamp in milliseconds
            };
        });

        // Sort the array by timestamp in descending order (latest first)
        const sortedReleases = updatedReleases.sort((a, b) => b.timestamp - a.timestamp);

        return sortedReleases.slice(0, 5); // Return the first 5 elements

    } catch (error) {
        return []
    }
}

export const scrapPost = async (url) => {
    await dbConnect();
    try {
        const res = await fetch(`${process.env.SCRAP_URL}/scrape_single?url=${url}`);
        const data = await res.json();

        revalidatePath('/all');
        revalidatePath('/');

        console.log(data)

        return {
            message: data.message,
            suceess: data.suceess || false,
            type: data.type || 'error',
            title: data.data.title,
        };

    } catch (error) {
        return {
            message: error.message,
            suceess: false,
            type: 'error',
        }
    }
}