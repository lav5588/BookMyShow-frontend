
/**
         * Retrieve A Single Cinema based on id
         */
        cinema: builder.query<Cinema, { id: string }>({
            query: ({ id }) => ({
                url: ${API_ROUTES.CINEMAS.CINEMA}${id}/,
            }),
        }),

        /**
         * Retrieves all the slots of a particular cinema including movie
         */
        slotsByCinema: builder.query<
            SlotByCinemaResponse[],
            { cinema_id?: string; date?: string }
        >({
            query: ({ cinema_id, date }) => ({
                url: /cinemas/${cinema_id}/movie-slots/,
                params: {
                    date: date ? date : format(new Date(), DATE_FORMAT_ISO),
                },
            }),
        }),

        /**
         * Retrieves all the slots of a particular movie along with cinema their cinema Details
         */
        slotsByMovieSlug: builder.query<
            SlotsByMovieSlugResponse[],
            { slug: string; date?: string }
        >({
            query: ({ slug, date }) => ({
                url: /movies/${slug}/movie-slots/,
                params: {
                    date: date ? date : new Date().toISOString().slice(0, 10),
                },
            }),
        }),

        /**
         * Retrieves all the details of a particular slot by it's id
         */
        slotDetails: builder.query<SlotDetails, { id: string }>({
            query: ({ id }) => ({
                url: ${API_ROUTES.BOOKINGS.SLOT_DETAILS}${id}/,
            }),
            providesTags: ['slotDetails'],
        }),

        /**
         * Retrieves all locations
         */
        locations: builder.query<Location[], void>({
            query: () => ({
                url: API_ROUTES.CINEMAS.LOCATION,
            }),
        }),

        /**
         * To book the seats
         */
        booking: builder.mutation<
            { message: string },
            { data: SeatBookingRequest; token: string }
        >({
            query: ({ data, token }) => ({
                url: API_ROUTES.BOOKINGS.BOOKING,
                body: data,
                method: 'POST',
                credentials: 'include',
                headers: {
                    authorization: Bearer ${token},
                },
            }),
            invalidatesTags: ['slotDetails', 'tickets'],
        }),

        /**
         * To Cancel a ticket
         */
        cancelTicket: builder.mutation<
            { message: string },
            { token: string; id: number | string }
        >({
            query: ({ token, id }) => ({
                url: ${API_ROUTES.BOOKINGS.CANCEL}${id}/,
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    authorization: Bearer ${token},
                },
            }),
            invalidatesTags: ['slotDetails', 'tickets'],
        }),

        /**
         * TO retrieve all tickets
         */
        tickets: builder.infiniteQuery<
            PaginatedQueryResponse<Ticket>,
            { token: string },
            number
        >({
            query: ({ pageParam, queryArg }) => ({
                url: API_ROUTES.BOOKINGS.TICKETS,
                params: {
                    page: pageParam,
                },
                credentials: 'include',
                headers: {
                    authorization: Bearer ${queryArg.token},
                },
            }),
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, __, lastPageParam) => {
                    if (lastPage.next) {
                        return lastPageParam + 1;
                    }
                },
            },
            providesTags: ['tickets'],
        }),


/**
         * TO retrieve all past bookings
         */
        pastBookings: builder.infiniteQuery<
            PaginatedQueryResponse<Ticket>,
            { token: string },
            number
        >({
            query: ({ pageParam, queryArg }) => ({
                url: API_ROUTES.BOOKINGS.HISTORY,
                params: {
                    page: pageParam,
                },
                credentials: 'include',
                headers: {
                    authorization: Bearer ${queryArg.token},
                },
            }),
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, __, lastPageParam) => {
                    if (lastPage.next) {
                        return lastPageParam + 1;
                    }
                },
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useUserDetailsQuery,
    useMoviesInfiniteQuery,
    useMovieQuery,
    useLatestMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
    useGenresQuery,
    useLanguagesQuery,
    useCinemasQuery,
    useCinemaQuery,
    useLocationsQuery,
    useSlotsByCinemaQuery,
    useSlotsByMovieSlugQuery,
    useSlotDetailsQuery,
    useBookingMutation,
    useUpdateUserDetailsMutation,
    useTicketsInfiniteQuery,
    usePastBookingsInfiniteQuery,
    useCancelTicketMutation,
} = api;


export type SignupRequest = {
    /**
     * Full name of the user.
     */
    name: string;

    /**
     * Optional phone number of the user.
     */
    phone_number?: string;

    /**
     * Email address of the user.
     */
    email: string;

    /**
     * Optional profile picture file uploaded by the user.
     */
    profile_pic?: File;

    /**
     * Password chosen by the user.
     */
    password: string;
};

export type SignupResponse = {
    /**
     * Unique identifier of the user.
     */
    id: number;

    /**
     * Full name of the user.
     */
    name: string;

    /**
     * Phone number of the user.
     */
    phone_number: string;

    /**
     * Email address of the user.
     */
    email: string;

    /**
     * URL of the user's profile picture.
     */
    profile_pic: string;

    /**
     * Access token issued after registration.
     */
    access: string;
};

