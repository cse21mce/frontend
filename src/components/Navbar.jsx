import { cn } from "@/lib/utils";
import Image from "next/image";
import { H1 } from "./ui/typography";
import LanguageSelector from "./LanguageSelector";
import MyLink from "./ui/link";

export default function Navbar({ className }) {
    return (
        <header
            className={cn("fixed top-10 inset-x-0 w-full z-50 flex p-2 justify-between items-center text-center", className)}
        >
            <MyLink href={'/'} className="flex gap-2 items-center">
                <Image src="/logo.png" width={64} height={64} className="flex-shrink-0 w-16 h-16" alt="PIB logo" />
                <H1 className=" sm:text-3xl text-2xl">Text To Video</H1>
            </MyLink>

            <LanguageSelector />
            <MyLink href="/all" className="pr-2 transition-colors hover:text-primary/90 font-semibold">All releases</MyLink>
        </header>
    );
}