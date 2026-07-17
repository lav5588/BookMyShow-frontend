import type { LucideIcon } from 'lucide-react';

export type AboutUsHighlight = {
    title: string;
    description: string;
    icon: LucideIcon;
};

export type AboutUsConfig = {
    title: string;
    description: string;
    imageUrl: string;
    highlights: AboutUsHighlight[];
};
