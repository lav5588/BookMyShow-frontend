import {
    Building2,
    Facebook,
    Film,
    Instagram,
    Linkedin,
    MessageCircle,
    Send,
    Ticket,
    Youtube,
} from 'lucide-react';

import AboutUsImage from '@/assets/images/about-us.png';
import CinemaListImage from '@/assets/images/cinemas-list.png';
import ContactUsImage from '@/assets/images/contact-us.png';
import FacebookImage from '@/assets/images/facebook.png';
import HeroImage from '@/assets/images/hero.png';
import InstagramImage from '@/assets/images/instagram.png';
import LinkedinImage from '@/assets/images/linkedin.png';
import MovieListImage from '@/assets/images/movie-list.png';
import TelegramImage from '@/assets/images/telegram.png';
import TicketsListImage from '@/assets/images/tickets-list.png';
import WhatsappImage from '@/assets/images/whatsapp.png';
import XImage from '@/assets/images/x(twitter).png';
import YoutubeImage from '@/assets/images/youtube.png';

export const HomePageConfig = {
    hero: {
        title: (
            <>
                Discover Movies.
                <br />
                Book Tickets.
                <br />
                Enjoy the Show.
            </>
        ),
        description:
            'Browse thousands of movies, discover nearby cinemas, compare show timings and manage all your tickets from one place.',
        primaryButton: {
            text: 'Browse Movies',
            link: '/movies',
        },
        secondaryButton: {
            text: 'Browse Cinemas',
            link: '/cinemas',
        },
        image: HeroImage,
    },

    sections: [
        {
            reverse: true,
            title: 'Browse Movies',
            icon: Film,
            description:
                'Explore movies now showing and upcoming releases in one easy-to-browse catalogue. Narrow your choices by language, genre, cinema or date, then open a movie to see its story, cast, runtime and available shows.',
            features: [
                'Filter by Language',
                'Filter by Genre',
                'Filter by Cinema',
                'Filter by Date',
                'Movie Details and Showtimes',
            ],
            buttonText: 'Browse Movies',
            buttonLink: '/movies',
            imageUrl: MovieListImage,
        },
        {
            title: 'Browse Cinemas',
            icon: Building2,
            description:
                'Find cinemas near you or explore theatres across your city before you choose a show. Check the venue, location and currently available movie slots so planning a movie outing feels effortless.',
            features: [
                'Browse by Location',
                'Nearby Cinemas',
                'Available Shows',
                'Cinema Information',
            ],
            buttonText: 'Browse Cinemas',
            buttonLink: '/cinemas',
            imageUrl: CinemaListImage,
        },
        {
            reverse: true,
            title: 'My Tickets',
            icon: Ticket,
            description:
                'Keep every movie plan organised in one place. Review booking details whenever you need them and quickly see the current status of each ticket before you head to the cinema.',
            features: [
                'Booked Tickets',
                'Pending Tickets',
                'Cancelled Tickets',
                'Expired Tickets',
            ],
            buttonText: 'View Tickets',
            buttonLink: '/tickets',
            imageUrl: TicketsListImage,
        },
        {
            title: 'Follow us on Instagram',
            icon: Instagram,
            description:
                'Follow our Instagram for daily movie discoveries, fresh trailers, limited-time offers and fun behind-the-scenes moments. It is the quickest way to find something exciting for your next watch.',
            features: [
                'Trailer Highlights',
                'Movie Recommendations',
                'Offers and Updates',
            ],
            buttonText: 'Follow Instagram',
            buttonLink: '/instagram',
            imageUrl: InstagramImage,
        },
        {
            reverse: true,
            title: 'Follow us on Facebook',
            icon: Facebook,
            description:
                'Join our Facebook community for movie announcements, local cinema updates and conversations with fellow film fans. Stay connected to what is releasing and what everyone is talking about.',
            features: [
                'Release Announcements',
                'Community Discussions',
                'Cinema Updates',
            ],
            buttonText: 'Follow Facebook',
            buttonLink: '/facebook',
            imageUrl: FacebookImage,
        },
        {
            title: 'Follow us on LinkedIn',
            icon: Linkedin,
            description:
                'Stay connected with the people building the booking experience. Follow product updates, engineering stories and company news from the BookMyShow team.',
            features: [
                'Product Updates',
                'Engineering Stories',
                'Company News',
            ],
            buttonText: 'Follow LinkedIn',
            buttonLink: '/linkedin',
            imageUrl: LinkedinImage,
        },
        {
            reverse: true,
            title: 'Follow us on X',
            description:
                'Get quick updates on new releases, showtime news and announcements as they happen. Follow along for bite-sized recommendations and timely movie conversations.',
            features: [
                'Release Alerts',
                'Quick Recommendations',
                'Live Announcements',
            ],
            buttonText: 'Follow X',
            buttonLink: '/x',
            imageUrl: XImage,
        },
        {
            title: 'Join our Telegram',
            icon: Send,
            description:
                'Join our Telegram channel for instant notifications about releases, showtime updates and exclusive offers. Never miss a film you have been waiting to watch.',
            features: [
                'Instant Notifications',
                'Exclusive Offers',
                'Release Updates',
            ],
            buttonText: 'Join Telegram',
            buttonLink: '/telegram',
            imageUrl: TelegramImage,
        },
        {
            reverse: true,
            title: 'Join our WhatsApp Community',
            icon: MessageCircle,
            description:
                'Be part of our WhatsApp community for friendly movie updates, new-release reminders and useful booking news delivered where you already chat.',
            features: [
                'New Release Reminders',
                'Booking Updates',
                'Community News',
            ],
            buttonText: 'Join WhatsApp',
            buttonLink: '/whatsapp',
            imageUrl: WhatsappImage,
        },
        {
            title: 'Subscribe on YouTube',
            icon: Youtube,
            description:
                'Subscribe for trailers, interviews, reviews and behind-the-scenes videos that make choosing your next movie more fun. Discover stories worth watching before you book.',
            features: [
                'Latest Trailers',
                'Cast Interviews',
                'Movie Reviews',
            ],
            buttonText: 'Subscribe',
            buttonLink: '/youtube',
            imageUrl: YoutubeImage,
        },
        {
            reverse: true,
            title: 'About Us',
            description:
                'Learn about the people, ideas and technology behind a simpler way to discover movies and reserve your seats. See our mission, vision and the experience we are building for movie lovers.',
            features: [
                'Our Mission',
                'Our Vision',
                'How We Build',
            ],
            buttonText: 'About Us',
            buttonLink: '/about',
            imageUrl: AboutUsImage,
        },
        {
            title: 'Contact Us',
            description:
                'Need help with a booking, have a question or want to discuss a partnership? Reach out to our support and business teams, and we will point you in the right direction.',
            features: [
                'Booking Support',
                'General Questions',
                'Business Enquiries',
            ],
            buttonText: 'Contact Us',
            buttonLink: '/contact',
            imageUrl: ContactUsImage,
        },
    ],
};
