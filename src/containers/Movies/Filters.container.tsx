import { useState } from 'react';

import { format } from 'date-fns';
import { useSearchParams } from 'react-router';

import { DatePicker } from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DATE_FORMAT_ISO } from '@/constants';
import { useCinemasQuery, useGenresQuery, useLanguagesQuery } from '@/services';
import { DialogClose } from '@radix-ui/react-dialog';

/**
 * Filters Container
 *
 * Provides a user interface for filtering movies based on:
 * - Languages (multi-select)
 * - Genres (multi-select)
 * - Cinema (single select)
 * - Date (date picker)
 *
 * The selected filter values are stored in the URL search parameters
 * so they can be accessed by other components such as the Movies list.
 *
 * This component does not directly fetch movies; instead, it updates
 * the query parameters used by the parent component to trigger filtering.
 */
export const Filters = ({ inModal = false }: { inModal?: boolean }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersToApply, setFiltersToApply] = useState<{
        languages?: string[];
        genres?: string[];
        slot_date?: string;
        cinema?: string;
    }>({
        languages: searchParams.get('languages')?.split(','),
        genres: searchParams.get('genres')?.split(','),
        slot_date: searchParams.get('slot_date') ?? undefined,
        cinema: searchParams.get('cinema') ?? undefined,
    });

    const { data: totalLanguages } = useLanguagesQuery();
    const { data: totalGenres } = useGenresQuery();
    const { data: totalCinemas } = useCinemasQuery({
        location: undefined,
    });

    const applyBtnDisabled =
        filtersToApply.cinema == searchParams.get('cinema') &&
        filtersToApply.slot_date == searchParams.get('slot_date') &&
        filtersToApply.genres?.sort().join(',') == searchParams.get('genres') &&
        filtersToApply.languages?.sort().join(',') ==
            searchParams.get('languages');

    const hasFilters = Boolean(
        filtersToApply.cinema ||
        filtersToApply.slot_date ||
        filtersToApply.languages?.length ||
        filtersToApply.genres?.length ||
        searchParams.get('cinema') ||
        searchParams.get('slot_date') ||
        searchParams.get('languages') ||
        searchParams.get('genres'),
    );

    const handleApplyFilter = () => {
        searchParams.delete('languages');
        searchParams.delete('genres');
        searchParams.delete('slot_date');
        searchParams.delete('cinema');

        if (filtersToApply.cinema) {
            searchParams.append('cinema', filtersToApply.cinema);
        }

        if (filtersToApply.slot_date) {
            searchParams.append('slot_date', filtersToApply.slot_date);
        }

        if (filtersToApply.languages?.length) {
            searchParams.append(
                'languages',
                filtersToApply.languages.sort().join(','),
            );
        }

        if (filtersToApply.genres?.length) {
            searchParams.append(
                'genres',
                filtersToApply.genres.sort().join(','),
            );
        }
        setSearchParams(searchParams);
    };

    const handleLanguageChange = (languages: string[]) => {
        setFiltersToApply((prev) => ({
            ...prev,
            languages,
        }));
    };

    const handleGenreChange = (genres: string[]) => {
        setFiltersToApply((prev) => ({
            ...prev,
            genres,
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFiltersToApply((prev) => ({
                ...prev,
                slot_date: format(date, DATE_FORMAT_ISO),
            }));
        } else {
            setFiltersToApply((prev) => ({
                ...prev,
                slot_date: undefined,
            }));
        }
    };

    const handleCinemaSelection = (cinema_id: string) => {
        if (cinema_id !== '-1') {
            setFiltersToApply((prev) => ({
                ...prev,
                cinema: cinema_id,
            }));
        } else {
            setFiltersToApply((prev) => ({
                ...prev,
                cinema: undefined,
            }));
        }
    };

    const handleClearAllFilters = () => {
        setFiltersToApply({});

        const clearedSearchParams = new URLSearchParams(searchParams);
        clearedSearchParams.delete('languages');
        clearedSearchParams.delete('genres');
        clearedSearchParams.delete('slot_date');
        clearedSearchParams.delete('cinema');
        setSearchParams(clearedSearchParams);
    };

    return (
        <div className=" flex-col gap-6 bg-accent p-10 rounded-xl  h-full flex ">
            <div className="flex justify-end">
                <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs underline"
                    onClick={handleClearAllFilters}
                    disabled={!hasFilters}
                >
                    Clear all filters
                </Button>
            </div>

            <div>
                <Label className="mb-3">Languages</Label>
                <MultiSelect
                    values={filtersToApply.languages ?? []}
                    onValuesChange={handleLanguageChange}
                >
                    <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select languages" />
                    </MultiSelectTrigger>
                    <MultiSelectContent
                        search={{
                            placeholder: 'Search languages...',
                            emptyMessage: 'No languages found.',
                        }}
                    >
                        <MultiSelectGroup>
                            {totalLanguages?.map(({ id, language }) => (
                                <MultiSelectItem key={id} value={id.toString()}>
                                    {language}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectGroup>
                    </MultiSelectContent>
                </MultiSelect>
            </div>

            <div>
                <Label className="mb-3">Genres</Label>
                <MultiSelect
                    values={filtersToApply.genres ?? []}
                    onValuesChange={handleGenreChange}
                >
                    <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select genres" />
                    </MultiSelectTrigger>
                    <MultiSelectContent
                        search={{
                            placeholder: 'Search genres...',
                            emptyMessage: 'No genres found.',
                        }}
                    >
                        <MultiSelectGroup>
                            {totalGenres?.map(({ id, genre }) => (
                                <MultiSelectItem key={id} value={id.toString()}>
                                    {genre}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectGroup>
                    </MultiSelectContent>
                </MultiSelect>
            </div>

            <div>
                <Label className="mb-3">Cinema</Label>
                <Select
                    onValueChange={handleCinemaSelection}
                    value={filtersToApply.cinema ?? '-1'}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Cinema" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Cinemas</SelectLabel>
                            <SelectItem value="-1">All</SelectItem>
                            {totalCinemas?.map((cinema, index) => (
                                <SelectItem
                                    key={index}
                                    value={cinema.id.toString()}
                                >
                                    {cinema.name} at {cinema.location.location}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <DatePicker
                key={filtersToApply.slot_date ?? 'no-date'}
                label="Date"
                selected={
                    filtersToApply.slot_date
                        ? new Date(`${filtersToApply.slot_date}T00:00:00`)
                        : undefined
                }
                onDateChange={handleDateChange}
            />
            {inModal ? (
                <DialogClose disabled={applyBtnDisabled} asChild>
                    <Button
                        onClick={handleApplyFilter}
                        disabled={applyBtnDisabled}
                    >
                        Apply Filters
                    </Button>
                </DialogClose>
            ) : (
                <Button onClick={handleApplyFilter} disabled={applyBtnDisabled}>
                    Apply Filters
                </Button>
            )}
        </div>
    );
};
