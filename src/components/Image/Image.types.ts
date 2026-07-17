import type { ImgHTMLAttributes } from 'react';

export type Breakpoint = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveNumber = Partial<Record<Breakpoint, number>>;

export type ImageProps = {
    width?: ResponsiveNumber;
    height?: ResponsiveNumber;
    fillImage?: 'cover' | 'contain' | 'fit';
    rounded?: boolean;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>;
