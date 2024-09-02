'use server';

import dbConnect from "@/lib/db";
import PressRelease from "@/models/PressRelease";
import { revalidatePath } from "next/cache";


export const hasTranslation = async (title, lang) => {
    await dbConnect();
    try {
        const pressRelease = await PressRelease.findOne({ title: title.trim() });
        return pressRelease.translations[lang].status === 'completed' ? true : false;

    } catch (error) {
        return false;
    }
}

export const inProgressTranslation = async (title, lang) => {
    await dbConnect();
    try {
        const pressRelease = await PressRelease.findOne({ title: title.trim() });
        return pressRelease.translations[lang].status === 'in_progress' ? true : false;

    } catch (error) {
        return false;
    }
}

export const isTranslating = async (title) => {
    await dbConnect();
    console.log(title)
    try {
        const pressRelease = await PressRelease.findOne({ title: title.trim() });
        // Check if any translation has the status 'in_progress'
        const isAnyInProgress = Object.values(pressRelease.translations).some(translation => translation.status === 'in_progress');
        return isAnyInProgress;
    } catch (error) {
        return false;
    }
}





export const getTranslation = async (title, content, ministry, lang) => {
    try {
        // Check if all fields are present
        if (!title || !content || !ministry || !lang) {
            return {
                type: 'error',
                message: 'All fields are required',
                success: false
            };
        }

        if (await hasTranslation(title, lang)) {
            return {
                type: 'success',
                message: 'Translation Fetched successfully',
                success: true
            };
        }
        if (await inProgressTranslation(title, lang)) {
            return {
                type: 'in_progress',
                message: 'Translation is in progress. Please wait...',
                success: true
            };
        }

        const res = await fetch(`${process.env.TRANSLATION_URL}/translate/${lang}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, ministry })
        });


        const data = await res.json();

        // Revalidate paths if necessary
        const href = encodeURIComponent(title).replace(/%20/g, '+');
        revalidatePath(`/post/${href}?lang=${lang}`);
        revalidatePath(`/`);
        revalidatePath(`/all`);

        return data;

    } catch (error) {
        return {
            type: 'error',
            message: error.message,
            success: false
        };
    }
}


export const getAllTranslations = async (title, content, ministry) => {
    try {


        if (await isTranslating(title)) {
            return {
                type: 'error',
                message: 'Translation is in progress. Please wait...',
                success: false
            };
        }
        const res = await fetch(`${process.env.TRANSLATION_URL}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, ministry })
        });

        return res;

    } catch (error) {
        return {
            type: 'error',
            message: error.message,
            success: false
        };
    }
}
