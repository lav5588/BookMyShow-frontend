export type SectionProps = {
    title: string;
    description: string;
    features?: string[];
    buttonText: string;
    buttonLink: string;
    reverse?: boolean;
    icon?: React.ReactNode;
    imageUrl?: string;
};
