export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieDetail extends Movie {
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Actors?: string;
    Plot?: string;
    imdbRating?: string;
}

export interface MovieState {
    list: Movie[];
    totalResults: number;
    loading: boolean;
    error: string | null;
    search: string;
    year: string;
    type: string;
    page: number;
    selectedMovie: MovieDetail | null;
}

