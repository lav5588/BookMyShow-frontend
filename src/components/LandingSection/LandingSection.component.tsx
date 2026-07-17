import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib';

import type { SectionProps } from './LandingSection.types';
import { Image } from '../Image';
import { TypographyH2, TypographyP } from '../Typography';
import { Button } from '../ui/button';

export const LandingSection = ({
    title,
    description,
    features = [],
    buttonText,
    buttonLink,
    reverse = false,
    icon,
    imageUrl,
}: SectionProps) => (
    <section className="w-full">
        <div
            className={cn(
                'flex flex-col items-center justify-between w-full gap-6 md:flex-row lg:gap-12',
                reverse && 'md:flex-row-reverse',
            )}
        >
            {/* Text */}
            <div className="w-full self-start flex-1 min-w-0 max-w-xl text-start md:self-auto">
                <div className="flex items-center gap-3">
                    {icon}
                    <TypographyH2>{title}</TypographyH2>
                </div>

                <TypographyP className="text-muted-foreground">
                    {description}
                </TypographyP>

                {features.length > 0 && (
                    <ul className="space-y-2">
                        {features.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <ArrowRight className="h-4 w-4" />
                                {item}
                            </li>
                        ))}
                    </ul>
                )}

                <Button asChild>
                    <Link to={buttonLink}>{buttonText}</Link>
                </Button>
            </div>

            {/* Image */}
            <div className="order-first flex w-full justify-center md:order-0 md:w-auto md:flex-none md:justify-end">
                <Image
                    src={imageUrl}
                    alt={title}
                    rounded
                    height={{
                        base: 64,
                        sm: 80,
                        md: 96,
                        lg: 64,
                        xl: 80,
                        '2xl': 96,
                    }}
                    width={{
                        base: 90,
                        sm: 140,
                        md: 90,
                        lg: 128,
                        xl: 160,
                        '2xl': 192,
                    }}
                    fillImage="cover"
                />
            </div>
        </div>
    </section>
);
