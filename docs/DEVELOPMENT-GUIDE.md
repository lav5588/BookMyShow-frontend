# Development Guide

This guide provides developers with conventions, workflows, and step-by-step procedures for contributing to and building features in the **BookMyShow Frontend** codebase.

---

## 1. Git Workflow & Branching Conventions

We use feature branches off `main` and pull requests with automated continuous integration (CI) quality gates.

### Branch Naming Conventions

Branches follow the format `<initials>_<project>_<task-number>` (e.g., `ly_bms_02`):

- **`ly`**: First letters of the contributor's first and last name (e.g., **L**av **Y**adav).
- **`bms`**: Short form of the project name (**B**ook**M**y**S**how).
- **`02`**: Two-digit task number (e.g., `00`, `01`, `02`).

### Pull Request Workflow

1. Pull the latest commits from `main`:
    ```bash
    git checkout main
    git pull origin main
    ```
2. Create and switch to your feature branch:
    ```bash
    git checkout -b ly_bms_02
    ```
3. Make atomic, well-tested commits.
4. Run all local quality checks before pushing:
    ```bash
    npm run prettier
    npm run lint
    npm run ts:check
    npm run build
    ```
5. Push to the remote repository and open a Pull Request using the repository's PR template.

---

## 2. Component & Container Architecture

We adhere strictly to the **Container-Component Pattern** to separate business logic and presentation.

### Container Responsibilities (`src/containers/`)

- Interacts with Redux state via `useAppSelector` and `useAppDispatch`.
- Executes RTK Query hooks (e.g., `useMovieQuery`, `useBookingMutation`).
- Manages form states (`useForm` with `zodResolver`).
- Handles navigation (`useNavigate`, `useParams`, `useSearchParams`).
- Transforms raw API data into presentation-ready props.

### Component Responsibilities (`src/components/`)

- Purely presentational and stateless (or holds only isolated UI state like popover visibility).
- Receives data and callbacks strictly through typed props.
- Focuses on accessibility, layout, and visual styling.

### Workflow: Adding a New Feature Screen

1. **Define Schema & Types** (if input forms or new entities are involved):
    - Add Zod schemas to `src/schemas/`.
    - Add types to `src/services/services.types.ts` or local `*.types.ts`.
2. **Build Presentational Components**:
    - Create subcomponents in `src/components/` or inside the feature directory.
3. **Assemble the Container**:
    - Create `[Feature].container.tsx` in `src/containers/[Feature]/`.
    - Wire up RTK Query hooks, form state, and handlers.
4. **Create the Page**:
    - Create `[Feature].page.tsx` in `src/pages/[Feature]/` that simply returns `<FeatureContainer />`.
5. **Add Route Constant & Route Entry**:
    - Register route in `src/constants/routes.constants.ts`.
    - Register the route element in `src/router/routes.tsx`.

---

## 3. Extending the API Layer (RTK Query)

To connect with a new backend endpoint:

### Step 1: Add Route Constant

In [`src/constants/api.constants.ts`](../src/constants/api.constants.ts):

```typescript
export const API_ROUTES = {
    // ...
    REVIEWS: {
        LIST: '/movies/reviews/',
        ADD: '/movies/reviews/add/',
    },
};
```

### Step 2: Define Request and Response Types

In [`src/services/services.types.ts`](../src/services/services.types.ts):

```typescript
export interface Review {
    id: number;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface AddReviewRequest {
    movie_id: number;
    rating: number;
    comment: string;
}
```

### Step 3: Define Endpoint in `services.ts`

In [`src/services/services.ts`](../src/services/services.ts):

```typescript
reviews: builder.query<Review[], { movieId: number }>({
    query: ({ movieId }) => ({
        url: `${API_ROUTES.REVIEWS.LIST}?movie_id=${movieId}`,
    }),
    providesTags: ['reviews'],
}),

addReview: builder.mutation<{ message: string }, { token: string; data: AddReviewRequest }>({
    query: ({ token, data }) => ({
        url: API_ROUTES.REVIEWS.ADD,
        method: 'POST',
        body: data,
        headers: {
            authorization: `Bearer ${token}`,
        },
    }),
    invalidatesTags: ['reviews'],
}),
```

### Step 4: Export the Auto-Generated Hooks

Export the generated hooks at the bottom of `src/services/services.ts` and in `src/services/index.ts`.

---

## 4. Form Handling with React Hook Form & Zod

All form inputs must be validated with Zod schemas to guarantee client-side input safety.

### Example Implementation:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { loginSchema } from '@/schemas';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const LoginForm = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        // Dispatch mutation...
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Log In</Button>
            </form>
        </Form>
    );
};
```

---

## 5. Theming & Styling Best Practices

- **Tailwind CSS 4**: Use utility classes defined in Tailwind 4. Avoid writing bespoke CSS files unless creating complex animations or global reset rules.
- **Semantic Colors**: Use semantic utility classes (`bg-background`, `text-foreground`, `bg-primary`, `text-destructive`, `border-border`) rather than hardcoded colors (`bg-white`, `text-black`) to support seamless light and dark mode switching.
- **shadcn/ui & Radix**: Reuse atomic components from `src/components/ui/`.
- **Theme Hook**: Access and toggle the theme using `useTheme()` from `src/components/Theme`:
    ```tsx
    const { theme, setTheme } = useTheme();
    ```

---

## 6. Pre-Commit Verification Checklist

Before pushing any commit or opening a pull request, execute the following commands locally:

- [ ] **Formatting Check**:
    ```bash
    npm run prettier
    ```
- [ ] **Linting Check**:
    ```bash
    npm run lint
    ```
- [ ] **TypeScript Type Check**:
    ```bash
    npm run ts:check
    ```
- [ ] **Production Build**:
    ```bash
    npm run build
    ```
