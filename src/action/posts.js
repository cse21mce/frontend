'use server';

import dbConnect from "@/lib/db";
import { parseDatePosted } from "@/lib/utils";
import PressRelease from "@/models/PressRelease";


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

        // Use a case-insensitive regex to find the post
        const pressRelease = await PressRelease.findOne({
            $or: [
                { "translations.english.title": { $regex: new RegExp(`^${title}$`, "i") } },
                { "translations.english.title": title },
            ]
        });

        return pressRelease;

    } catch (error) {
        console.error("Error fetching post:", error); // Log the error for debugging
        return null;
    }
};

export const getRecentPosts = async () => {
    try {
        await dbConnect();

        // Fetch the 6 most recent posts, sorted by date_posted in descending order
        const recentReleases = await PressRelease.find()
            .sort({ date_posted: -1 })
            .limit(6)
            .lean(); // Use .lean() to get plain JavaScript objects instead of Mongoose documents

        // Modify each release
        const modifiedReleases = recentReleases.map((release) => {
            const datePosted = parseDatePosted(release.date_posted); // Parse the date
            return {
                ...release,
                _id: release._id.toString(), // Convert ObjectId to string
                date_posted: datePosted, // Update the date_posted field
            };
        });

        return modifiedReleases;

    } catch (error) {
        throw new Error("Error fetching recent posts:", error); // Log the error
    }
};
