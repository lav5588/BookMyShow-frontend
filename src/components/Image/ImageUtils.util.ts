import type { Breakpoint, ResponsiveNumber } from './Image.types';

export const resolveValue = (
    values: ResponsiveNumber | undefined,
    bp: Breakpoint,
) => {
    if (!values) return undefined;

    const order: Breakpoint[] = ['base', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const idx = order.indexOf(bp);

    for (let i = idx; i >= 0; i--) {
        const value = values[order[i]];
        if (value != null) return value;
    }

    return '100%';
};

export const rem = (v?: number) => (v == null ? undefined : `${v * 0.25}rem`);
