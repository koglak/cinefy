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
} from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/DetailPage.module.scss';

const DetailPage: React.FC = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const movie = useSelector((state: RootState) => state.movies.selectedMovie);;

    useEffect(() => {
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
        <Box className={styles.container}>
            <Button variant="contained" onClick={() => navigate(-1)} className={styles.backButton}>
                ← Back
            </Button>

            <Card className={styles.card}>
                <img
                    className={styles.cardMedia}
                    src={movie.Poster !== 'N/A' ? movie.Poster : ''}
                    alt={movie.Title}
                />
                <CardContent className={styles.cardContent}>
                    <Typography variant="h4" className={styles.title}>
                        {movie.Title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={styles.subtitle}>
                        {movie.Year} • {movie.Runtime} • {movie.Genre}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>Director:</strong> {movie.Director}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>Cast:</strong> {movie.Actors}
                    </Typography>
                    <Typography variant="body2" paragraph className={styles.rating}>
                        <strong>IMDb Rating:</strong>
                        {Array.from({ length: Math.round(Number(movie.imdbRating) / 2) }, (_, i) => (
                            <span key={i} className={styles.star}>⭐</span>
                        ))} ({movie.imdbRating} / 10)
                    </Typography>
                    <Typography variant="body2" paragraph className={styles.plot}>
                        <strong>Plot:</strong> {movie.Plot}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DetailPage;