import { format } from 'date-fns';

import { cn } from '@/lib';

import type { DateCardProps } from './DateCard.types';
import { Card } from '../ui/card';

export const DateCard = ({ date, selected, handleClick }: DateCardProps) => (
    <Card
        className={cn(
            'min-w-16 overflow-hidden rounded-xl border p-0 transition-all',
            selected && 'border-primary shadow-md',
        )}
    >
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={handleClick}
            className={cn(
                'flex w-full flex-col items-center px-2 py-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                selected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-accent hover:-translate-y-0.5 hover:shadow focus-visible:bg-accent focus-visible:-translate-y-0.5 focus-visible:shadow',
            )}
        >
            <span
                className={cn(
                    'text-[10px] font-medium uppercase tracking-wide',
                    selected
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground',
                )}
            >
                {format(date, 'EEE')}
            </span>

            <span className="text-lg font-bold leading-none">
                {format(date, 'dd')}
            </span>

            <span
                className={cn(
                    'text-[10px] font-medium uppercase',
                    selected
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground',
                )}
            >
                {format(date, 'MMM')}
            </span>
        </button>
    </Card>
);
