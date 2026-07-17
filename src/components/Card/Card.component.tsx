import { cn } from '@/lib';

import type { CardProps } from './Card.types';
import { Image } from '../Image';
import { TypographyH3, TypographyMuted } from '../Typography';
import { Card as ShadCNCard, CardContent } from '../ui/card';

/**
 * Returns a card with Image, Heading and Subheading
 */
export const Card = ({
    heading,
    imageUrl,
    subheading,
    className,
    ...props
}: CardProps) => (
    <ShadCNCard
        {...props}
        className={cn('max-w-100 select-none hover:bg-muted', className)}
    >
        <CardContent>
            <Image
                src={imageUrl}
                alt={`${heading} Poster`}
                height={{ base: 38, sm: 58 }}
                width={{ base: 63, sm: 88 }}
                fillImage="cover"
                className="rounded-xl"
                rounded
            />
            <TypographyH3
                className="whitespace-nowrap text-ellipsis overflow-hidden"
                title={heading}
            >
                {heading}
            </TypographyH3>
            <TypographyMuted
                title={subheading}
                className="whitespace-nowrap text-ellipsis overflow-hidden"
            >
                {subheading}
            </TypographyMuted>
        </CardContent>
    </ShadCNCard>
);
