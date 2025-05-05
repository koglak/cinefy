import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MovieState } from '../constants/movie';

const BASE_URL = process.env.REACT_APP_OMDB_API;

const initialState: MovieState = {
    list: [],
    totalResults: 0,
    loading: false,
    error: null,
    search: 'Pokemon',
    year: '',
    type: '',
    page: 1,
    selectedMovie: null,
};

export const fetchMovies = createAsyncThunk(
    'movie/fetchMovies',
    async (_, { getState }) => {
        const state = getState() as { movies: MovieState };
        const { search, year, type, page } = state.movies;
        const params = new URLSearchParams({
            s: search,
            page: page.toString(),
            ...(year && { y: year }),
            ...(type && { type }),
        });

        const res = await axios.get(`${BASE_URL}&${params}`);
        return res.data;
    }
);

export const fetchMovieDetail = createAsyncThunk(
    'movie/fetchMovieDetail',
    async (imdbID: string) => {
        const res = await axios.get(`${BASE_URL}&i=${imdbID}&plot=full`);
        return res.data;
    }
);

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 1;
        },
        setYear(state, action: PayloadAction<string>) {
            state.year = action.payload;
            state.page = 1;
        },
        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        clearSelectedMovie(state) {
            state.selectedMovie = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.Search || [];
                state.totalResults = parseInt(action.payload.totalResults || '0', 10);
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching movies';
            })
            .addCase(fetchMovieDetail.fulfilled, (state, action) => {
                state.selectedMovie = action.payload;
            });
    },
});

export const {
    setSearch, setYear, setType, setPage, clearSelectedMovie
} = movieSlice.actions;

export default movieSlice.reducer;