export type LoginRequest = {
    /**
     * Email address of the user.
     */
    email: string;

    /**
     * Password of the user.
     */
    password: string;
};

export type LoginResponse = {
    /**
     * Access token issued after authentication.
     */
    access: string;
};

export type Language = {
    /**
     * unique identifier of language
     */
    id: number;
    /**
     * name of the language
     */
    language: string;
};

export type Genre = {
    /**
     * unique identifier of genre
     */
    id: number;
    /**
     * name of the genre
     */
    genre: string;
};

export type Movie = {
    /**
     * unique identifier of the movie
     */
    id: number;

    /**
     * name of the movie
     */
    name: string;

    /**
     * language in which movies is available
     */
    languages: Language[];

    /**
     * list of genres of the movie
     */
    genres: Genre[];

    /**
     * About the movie
     */
    description: string;

    /**
     * time duration of the movie
     */
    duration: string;

    /**
     * slug for uniq url of the movie
     */
    slug: string;

    /**
     * date on which movies released
     */
    release_date: string;

    /**
     * Poster of the movie
     */
    movie_poster: string | null;
};

/**
 * This is the response type of paginated data
 */
export type PaginatedQueryResponse<DataType> = {
    /**
     * total number of records in db
     */
    count: number;

    /**
     * url to next page including the query params
     */
    next: string | null;
    /**
     * url to previous page including query params
     */
    previous: string | null;

    /**
     * list of data
     */
    results: DataType[];
};

export type Location = {
    /**
     * unique identifier for the location
     */
    id: number;

    /**
     * name of the location
     */
    location: string;
};

export type Cinema = {
    /**
     * unique identifier of the cinema
     */
    id: number;

    /**
     * name of the cinema
     */
    name: string;

    /**
     *location of the cinema
     */
    location: Location;

    /**
     * total no of rows in the cinema
     */
    rows: number;

    /**
     * total number of seats per row in the cinema
     */
    seats_per_row: number;
};

export type Slot = {
    /**
     * unique identifier of slot
     */
    id: number;

    /**
     * date_time of slot
     */
    date_time: string;

    /**
     * price of the slot
     */
    price: string;

    /**
     * cinema id of the slot
     */
    cinema: number;

    /**
     * movie id of the slot
     */
    movie: number;

    /**
     * language id of the slot
     */
    language: number;
};

/**
 * this is the response structure of slots by cinema api which is movie details along with slots field
 */
export type SlotByCinemaResponse = {
    slots: Slot[];
} & Movie;

/**
 * this is the response structure of slots by movie slug api which is cinema details along with slots field
 */
export type SlotsByMovieSlugResponse = {
    slots: Slot[];
} & Cinema;


/**
 * All the details related to a Slot
 */
export type SlotDetails = {
    slot: Slot;
    cinema: Cinema;
    movie: Movie;
    booked_seats: {
        slot: number;
        row_number: number;
        seat_number: number;
        status: 'BOOKED' | 'PENDING';
        id: number;
    }[];
};

type Seat = {
    row_number: number;
    seat_number: number;
};

export type SeatBookingRequest = {
    slot_id: number;
    seats: Seat[];
};

export type UpdateProfileRequest = {
    /**
     * Full name of the user.
     */
    name?: string;

    /**
     * Optional phone number of the user.
     */
    phone_number?: string;

    /**
     * Email address of the user.
     */
    email?: string;

    /**
     * Optional profile picture file uploaded by the user.
     */
    profile_pic?: File;
};

export type Ticket = {
    /**
     * id of the slot in which ticket is booked
     */
    slot: number;

    /**
     * row_number of the Seat
     */
    row_number: number;

    /**
     * Seat Number in a particular row
     */
    seat_number: number;

    /**
     * id of the user
     */
    user: number;

    /**
     * status of ticket
     */
    status: 'BOOKED' | 'PENDING' | 'CANCELLED';

    /**
     * id of ticket
     */
    id: number;

    /**
     * Time on which ticket is booked
     */
    created_at: string;

    /**
     * language of the movie
     */
    language: string;

    /**
     * name of the movie
     */
    movie: string;

    /**
     * Name of the cinema in which ticket is booked
     */
    cinema_name: string;

    /**
     * location of the cinema
     */
    cinema_location: string;

    /**
     * Will be the date and time of the Show
     */
    show_time: string;
};


import z from 'zod';

/**
 * Maximum allowed image file size (5MB).
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * List of supported image MIME types.
 */
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

/**
 * Zod schema for validating uploaded image files.
 *
 * Validates:
 * - File size does not exceed 5MB.
 * - File type is one of the supported image formats.
 */
export const imageSchema = z
    .file()
    .refine((file) => file.size <= MAX_FILE_SIZE, Max image size is 5MB.)
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
    );


