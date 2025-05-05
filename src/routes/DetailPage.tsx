import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clearSelectedMovie, fetchMovieDetail } from '../redux/movieSlice';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';

const DetailPage: React.FC = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const movie = useSelector((state: RootState) => state.movies.selectedMovie);;

    useEffect(() => {
        console.log('IMDB ID from route:', id); // buraya ID gelmeli: "tt1234567"

        if (id) dispatch(fetchMovieDetail(id));
        return () => {
            dispatch(clearSelectedMovie());
        };
    }, [id]);

    if (!movie) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Button variant="contained" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <Card sx={{ display: 'flex', mt: 3 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image={movie.Poster !== 'N/A' ? movie.Poster : ''}
                    alt={movie.Title}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h4">{movie.Title}</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {movie.Year} • {movie.Runtime} • {movie.Genre}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>Director:</strong> {movie.Director}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>Cast:</strong> {movie.Actors}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>Plot:</strong> {movie.Plot}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DetailPage;
