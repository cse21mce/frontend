'use server';

import dbConnect from "@/lib/db";
import PressRelease from "@/models/PressRelease";
dbConnect();

export const getPosts = async () => {
    try {
        const pressReleases = await PressRelease.find({});

        return pressReleases;
    } catch (error) {
        return []
    }
}

export const getPost = async (title) => {
    try {

        const pressReleases = await PressRelease.findOne({ title });
        return pressReleases;

    } catch (error) {
        return null
    }
}