import { Clock, IndianRupee, Languages } from 'lucide-react';

import { capitalizeFirstCharacter, cn } from '@/lib';

import type { SlotCardProps } from './SlotCard.types';
import { TypographyP } from '../Typography';
/**
 * A Card to Show the Slot Time, Slot Price and the language in which the slot is
 */
export const SlotCard = ({
    time,
    price,
    language,
    className,
    ...props
}: SlotCardProps) => (
    <div
        className={cn(
            'border cursor-pointer rounded-xl p-3 w-50 h-28 text-green-600 hover:bg-green-50 overflow-hidden select-none',
            className,
        )}
        {...props}
    >
        <TypographyP>
            <Clock className="inline mr-2" />
            {time}
        </TypographyP>
        <TypographyP>
            {language ? (
                <>
                    <Languages className="inline mr-2" />{' '}
                    {capitalizeFirstCharacter(language)}
                </>
            ) : (
                ''
            )}
        </TypographyP>
        <TypographyP>
            <IndianRupee className="inline mr-2" />
            {price}
        </TypographyP>
    </div>
);
