import { Link } from 'react-router';

import {
    Image,
    LandingSection,
    MovieCarousel,
    TypographyH1,
    TypographyP,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
    useLatestMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
} from '@/services';

import { HomePageConfig } from './Homconfig.config';

export const Home = () => {
    const {
        data: latestMovies,
        fetchNextPage: seeMoreLatestMovies,
        hasNextPage: hasNextLatestMovies,
        isLoading: isLatestMovieLoading,
    } = useLatestMoviesInfiniteQuery();

    const {
        data: upcomingMovies,
        fetchNextPage: seeMoreUpcomingMovies,
        hasNextPage: hasNextUpcomingMovies,
        isLoading: isUpcomingMovieLoading,
    } = useUpcomingMoviesInfiniteQuery();

    return (
        <div className="flex flex-col items-center w-full">
            <section className="w-full">
                <div className=" grid md:grid-cols-2 items-center justify-between w-full">
                    {/* Illustration */}
                    <div className="order-1 md:order-2 flex items-center md:justify-end justify-center">
                        <Image
                            src={HomePageConfig.hero.image}
                            alt="Hero Illustration"
                            height={{
                                base: 67,
                                sm: 107.2,
                                md: 128.6,
                                lg: 85.8,
                                xl: 107.2,
                                '2xl': 128.6,
                            }}
                            width={{
                                base: 90,
                                sm: 160,
                                md: 192,
                                lg: 128,
                                xl: 160,
                                '2xl': 192,
                            }}
                            fillImage="contain"
                        />
                    </div>

                    {/* Text */}
                    <div className="order-2 md:order-1 space-y-6">
                        <TypographyH1>{HomePageConfig.hero.title}</TypographyH1>

                        <TypographyP className="text-muted-foreground">
                            {HomePageConfig.hero.description}
                        </TypographyP>

                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg">
                                <Link
                                    to={HomePageConfig.hero.primaryButton.link}
                                >
                                    {HomePageConfig.hero.primaryButton.text}
                                </Link>
                            </Button>

                            <Button asChild size="lg" variant="outline">
                                <Link
                                    to={
                                        HomePageConfig.hero.secondaryButton.link
                                    }
                                >
                                    {HomePageConfig.hero.secondaryButton.text}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <MovieCarousel
                title="Upcoming Movies"
                movies={upcomingMovies?.pages.flatMap((p) => p.results) ?? []}
                isLoading={isUpcomingMovieLoading}
                hasNextPage={!!hasNextUpcomingMovies}
                onSeeMore={() => void seeMoreUpcomingMovies()}
                emptyMessage="No Upcoming Movies Available"
            />

            <MovieCarousel
                title="Latest Movies"
                movies={latestMovies?.pages.flatMap((p) => p.results) ?? []}
                isLoading={isLatestMovieLoading}
                hasNextPage={!!hasNextLatestMovies}
                onSeeMore={() => void seeMoreLatestMovies()}
                emptyMessage="No Latest Movies Available"
            />

            <div className="space-y-6 my-6 w-full">
                {HomePageConfig.sections.map((section) => {
                    const Icon = section.icon;

                    return (
                        <LandingSection
                            key={section.title}
                            {...section}
                            icon={Icon ? <Icon /> : undefined}
                        />
                    );
                })}
            </div>
        </div>
    );
};
