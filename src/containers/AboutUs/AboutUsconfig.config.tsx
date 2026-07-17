import { Clapperboard, Heart, MapPin } from 'lucide-react';

import AboutUsImage from '@/assets/images/about-us.png';

import type { AboutUsConfig } from './AboutUs.types';

export const aboutUsConfig: AboutUsConfig = {
    title: 'Making every movie plan feel effortless.',
    description:
        'BookMyShow brings movie lovers closer to the big screen. Discover what is playing, find a cinema that works for you and keep every booking organised in one simple place.',
    imageUrl: AboutUsImage,
    highlights: [
        {
            title: 'Discover with confidence',
            description:
                'Browse current and upcoming movies with the details you need to choose your next watch.',
            icon: Clapperboard,
        },
        {
            title: 'Find the right cinema',
            description:
                'Explore nearby theatres, compare available shows and plan a visit that fits your schedule.',
            icon: MapPin,
        },
        {
            title: 'Built for movie lovers',
            description:
                'From browsing to tickets, we focus on making the journey to your seat smooth and enjoyable.',
            icon: Heart,
        },
    ],
};
