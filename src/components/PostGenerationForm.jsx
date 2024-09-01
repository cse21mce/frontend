"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { scrapPost } from "@/action/posts"
import PostCard from "./PostCard"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    url: z.string()
        .min(10, { message: "Please enter a valid PIB post url" })
        .regex(/^https:\/\/pib\.gov\.in/, { message: "Url must start with https://pib.gov.in" }),
});

export function PostGenerationForm() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    })

    async function onSubmit(values) {
        try {
            setLoading(true);
            const res = await scrapPost(values.url);
            if (res.suceess) {
                const title = encodeURIComponent(res?.title).replace(/%20/g, '+');
                router.push(`/post/${title}?lang=english`);
            }
            toast[res.type](res.message);

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 rounded-md border bg-[#e5e1e0] space-y-8 w-full flex flex-col relative">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Press Relese URL</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="https://pib.gov.in/PressReleseDetail.aspx?PRID=2044264" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between items-center">
                        {
                            loading ?
                                <div className="flex mx-auto">
                                    <div className="w-4 h-4 animate-ping bg-primary rounded-full"></div>
                                    <div className="w-4 h-4 animate-ping bg-primary rounded-full delay-75"></div>
                                    <div className="w-4 h-4 animate-ping bg-primary rounded-full delay-150"></div>
                                </div>
                                : null
                        }
                        <Button disabled={loading} type="submit" className="ml-auto">Get Press Relese</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
