import { useEffect, useState } from 'react';

import { BREAKPOINTS } from './Image.contant';
import type { Breakpoint } from './Image.types';

export const useBreakpoint = (): Breakpoint => {
    const getCurrent = (): Breakpoint => {
        if (typeof window === 'undefined') return 'base';
        if (window.matchMedia(`(min-width:${BREAKPOINTS['2xl']}px)`).matches)
            return '2xl';
        if (window.matchMedia(`(min-width:${BREAKPOINTS.xl}px)`).matches)
            return 'xl';
        if (window.matchMedia(`(min-width:${BREAKPOINTS.lg}px)`).matches)
            return 'lg';
        if (window.matchMedia(`(min-width:${BREAKPOINTS.md}px)`).matches)
            return 'md';
        if (window.matchMedia(`(min-width:${BREAKPOINTS.sm}px)`).matches)
            return 'sm';
        if (window.matchMedia(`(min-width:${BREAKPOINTS.xs}px)`).matches)
            return 'xs';

        return 'base';
    };

    const [bp, setBp] = useState<Breakpoint>(getCurrent);

    useEffect(() => {
        const update = () => setBp(getCurrent());

        const queries = [
            window.matchMedia(`(min-width:${BREAKPOINTS.xs}px)`),
            window.matchMedia(`(min-width:${BREAKPOINTS.sm}px)`),
            window.matchMedia(`(min-width:${BREAKPOINTS.md}px)`),
            window.matchMedia(`(min-width:${BREAKPOINTS.lg}px)`),
            window.matchMedia(`(min-width:${BREAKPOINTS.xl}px)`),
            window.matchMedia(`(min-width:${BREAKPOINTS['2xl']}px)`),
        ];

        queries.forEach((q) => q.addEventListener('change', update));
        update();

        return () => {
            queries.forEach((q) => q.removeEventListener('change', update));
        };
    }, []);

    return bp;
};
