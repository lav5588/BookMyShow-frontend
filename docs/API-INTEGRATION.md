# API Integration Reference

This document provides a comprehensive technical reference for the API integration between the **BookMyShow Frontend** and the backend REST services.

---

## 1. Overview & Base Configuration

Data fetching is orchestrated using **RTK Query** defined in [`src/services/services.ts`](../src/services/services.ts).

### Base URL

Configured dynamically from the environment:

```typescript
baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}`,
});
```

### Credentials & Security

All authenticated or cookie-dependent endpoints include `credentials: 'include'`, ensuring cross-origin authentication cookies (e.g., refresh token cookies) are transmitted safely.

### Multipart/Form-Data Helper

File uploads (e.g., avatar pictures during registration or profile updates) are transformed using `getFormData`:

```typescript
const getFormData = (object: Record<string, string | File | undefined>) =>
    Object.keys(object).reduce((formData, key) => {
        if (object[key]) {
            formData.append(key, object[key]);
        }
        return formData;
    }, new FormData());
```

---

## 2. API Endpoints Catalog

### Authentication & User Endpoints

| Endpoint           | Method  | Route Constant                    | Auth Header      | Description                                                 |
| :----------------- | :------ | :-------------------------------- | :--------------- | :---------------------------------------------------------- |
| **Register User**  | `POST`  | `API_ROUTES.USERS.REGISTER`       | No               | Creates a user account with multipart profile image.        |
| **Login User**     | `POST`  | `API_ROUTES.USERS.LOGIN`          | No               | Authenticates user; returns JWT access token and user info. |
| **Logout User**    | `POST`  | `API_ROUTES.USERS.LOGOUT`         | No               | Invalidates backend refresh token / session.                |
| **Refresh Token**  | `POST`  | `API_ROUTES.USERS.REFRESH_TOKEN`  | No               | Issues a new access token via stored refresh credentials.   |
| **User Details**   | `GET`   | `API_ROUTES.USERS.PROFILE`        | `Bearer <token>` | Fetches current user profile and account details.           |
| **Update Profile** | `PATCH` | `API_ROUTES.USERS.UPDATE_PROFILE` | `Bearer <token>` | Updates profile info and avatar image.                      |

---

### Movies Endpoints

| Endpoint            | Method | Route Constant / Path                    | Query Parameters                                     | Description                                     |
| :------------------ | :----- | :--------------------------------------- | :--------------------------------------------------- | :---------------------------------------------- |
| **List Movies**     | `GET`  | `API_ROUTES.MOVIES.LIST`                 | `page`, `languages`, `genres`, `cinema`, `slot_date` | Paginated movie catalog with filters.           |
| **Movie Details**   | `GET`  | `${API_ROUTES.MOVIES.MOVIE}${slug}/`     | None                                                 | Detailed movie information by slug.             |
| **Latest Movies**   | `GET`  | `API_ROUTES.MOVIES.LATEST`               | `page`                                               | Paginated list of latest movie releases.        |
| **Upcoming Movies** | `GET`  | `API_ROUTES.MOVIES.UPCOMING`             | `page`                                               | Paginated list of upcoming movies.              |
| **Languages**       | `GET`  | `API_ROUTES.MOVIES.LANGUAGES`            | None                                                 | Returns list of supported movie languages.      |
| **Genres**          | `GET`  | `API_ROUTES.MOVIES.GENRES`               | None                                                 | Returns list of movie genres.                   |
| **Movie Showtimes** | `GET`  | `/movies/${slug}/movie-slots/`           | `date`                                               | Retrieves showtime slots for a movie by cinema. |
| **Movie Dates**     | `GET`  | `/movies/${slug}/available-slots-dates/` | None                                                 | Dates when slots exist for a movie.             |

---

### Cinemas Endpoints

| Endpoint            | Method | Route Constant / Path                          | Query Parameters | Description                                      |
| :------------------ | :----- | :--------------------------------------------- | :--------------- | :----------------------------------------------- |
| **List Cinemas**    | `GET`  | `API_ROUTES.CINEMAS.LIST`                      | `location`       | List of cinemas optionally filtered by location. |
| **Cinema Details**  | `GET`  | `${API_ROUTES.CINEMAS.CINEMA}${id}/`           | None             | Detailed profile of a cinema.                    |
| **Cinema Slots**    | `GET`  | `/cinemas/${cinema_id}/movie-slots/`           | `date`           | Shows screening slots for a cinema on a date.    |
| **Available Dates** | `GET`  | `/cinemas/${cinema_id}/available-slots-dates/` | None             | Active screening dates for a cinema.             |
| **Locations**       | `GET`  | `API_ROUTES.CINEMAS.LOCATION`                  | None             | List of available cities/locations.              |

---

### Bookings & Tickets Endpoints

| Endpoint           | Method  | Route Constant / Path                       | Auth Header      | Description                               |
| :----------------- | :------ | :------------------------------------------ | :--------------- | :---------------------------------------- |
| **Slot Details**   | `GET`   | `${API_ROUTES.BOOKINGS.SLOT_DETAILS}${id}/` | Optional         | Seat map, price tiers, and seat statuses. |
| **Book Seats**     | `POST`  | `API_ROUTES.BOOKINGS.BOOKING`               | `Bearer <token>` | Reserves selected seats for a slot.       |
| **Cancel Ticket**  | `PATCH` | `${API_ROUTES.BOOKINGS.CANCEL}${id}/`       | `Bearer <token>` | Cancels a reserved ticket.                |
| **Active Tickets** | `GET`   | `API_ROUTES.BOOKINGS.TICKETS`               | `Bearer <token>` | Paginated list of active user tickets.    |
| **Past Bookings**  | `GET`   | `API_ROUTES.BOOKINGS.HISTORY`               | `Bearer <token>` | Paginated booking history.                |

---

### Customer Support Endpoint

| Endpoint       | Method | Route Constant          | Auth Header | Description                           |
| :------------- | :----- | :---------------------- | :---------- | :------------------------------------ |
| **Contact Us** | `POST` | `API_ROUTES.CONTACT_US` | No          | Submits customer feedback or inquiry. |

---

## 3. Tag Types & Cache Invalidation

RTK Query employs cache tagging to guarantee immediate UI updates without manual refetches:

```typescript
tagTypes: ['slotDetails', 'userDetails', 'tickets'];
```

- When `booking` or `cancelTicket` completes, tags `['slotDetails', 'tickets']` are invalidated, forcing the seat map and user ticket lists to reload.
- When `updateUserDetails` completes, tag `['userDetails']` is invalidated, synchronizing profile data across all screens.

---

## 4. Real-Time Polling Strategy

For slot seat layout and live seat statuses, frontend polling prevents selecting seats already booked by another user:

```tsx
import { useSlotDetailsQuery } from '@/services';
import { SLOT_DETAILS_POLLING_INTERVAL_TIME } from '@/constants';

const { data: slot, isLoading } = useSlotDetailsQuery(
    { id: slotId },
    {
        pollingInterval: SLOT_DETAILS_POLLING_INTERVAL_TIME,
        skip: !slotId,
    },
);
```

---

## 5. Hook Export Summary

All endpoints are exported as generated React hooks:

```typescript
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
    useAvailableSlotsDatesQuery,
    useSlotsByMovieSlugQuery,
    useAvailableMovieSlotDatesQuery,
    useSlotDetailsQuery,
    useBookingMutation,
    useUpdateUserDetailsMutation,
    useTicketsInfiniteQuery,
    usePastBookingsInfiniteQuery,
    useCancelTicketMutation,
    useContactUsMutation,
} = api;
```
