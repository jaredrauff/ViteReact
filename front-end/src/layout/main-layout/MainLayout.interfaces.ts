import type { ReactNode } from "react";

export interface ComponentItem {
    title: string;
    href: string;
    description: string;
}

export interface ListItemProps {
    className?: string;
    title: string;
    children: ReactNode;
    href: string;
}
