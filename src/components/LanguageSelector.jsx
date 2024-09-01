"use client"

import { getTranslation, hasTranslation } from "@/action/translation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner";


export default function LanguageSelector({ title, content, ministry }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {

        const fetchTranslation = async () => {
            const lang = searchParams.get('lang') || 'english';
            let res = await getTranslation(title, content, ministry, lang);
            console.log(res)

            if (res.type === 'in_progress') {
                const intervalId = setInterval(async () => {
                    res = await getTranslation(title, content, ministry, lang);
                    if (res.success && res.type === 'success') {
                        clearInterval(intervalId);
                        toast[res.type](res.message);
                    } else if (res.type === 'error') {
                        clearInterval(intervalId);
                        toast[res.type](res.message);
                    }
                }, 1000); // Poll every second

                return () => clearInterval(intervalId); // Clear interval on unmount
            } else if (res.success && lang !== 'english') {
                toast[res.type](res.message);
            }
        };

        fetchTranslation(); // Initial call to fetch translation

    }, [searchParams.get('lang'), title, content, ministry]);


    const languages = useMemo(() => ([
        { "value": "english", "label": "English" },
        { "value": "hindi", "label": "हिन्दी" },
        { "value": "urdu", "label": "اردو" },
        { "value": "punjabi", "label": "ਪੰਜਾਬੀ" },
        { "value": "gujarati", "label": "ગુજરાતી" },
        { "value": "marathi", "label": "मराठी" },
        { "value": "telugu", "label": "తెలుగు" },
        { "value": "kannada", "label": "ಕನ್ನಡ" },
        { "value": "malayalam", "label": "മലയാളം" },
        { "value": "tamil", "label": "தமிழ்" },
        { "value": "odia", "label": "ଓଡ଼ିଆ" },
        { "value": "bengali", "label": "বাংলা" },
        { "value": "assamese", "label": "অসমীয়া" },
        { "value": "manipuri_meitei", "label": "মৈতৈ" }
    ]), [])

    const setLanguage = (lang) => {
        router.replace(`?lang=${lang}`)
    }

    return (
        <Select defaultValue={searchParams.get('lang') || 'english'} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                {
                    languages.map((lang, index) => (
                        <SelectItem key={index} value={lang.value}>{lang.label}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}
