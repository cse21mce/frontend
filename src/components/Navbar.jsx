'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ className }) {
    const [active, setActive] = useState(null);
    return (
        <header
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 flex p-2 justify-between items-center", className)}
        >
            <Link href={'/'} >
                <Image src="/logo.png" width={64} height={64} className="flex-shrink-0 w-16 h-16" alt="PIB logo" />
            </Link>
            <Link href="/all" className="pr-2 text-muted-foreground hover:text-foreground transition-colors">All releases</Link>
        </header>
    );
}