import type { LucideIcon } from 'lucide-react';

export type ContactUsChannel = {
    title: string;
    description: string;
    icon: LucideIcon;
};

export type ContactDetails = {
    email: string;
    customerCareNumber: string;
    address: string;
};

export type ContactUsConfig = {
    title: string;
    description: string;
    imageUrl: string;
    channels: ContactUsChannel[];
    contactDetails: ContactDetails;
};