export { imageSchema } from './imageSchema';
export { passwordSchema } from './passwordSchema';
export { signupSchema } from './signupSchema';
export { loginSchema } from './loginSchema';
export { updateProfileSchema } from './updateProfileSchema';


import z from 'zod';

import { passwordSchema } from './passwordSchema';

/**
 * Zod schema for validating login form input.
 *
 * Ensures:
 * - Valid email format
 * - Strong password format
 */
export const loginSchema = z.object({
    email: z.email(),
    password: passwordSchema,
});


import z from 'zod';

/**
 * Zod schema for validating strong passwords.
 *
 * Requirements:
 * - At least 8 characters
 * - At least 1 lowercase letter
 * - At least 1 uppercase letter
 * - At least 1 number
 * - At least 1 special character
 */
export const passwordSchema = z
    .string()
    .min(8, 'Password must contains at least 8 characters')
    .regex(/[a-z]/, 'Password must contains at least 1 lowercase letter')
    .regex(/[A-Z]/, 'Password must contains at least 1 uppercase letter')
    .regex(/[0-9]/, 'Password must contains at least 1 number')
    .regex(
        /[^a-zA-Z0-9]/,
        'Password must contains at least 1 special character',
    );


import z from 'zod';

import { imageSchema } from './imageSchema';
import { passwordSchema } from './passwordSchema';

/**
 * Zod schema for validating signup form input.
 *
 * Validates:
 * - Personal information
 * - Optional profile image upload
 * - Strong password rules
 * - Matching password confirmation
 */
export const signupSchema = z
    .object({
        name: z.string().trim().min(2).max(50),
        email: z.email(),
        phone_number: z
            .string()
            .length(10, 'Phone number should be exactly 10 digits')
            .optional()
            .or(z.string().length(0)),
        profile_pic: imageSchema.optional(),
        password: passwordSchema,
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Confirm Password do not match with password',
        path: ['confirm_password'],
    });


import z from 'zod';

import { imageSchema } from './imageSchema';

/**
 * Zod schema for validating update profile form input.
 *
 * Validates:
 * - Optional Personal information
 * - Optional profile image upload
 */
export const updateProfileSchema = z.object({
    name: z.string().trim().min(2).max(50).optional(),
    email: z.email().optional(),
    phone_number: z
        .string()
        .length(10, 'Phone number should be exactly 10 digits')
        .optional()
        .or(z.string().length(0)),
    profile_pic: imageSchema.optional(),
});


export { router } from './routes';


import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { RootLayout } from '@/layouts';
import {
    Booking,
    Cinema,
    Cinemas,
    Home,
    Login,
    Movie,
    Movies,
    MovieSlots,
    NotFound,
    Profile,
    SignUp,
} from '@/pages';

/**
 * Application router configuration using react-router's createBrowserRouter.
 *
 * Defines the route hierarchy for the web app:
 * - The root path '/' uses the RootLayout component as the layout wrapper.
 * - The index route (default child of '/') renders the Home component.
 * - Any unmatched route ('*') renders the NotFound component to handle 404s.
 */
export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES.SIGNUP,
                element: <SignUp />,
            },
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTES.MOVIES,
                element: <Movies />,
            },
            {
                path: ROUTES.MOVIE,
                element: <Movie />,
            },
            {
                path: ROUTES.MOVIE_SLOTS,
                element: <MovieSlots />,
            },
            {
                path: ROUTES.CINEMAS,
                element: <Cinemas />,
            },
            {
                path: ROUTES.CINEMA,
                element: <Cinema />,
            },
            {
                path: ROUTES.BOOKING,
                element: <Booking />,
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile />,
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <NotFound />,
            },
        ],
    },
]);


export * from './utils';


import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class name values into a single string while resolving
 * Tailwind CSS class conflicts intelligently.
 *
 * This utility is a wrapper around clsx for conditional class construction
 * and tailwind-merge for deduplicating and merging Tailwind classes.
 *
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Returns a string with capitalized first character
 */
export const capitalizeFirstCharacter = (text: string) => {
    const trimmedText = text.trim();
    if (trimmedText === '') return;

    return trimmedText[0].toUpperCase() + trimmedText.slice(1);
};

/**
 * Return a utility function which convert a number into Alphabets
 * @example A -> 1, AA -> 27, AC-> 29, AAC
 */
export const numberToAlphabet = (num: number): string => {
    if (!Number.isInteger(num) || num <= 0) return '';
    let result = '';

    while (num > 0) {
        num--;

        const remainder = num % 26;
        result = String.fromCharCode(65 + remainder) + result;
        num = Math.floor(num / 26);
    }

    return result;
};


export { RootLayout } from './RootLayout';


export { RootLayout } from './RootLayout.layout';


import { Outlet } from 'react-router';

import { Header } from '@/containers';
import { Footer } from '@/containers/Footer';
/**
 * This is a layout component for whole application
 * @returns A Layout for whole application
 */
export const RootLayout = () => (
    <div className="min-h-screen flex flex-col min-w-75 max-w-480 mx-auto">
        <Header />
        <main className="flex-1 px-4 md:px-10 ">
            <Outlet />
        </main>
        <Footer />
    </div>
);


