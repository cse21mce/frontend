'use server';

import dbConnect from "@/lib/db";
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

        const pressRelease = await PressRelease.findOne({ title });
        return pressRelease;

    } catch (error) {
        return null
    }
}

export const getRecentPosts = async (title) => {
    await dbConnect();

    try {
        const recentReleases = await PressRelease.find()
            .sort({ date_posted: -1 })  // Sort by date_posted in descending order
            .limit(5);                   // Limit the result to 5 documents
        return recentReleases.map(p => ({ ...p._doc, _id: p._doc._id.toString() }));

    } catch (error) {
        return []
    }
}

export const scrapPost = async (url) => {
    await dbConnect();
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/scrap?url=${url}`);
        const data = await res.json();

        revalidatePath('/all');
        revalidatePath('/');

        return data;

    } catch (error) {
        return {
            error: error.message
        }
    }
}