import React, { useEffect } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    Grid,
    Typography,
    InputLabel,
    FormControl,
    Pagination,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setSearch, setType, setYear, setPage } from '../redux/movieSlice';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const {
        list,
        loading,
        search,
        year,
        type,
        page,
        totalResults,
    } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [search, year, type, page]);

    const handleRowClick = (params: any) => {
        navigate(`/movie/${params.row.imdbID}`);
    };

    const columns: GridColDef[] = [
        { field: 'Title', headerName: 'Title', flex: 1 },
        { field: 'Year', headerName: 'Year', width: 100 },
        { field: 'imdbID', headerName: 'IMDB ID', width: 200 },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={4}>
                    <TextField
                        fullWidth
                        label="Search"
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </Grid>

                <Grid size={4}>
                    <TextField
                        fullWidth
                        label="Year"
                        value={year}
                        onChange={(e) => dispatch(setYear(e.target.value))}
                    />
                </Grid>

                <Grid size={4}>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => dispatch(setType(e.target.value))}
                            label="Type"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="movie">Movie</MenuItem>
                            <MenuItem value="series">TV Series</MenuItem>
                            <MenuItem value="episode">Episode</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <div style={{ marginTop: '2rem' }}>
                <div className='d-flex justify-content-center align-items-center'>
                    {list.length === 0 ? (
                        <Typography>No results found.</Typography>
                    ) : (
                        <>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={list}
                                    columns={columns}
                                    paginationMode="server"
                                    pageSizeOptions={[10]}
                                    rowCount={totalResults}
                                    paginationModel={{ page: page - 1, pageSize: 10 }}
                                    onPaginationModelChange={(model) => dispatch(setPage(model.page + 1))}
                                    onRowClick={handleRowClick}
                                    getRowId={(row: any) => row.imdbID}
                                    loading={loading}
                                    hideFooterPagination
                                />
                                <div className='d-flex justify-content-center align-items-center'>
                                    <Pagination
                                        count={Math.ceil(totalResults / 10)}
                                        page={page}
                                        onChange={(_, value) => dispatch(setPage(value))}
                                        className='mt-2'
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;