import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents authentication-related state for the application.
 */
type AuthType = {
    /**
     * Indicates whether the user is currently authenticated.
     */
    isAuthenticated: boolean;

    /**
     * Stores the current authentication access token.
     */
    token: string;

    /**
     * to keep user detail
     */
    user: {
        id: number;
        name: string;
        email: string;
        profile_pic?: string | null;
        phone_number?: string | null;
    } | null;
};

/**
 * Initial authentication state.
 */
const initialState: AuthType = {
    isAuthenticated: false,
    token: '',
    user: null,
};

/**
 * Redux slice responsible for authentication logic.
 *
 * Handles login, logout, and user state updates.
 */
export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        /**
         * Sets the current authenticated user information.
         */
        setUser: (state, action: PayloadAction<AuthType['user']>) => {
            state.user = action.payload;

            return state;
        },

        /**
         * Logs the user in by storing the access token and marking
         * the user as authenticated.
         */
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;

            return state;
        },

        /**
         * Logs the user out by clearing authentication data.
         */
        logout: (state) => {
            state.token = '';
            state.isAuthenticated = false;
            state.user = null;

            return state;
        },
    },
});

/**
 * Authentication actions.
 */
export const { setUser, login, logout } = authSlice.actions;


export { authSlice, login, logout, setUser } from './authSlice';


/**
 * API_ROUTES
 *
 * Centralized collection of backend API endpoint paths used throughout the application.
 * These routes are grouped by feature domain for better organization and maintainability.
 *
 * Declared as const to ensure strict literal typing and prevent accidental modification.
 */
export const API_ROUTES = {
    /**
     * Routes related to user authentication and profile management.
     */
    USERS: {
        /**
         * Endpoint for registering a new user account.
         */
        REGISTER: '/users/register/',

        /**
         * Endpoint for user login authentication.
         */
        LOGIN: '/users/login/',

        /**
         * Endpoint for logging out the currently authenticated user.
         */
        LOGOUT: '/users/logout/',

        /**
         * Endpoint for refreshing an expired authentication token.
         */
        REFRESH_TOKEN: '/users/refresh/',

        /**
         * Endpoint for retrieving  the current user's profile information.
         */
        PROFILE: '/users/profile/',

        /**
         * Endpoint to update the profile
         */
        UPDATE_PROFILE: '/users/update-profile/',
    },

    /**
     * Routes related to movie data and metadata.
     */
    MOVIES: {
        /**
         * Endpoint for retrieving a list of all movies.
         */
        LIST: '/movies/',

        /**
+         * Endpoint for a specific movie. Append the slug and a trailing slash.
+         *
+         * @example ${API_ROUTES.MOVIES.MOVIE}${slug}/
+         */
        MOVIE: '/movies/',

        /**
         * Endpoint for fetching the latest released movies.
         */
        LATEST: '/movies/latest/',

        /**
         * Endpoint for fetching upcoming movies.
         */
        UPCOMING: '/movies/upcoming/',

        /**
         * Endpoint for retrieving available movie genres.
         */
        GENRES: '/movies/genres/',

        /**
         * Endpoint for retrieving available movie languages.
         */
        LANGUAGES: '/movies/languages/',
    },

    /**
     * Routes related to cinema information.
     */
    CINEMAS: {
        /**
         * Endpoint for retrieving a list of cinemas.
         */
        LIST: '/cinemas/',

        /**
         * Endpoint for a specific cinema. Append the id and a trailing slash.
         *
         * @example ${API_ROUTES.CINEMAS.CINEMA}${id}/
         */
        CINEMA: '/cinemas/',

        /**
         * Locations of cinemas
         */
        LOCATION: '/cinemas/locations/',
    },

    /**
     * routes related to bookings
     */
    BOOKINGS: {
        /**
         *  Endpoint for retrieving slot details. Append the slot id and a trailing slash.
         *
         * @example ${API_ROUTES.BOOKINGS.SLOT_DETAILS}${id}/
         */
        SLOT_DETAILS: '/bookings/slot-details/',

        /**
         * Endpoint for booking seats
         */
        BOOKING: '/bookings/',

        /**
         * To see All the tickets
         */
        TICKETS: '/bookings/tickets/',

        /**
         * To See the All booking history (current tickets + past bookings)
         */
        HISTORY: '/bookings/history/',

        /**
         * To Cancel a Ticket
         *
         * @example ${API_ROUTES.BOOKINGS.CANCEL}${id}/
         */
        CANCEL: '/bookings/cancel/',
    },
};

/**
 * To fetch the slots details on booking page at the interval of 30 seconds
 */
export const SLOT_DETAILS_POLLING_INTERVAL_TIME = 30000;


export const DATE_FORMAT_ISO = 'yyyy-MM-dd';
export const DATE_FORMAT_CUSTOM = 'EEE, dd MMMM, yyyy';
export const TIME_FORMAT = 'hh:mm a';


