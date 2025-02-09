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
import { useRouter } from "next/navigation"
import { encodeURL } from "@/lib/utils"

const formSchema = z.object({
    url: z.string()
        .min(10, { message: "Please enter a valid PIB post URL" })
        .regex(/^https:\/\/pib\.gov\.in/, { message: "URL must start with https://pib.gov.in" }),
});

export function PostGenerationForm() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState('');

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    });

    async function fetchLogs() {
        try {
            const response = await fetch(`http://localhost:8000/stream-logs`);
            if (!response.ok) throw new Error("Failed to fetch logs");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                setLogs((prevLogs) => prevLogs + chunk);
            }
        } catch (error) {
            console.error("Error streaming logs:", error);
        }
    }

    async function onSubmit(values) {
        try {
            setLoading(true);
            setLogs(""); // Clear previous logs

            // Start fetching logs in parallel
            fetchLogs();

            // Call the API to start the process
            const response = await fetch(`http://localhost:8000/text-to-video?url=${values.url}`);
            if (!response.ok) {
                throw new Error("Failed to process the URL");
            }
            const data = await response.json();
            console.log(data)
            if (data?.title) {
                router.push(`/post/${encodeURL(data.title)}`);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 rounded-md border bg-card space-y-8 w-full flex flex-col relative">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Press Release URL</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="https://pib.gov.in/PressReleseDetail.aspx?PRID=2044264"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between items-center">
                        {loading ? (
                            <div className="flex mx-auto space-x-2">
                                <div className="w-4 h-4 animate-ping bg-primary rounded-full"></div>
                                <div className="w-4 h-4 animate-ping bg-primary rounded-full delay-75"></div>
                                <div className="w-4 h-4 animate-ping bg-primary rounded-full delay-150"></div>
                            </div>
                        ) : null}
                        <Button disabled={loading} type="submit" className="ml-auto">Get Press Release</Button>
                    </div>
                </form>
            </Form>
            {
                /* Log Display Section */
                logs && (
                    <div className="logs mt-4">
                        <pre className="p-4 bg-card rounded-md overflow-y-auto max-h-64 min-h-[200px] whitespace-pre-wrap break-words">
                            {logs || "Logs will appear here..."}
                        </pre>
                    </div>
                )
            }
        </>
    );
}
