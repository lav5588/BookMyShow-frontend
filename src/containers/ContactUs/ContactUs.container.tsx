import { type FormEvent, useState } from 'react';

import { toast } from 'sonner';

import { Image, TypographyH1, TypographyH2, TypographyP } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContactUsMutation } from '@/services';

import { contactUsConfig } from './ContactUsconfig.config';

export const ContactUs = () => {
    const [contactUs, { isLoading }] = useContactUsMutation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const query = formData.get('query') as string;

        try {
            await contactUs({ email, query }).unwrap();
            setIsSubmitted(true);
            toast.success('Your query has been submitted successfully.');
        } catch (err) {
            const error = err as {
                status?: string | number;
                originalStatus?: number;
            };
            // Check if it's a parsing error from a successful response (e.g. empty body or plain text)
            if (
                error?.status === 'PARSING_ERROR' &&
                (error?.originalStatus === 200 || error?.originalStatus === 201)
            ) {
                setIsSubmitted(true);
                toast.success('Your query has been submitted successfully.');
                event.currentTarget.reset();
            } else {
                toast.error('Failed to submit query. Please try again.');
            }
        }
    };

    return (
        <div className="w-full my-6 space-y-12">
            <section className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                <div className="max-w-xl space-y-4">
                    <TypographyH1>{contactUsConfig.title}</TypographyH1>
                    <TypographyP className="text-lg text-muted-foreground">
                        {contactUsConfig.description}
                    </TypographyP>
                </div>

                <div className="order-first flex w-full justify-center md:order-none md:w-auto">
                    <Image
                        src={contactUsConfig.imageUrl}
                        alt="Customer support team ready to help"
                        rounded
                        height={{ base: 64, sm: 80, md: 96, lg: 80, xl: 96 }}
                        width={{ base: 80, sm: 120, md: 144, lg: 120, xl: 144 }}
                        fillImage="cover"
                    />
                </div>
            </section>

            <section className="space-y-6">
                <TypographyH2>How can we help?</TypographyH2>
                <div className="grid gap-4 md:grid-cols-3">
                    {contactUsConfig.channels.map((channel) => {
                        const Icon = channel.icon;

                        return (
                            <article
                                key={channel.title}
                                className="space-y-3 rounded-xl border bg-card p-6 text-card-foreground"
                            >
                                <Icon className="size-6 text-primary" />
                                <TypographyH2 className="text-xl">
                                    {channel.title}
                                </TypographyH2>
                                <TypographyP className="text-muted-foreground">
                                    {channel.description}
                                </TypographyP>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground">
                    <div className="space-y-2">
                        <TypographyH2>Contact details</TypographyH2>
                        <TypographyP className="text-muted-foreground">
                            Choose the contact method that works best for you.
                        </TypographyP>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div>
                            <TypographyP className="font-semibold">
                                Email
                            </TypographyP>
                            <a
                                className="text-primary underline underline-offset-4"
                                href={`mailto:${contactUsConfig.contactDetails.email}`}
                            >
                                {contactUsConfig.contactDetails.email}
                            </a>
                        </div>
                        <div>
                            <TypographyP className="font-semibold">
                                Customer care
                            </TypographyP>
                            <a
                                className="text-primary underline underline-offset-4"
                                href={`tel:${contactUsConfig.contactDetails.customerCareNumber.replace(/\s/g, '')}`}
                            >
                                {
                                    contactUsConfig.contactDetails
                                        .customerCareNumber
                                }
                            </a>
                        </div>
                        <div>
                            <TypographyP className="font-semibold">
                                Address
                            </TypographyP>
                            <TypographyP className="text-muted-foreground">
                                {contactUsConfig.contactDetails.address}
                            </TypographyP>
                        </div>
                    </div>
                </div>

                <form
                    className="space-y-5 rounded-xl border bg-card p-6 text-card-foreground"
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                >
                    <div className="space-y-2">
                        <TypographyH2>Send us a query</TypographyH2>
                        <TypographyP className="text-muted-foreground">
                            Tell us how we can help and our team will get back
                            to you.
                        </TypographyP>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-email">Email address</Label>
                        <Input
                            id="contact-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-query">Your query</Label>
                        <textarea
                            id="contact-query"
                            name="query"
                            className="min-h-28 w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            placeholder="How can we help?"
                            required
                        />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send query'}
                    </Button>
                    {isSubmitted && (
                        <TypographyP className="text-sm text-primary">
                            Thanks for reaching out. Your query has been
                            received.
                        </TypographyP>
                    )}
                </form>
            </section>
        </div>
    );
};
