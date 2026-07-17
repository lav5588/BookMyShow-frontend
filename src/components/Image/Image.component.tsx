import React, { useMemo } from 'react';

import { cn } from '@/lib';

import type { ImageProps } from './Image.types';
import { rem, resolveValue } from './ImageUtils.util';
import { useBreakpoint } from './useBreakPoint.hook';

export const Image = ({
    fillImage,
    width,
    height,
    alt,
    rounded,
    className,
    ...imgProps
}: ImageProps) => {
    const bp = useBreakpoint();

    const divStyle = useMemo<React.CSSProperties>(
        () => ({
            width: rem(resolveValue(width, bp)) || '100%',
            height: rem(resolveValue(height, bp)) || '100%',
        }),
        [bp, width, height],
    );

    return (
        <div
            style={divStyle}
            className={cn(
                'overflow-hidden  flex items-center justify-center',
                {
                    'rounded-2xl': rounded,
                },
                className,
            )}
        >
            <img
                alt={alt}
                className={cn(
                    'h-full w-full select-none  [-webkit-user-drag:none]',
                    {
                        'object-cover object-center': fillImage === 'cover',
                        'object-contain': fillImage === 'contain',
                        'object-fit': fillImage === 'fit',
                        'rounded-2xl': rounded,
                    },
                )}
                {...imgProps}
            />
        </div>
    );
};
