'use client';

import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

const MyLink = ({ href, children, ...props }) => {
    const params = useSearchParams();

    // Get the 'lang' query parameter
    const lang = params.get('lang');

    // Append 'lang' to the href if it exists
    const finalHref = lang ? `${href}?lang=${lang}` : `${href}?lang=english`;

    return (
        <NextLink href={finalHref} {...props}>{children}</NextLink>
    );
};

export default MyLink;