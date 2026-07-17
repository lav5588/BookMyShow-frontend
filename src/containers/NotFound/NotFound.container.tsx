import { Link } from 'react-router';

import NotFoundIllustration from '@/assets/illustrations/not-found.svg';
import { TypographyH1, TypographyP } from '@/components';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export const NotFound = () => (
    <section className="flex min-h-96 flex-col items-center justify-center gap-4 py-8 text-center">
        <img
            src={NotFoundIllustration}
            alt="Illustration of a lost movie ticket"
            className="w-full max-w-sm"
        />
        <TypographyH1>Page not found</TypographyH1>
        <TypographyP className="max-w-md text-muted-foreground">
            The page you are looking for does not exist or may have moved.
        </TypographyP>
        <Button asChild className="mt-2">
            <Link to={ROUTES.HOME}>Back to home</Link>
        </Button>
    </section>
);