export { ROUTES } from './routes.constants';
export {
    API_ROUTES,
    SLOT_DETAILS_POLLING_INTERVAL_TIME,
} from './api.constants';
export {
    DATE_FORMAT_CUSTOM,
    DATE_FORMAT_ISO,
    TIME_FORMAT,
} from './formats.constants';


/**
 * Centralized application route definitions.
 *
 * This object serves as the single source of truth for all route paths for react router
 * used throughout the application. Using these constants ensures
 * consistency, prevents hard-coded strings, enables safer refactoring,
 * and improves IDE autocomplete support.
 *
 */
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    NOT_FOUND: '*',
    MOVIES: '/movies',
    MOVIE: '/movie/:slug',
    MOVIE_SLOTS: '/movie/:slug/slots',
    BOOKING: '/booking/:slotId',
    CINEMAS: '/cinemas',
    CINEMA: '/cinema/:id',
    PROFILE: '/profile',
};


export { Booking } from './Booking';
export { Cinema } from './Cinema';
export { Cinemas } from './Cinemas';
export { Home } from './Home';
export { Login } from './Login';
export { Movie } from './Movie';
export { Movies } from './Movies';
export { MovieSlots } from './MovieSlots';
export { NotFound } from './NotFound';
export { SignUp } from './SignUp';
export { Profile } from './Profile';


import { Booking as BookingContainer } from '@/containers';

/**
 * Booking page that displays seat information and handles seat booking.
 *
 */
export const Booking = () => <BookingContainer />;


export { Booking } from './Booking.page';


import { Cinema as CinemaContainer } from '@/containers';

/**
 * A page which shows all the movies with their slots in a particular cinema with cinema location
 */
export const Cinema = () => <CinemaContainer />;


export { Cinema } from './Cinema.page';


import { Cinemas as CinemasContainer } from '@/containers';

/**
 *
 *  A page which will show list of cinemas
 */
export const Cinemas = () => <CinemasContainer />;


export { Cinemas } from './Cinemas.page';


import { Home as HomeContainer } from '@/containers';

/**
 * Home page.
 *
 * Displays the main movie discovery experience including:
 *
 * Upcoming movies carousel
 * Latest movies carousel
 */
export const Home = () => <HomeContainer />;


export { Home } from './Home.page';


import { Login as LoginContainer } from '@/containers';

/**
 * - This is a Login Form Page
 * - Users can login via their email Id and password
 */
export const Login = () => <LoginContainer />;


export { Login } from './Login.page';


import { Movie as MovieContainer } from '@/containers';
/**
 * This page will show all the available  information of the movie
 */
export const Movie = () => <MovieContainer />;


export { Movie } from './Movie.page';


import { MovieSlots as MovieSlotsContainer } from '@/containers';

/**
 *
 *  A Page which shows all the cinemas with their slots of a particular movie with movie details
 */
export const MovieSlots = () => <MovieSlotsContainer />;


export { MovieSlots } from './MovieSlots.page';


import { Movies as MoviesContainer } from '@/containers';

/**
 * Delegates rendering and data-fetching to MoviesContainer.
 */
export const Movies = () => <MoviesContainer />;


export { Movies } from './Movies.page';


import { NotFound as NotFoundContainer } from '@/containers';

export const NotFound = () => <NotFoundContainer />;


export { NotFound } from './NotFound.page';


import { Profile as ProfileContainer } from '@/containers';

/**
 *
 * @returns A page where profile details, user tickets, and past bookings are shown.
 */
export const Profile = () => <ProfileContainer />;


export { Profile } from './Profile.page';


import { SignUp as SignUpContainer } from '@/containers';

/**
 * Allows new users to register by submitting their details,
 * handles form validation, performs registration API request, stores authentication data, and redirects on success.
 */
export const SignUp = () => <SignUpContainer />;


export { SignUp } from './SignUp.page';


import { SignUp as SignUpContainer } from '@/containers';

/**
 * Allows new users to register by submitting their details,
 * handles form validation, performs registration API request, stores authentication data, and redirects on success.
 */
export const SignUp = () => <SignUpContainer />;


export { SignUp } from './SignUp.page';


export {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyLarge,
    TypographyLead,
    TypographyMuted,
    TypographyP,
    TypographySmall,
} from './Typography';
export { ModeToggle } from './ModeToggle';
export { ThemeProvider } from './ThemeProvider';
export { Card } from './Card';
export { SelectFilters } from './SelectFilters';
export { DatePicker } from './DatePicker';
export { SlotCard } from './SlotCard';
export { Seat } from './Seat';
export { Ticket } from './Ticket';


import { SunMoon } from 'lucide-react';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';

/**
 * Theme mode toggle button.
 *
 * Allows the user to switch between light and dark themes.
 * Uses the global ThemeProvider context.
 */
export const ModeToggle = () => {
    const { theme, setTheme } = useTheme();

    /**
     * Toggles the theme between light and dark mode.
     */
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Theme"
        >
            <SunMoon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    );
};


