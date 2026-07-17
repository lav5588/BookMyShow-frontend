import { format } from 'date-fns';
import { Film, MapPin } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';

import SlotsNotAvailableSvg from '@/assets/images/slots-not-available.svg';
import {
    DateCard,
    Image,
    SlotCard,
    TypographyH1,
    TypographyH4,
    TypographyP,
} from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { TIME_FORMAT } from '@/constants';
import { useCinemaQuery, useSlotsByCinemaQuery } from '@/services';
import { useAvailableSlotsDatesQuery } from '@/services/services';

/**
 * A container which shows all the movies with their slots in a particular cinema with cinema location
 */
export const Cinema = () => {
    const { id } = useParams();
    const { data: cinema, isLoading: isCinemaLoading } = useCinemaQuery(
        { id: id! },
        { skip: !id },
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: movieSlots, isLoading: isMovieSlotsLoading } =
        useSlotsByCinemaQuery({
            cinema_id: id,
            date: searchParams.get('date') ?? undefined,
        });

    const { data: avalableSlotsDates } = useAvailableSlotsDatesQuery({
        cinema_id: id,
    });

    return (
        <div className="my-6 flex flex-col gap-4">
            {!isCinemaLoading && cinema && (
                <>
                    <TypographyH1>{cinema?.name}</TypographyH1>
                    <TypographyP>
                        <MapPin className="inline mr-2" />
                        {cinema?.location.location}
                    </TypographyP>
                </>
            )}
            {isCinemaLoading && (
                <>
                    <Skeleton className="h-10 w-70" />
                    <Skeleton className="h-7 w-70 mt-4" />
                </>
            )}

            <div
                role="radiogroup"
                aria-label="Available dates"
                className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1"
            >
                {avalableSlotsDates?.map((date) => {
                    const formattedDate = format(date, 'yyyy-MM-dd');

                    const selected = formattedDate === searchParams.get('date');

                    return (
                        <DateCard
                            date={date}
                            key={date}
                            selected={selected}
                            handleClick={() => {
                                searchParams.set('date', formattedDate);
                                setSearchParams(searchParams);
                            }}
                        />
                    );
                })}
            </div>
            <div>
                {!isMovieSlotsLoading && !!movieSlots?.length && (
                    <>
                        {movieSlots?.map((movie) => (
                            <div key={movie.id}>
                                <div className="h-px bg-border"></div>
                                <div className="flex flex-col  gap-6 py-4">
                                    <div>
                                        <TypographyH4>
                                            <Film className="inline mr-2" />
                                            {movie.name}
                                        </TypographyH4>
                                    </div>
                                    <div className="flex flex-wrap gap-6">
                                        {movie.slots.map((slot) => (
                                            <Link
                                                to={`/booking/${slot.id}`}
                                                key={slot.id}
                                            >
                                                <SlotCard
                                                    price={slot.price}
                                                    time={format(
                                                        slot.date_time,
                                                        TIME_FORMAT,
                                                    )}
                                                    language={
                                                        movie.languages.find(
                                                            (language) =>
                                                                language.id ===
                                                                slot.language,
                                                        )?.language || ''
                                                    }
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="h-px bg-border"></div>
                    </>
                )}
                {isMovieSlotsLoading && (
                    <>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={`row${index}`}>
                                <div className="h-px bg-border"></div>
                                <div className="flex flex-col  gap-6 py-4">
                                    <Skeleton className="w-100 h-8" />
                                    <div className="flex flex-wrap gap-6">
                                        {Array.from({ length: 6 }).map(
                                            (__, idx) => (
                                                <Skeleton
                                                    key={`row${index}col${idx}`}
                                                    className="w-40 h-18 rounded-xl"
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="h-px bg-border"></div>
                    </>
                )}
                {!isMovieSlotsLoading && !movieSlots?.length && (
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={SlotsNotAvailableSvg}
                            alt="Slots not available fallback"
                        />
                        <TypographyH4 className="text-center">
                            No Slots Available for the selected Date. Please
                            Change the Date.
                        </TypographyH4>
                    </div>
                )}
            </div>
        </div>
    );
};
