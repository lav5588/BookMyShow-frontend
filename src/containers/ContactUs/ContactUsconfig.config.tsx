import { Handshake, Mail, MessageCircle } from 'lucide-react';

import ContactUsImage from '@/assets/images/contact-us.png';

import type { ContactUsConfig } from './ContactUs.types';

export const contactUsConfig: ContactUsConfig = {
    title: 'We are here to help with your movie plans.',
    description:
        'Whether you need help with a booking, have a question about a cinema or want to explore a business opportunity, our team is ready to guide you.',
    imageUrl: ContactUsImage,
    channels: [
        {
            title: 'Booking support',
            description:
                'Get help with ticket-related questions, booking status and your upcoming movie plans.',
            icon: MessageCircle,
        },
        {
            title: 'General enquiries',
            description:
                'Share feedback, ask a question or reach out when you need more information.',
            icon: Mail,
        },
        {
            title: 'Business partnerships',
            description:
                'Connect with us to discuss cinema partnerships, collaborations and new opportunities.',
            icon: Handshake,
        },
    ],
    contactDetails: {
        email: 'support@bookmyshow.com',
        customerCareNumber: '+91 1800 102 2999',
        address: 'Mumbai, Maharashtra, India',
    },
};
