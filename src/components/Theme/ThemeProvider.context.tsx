import { createContext } from 'react';

import type { ThemeProviderState } from './Themeprovider.types';

/**
 * Initial context state.
 */
const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

/**
 * React context for theme management.
 */
export const ThemeProviderContext =
    createContext<ThemeProviderState>(initialState);
