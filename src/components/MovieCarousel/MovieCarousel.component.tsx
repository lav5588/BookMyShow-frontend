import { Link } from 'react-router';

import MovieNotAvailableSVG from '@/assets/images/movie-not-available.svg';
import { Card, Image, TypographyH3, TypographyH4 } from '@/components';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib';

import type { MovieCarouselProps } from './MovieCarousel.types';

export const MovieCarousel = ({
    title,
    movies,
    isLoading,
    hasNextPage,
    onSeeMore,
    emptyMessage,
}: MovieCarouselProps) => (
    <section
        className={cn(
            'my-4 w-[75%] sm:w-[80%] md:w-[85%] lg:w-[90%] xl:w-[95%] 2xl:w-[98%]',
            {
                hidden: !isLoading && movies.length === 0,
            },
        )}
    >
        <div className="flex justify-between">
            <TypographyH3>{title}</TypographyH3>

            <Button variant="ghost" onClick={onSeeMore} disabled={!hasNextPage}>
                See More
            </Button>
        </div>

        <div className="flex justify-center w-full">
            <Carousel className="w-full">
                <CarouselContent>
                    {!isLoading &&
                        movies.map((movie) => (
                            <CarouselItem key={movie.id}>
                                <Link to={`/movie/${movie.slug}`}>
                                    <Card
                                        heading={movie.name}
                                        imageUrl={movie.movie_poster ?? ''}
                                        subheading={movie.genres
                                            .map((genre) => genre.genre)
                                            .join('/')
                                            .slice(0, 60)}
                                        className="h-60 sm:h-80 w-75 sm:w-100"
                                    />
                                </Link>
                            </CarouselItem>
                        ))}

                    {isLoading &&
                        Array.from({ length: 6 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <Skeleton className="h-60 sm:h-80 w-75 sm:w-100 rounded-xl" />
                            </CarouselItem>
                        ))}

                    {!isLoading && movies.length === 0 && (
                        <CarouselItem>
                            <Image
                                src={MovieNotAvailableSVG}
                                alt={`${title} fallback`}
                            />

                            <TypographyH4>{emptyMessage}</TypographyH4>
                        </CarouselItem>
                    )}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </section>
);
