import { useState } from 'react';
import { Box, TextField, Button, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function EstudianteFilter({ onFilter, onReset }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        onFilter({
            nombre,
            apellido,
            edad
        });
    };

    const handleClear = () => {
        setNombre('');
        setApellido('');
        setEdad('');

        onReset();
    };

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Box component="form" onSubmit={handleSearch}>

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Buscar por Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Buscar por Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Edad"
                            type="number"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SearchIcon />}
                                fullWidth
                            >
                                Buscar
                            </Button>

                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                startIcon={<ClearIcon />}
                                onClick={handleClear}
                                fullWidth
                            >
                                Limpiar
                            </Button>
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </Paper>
    );
}
