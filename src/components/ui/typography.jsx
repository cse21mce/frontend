import { cn } from "@/lib/utils";

export function H1({ className, children }) {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
            {children}
        </h1>
    );
}

export function H2({ className, children }) {
    return (
        <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
            {children}
        </h2>
    );
}

export function H3({ className, children }) {
    return (
        <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
            {children}
        </h3>
    );
}

export function H4({ className, children }) {
    return (
        <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
            {children}
        </h4>
    );
}

export function P({ className, children }) {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
            {children}
        </p>
    );
}

export function Blockquote({ className, children }) {
    return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
            {children}
        </blockquote>
    );
}

export function InlineCode({ className, children }) {
    return (
        <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}>
            {children}
        </code>
    );
}

export function Muted({ className, children }) {
    return (
        <p className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </p>
    );
}
