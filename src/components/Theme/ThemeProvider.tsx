import { useEffect, useState } from 'react';

import { ThemeProviderContext } from './ThemeProvider.context';
import type { Theme, ThemeProviderProps } from './Themeprovider.types';

/**
 * ThemeProvider component.
 *
 * Provides theme state and updater function to the component tree.
 * Applies the selected theme to the document root and persists
 * the preference in localStorage.
 */
export const ThemeProvider = ({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
                ? 'dark'
                : 'light';

            root.classList.add(systemTheme);

            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (localTheme: Theme) => {
            localStorage.setItem(storageKey, localTheme);
            setTheme(localTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};
