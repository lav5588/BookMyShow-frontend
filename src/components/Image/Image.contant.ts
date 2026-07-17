import type { Breakpoint } from './Image.types';

export const BREAKPOINTS: Record<Exclude<Breakpoint, 'base'>, number> = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};