import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Supported theme modes.
 */
type Theme = 'dark' | 'light' | 'system';

/**
 * Props accepted by the ThemeProvider component.
 */
type ThemeProviderProps = {
    /**
     * Child components that will receive theme context.
     */
    children: React.ReactNode;

    /**
     * Default theme when no value is found in localStorage.
     *
     * @default 'system'
     */
    defaultTheme?: Theme;

    /**
     * Key used to store the selected theme in localStorage.
     *
     * @default 'vite-ui-theme'
     */
    storageKey?: string;
};

/**
 * Shape of the theme context state.
 */
type ThemeProviderState = {
    /**
     * Current selected theme.
     */
    theme: Theme;

    /**
     * Updates the active theme.
     *
     * @param theme - New theme value.
     */
    setTheme: (theme: Theme) => void;
};

/**
 * Initial context state.
 */
const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

/**
 * React context for theme management.
 */
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * ThemeProvider component.
 *
 * Provides theme state and updater function to the component tree.
 * Applies the selected theme to the document root and persists
 * the preference in localStorage.
 */
export const ThemeProvider = ({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
                ? 'dark'
                : 'light';

            root.classList.add(systemTheme);

            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (localTheme: Theme) => {
            localStorage.setItem(storageKey, localTheme);
            setTheme(localTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');

    return context;
};


import { cn } from '@/lib';

import type { CardProps } from './Card.types';
import { TypographyH3, TypographyMuted } from '../Typography';
import { Card as ShadCNCard, CardContent } from '../ui/card';

/**
 * Returns a card with Image, Heading and Subheading
 */
export const Card = ({
    heading,
    imageUrl,
    subheading,
    className,
    ...props
}: CardProps) => (
    <ShadCNCard
        {...props}
        className={cn('max-w-100 select-none hover:bg-muted', className)}
    >
        <CardContent>
            <div>
                <img
                    src={imageUrl}
                    alt={${heading} Poster}
                    className={cn('rounded-xl')}
                />
            </div>
            <TypographyH3
                className="whitespace-nowrap text-ellipsis overflow-hidden"
                title={heading}
            >
                {heading}
            </TypographyH3>
            <TypographyMuted
                title={subheading}
                className="whitespace-nowrap text-ellipsis overflow-hidden"
            >
                {subheading}
            </TypographyMuted>
        </CardContent>
    </ShadCNCard>
);


import type { ComponentProps } from 'react';

export type CardProps = ComponentProps<'div'> & {
    /**
     * To Show the Image in the card
     */
    imageUrl: string;

    /**
     * Heading of the card
     */
    heading: string;

    /**
     * Subheading of the card
     */
    subheading: string;
};


export { Card } from './Card.component';


import * as React from 'react';

import { Calendar as CalendarIcon, ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib';

import type { DatePickerProps } from './DatePicker.types';

/**
 * DatePicker Component
 *
 * A reusable date selection component that displays a button trigger.
 * When clicked, it opens a popover containing a calendar for selecting a date.
 *
 * Features:
 * - Supports an optional label
 * - Uses a popover for date selection
 * - Restricts selection to today and future dates
 * - Returns selected date via onChange callback
 */
export const DatePicker = ({
    label,
    onDateChange,
    selected,
    id,
    className,
    ...props
}: DatePickerProps) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(selected);
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setOpen(false);
        onDateChange?.(selectedDate);
    };

    return (
        <div className={cn('flex flex-col gap-3', className)} {...props}>
            {label && (
                <Label htmlFor={inputId} className="px-1">
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={inputId}
                        className="w-48 justify-between font-normal"
                    >
                        <CalendarIcon />
                        {date ? date.toLocaleDateString() : 'Select date'}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleDateSelect}
                        disabled={{
                            before: new Date(),
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};


import type { ComponentProps } from 'react';

export type DatePickerProps = ComponentProps<'div'> & {
    /**
     * An optional Label to show in datePicker when No date is selected
     */
    label?: string;

    /**
     * An Optional callback to handle Changing of date
     */
    onDateChange?: (date: Date | undefined) => void;

    /**
     * An optional prop to show already selected date
     */
    selected?: Date;
};


export { DatePicker } from './DatePicker.component';


import { cn } from '@/lib';

import type { SeatProps } from './Seat.types';

/**
 *  An Seat component representing the seat with disabled, available and selected state
 */
export const Seat = ({
    seatNumber,
    disabled,
    selected,
    ...props
}: SeatProps) => (
    <button
        className={cn(
            'select-none border rounded-sm text-xs flex justify-center items-center  min-h-4 min-w-6 cursor-pointer text-green-600 ',
            {
                'text-accent  cursor-not-allowed': disabled,
                'text-primary-foreground bg-green-600': selected,
                'hover:bg-green-100 ': !selected && !disabled,
            },
        )}
        {...props}
        disabled={disabled}
    >
        {seatNumber}
    </button>
);


import type { ComponentProps } from 'react';

export type SeatProps = ComponentProps<'button'> & {
    /**
     * To show the seat Number inside the seat component
     */
    seatNumber: number | string;

    /**
     * Changing and showing the seat state as selected
     */
    selected?: boolean;
};


export { Seat } from './Seat.component';


import { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { capitalizeFirstCharacter, cn } from '@/lib';

import type { SelectFilterProps } from './SelectFilters.types';
import { TypographyH4 } from '../Typography';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

/**
 * SelectFilters Component
 *
 * A reusable multi-select filter component that displays a list of selectable options
 * inside a collapsible panel. Selected values are shown as active badges and can be
 * toggled on or off.
 *
 * Features:
 * - Expandable / collapsible UI
 * - Multi-select support
 * - Clear all selections
 * - Controlled via onChange callback
 * - Supports pre-selected values
 */
export const SelectFilters = ({
    heading,
    options,
    onValueChange,
    alreadySelected,
    className,
    ...props
}: SelectFilterProps) => {
    const [selected, setSelected] = useState<string[]>(alreadySelected || []);
    const [open, setOpen] = useState<boolean>(
        (alreadySelected?.length ?? 0) > 0,
    );

    const handleClear = () => {
        setSelected([]);
        onValueChange?.([]);
    };

    const handleOptionsClick = (option: string) => {
        const optionIndex = selected.indexOf(option);
        if (optionIndex > -1) {
            setSelected((prev) => {
                const modified = [
                    ...prev.slice(0, optionIndex),
                    ...prev.slice(optionIndex + 1),
                ];
                onValueChange?.(modified);

                return modified;
            });
        } else {
            setSelected((prev) => {
                const modified = [...prev, option];
                onValueChange?.(modified);

                return modified;
            });
        }
    };

    return (
        <div className={cn('w-full', className)} {...props}>
            <Collapsible onOpenChange={setOpen} open={open}>
                <div className="flex justify-between">
                    <CollapsibleTrigger className="cursor-pointer flex justify-center items-center gap-2">
                        {open ? <ChevronUp /> : <ChevronDown />}
                        <TypographyH4>{heading}</TypographyH4>
                    </CollapsibleTrigger>
                    <Button onClick={handleClear} variant="link">
                        Clear
                    </Button>
                </div>
                <CollapsibleContent>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {options.map((option, index) => (
                            <Badge
                                key={index}
                                className="cursor-pointer rounded-lg p-2"
                                variant={
                                    selected.includes(option)
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => handleOptionsClick(option)}
                            >
                                {capitalizeFirstCharacter(option)}
                            </Badge>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};


import type { ComponentProps } from 'react';

/**
 * Props for the SelectFilters component.
 *
 * Defines the configuration and behavior of a multi-select filter group.
 */
export type SelectFilterProps = ComponentProps<'div'> & {
    /**
     * Title displayed at the top of the filter section.
     */
    heading: string;

    /**
     * List of selectable option values to be displayed as badges.
     */
    options: string[];

    /**
     * Optional list of values that should be pre-selected when the component mounts.
     */
    alreadySelected?: string[];

    /**
     * Callback function triggered whenever the selection changes.
     *
     * @param props - Updated array of selected option values
     */
    onValueChange?: (props: string[]) => void;

    /**
     * Optional additional CSS class names to apply to the root container.
     */
    className?: string;
};


export { SelectFilters } from './SelectFilters.component';


import { Clock } from 'lucide-react';

import { capitalizeFirstCharacter, cn } from '@/lib';

import type { SlotCardProps } from './SlotCard.types';
import { TypographyP } from '../Typography';
/**
 * A Card to Show the Slot Time, Slot Price and the language in which the slot is
 */
export const SlotCard = ({
    time,
    price,
    language,
    className,
    ...props
}: SlotCardProps) => (
    <div
        className={cn(
            'border cursor-pointer rounded-xl p-3 w-40 h-18 text-center text-green-600 hover:bg-green-50 overflow-hidden select-none',
            className,
        )}
        {...props}
    >
        <TypographyP>
            <Clock className="inline mr-2" />
            {time}
        </TypographyP>
        <TypographyP>
            {language ? capitalizeFirstCharacter(language) + ', ' : ''}
            &#8377;
            {price}
        </TypographyP>
    </div>
);


import type { ComponentProps } from 'react';

export type SlotCardProps = {
    /**
     * to show the slot time
     */
    time: string;

    /**
     * To show the price of the slot
     */
    price: string;

    /**
     * The language of the movie for this slot
     */
    language: string;
} & ComponentProps<'div'>;


export { SlotCard } from './SlotCard.component';


import TicketBg from '@/assets/images/ticket-bg.webp';
import { Card } from '@/components/ui/card';
import { capitalizeFirstCharacter, cn } from '@/lib';

import type { TicketProps } from './Ticket.types';
import { TypographyH3, TypographyP } from '../Typography';

/**
 * This is a component which will Show Ticket Details Including
 *  - ticket id, show date and time, movie Name and language, seat number, status of the ticket,
 *  - name and location of the cinema
 */
export const Ticket = ({
    ticketId,
    date,
    className,
    showTime,
    movieName,
    movieLanguage,
    seatNumber,
    status,
    cinemaName,
    cinemaLocation,
    ...props
}: TicketProps) => (
    <div
        style={{
            backgroundImage: url(${TicketBg}),
        }}
        className="bg-cover bg-center rounded-xl"
    >
        <Card
            className={cn(
                w-85 bg-[rgba(255,255,255,0.6)] py-10  px-2,
                className,
            )}
            {...props}
        >
            <div className=" h-full w-full text-black text-sm">
                <div className="flex justify-between mb-10">
                    <TypographyP className="text-sm">
                        Ticket Id :
                        <span className="font-bold text-xl">{ticketId}</span>
                    </TypographyP>
                    <div>
                        <TypographyP>{date}</TypographyP>
                        <TypographyP className="font-bold">
                            {showTime}
                        </TypographyP>
                    </div>
                </div>
                <TypographyH3 className="text-center">
                    {movieName} - ( {capitalizeFirstCharacter(movieLanguage)} )
                </TypographyH3>
                <TypographyP className="text-center text-lg">
                    {cinemaName} {capitalizeFirstCharacter(cinemaLocation)}
                </TypographyP>
                <div className="flex justify-between mt-10">
                    <TypographyP>
                        Seat No:
                        <span className="font-bold text-xl"> {seatNumber}</span>
                    </TypographyP>
                    <TypographyP
                        className={cn('text-xl font-bold ', {
                            'text-green-700': status === 'BOOKED',
                            'text-destructive': status === 'CANCELLED',
                            'text-yellow-700': status === 'PENDING',
                        })}
                        aria-label={Ticket status: ${status}}
                    >
                        {status}
                    </TypographyP>
                </div>
            </div>
        </Card>
    </div>
);


import type { ComponentProps } from 'react';

export type TicketProps = {
    /**
     * id of ticket
     */
    ticketId: number;

    /**
     * Date of the show
     */
    date: string;

    /**
     * Time of the Show
     */
    showTime: string;

    /**
     * Status of ticket
     */
    status: 'BOOKED' | 'PENDING' | 'CANCELLED';

    /**
     * Seat Number of the ticket
     */
    seatNumber: string;

    /**
     * Name of the movie
     */
    movieName: string;

    /**
     * Language of the movie
     */
    movieLanguage: string;

    /**
     * Name of the cinema
     */
    cinemaName: string;

    /**
     * Location of the cinema
     */
    cinemaLocation: string;
} & ComponentProps<'div'>;


export { Ticket } from './Ticket.component';


import { cn } from '@/lib';

import type { TypographyProps } from './Typography.types';

export const TypographyH1 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h1
        className={cn(
            'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
            className,
        )}
        {...args}
    >
        {children}
    </h1>
);

export const TypographyH2 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h2
        className={cn(
            'scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0',
            className,
        )}
        {...args}
    >
        {children}
    </h2>
);

export const TypographyH3 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h3
        className={cn(
            'scroll-m-20 text-2xl font-semibold tracking-tight',
            className,
        )}
        {...args}
    >
        {children}
    </h3>
);

export const TypographyH4 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h4
        className={cn(
            'scroll-m-20 text-xl font-semibold tracking-tight',
            className,
        )}
        {...args}
    >
        {children}
    </h4>
);

export const TypographyP = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <p className={cn('leading-7', className)} {...args}>
        {children}
    </p>
);

export const TypographyLead = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <p className={cn('text-muted-foreground text-xl', className)} {...args}>
        {children}
    </p>
);

export const TypographyLarge = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <div className={cn('text-lg font-semibold', className)} {...args}>
        {children}
    </div>
);

export const TypographySmall = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <small
        className={cn('text-sm leading-none font-medium', className)}
        {...args}
    >
        {children}
    </small>
);

export const TypographyMuted = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <p className={cn('text-muted-foreground text-sm', className)} {...args}>
        {children}
    </p>
);


import type { ReactNode } from 'react';

export type TypographyProps = {
    /**
     * children to show in that text format
     */
    children: ReactNode;

    /**
     * to apply extra classes
     */
    className?: string;

    /**
     * id for unique- identification
     */
    id?: string;

    /**
     *To show the extra info
     */
    title?: string;
};


export {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyLarge,
    TypographyLead,
    TypographyMuted,
    TypographyP,
    TypographySmall,
} from './Typography';


// This file is automatically generated by shadcn
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
    'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    {
        variants: {
            variant: {
                default: 'bg-card text-card-foreground',
                destructive:
                    'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Alert({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
    return (
        <div
            data-slot="alert"
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
                className,
            )}
            {...props}
        />
    );
}

function AlertDescription({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
                className,
            )}
            {...props}
        />
    );
}

export { Alert, AlertTitle, AlertDescription };
