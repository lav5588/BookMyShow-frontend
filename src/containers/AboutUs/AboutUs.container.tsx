import { Image, TypographyH1, TypographyH2, TypographyP } from '@/components';

import { aboutUsConfig } from './AboutUsconfig.config';

export const AboutUs = () => (
    <div className="w-full space-y-12 my-6">
        <section className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="max-w-xl space-y-4">
                <TypographyH1>{aboutUsConfig.title}</TypographyH1>
                <TypographyP className="text-lg text-muted-foreground">
                    {aboutUsConfig.description}
                </TypographyP>
            </div>

            <div className="order-first flex w-full justify-center md:order-none md:w-auto">
                <Image
                    src={aboutUsConfig.imageUrl}
                    alt="Friends enjoying a movie together"
                    rounded
                    height={{ base: 64, sm: 80, md: 96, lg: 80, xl: 96 }}
                    width={{ base: 80, sm: 120, md: 144, lg: 120, xl: 144 }}
                    fillImage="cover"
                />
            </div>
        </section>

        <section className="space-y-6">
            <TypographyH2>What we are here to do</TypographyH2>
            <div className="grid gap-4 md:grid-cols-3">
                {aboutUsConfig.highlights.map((highlight) => {
                    const Icon = highlight.icon;

                    return (
                        <article
                            key={highlight.title}
                            className="space-y-3 rounded-xl border bg-card p-6 text-card-foreground"
                        >
                            <Icon className="size-6 text-primary" />
                            <TypographyH2 className="text-xl">
                                {highlight.title}
                            </TypographyH2>
                            <TypographyP className="text-muted-foreground">
                                {highlight.description}
                            </TypographyP>
                        </article>
                    );
                })}
            </div>
        </section>
    </div>
);
