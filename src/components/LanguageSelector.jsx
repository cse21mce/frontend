"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { languages } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";


export default function LanguageSelector() {

    const router = useRouter();
    const searchParams = useSearchParams();


    const setLanguage = (lang) => {
        router.replace(`?lang=${lang}`)
    }

    useEffect(() => {
        const lang = searchParams.get('lang') || 'english';
        setLanguage(lang);

    }, [searchParams])

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
