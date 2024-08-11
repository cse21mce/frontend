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


const formSchema = z.object({
    url: z.string()
        .min(10, { message: "Please enter a valid PIB post url" })
        .regex(/^https:\/\/pib\.gov\.in/, { message: "Url must start with https://pib.gov.in" }),
});

export function PostGenerationForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    })

    function onSubmit(values) {
        toast.error(values.url)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 rounded-md border border-input bg-secondary space-y-8 w-full flex flex-col relative">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Post URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://pib.gov.in/PressReleseDetail.aspx?PRID=2044264" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="ml-auto">Generate Translation</Button>
            </form>
        </Form>
    )
}
