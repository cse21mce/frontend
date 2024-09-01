import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { H1 } from "./ui/typography";

export default function Navbar({ className }) {
    return (
        <header
            className={cn("fixed top-10 inset-x-0 w-full z-50 flex p-2 justify-between items-center bg-accent text-center", className)}
        >
            <Link href={'/'} className="flex gap-2 items-center">
                <Image src="/logo.png" width={64} height={64} className="flex-shrink-0 w-16 h-16" alt="PIB logo" />
                <H1 className="text-white sm:text-3xl text-2xl">Text To Video</H1>
            </Link>
            <Link href="/all" className="pr-2 transition-colors text-white font-semibold hover:text-white/90">All releases</Link>
        </header>
    );
}