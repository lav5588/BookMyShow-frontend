export type Genre = {
    genre: string;
};

export type Movie = {
    id: number;
    slug: string;
    name: string;
    movie_poster: string | null;
    genres: Genre[];
};

export type MovieCarouselProps = {
    title: string;
    movies: Movie[];
    isLoading: boolean;
    hasNextPage: boolean;
    onSeeMore: () => void;
    emptyMessage: string;
};
