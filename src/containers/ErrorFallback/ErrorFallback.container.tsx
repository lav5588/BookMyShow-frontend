import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

import ErrorFallbackIllustration from '@/assets/illustrations/error-fallback.svg';
import { TypographyH1, TypographyP } from '@/components';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export const ErrorFallback = () => {
    const error = useRouteError();
    const message = isRouteErrorResponse(error)
        ? error.statusText
        : error instanceof Error
          ? error.message
          : 'Something unexpected happened while loading this page.';

    return (
        <section className="flex min-h-96 flex-col items-center justify-center gap-4 py-8 text-center">
            <img
                src={ErrorFallbackIllustration}
                alt="Warning illustration"
                className="w-full max-w-sm"
            />
            <TypographyP className="font-semibold text-destructive">
                Something went wrong
            </TypographyP>
            <TypographyH1>We could not load this page</TypographyH1>
            <TypographyP className="max-w-md text-muted-foreground">
                {message || 'Please try again, or return to the home page.'}
            </TypographyP>
            <div className="mt-2 flex gap-3">
                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                >
                    Try again
                </Button>
                <Button asChild>
                    <Link to={ROUTES.HOME}>Back to home</Link>
                </Button>
            </div>
        </section>
    );
};
