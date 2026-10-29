# Requirements Specification

This document outlines the functional and non-functional requirements for the **BookMyShow Frontend** web application.

---

## 1. Project Purpose & Scope

The BookMyShow frontend is a responsive, single-page web application providing movie discovery, cinema exploration, showtime browsing, and seat reservation services. It integrates with the BookMyShow REST backend to deliver a secure, accessible, and fast experience across desktop and mobile devices.

---

## 2. User Personas

1. **Guest Visitor (Moviegoer)**: Unauthenticated user who wants to browse current and upcoming movies, view trailers, check cinema schedules, and explore available showtimes.
2. **Registered Member**: Authenticated user who books movie tickets, manages active reservations, cancels bookings, and maintains their personal profile.
3. **Cinema Explorer**: User seeking screenings at a specific cinema location or searching for venues near their current city.

---

## 3. Functional Requirements

### FR-1: Home & Discovery Experience

- **Hero Banner**: Showcase featured blockbusters and promotional campaigns in a high-impact responsive carousel.
- **Latest Movies Carousel**: Display currently running movies with instant rating badges, titles, and direct links to details.
- **Upcoming Movies Grid**: Highlight upcoming releases with release dates and trailers.
- **Quick Links**: Direct shortcuts to Cinema listings, Movies catalog, and Contact Us.

---

### FR-2: Movie Browsing & Search Filters

- **Catalog View**: Browse all active movies with responsive poster cards.
- **Infinite Scrolling**: Automatically load additional movie pages as the user scrolls, powered by RTK Query's infinite query mechanism.
- **Multi-Filter Support**:
    - Filter by **Language** (e.g., English, Hindi, Spanish, Tamil, Telugu).
    - Filter by **Genre** (e.g., Action, Drama, Comedy, Sci-Fi).
    - Filter by **Cinema** venue.
    - Filter by **Slot Date** using the interactive calendar picker.
- **Empty States**: Display clear visual feedback when no movies match the active filter criteria.

---

### FR-3: Movie Details & Showtime Selection

- **Movie Information**: Detailed view displaying synopsis, duration, genres, release date, languages, and poster imagery.
- **Available Slot Dates**: Dynamic calendar strip showing available screening dates for that specific movie.
- **Cinemas & Showtimes**: Grouped listing of cinemas presenting the movie, accompanied by clickable time slots indicating screen format and availability.

---

### FR-4: Cinema Catalog & Venue Schedules

- **Cinema Discovery**: Complete list of cinemas with location tags and addresses.
- **Location Filtering**: Filter cinemas by metropolitan area or region (e.g., Delhi, Mumbai, Bengaluru).
- **Cinema Detail Screen**: View cinema information and all movies screening at that theatre on a given date.

---

### FR-5: Interactive Seat Selection & Ticket Booking

- **Visual Seat Map**: Interactive layout displaying available, selected, and reserved seats across different price tiers (e.g., Standard, Premium, VIP).
- **Real-Time Polling**: Periodically poll slot availability via `SLOT_DETAILS_POLLING_INTERVAL_TIME` to prevent double-booking of seats in high-demand screenings.
- **Booking Summary**: Real-time calculation of subtotal, convenience fees, and total ticket price.
- **Checkout / Confirmation**: Secure mutation to lock and confirm tickets, with immediate redirect to ticket confirmation on success.

---

### FR-6: User Authentication & Session Security

- **User Registration (`/signup`)**:
    - Full name, valid email, and secure password.
    - Confirmation password validation with real-time Zod checks.
    - Optional profile picture upload with client-side file size and MIME-type validation.
- **User Login (`/login`)**:
    - Email and password authentication returning JWT access and refresh tokens.
    - Automatic injection of Bearer token into authenticated requests.
- **User Logout**:
    - Server-side token invalidation and client-side Redux store purge.
- **Session Persistence**:
    - Seamless token refresh mechanism using refresh tokens via HTTP cookies (`credentials: 'include'`).

---

### FR-7: Profile & Ticket Management (`/profile`)

- **Profile Dashboard**: View personal account details (name, email, phone number, profile photo).
- **Edit Profile**: Modal dialog for updating personal details and avatar image with automatic cache invalidation (`providesTags: ['userDetails']`).
- **Active Tickets**: Display booked tickets with cinema venue, screen number, showtime, selected seat identifiers, and booking references.
- **Past Bookings History**: Infinite scrolling list of previous bookings.
- **Ticket Cancellation**: Option to cancel active tickets before showtime with instant UI updates.

---

### FR-8: Customer Support & Static Pages

- **About Us (`/about`)**: Company vision, platform background, and technology showcase.
- **Contact Us (`/contact`)**: Support form capturing user name, email, subject, and message, with direct submission to the backend API.

---

### FR-9: Theme & Display Options

- **Dark / Light Theme Toggle**: One-click theme switcher in the navigation bar.
- **System Preference Sync**: Automatically detects and respects the user's OS color scheme preferences.
- **Persistence**: Persists selected theme in `localStorage` across browsing sessions.

---

## 4. Non-Functional Requirements

### NFR-1: Performance & Optimization

- **Largest Contentful Paint (LCP)**: Target LCP under 1.8 seconds on standard 4G networks.
- **Bundle Optimization**: Terser minification, console logging suppression, and zero source-map leakage in production.
- **Asset Optimization**: Build-time raster image compression via `vite-plugin-image-optimizer`.
- **Intelligent Caching**: RTK Query cache invalidation preventing unnecessary background fetches.

---

### NFR-2: Accessibility (a11y)

- **Standard**: Target WCAG 2.1 Level AA compliance.
- **Keyboard Navigation**: All interactive elements (dialogs, dropdowns, calendars, seat selection) must be fully operable using keyboard alone (`Tab`, `Enter`, `Escape`, Arrow keys).
- **Screen Reader Support**: Radix UI primitives supply correct ARIA roles, states, and focus trapping.
- **Contrast Ratios**: Minimum 4.5:1 text-to-background contrast in both light and dark themes.

---

### NFR-3: Mobile & Cross-Platform Responsiveness

- Support responsive viewport widths ranging from **360px** (mobile) to **2560px** (ultra-wide desktop displays).
- Touch-friendly tap targets of at least **44x44px** on mobile viewports.
- Responsive navigation drawer for mobile screens.

---

### NFR-4: Security & Data Integrity

- **Client Sanitization**: All form inputs validated client-side with Zod prior to API dispatch.
- **Zero Secrets in Bundle**: No private API keys or database secrets committed or exposed in client bundles.
- **CORS & Credentials**: Safe transmission of authentication cookies via `credentials: 'include'`.

---

### NFR-5: Browser Support Matrix

- Google Chrome (latest 2 versions)
- Mozilla Firefox (latest 2 versions)
- Apple Safari (latest 2 versions)
- Microsoft Edge (latest 2 versions)
- iOS Safari & Android Chrome
