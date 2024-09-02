'use server';

import dbConnect from "@/lib/db";
import { parseDatePosted } from "@/lib/utils";
import PressRelease from "@/models/PressRelease";
import { revalidatePath } from "next/cache";
import { getAllTranslations } from "./translation";


export const getPosts = async () => {
    try {
        await dbConnect();
        const pressReleases = await PressRelease.find({}).sort({ date_posted: -1 });

        const groupedReleases = pressReleases.reduce((acc, p) => {
            // Extract date from `date_posted` and parse it
            const datePosted = parseDatePosted(p._doc.date_posted);
            const dateKey = datePosted.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).toUpperCase(); // Format to "02 SEP 2024"

            // Convert `_id` to string and add timestamp
            const releaseWithTimestamp = {
                ...p._doc,
                _id: p._doc._id.toString(),
                timestamp: datePosted.getTime()
            };

            // Group by `dateKey`
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(releaseWithTimestamp);

            return acc;
        }, {});

        // Convert the grouped object into an array sorted by date
        const sortedGroupedReleases = Object.keys(groupedReleases)
            .sort((a, b) => {
                // Parse the date keys back to Date objects for comparison
                const dateA = new Date(a.split(' ').reverse().join(' ')); // Convert "02 SEP 2024" to "2024 SEP 02"
                const dateB = new Date(b.split(' ').reverse().join(' '));
                return dateB - dateA;
            })
            .map(date => ({
                date,
                releases: groupedReleases[date].sort((a, b) => b.timestamp - a.timestamp)
            }));

        return sortedGroupedReleases;

    } catch (error) {
        return []
    }
}

export const getPost = async (title) => {

    try {
        await dbConnect();
        const decodedTitle = decodeURIComponent(title).replace(/\+/g, ' ');
        const pressRelease = await PressRelease.findOne({ title: decodedTitle });
        return pressRelease;


    } catch (error) {
        return null
    }
}

export const getRecentPosts = async (title) => {

    try {
        await dbConnect();
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

        return sortedReleases.slice(0, 6); // Return the first 5 elements

    } catch (error) {
        return []
    }
}

export const scrapPost = async (url) => {
    try {
        await dbConnect();
        const res = await fetch(`${process.env.SCRAP_URL}/scrape_single?url=${url}`);
        const data = await res.json();

        revalidatePath('/all');
        revalidatePath('/');

        const transRes = await getAllTranslations(data.data.title, data.data.content, data.data.ministry);

        return {
            message: "Scraped successful and translation started",
            success: data.success || false,
            type: data.type || 'error',
            title: data.data.title,
        };

    } catch (error) {
        return {
            message: error.message,
            success: false,
            type: 'error',
        }
    }
}